import RoundedInput, {
  RoundedInputProps,
} from "../../../../components/UI/RoundedInput";
import { IconButton } from "@mui/material";
import { Upload } from "@mui/icons-material";
import useFileInput from "../../../../hooks/useFileInput";
import { UseFormRegisterReturn } from "react-hook-form";

interface FileInputProps {
  register: UseFormRegisterReturn; // react-hook-form register
  iconButton?: React.ReactNode;
  onChangeFile?: (newFileSrc: string) => void;
  defaultFileSrc?: string;
  // iconPosition: "start" | "end";
}

const RoundedFileInput: React.FC<RoundedInputProps & FileInputProps> = ({
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
        ref={async (e) => {
          register.ref(e); // Register input with React Hook Form
          fileInputRef.current = e; // Store ref in imageInputRef
        }}
        onChange={(e) => {
          console.log("Change files: ", e.target.files);
          register.onChange(e); // Call React Hook Form onChange to update form state

          handleChangeFileInput(e, (newFileSrc) => {
            onChangeFile?.(newFileSrc);
          });
        }}
        style={{ display: "none" }}
      />
      <RoundedInput
        readOnly
        endAdornment={
          <IconButton onClick={chooseFile}>{iconButton}</IconButton>
        }
        value={fileName}
        {...props}
      />
    </div>
  );
};

export default RoundedFileInput;
