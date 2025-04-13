import { useSelector } from "react-redux";
import { RootState } from "../../../stores";

const expandedScript = useSelector(
  (state: RootState) => state.seletedScript.expandedScript,
);

export const checkScriptExpanded = (part: number, groupIndex: number) => {
  const found = expandedScript.find(
    (item) => item.part === part && item.groupIndex === groupIndex,
  );
  return found?.isExpanded ?? false;
};
