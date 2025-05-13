import { Box, IconButton, Typography } from "@mui/material";
import { Image } from "./UI/Image";
import DefaultVocaImage from "../assets/images/voca/default-voca-image.jpg";
import CloseSmIcon from "../assets/icons/close-sm.svg";
import { EditNote } from "@mui/icons-material";

interface VocabularyFrontSideProps {
  word: string;
  phonetic: string;
  image?: string | null;
  onClose?: () => void;
  onEdit?: () => void;
}

const VocabularyFrontSide: React.FC<VocabularyFrontSideProps> = ({
  word,
  phonetic,
  image,
  onClose,
  onEdit,
}) => {
  const isCloseable = !!onClose;
  const imgSize = isCloseable ? "140px" : "150px";
  const isEditable = !!onEdit;

  return (
    <Box sx={{ padding: "15px", height: "100%", position: "relative" }}>
      {isCloseable && (
        <Image
          src={CloseSmIcon}
          onClick={onClose}
          sx={{
            width: "12px",
            height: "12px",
            position: "absolute",
            right: 8,
            top: 8,
          }}
        />
      )}
      <Box
        sx={{
          position: "relative",
          mx: isCloseable ? "6px" : 0,
          marginTop: isCloseable ? "10px" : 0,
          "&:hover > div": {
            visibility: "visible",
          },
        }}
      >
        <Image
          src={image || DefaultVocaImage}
          sx={{
            width: imgSize,
            height: imgSize,
            borderRadius: "6px",
          }}
        />

        {/* Edit Overlay */}
        {isEditable && (
          <Box
            sx={{
              borderRadius: "6px",
              position: "absolute",
              left: 0,
              top: 0,
              width: imgSize,
              height: imgSize,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              visibility: "hidden",
            }}
          >
            <IconButton
              sx={{
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <EditNote
                sx={{
                  color: "white",
                  fontSize: "30px",
                }}
                onClick={onEdit}
              />
            </IconButton>
          </Box>
        )}
      </Box>
      <Typography
        variant="inherit"
        sx={{
          marginTop: "12px",
          fontSize: "16px",
          lineHeight: "22px",
          fontWeight: 500,
        }}
      >
        {word}
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#777777" }}>
        {phonetic}
      </Typography>
    </Box>
  );
};
export default VocabularyFrontSide;
