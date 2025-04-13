import { Box, SxProps, Typography } from "@mui/material";
import VocabularyCard, {
  VocabularyCardState,
} from "../../../components/VocabularyCard";
import VocabularyModel from "../../../types/VocabularyModel";
import { vocaWordClassFullName2Abbr } from "../../../utils/helper";

type ListWordsProps = {
  title: string;
  vocabularies: VocabularyModel[];
  status: VocabularyCardState;
  sx?: SxProps;
  onCloseWordCard?: (vocabularyId: string) => void;
  onEditWordCard?: (vocabularyId: string) => void;
};

const ListWords: React.FC<ListWordsProps> = ({
  title,
  vocabularies,
  status,
  sx,
  onCloseWordCard,
  onEditWordCard,
}) => {
  let badgeTypoStyle = {
    color: "#58CC02",
    backgroundColor: "#EAFFD9",
  };

  if (status === VocabularyCardState.ERROR) {
    badgeTypoStyle = {
      color: "#FF4B4B",
      backgroundColor: "#FFEEEE",
    };
  }

  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontSize: "20px", color: "#777777" }}>
        {title}
        <Typography
          component="span"
          sx={{
            minWidth: "50px",
            display: "inline-block",
            borderRadius: "16px",
            textAlign: "center",
            marginLeft: "10px",
            fontWeight: "500",
            ...badgeTypoStyle,
          }}
        >
          {vocabularies.length}
        </Typography>
      </Typography>
      <Box
        sx={{
          marginTop: "30px",
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {vocabularies.map((vocabulary) => (
          <VocabularyCard
            key={vocabulary.id}
            word={vocabulary.word}
            phonetic={vocabulary.pronunciation}
            thumbnail={vocabulary.thumbnail}
            type={vocaWordClassFullName2Abbr(vocabulary.wordClass)}
            meaning={vocabulary.translate}
            audio={vocabulary.audio}
            state={status}
            onDelete={onCloseWordCard && (() => onCloseWordCard(vocabulary.id))}
            onEdit={onEditWordCard && (() => onEditWordCard(vocabulary.id))}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ListWords;
