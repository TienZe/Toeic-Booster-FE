import { Menu, MenuItem, MenuList, TableCell, TableRow } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import { IListenGroupModel } from "../../../listen/types/ListenGroup.type";

const ListenGroupRow: React.FC<{
  listenGroup: IListenGroupModel;
  onDelete?: () => void;
}> = ({ listenGroup, onDelete }) => {
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
        {listenGroup.id}
      </TableCell>

      <TableCell sx={{ textAlign: "center" }}>{listenGroup.name}</TableCell>
      <TableCell align="center">
        {capitalizeFirstLetter(listenGroup.level)}
      </TableCell>

      <TableCell align="center">
        {listenGroup?.listenLessons?.length || 0}
      </TableCell>
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
          <Link to={`${listenGroup.id}`}>
            <MenuItem>Manage</MenuItem>
          </Link>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </TableRow>
  );
};

export default ListenGroupRow;
