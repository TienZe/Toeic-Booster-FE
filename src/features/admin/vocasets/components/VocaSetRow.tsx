import { Menu, MenuItem, MenuList, TableCell, TableRow } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import VocaSetModel from "../../../../types/VocaSetModel";
import { Image } from "../../../../components/UI/Image";

const VocaSetRow: React.FC<{
  vocaSet: VocaSetModel;
  onDelete?: () => void;
}> = ({ vocaSet, onDelete }) => {
  const actionRef = useRef<HTMLSpanElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(actionRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          maxWidth: "50px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {vocaSet.id}
      </TableCell>
      <TableCell align="center">
        <Image
          src={vocaSet.thumbnail}
          sx={{
            width: "auto",
            height: "84px",
          }}
        />
      </TableCell>
      <TableCell>{vocaSet.name}</TableCell>
      {/* <TableCell align="center">"Test"</TableCell> */}
      <TableCell align="center">{vocaSet?.userCount}</TableCell>
      <TableCell align="center">{vocaSet?.topicsCount}</TableCell>
      <TableCell
        onClick={handleClick}
        align="center"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
          },
          textDecoration: open ? "underline" : "none",
        }}
      >
        <span ref={actionRef}>Action</span>
      </TableCell>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          transform: "translateY(10px) translateX(-20px)",
          "& .MuiList-dense": { py: 0 },
          "& a": { textDecoration: "none", color: "inherit" },
        }}
      >
        <MenuList dense>
          <Link to={`details?id=${vocaSet.id}`}>
            <MenuItem>Manage</MenuItem>
          </Link>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </TableRow>
  );
};

export default VocaSetRow;
