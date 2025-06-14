import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Paper,
  IconButton,
  Chip,
  Fade,
  Backdrop,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import {
  MessageCircle,
  Send,
  Sparkles,
  X,
  BotMessageSquare,
  FilePlus2,
} from "lucide-react";
import { chat, createChatHistory, getChatHistory } from "../../api/chatbot";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import ReactMarkdown from "react-markdown";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reviewToeicAttemptActions } from "../../../../stores/reviewToeicAttemptSlice";
import { getQuestionNumbersFromParts } from "../../../../utils/toeicExamHelper";
import { useQuestionContext } from "../QuestionProvider";
import { ChatBotTextResponse } from "../../types/toeic-chat";

interface Message {
  id: string;
  role: "user" | "model";
  textResponse: ChatBotTextResponse | string;
}

const introductionMessage: Message = {
  id: "0",
  role: "model",
  textResponse: {
    text: "Xin chào! Tôi là gia sư TOEIC. Tôi có thể giúp bạn giải đáp chi tiết về câu hỏi TOEIC. Hãy hỏi tôi bất cứ điều gì!",
    type: "text",
  },
};

const quickQuestions = [
  "Tại sao đáp án này đúng?",
  "Phân tích ngữ pháp",
  "Từ vựng quan trọng",
  "Mẹo làm bài",
];

function extractQuestionNumber(input: string) {
  // The first number after @ is the question id
  const atIndex = input.indexOf("@");
  if (atIndex !== -1) {
    const wordsAfterAt = input.slice(atIndex + 1).split(/\s/);
    const afterAt = wordsAfterAt[0];
    return +afterAt;
  }

  return null;
}

export default function TOEICChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  // State for question suggestion dropdown
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useState(0); // current index of question that is focus
  const inputBoxRef = useRef<HTMLDivElement>(null);
  const highlightedSuggestionRef = useRef<HTMLDivElement>(null);

  const { scrollToQuestion } = useQuestionContext();

  console.log("highlightedIndex", highlightedIndex);

  const [isLoading, setIsLoading] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const {
    questionId,
    attemptId,
    showChatBox,
    attemptSelectedParts, // used to find the range of question number for suggestion
    focusQuestionNumber,
  } = useSelector((state: RootState) => state.reviewToeicAttempt);

  const attemptQuestionNumbers = useMemo(() => {
    return getQuestionNumbersFromParts(attemptSelectedParts);
  }, [attemptSelectedParts]);

  const [filteredSuggestions, setFilteredSuggestions] = useState<number[]>(
    attemptQuestionNumbers,
  ); // filtered question number show in suggestion modal

  const hasSuggestionModalDisplayed =
    showSuggestion && filteredSuggestions.length > 0;

  const dispatch = useDispatch();

  const createNewChatMutation = useMutation({
    mutationFn: () =>
      createChatHistory({
        attemptId: attemptId!,
        questionNumber: focusQuestionNumber!,
      }),
    onSuccess: (newChatHistory) => {
      setMessages([introductionMessage]);

      // Update the initial question id (the first question context)
      dispatch(
        reviewToeicAttemptActions.setQuestion({
          questionId: newChatHistory.questionId, // the corresponding of the latest attached question number (focusQuestionNumber)
          attemptId: attemptId!,
          attemptSelectedParts,
        }),
      );
    },
    onSettled: () => {
      createNewChatMutation.reset();
    },
  });

  const setShowChatBox = (show: boolean) => {
    dispatch(reviewToeicAttemptActions.setShowChatBox(show));
  };

  // Get the chat history for the question slot of the current attempt (create if not exists)
  const { data: chatHistory } = useQuery({
    queryKey: ["chat-history", { questionId, attemptId }],
    queryFn: () =>
      getChatHistory({
        questionId: questionId!,
        toeicTestAttemptId: attemptId!,
      }),
    enabled: !!questionId && !!attemptId,
  });

  const renderMessage = (message: Message) => {
    if (typeof message.textResponse == "string") {
      return (
        <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
          <ReactMarkdown>{message.textResponse as string}</ReactMarkdown>
        </Typography>
      );
    }

    return (
      <>
        <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
          <ReactMarkdown>{message.textResponse.text}</ReactMarkdown>
        </Typography>

        {message.textResponse.type == "option" && (
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            {message.textResponse.options.map((option) => (
              <Button
                key={option}
                variant="outlined"
                color="primary"
                sx={{
                  textWrap: "wrap",
                  fontSize: "12px",
                  px: "8px",
                  py: "4px",
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </Stack>
        )}
      </>
    );
  };

  const handleOptionClick = useCallback((option: string) => {
    setInput(option);
  }, []);

  const hideQuestionNumberSuggestionModal = () => {
    setShowSuggestion(false);
    setFilteredSuggestions([]);
    setHighlightedIndex(0);
  };

  const focusToQuestion = (questionNumber: number) => {
    // Show the part that contains the question
    dispatch(reviewToeicAttemptActions.setFocusQuestionNumber(+questionNumber));
    scrollToQuestion(+questionNumber, undefined, {
      // behavior: "instant",
      block: "center",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    // Detect the first @
    const atIndex = value.indexOf("@");
    if (atIndex !== -1) {
      const wordsAfterAt = value.slice(atIndex + 1).split(/\s/);
      const afterAt = wordsAfterAt[0];
      // console.log("wordsAfterAt", wordsAfterAt);

      if (wordsAfterAt.length == 1) {
        // pending enter question number
        const filtered = attemptQuestionNumbers.filter((questionNumber) =>
          questionNumber.toString().startsWith(afterAt),
        );
        setFilteredSuggestions(filtered);
        setShowSuggestion(true);
        setHighlightedIndex(0);
      } else {
        // There are word after @questionNumber, so scroll into the corresponding question
        focusToQuestion(+afterAt);
        hideQuestionNumberSuggestionModal();
      }
    } else {
      hideQuestionNumberSuggestionModal();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasSuggestionModalDisplayed) {
      // Multiline: Shift+Enter inserts a newline
      if (e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        const { selectionStart, selectionEnd } =
          e.target as HTMLTextAreaElement;

        // Insert newline at cursor position
        setInput(
          (prev) =>
            prev.slice(0, selectionStart ?? prev.length) +
            "\n" +
            prev.slice(selectionEnd ?? prev.length),
        );

        return;
      }

      // Enter as submit
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);

        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      if (showSuggestion && filteredSuggestions[highlightedIndex]) {
        e.preventDefault();
        handleQuestionNumberSuggestionSelect(
          filteredSuggestions[highlightedIndex],
        );
      }
    } else if (e.key === "Escape") {
      setShowSuggestion(false);
    }
  };

  // Insert suggestion at the @... fragment
  const handleQuestionNumberSuggestionSelect = (
    selectedQuestionNumber: number,
  ) => {
    // append the selected question number to the input textarea
    const atIndex = input.indexOf("@");
    if (atIndex !== -1) {
      const afterAt = input.slice(atIndex + 1).split(/\s/)[0]; // get the selected question number after @
      const before = input.slice(0, atIndex); // str before @
      const after = input.slice(atIndex + 1 + afterAt.length); // str after selected question number
      setInput(`${before}@${selectedQuestionNumber}${after}`);
      focusToQuestion(selectedQuestionNumber);
    }

    // close suggestion modal
    hideQuestionNumberSuggestionModal();
  };

  const handleNewChat = () => {
    // Create a new chat attached context of the focus question
    createNewChatMutation.mutate();
  };

  useEffect(() => {
    if (chatHistory) {
      setMessages([
        introductionMessage,
        ...chatHistory.chatContents.map((content) => ({
          id: content.id.toString(),
          role: content.role,
          textResponse: content.parts[0].text,
        })),
      ]);
    }
  }, [chatHistory]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      // Auto scroll to the end of the messages
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-scroll highlighted suggestion into view
  useEffect(() => {
    if (highlightedSuggestionRef.current) {
      highlightedSuggestionRef.current.scrollIntoView({
        // block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  // Handle click outside to close suggestion
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputBoxRef.current &&
        !inputBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestion(false);
      }
    }
    if (showSuggestion) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestion]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    if (!chatHistory) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      textResponse: {
        text: messageText,
        type: "text",
      },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const contextQuestionNumber = extractQuestionNumber(messageText); // the attached question number that the user want to ask

      const response = await chat({
        toeicChatHistoryId: chatHistory.id,
        text: messageText,
        contextQuestionNumber,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        textResponse: response.text || {
          text: "Xin lỗi, tôi không thể trả lời câu hỏi này.",
          type: "text",
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        textResponse: {
          text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau. 😔",
          type: "text",
        },
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  if (!questionId || !attemptId) {
    return null;
  }

  return (
    <Box>
      {/* Floating Chat Button */}
      {!showChatBox && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Button
            onClick={() => {
              setShowChatBox(true);
            }}
            variant="contained"
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              minWidth: 0,
              boxShadow: "0 8px 32px rgba(37, 99, 235, 0.3)",
              background: "linear-gradient(135deg, #203A90 0%, #4A5FA8 100%)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 12px 40px rgba(37, 99, 235, 0.4)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <MessageCircle size={28} />
          </Button>
        </Box>
      )}

      {/* Modern Chatbot Interface */}
      <Fade in={showChatBox} timeout={300}>
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 400,
            height: 800,
            zIndex: 1001,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 3,
              overflow: "hidden",
              backdropFilter: "blur(20px)",
              background: "rgba(255, 255, 255, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 1,
                background: "linear-gradient(135deg, #203A90 0%, #4A5FA8 100%)",

                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Sparkles size={18} />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, lineHeight: 1.2 }}
                  >
                    TOEIC Assistant
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.8, fontSize: "0.7rem" }}
                  >
                    Powered by Toeic Booster
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={handleNewChat}
                  sx={{
                    color: "white",
                    opacity: 0.8,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <FilePlus2 size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => setShowChatBox(false)}
                  sx={{
                    color: "white",
                    opacity: 0.8,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                p: 0,
                height: "calc(100% - 64px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Quick Actions */}
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: "grey.100",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {quickQuestions.map((question, index) => (
                    <Chip
                      key={index}
                      label={question}
                      variant="outlined"
                      size="small"
                      clickable
                      sx={{
                        fontSize: "0.7rem",
                        height: 28,
                        borderRadius: 2,
                        borderColor: "grey.200",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "primary.50",
                        },
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => handleQuickQuestion(question)}
                    />
                  ))}
                </Box>
              </Box>

              {/* Messages */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 1,
                  backgroundColor: "secondary.extraLight",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: "flex",
                        justifyContent:
                          message.role === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          maxWidth: "85%",
                          p: 1,
                          borderRadius: 2.5,
                          background: "grey.50",
                          border: "1px solid",
                          borderColor: "grey.200",
                        }}
                      >
                        {/* Tutor avatar */}
                        {message.role == "model" && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={0.3}
                            sx={{ mb: 0.3 }}
                          >
                            <BotMessageSquare
                              size={14}
                              color="var(--mui-palette-warning-main)"
                            />
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.7rem" }}
                            >
                              TOEIC Tutor
                            </Typography>
                          </Stack>
                        )}

                        {/* User & tutor message rendering */}
                        {renderMessage(message)}
                      </Paper>
                    </Box>
                  ))}

                  {/* Placeholder message box for loading */}
                  {isLoading && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          bgcolor: "white",
                          border: "1px solid",
                          borderColor: "grey.100",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          {[0, 1, 2].map((i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "grey.400",
                                animation: "pulse 1.4s ease-in-out infinite",
                                animationDelay: `${i * 0.2}s`,
                                "@keyframes pulse": {
                                  "0%, 80%, 100%": { opacity: 0.3 },
                                  "40%": { opacity: 1 },
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    </Box>
                  )}

                  <div ref={endOfMessagesRef}></div>
                </Box>
              </Box>

              <Divider />

              {/* Input */}
              <Box sx={{ p: 1 }}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}
                >
                  <Box sx={{ position: "relative", flex: 1 }} ref={inputBoxRef}>
                    <TextField
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      placeholder="Hỏi về câu hỏi này..."
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={1}
                      maxRows={3}
                      disabled={isLoading}
                      sx={{
                        flex: 1,
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          fontSize: "0.85rem",
                          "& fieldset": {
                            borderColor: "grey.200",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey.300",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.main",
                            borderWidth: 1,
                          },
                        },
                      }}
                      inputProps={{ autoComplete: "off" }}
                      autoFocus
                    />

                    {/* Question number suggestion modal */}
                    {showSuggestion && filteredSuggestions.length > 0 && (
                      <Paper
                        elevation={0}
                        sx={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: "100%",
                          zIndex: 10,
                          mt: 0.5,
                          maxHeight: 220,
                          overflowY: "auto",
                          borderRadius: 2.5,
                          border: "1.5px solid",
                          borderColor: "primary.extraLight",
                          backgroundColor: "#fff",
                          p: 0.5,
                          maxWidth: "200px",
                          boxSizing: "border-box",
                          "&:hover > div:not(:hover)": {
                            backgroundColor: "white",
                            fontWeight: 400,
                          },
                        }}
                      >
                        {filteredSuggestions.map((questionNumber, idx) => {
                          const isHighlighted = idx === highlightedIndex;
                          return (
                            <Box
                              key={questionNumber}
                              ref={
                                isHighlighted
                                  ? highlightedSuggestionRef
                                  : undefined
                              }
                              sx={{
                                px: 1,
                                py: 0.5,
                                cursor: "pointer",
                                borderRadius: 1.5,
                                fontSize: "12px",
                                backgroundColor: isHighlighted
                                  ? "primary.extraLight"
                                  : "white",
                                fontWeight: isHighlighted ? 600 : 400,
                                transition: "background 0.2s",
                                "&:hover": {
                                  backgroundColor: "primary.extraLight",
                                  fontWeight: 600,
                                },
                              }}
                              onMouseDown={() =>
                                handleQuestionNumberSuggestionSelect(
                                  questionNumber,
                                )
                              }
                            >
                              Question {questionNumber}
                            </Box>
                          );
                        })}
                      </Paper>
                    )}
                  </Box>
                  <IconButton
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    sx={{
                      background: input.trim()
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "grey.200",
                      color: input.trim() ? "white" : "grey.500",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        background: input.trim()
                          ? "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
                          : "grey.300",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Send size={18} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Fade>

      {/* Backdrop */}
      <Backdrop
        open={showChatBox}
        onClick={() => setShowChatBox(false)}
        sx={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      />
    </Box>
  );
}
