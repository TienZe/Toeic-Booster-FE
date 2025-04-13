import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { Upload } from "@mui/icons-material";
import useFileInput from "../../../../hooks/useFileInput";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  register?: UseFormRegisterReturn; // react-hook-form register
  iconButton?: React.ReactNode;
  onChangeFile?: (newFileSrc: string) => void;
  defaultFileSrc?: string;
  // iconPosition: "start" | "end";
}

const TextFieldFileInput: React.FC<TextFieldProps & FileInputProps> = ({
  register,
  iconButton = <Upload />,
  onChangeFile,
  defaultFileSrc = "",
  // iconPosition = "end",
  ...props
}) => {
  const { fileInputRef, fileName, chooseFile, handleChangeFileInput } =
    useFileInput(defaultFileSrc);

  return (
    <div>
      <input
        type="file"
        {...register}
        ref={(e) => {
          register?.ref(e); // Register input with React Hook Form
          fileInputRef.current = e; // Store ref in imageInputRef
        }}
        onChange={(e) => {
          console.log("Change files: ", e.target.files);
          register?.onChange(e); // Call React Hook Form onChange to update form state

          handleChangeFileInput(e, (newFileSrc) => {
            onChangeFile?.(newFileSrc);
          });
        }}
        style={{ display: "none" }}
      />
      <TextField
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={chooseFile}>{iconButton}</IconButton>
            ),
            readOnly: true,
          },
        }}
        value={fileName}
        {...props}
      />
    </div>
  );
};

export default TextFieldFileInput;
