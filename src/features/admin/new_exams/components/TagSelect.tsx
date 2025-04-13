import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

interface TagSelectProps {
  labels: string[]; // Danh sách tên tag (labels)
  values: string[]; // Danh sách giá trị tag (values) tương ứng với labels
  selectedValue: string; // Giá trị tag đang được chọn (ID của tag)
  onChange: (value: string) => void; // Hàm xử lý thay đổi giá trị
  sx?: React.CSSProperties; // Tùy chọn cho style của Select
}

const TagSelect: React.FC<TagSelectProps> = ({
  labels,
  values,
  selectedValue,
  onChange,
  sx,
}) => {
  return (
    <FormControl fullWidth sx={sx}>
      <Select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        size="small"
      >
        {values.map((value, index) => (
          <MenuItem key={value} value={value}>
            {labels[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSelect;
