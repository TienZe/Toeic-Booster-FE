import { AddCircle } from "@mui/icons-material";
import RoundedInput, {
  RoundedInputProps,
} from "../../../../components/UI/RoundedInput";
import { IconButton, Stack } from "@mui/material";
import VocaSetTextList from "../../../voca/components/VocaSetTextList";
import DeletableListItem from "./DeletableListItem";
import { useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextListRoundedInputProps extends RoundedInputProps {
  register?: UseFormRegisterReturn;
  onUpdateValue?: (newValue: string) => void;
  defaultTextListValue?: string;
}

const TextListRoundedInput: React.FC<TextListRoundedInputProps> = ({
  register,
  onUpdateValue,
  defaultTextListValue,
  ...roundedInputProps
}) => {
  const defaultValue: string[] = defaultTextListValue
    ? defaultTextListValue.split(",")
    : [];

  const [textList, setTextList] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState("");

  // if the default value is changed, update the text list state
  useEffect(() => {
    if (defaultTextListValue) {
      setTextList(defaultTextListValue?.split(",") || []);
    }
  }, [defaultTextListValue]);

  const handleClickAdd = () => {
    if (inputValue.trim() === "") return;

    const updatedList = [...textList, inputValue];
    setTextList(updatedList);
    setInputValue("");

    onUpdateValue?.(updatedList.join(","));
  };

  const handleDeleteTextItem = (deletedIndex: number) => {
    const updatedList = textList.filter((_, index) => index !== deletedIndex);
    setTextList(updatedList);

    onUpdateValue?.(updatedList.join(","));
  };

  return (
    <Stack spacing={1}>
      <RoundedInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        multiline
        rows={2}
        endAdornment={
          <IconButton onClick={handleClickAdd} sx={{ marginTop: "-16px" }}>
            <AddCircle />
          </IconButton>
        }
        {...roundedInputProps}
      />
      {/* reuse the li style of vocaset list */}
      <VocaSetTextList sx={{ paddingLeft: 2 }}>
        {textList.map((text, index) => (
          <DeletableListItem
            key={text + "-" + index}
            onDelete={() => handleDeleteTextItem(index)}
          >
            {text}
          </DeletableListItem>
        ))}
      </VocaSetTextList>

      {/* Hidden input contains value */}
      <input type="hidden" name={register?.name} ref={register?.ref} />
    </Stack>
  );
};

export default TextListRoundedInput;
