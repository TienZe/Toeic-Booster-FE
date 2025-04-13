import {
  Box,
  OutlinedInput,
  SvgIcon,
  SxProps,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { searchWord } from "../../shared-apis/voca-search-api";
import useDebounce from "../../../hooks/useDebounce";
import Popup from "../../../components/UI/Popup";
import VocaSearchResultItem from "./VocaSearchResultItem";
import { WordItem } from "../../../types/voca-search";

type VocaSearchingProps = {
  containerSx?: SxProps;
  onClickWord?: (wordItem: WordItem) => void;
};

const VocaSearching: React.FC<VocaSearchingProps> = ({
  containerSx,
  onClickWord,
}) => {
  const anchorEle = useRef<HTMLDivElement>(null);

  const [wordInput, setWordInput] = useState("");
  const wordInputDebounce = useDebounce(wordInput, { delay: 400 });

  const openPopup = wordInput !== "";

  const {
    data: wordItems,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["voca-search", { word: wordInputDebounce }],
    queryFn: () => searchWord(wordInputDebounce),
    enabled: wordInputDebounce.length > 0,
    retry: false,
  });

  const handleClickWordItem = (wordItem: WordItem) => {
    onClickWord?.(wordItem);
    setWordInput(""); // close the popup
  };

  return (
    <Box sx={containerSx}>
      <Box sx={{ position: "relative" }} ref={anchorEle}>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#4C4C4C",
            fontWeight: 500,
            marginBottom: 1,
          }}
        >
          Search for the word you want to pin
        </Typography>
        <OutlinedInput
          placeholder="Enter the word in English"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          sx={{
            width: "100%",
            px: "24px",
            borderRadius: "10px",
            zIndex: 1110,
            position: "relative",
            backgroundColor: "white",
          }}
        />

        <Popup
          open={openPopup}
          onClose={() => setWordInput("")}
          anchorEle={anchorEle.current}
          sx={{
            width: "100%",
            top: "100%",
            transform: "translateY(10px)",
            borderRadius: "10px",
            boxShadow: "0 0 29px rgba(100,100,111,.1)",
            backgroundColor: "white",

            zIndex: 1110,
          }}
        >
          {/* Arrow */}
          <Box
            sx={{
              width: "12px",
              height: "12px",
              backgroundColor: "white",
              transform: "rotate(-135deg)",
              position: "absolute",
              top: "-6px",
              left: "50px",
            }}
          ></Box>

          <Box
            sx={{
              padding: "6px 30px",
              maxHeight: "500px",
              overflowY: "auto",
              minHeight: "118px",
            }}
          >
            {/* Scrollable list words */}
            {isSuccess &&
              wordItems?.map((wordItem) => (
                <VocaSearchResultItem
                  key={wordItem.definition}
                  word={wordItem.word}
                  partOfSpeech={wordItem.partOfSpeech}
                  meaning={wordItem.meaning || wordItem.definition}
                  onClick={() => handleClickWordItem?.(wordItem)}
                />
              ))}

            {isLoading && (
              <Typography sx={{ textAlign: "center", marginTop: 1 }}>
                Searching...
              </Typography>
            )}

            {/* Error message */}
            {isError && (
              <Box sx={{ textAlign: "center", py: 1 }}>
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="9960px"
                    width="50px"
                    height="50px"
                    viewBox="0 0 14.909 14.91"
                  >
                    <path
                      fill="#777777"
                      d="M5.901,10.56c-2.569,0-4.659-2.09-4.659-4.659c0-2.569,2.09-4.659,4.659-4.659s4.659,2.089,4.659,4.659   C10.561,8.47,8.471,10.56,5.901,10.56z M14.727,13.849l-4.239-4.24c0.821-1.015,1.315-2.304,1.315-3.707   C11.803,2.648,9.155,0,5.901,0S0,2.647,0,5.901c0,3.254,2.647,5.902,5.901,5.902c1.404,0,2.693-0.495,3.708-1.315l4.239,4.239   c0.121,0.121,0.28,0.183,0.438,0.183c0.16,0,0.318-0.062,0.439-0.183C14.97,14.484,14.97,14.091,14.727,13.849z"
                    />
                  </svg>
                </SvgIcon>
                <Typography>{error.message}</Typography>
                <Typography>
                  You can try the search again at later time
                </Typography>
              </Box>
            )}
          </Box>
        </Popup>

        {/* Overlay */}
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, .3)",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1101,
          display: openPopup ? "block" : "none",
        }}
      ></Box>
    </Box>
  );
};
export default VocaSearching;
