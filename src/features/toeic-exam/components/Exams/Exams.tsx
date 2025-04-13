import { Outlet } from "react-router-dom";
import Content from "../../../../components/layout/Content";

const Exams = () => {
  return (
    <Content>
      <Outlet />
    </Content>
  );
};

export default Exams;
