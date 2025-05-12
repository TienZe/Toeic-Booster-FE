import { Box, SxProps, Typography } from "@mui/material";
import VocabularyCard, {
  VocabularyCardState,
} from "../../../components/VocabularyCard";
import VocabularyModel from "../../../types/VocabularyModel";
import {
  getWordThumbnail,
  vocaWordClassFullName2Abbr,
} from "../../../utils/helper";
import { LessonVocabulary } from "../../../types/LessonVocabulary";

type ListWordsProps = {
  title: string;
  vocabularies: VocabularyModel[] | LessonVocabulary[];
  status: VocabularyCardState;
  sx?: SxProps;
  onCloseWordCard?: (vocabularyId: number) => void;
  onEditWordCard?: (vocabularyId: number) => void;
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
    backgroundColor: "primary.extraLight",
    color: "primary.main",
  };

  if (status === VocabularyCardState.ERROR) {
    badgeTypoStyle = {
      color: "#FF4B4B",
      backgroundColor: "#FFEEEE",
    };
  } else if (status === VocabularyCardState.SUCCESS) {
    badgeTypoStyle = {
      color: "#58CC02",
      backgroundColor: "#EAFFD9",
    };
  }

  return (
    <Box sx={{ ...sx }}>
      <Typography sx={{ fontSize: "16px", color: "#777777" }}>
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
            thumbnail={getWordThumbnail(vocabulary)}
            type={vocaWordClassFullName2Abbr(vocabulary.partOfSpeech)}
            meaning={vocabulary.meaning}
            audio={vocabulary.pronunciationAudio || undefined}
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
