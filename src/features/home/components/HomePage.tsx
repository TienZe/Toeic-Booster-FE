import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import HeroSection from "./HeroSection";
import VocaFeatureSection from "./VocaFeatureSection";
import ExamFeatureSection from "./ExamFeatureSection";
import UserHomePage from "./UserHomePage";

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.isAuthenticated,
  );

  return (
    <>
      <Header />
      {!isAuthenticated && (
        <>
          <HeroSection />
          <VocaFeatureSection />
          <ExamFeatureSection />
        </>
      )}

      {isAuthenticated && <UserHomePage />}
      <Footer />
    </>
  );
};

export default HomePage;
