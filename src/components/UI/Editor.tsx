import { Editor as TinyMCEEditor, IAllProps } from "@tinymce/tinymce-react";

const Editor: React.FC<IAllProps> = (props) => {
  return (
    <TinyMCEEditor
      apiKey={import.meta.env.VITE_TINY_KEY}
      init={{
        height: 200,
        width: "100%",
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
      }}
      {...props}
    />
  );
};

export default Editor;
