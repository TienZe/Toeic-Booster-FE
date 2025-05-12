import { Checkbox, Stack, Typography } from "@mui/material";
import { Image } from "./UI/Image";
import { vocaWordClassFullName2Abbr } from "../utils/helper";

interface WordSelectItemProps {
  word: string;
  partOfSpeech: string;
  image: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

const WordSelectItem = ({
  word,
  partOfSpeech,
  image,
  checked,
  onChange,
}: WordSelectItemProps) => {
  return (
    <Stack
      sx={{
        py: "15px",
        pl: "15px",
        pr: "25px",
        border: "2px solid #E5E5E5",
        borderBottom: "6px solid #E5E5E5",
        borderColor: checked ? "primary.main" : "#E5E5E5",
        borderColorBottom: checked ? "primary.dark" : "#E5E5E5",
        borderRadius: "15px",
      }}
      direction="row"
      alignItems="center"
      onClick={() => {
        onChange?.(!checked);
      }}
    >
      <Image
        src={image}
        sx={{ width: "76px", height: "76px", objectFit: "cover" }}
      />

      <Typography
        fontSize="18px"
        color="#777777"
        sx={{ ml: 1, fontWeight: 500 }}
      >
        {word} ({vocaWordClassFullName2Abbr(partOfSpeech)})
      </Typography>

      <Checkbox
        sx={{ ml: "auto" }}
        checked={checked}
        // onChange={(e) => onChange?.(e.target.checked)}
      />
    </Stack>
  );
};

export default WordSelectItem;
