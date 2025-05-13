import { Box, Button, Stack, Typography } from "@mui/material";
import Content from "../../../components/layout/Content";
import Folder from "./Folder";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFolders } from "../api/user-folder";
import { useState } from "react";
import { CreateNewFolder } from "@mui/icons-material";
import NewWordFolderModal from "./NewFolderModal";

const PersonalWordFolderPage = () => {
  const queryClient = useQueryClient();

  const { data: folders } = useQuery({
    queryKey: ["userFolders"],
    queryFn: getUserFolders,
  });

  const [openNewModal, setOpenNewModal] = useState(false);
  return (
    <Content withoutFooter>
      <Box sx={{ maxWidth: "878px", mx: "auto", padding: "27px 15px 48px" }}>
        {/* help info */}
        <Box
          sx={{
            padding: "20px 20px 20px 25px",
            backgroundColor: "#ff4b4b",
            borderRadius: "14px",
            color: "white",
          }}
        >
          <Typography
            variant="inherit"
            sx={{ fontSize: "24px", fontWeight: "bold" }}
          >
            Pin word
          </Typography>
          <Typography variant="inherit" sx={{ fontSize: "15px", marginTop: 1 }}>
            A tool to help you create, pin and learn English vocabulary.
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ my: "40px" }}
        >
          <Typography variant="h4" sx={{ fontSize: "25px", marginTop: 1 }}>
            My word folders
            <Typography
              component="span"
              sx={{
                minWidth: "30px",
                display: "inline-block",
                borderRadius: "30px",
                textAlign: "center",
                marginLeft: "10px",
                fontWeight: "500",
                color: "#63a406",
                backgroundColor: "#BFF199",
              }}
            >
              {folders?.length || 0}
            </Typography>
          </Typography>

          <Button
            startIcon={<CreateNewFolder />}
            onClick={() => setOpenNewModal(!openNewModal)}
          >
            New folder
          </Button>
        </Stack>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {folders
            ? folders.map((folder) => (
                <Folder
                  id={folder.id}
                  name={folder.name}
                  pinnedWords={folder?.words?.length || 0}
                  thumbnail={folder?.words?.[0]?.thumbnail}
                />
              ))
            : "You haven't created a vocabulary yet, create a word folder to save the vocabulary you want to learn."}
        </Box>
      </Box>
      <NewWordFolderModal
        open={openNewModal}
        onClose={() => setOpenNewModal(false)}
        onCreated={
          () => queryClient.invalidateQueries({ queryKey: ["userFolders"] }) // refetch to update folder list
        }
      />
    </Content>
  );
};

export default PersonalWordFolderPage;
