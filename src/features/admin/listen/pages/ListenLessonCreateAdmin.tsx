import {
  Avatar,
  Box,
  // Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { uploadFile } from "../../new_exams/api/examApi";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { toast } from "react-toastify";
import { CreateListenLesson } from "../types/ListenLesson.type";
import { createListenLesson } from "../api/listenLessonAdminApi";
// import { Add } from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal";
import { createListVoice, getListVoice } from "../api/listVoiceAdminApi";
import { Voice } from "../types/ListVoice.type";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";

const ListenLessonCreateAdmin = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [paragraphError, setParagraphError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const [openAutoModal, setOpenAutoModal] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async (data: CreateListenLesson) => {
      const responseData = await createListenLesson(data, groupId!);
      return responseData;
    },
    onSuccess: (responseData: { id: string }) => {
      navigate(`/admin/listen-lesson?id=${responseData.id}`);
      toast.success("Create new listen group set successfully!");
    },
  });
  const { data: listVoice } = useQuery({
    queryKey: ["listVoice"],
    queryFn: () => getListVoice(),
  });

  const [voiceSelected, setVoiceSelected] = useState<Voice | null>(null);

  const [listSentence, setListSentence] = useState<
    {
      sentence: string;
      audioUrl: string;
      fileName: string;
      index: number;
      sentenceError: string;
      fileError: string;
    }[]
  >([]);
  const [lesson, setLesson] = useState({
    name: "",
    nameError: "",
  });

  if (!groupId) {
    return <Navigate to="/admin/listen-group" />;
  }

  const handleAddEmptySentence = () => {
    setListSentence([
      ...listSentence,
      {
        sentenceError: "",
        fileError: "",
        fileName: "",
        sentence: "",
        audioUrl: "",
        index: listSentence[listSentence.length - 1]?.index + 1 || 1,
      },
    ]);
  };

  const handleSetSentence = (index: number, value: string) => {
    const newListSentence = [...listSentence];
    newListSentence[index].sentence = value;
    newListSentence[index].sentenceError = "";

    setListSentence(newListSentence);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 10) {
      toast.error("File is too large");
      return;
    }
    const data = await uploadFile(file);

    const audioUrl = data.secure_url;

    const newListSentence = [...listSentence];
    newListSentence[index].audioUrl = audioUrl;
    newListSentence[index].fileName = file.name;
    newListSentence[index].fileError = "";
    setListSentence(newListSentence);
  };
  // const handleFileLessonChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  //   if (file.size > 1024 * 1024 * 10) {
  //     toast.error("File is too large");
  //     return;
  //   }
  //   const data = await uploadFile(file);
  //   const audioUrl = data.secure_url;
  //   const newLesson = {
  //     ...lesson,
  //     audioUrl: audioUrl,
  //     fileName: file.name,
  //     fileError: "",
  //   };
  //   setLesson(newLesson);
  // };
  const handleDeleteSentence = (index: number) => {
    const newListSentence = listSentence.filter((item) => item.index !== index);
    setListSentence(newListSentence);
  };

  const resetInput = () => {
    setLesson({
      name: "",
      nameError: "",
    });
    setListSentence([]);
  };
  const handleSubmit = async () => {
    const valid = handleValidateInput();
    if (valid) {
      const data: CreateListenLesson = {
        name: lesson.name,
        listenSentences: listSentence.map((sentence) => {
          return {
            sentence: sentence.sentence.trim(),
            audioUrl: sentence.audioUrl,
            index: sentence.index,
          };
        }),
      };
      mutate(data);
      resetInput();
    }
  };
  const handleValidateInput = () => {
    let isValid = true;
    const newLesson = { ...lesson };
    // if (!lesson.audioUrl) {
    //   isValid = false;
    //   newLesson.fileError = "Lesson audio is required";
    //   setLesson({ ...newLesson, fileError: "Lesson audio is required" });
    // }
    if (!lesson.name.trim()) {
      isValid = false;
      newLesson.nameError = "Lesson name is required";
      setLesson({ ...newLesson, nameError: "Lesson name is required" });
    }
    let validSentence = 0;
    const newSentence = listSentence.map((sentence) => {
      if (!sentence.audioUrl && !sentence.sentence.trim()) {
        return sentence;
      }
      if (!sentence.audioUrl) {
        isValid = false;
        sentence.fileError = "Sentence audio is required";
      }
      if (!sentence.sentence.trim()) {
        isValid = false;
        sentence.sentenceError = "Sentence is required";
      }
      if (sentence.audioUrl && sentence.sentence.trim()) {
        validSentence++;
      }
      return sentence;
    });
    if (validSentence == 0) {
      isValid = false;
      toast.error("Cannot create lesson with 0 sentence");
    }
    setListSentence(newSentence);
    return isValid;
  };
  const handleOpenAutoModal = () => {
    setOpenAutoModal(true);
  };
  const handleCloseAutoModal = () => {
    setVoiceSelected(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setOpenAutoModal(false);
  };
  const handleSelectVoice = (voice: Voice) => {
    setVoiceSelected(voice);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = voice.preview_audio;
      audioRef.current.oncanplaythrough = () => {
        audioRef.current?.play();
      };
    }
  };
  const handleValidateParagraph = () => {
    const paragraph = inputRef?.current?.value;
    let rs = true;
    if (!paragraph || !paragraph.trim()) {
      setParagraphError("Paragraph is required");
      rs = false;
    }
    if (!voiceSelected) {
      toast.error("Please select voice");
      rs = false;
    }
    return rs;
  };
  const handleSubmitParagraph = async () => {
    if (!handleValidateParagraph()) {
      return;
    }
    const paragraph = inputRef?.current?.value
      .replace(/\n/g, "")
      .split(/[.!?]/)
      .map((sentence) => {
        return sentence.trim();
      })
      .filter((it) => it !== "");
    if (paragraph?.length && voiceSelected) {
      const payload = paragraph.map((sentence) => {
        return {
          voiceId: voiceSelected.id!,
          text: sentence!,
        };
      });
      setIsLoading(true);
      setOpenAutoModal(false);
      const res = await createListVoice(payload);
      setIsLoading(false);

      const newSentences = res.map((item, index) => {
        return {
          sentence: paragraph[index],
          audioUrl: item.url,
          fileName: item.url,
          index: listSentence.length + index + 1,
          sentenceError: "",
          fileError: "",
        };
      });
      setListSentence([...listSentence, ...newSentences]);

      // const listSentence = paragraph.map((sentence, index) => {
      //   return {
      //     sentence: sentence,
      //     audioUrl: "",
      //     fileName: "",
      //     index: index,
      //     sentenceError: "",
      //     fileError: "",
      //   };
      // });
      // setListSentence(listSentence);
    }
    handleCloseAutoModal();
  };
  return (
    <>
      <CustomBackdrop open={isLoading} />

      <Stack sx={{ padding: "32px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Create new lesson
          </Typography>
          <GoBackButton />
        </Stack>
        <Stack display={"flex"} direction="row" spacing={4}>
          <Stack flex={2}>
            <Stack
              marginTop={"20px"}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Lesson info:
              </Typography>
            </Stack>
            <Stack display={"flex"} flexDirection={"column"} gap={"8px"}>
              {/* <audio style={{ width: "100%" }} key={lesson.audioUrl} controls>
                <source src={lesson.audioUrl || ""} />
                Your browser does not support the audio element.
              </audio> */}
              <TextField
                onChange={(e) => {
                  setLesson({
                    ...lesson,
                    name: e.target.value,
                    nameError: "",
                  });
                }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={lesson.name}
                error={!!lesson.nameError}
                helperText={lesson.nameError}
              />
              {/* <TextField
                id="outlined-basic"
                label="Audio name"
                variant="outlined"
                error={!!lesson.fileError}
                helperText={lesson.fileError}
                value={lesson.fileName}
                slotProps={{
                  input: {
                    readOnly: true,
                    style: {
                      userSelect: "none",
                    },
                  },
                }}
              /> */}
              {/* <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Audio
                <input
                  onChange={(e) => handleFileLessonChange(e)}
                  accept="audio/*"
                  type="file"
                  hidden
                />
              </Button> */}
            </Stack>
            <Stack
              marginTop={"20px"}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Sentence info:
              </Typography>
            </Stack>
            {listSentence.map((sentence, index) => {
              return (
                <Stack
                  key={index}
                  sx={{
                    border: "1px dashed #ccc",
                    width: "100%",
                    padding: "16px",
                    borderRadius: "8px",
                    gap: "8px",
                    marginBottom: "16px",
                    position: "relative",
                  }}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <HighlightOffIcon
                    sx={{
                      position: "absolute",
                      top: "0",
                      right: "0px",
                      color: "red",
                    }}
                    onClick={() => {
                      handleDeleteSentence(sentence.index);
                    }}
                  />
                  <audio
                    key={sentence.index + sentence.audioUrl}
                    style={{
                      width: "100%",
                      height: "30px",
                      marginTop: "8px",
                    }}
                    controls
                  >
                    <source src={sentence.audioUrl || ""} />
                    Your browser does not support the audio element.
                  </audio>
                  <TextField
                    id="outlined-multiline-static"
                    label="Sentence"
                    multiline
                    value={sentence.sentence}
                    sx={{ marginTop: "8px" }}
                    onChange={(event) => {
                      handleSetSentence(index, event.target.value);
                    }}
                    error={!!sentence.sentenceError}
                    helperText={sentence.sentenceError}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Audio name"
                    multiline
                    rows={1}
                    value={sentence.fileName}
                    contentEditable={false}
                    error={!!sentence.fileError}
                    helperText={sentence.fileError}
                    slotProps={{
                      input: {
                        readOnly: true,
                        style: {
                          userSelect: "none", // Disable text selection
                        },
                      },
                    }}
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Audio
                    <input
                      onChange={(e) => handleFileChange(e, index)}
                      accept="audio/*"
                      type="file"
                      hidden
                    />
                  </Button>
                </Stack>
              );
            })}
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<AddIcon />}
              sx={{ marginTop: "20px" }}
              onClick={handleAddEmptySentence}
            >
              Add
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<AutoAwesomeIcon />}
              onClick={handleOpenAutoModal}
              sx={{ marginTop: "20px" }}
            >
              Auto generate
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              sx={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </Stack>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Stack flex={1} spacing={2}>
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Lesson preview
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              {lesson.name || "Lesson name"}
            </Typography>
            {/* <audio key={Date.now() + lesson.audioUrl} controls>
              <source src={lesson.audioUrl || ""} />
              Your browser does not support the audio element.
            </audio> */}
            <Stack
              sx={{
                border: "1px dashed #ccc",
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
              }}
              display={listSentence.length > 0 ? "flex" : "none"}
              flexDirection={"column"}
            >
              {listSentence.map((sentence, index) => {
                return (
                  <Stack
                    key={index}
                    borderBottom={
                      index !== listSentence.length - 1 ? "1px dashed #ccc" : ""
                    }
                    display={"flex"}
                    padding={"10px 0"}
                    flexDirection={"column"}
                    gap={"8px"}
                  >
                    <audio
                      key={sentence.index + Date.now() + sentence.audioUrl}
                      style={{ height: "30px" }}
                      controls
                    >
                      <source src={sentence.audioUrl || ""} />
                      Your browser does not support the audio element.
                    </audio>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      {sentence.sentence || "sentence"}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <CustomModal open={openAutoModal} onClose={handleCloseAutoModal}>
        <Box
          sx={{
            padding: 3,
            paddingBottom: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ minWidth: "200px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Available voice:
            </Typography>
            <List
              dense
              sx={{
                width: "100%",
                maxWidth: 360,
                height: 400,
                overflowY: "scroll",
                bgcolor: "background.paper",
              }}
            >
              {listVoice?.map((voice: Voice, index: number) => {
                const labelId = `checkbox-list-secondary-label-${index}`;
                return (
                  <ListItem
                    onClick={() => handleSelectVoice(voice)}
                    key={index}
                    disablePadding
                  >
                    <ListItemButton
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#03258b38",
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#03258b28",
                        },
                        "&:hover": {},
                        borderRadius: "8px",
                      }}
                      selected={voiceSelected?.id === voice.id}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar ${voice.name}`}
                          src={voice.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`${voice.name}`}
                        sx={{
                          ".MuiListItemText-primary": {
                            color: "#595959",
                          },
                        }}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "#9b9b9b", display: "inline" }}
                          >
                            {voice.gender}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Box sx={{ minWidth: "360px" }}>
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Input Paragraph:
            </Typography>
            <TextField
              focused
              sx={{ width: "100%", height: "100%" }}
              id="outlined-textarea"
              label="Paragraph"
              placeholder="Enter paragraph here..."
              multiline
              spellCheck={false}
              inputRef={inputRef}
              error={!!paragraphError}
              helperText={paragraphError}
              onChange={() => {
                setParagraphError("");
              }}
              slotProps={{
                htmlInput: {
                  style: {
                    height: "380px",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            padding: 3,
            paddingTop: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleSubmitParagraph}
            variant="outlined"
            startIcon={<AutoAwesomeIcon />}
          >
            Generate
          </Button>
          <audio ref={audioRef} hidden key={voiceSelected?.id} controls>
            <source src={voiceSelected?.preview_audio || ""} />
            Your browser does not support the audio element.
          </audio>
        </Box>
      </CustomModal>
    </>
  );
};

export default ListenLessonCreateAdmin;
