import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage.tsx";
import RegisterPage from "./features/auth/pages/RegisterPage.tsx";
import AuthLayout from "./features/auth/components/AuthLayout.tsx";
import Detail from "./features/toeic-exam/components/Detail/Detail.tsx";
import HomePage from "./features/home/components/HomePage.tsx";
import ForgotPasswordPage from "./features/auth/components/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./features/auth/components/ResetPasswordPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent.tsx";
import Admin from "./components/layout/admin/Admin.tsx";
import Dashboard from "./features/admin/dashboard/Dashboard.tsx";
import UserProfilePage from "./features/user-profile/components/UserProfilePage.tsx";
import VocaLibraryPage from "./features/voca/components/VocaLibraryPage.tsx";
import LearningVocaPage from "./features/voca/components/LearningVocaPage.tsx";
import VocaIndexPage from "./features/admin/vocasets/pages/VocaIndexPage.tsx";
import VocaSetDetailsPage from "./features/admin/vocasets/pages/VocaSetDetailsPage.tsx";
import LessonDetailsPage from "./features/admin/vocasets/pages/LessonDetailsPage.tsx";
import VocabularyDetailsPage from "./features/admin/vocasets/pages/VocabularyDetailsPage.tsx";
import LessonsPage from "./features/voca/components/LessonsPage.tsx";
import CreateExam from "./features/admin/new_exams/components/createExam.tsx";
import ExamsListPage from "./features/toeic-exam/components/Exams/ExamsLibraryPage.tsx";
import PartIndex from "./features/toeic-exam/components/PartIndex.tsx";
import ResultPage from "./features/toeic-exam/components/ResultPage.tsx";
import VocaPracticePage from "./features/voca/components/VocaPracticePage.tsx";
import VocaTestConfirmPage from "./features/voca/components/VocaTestConfirmPage.tsx";
import CompleteLearningLessonPage from "./features/voca/components/CompleteLearningLessonPage.tsx";
import LessonLearningResultPage from "./features/voca/components/LessonLearningResultPage.tsx";
import PartResultIndex from "./features/toeic-exam/components/PartResultIndex.tsx";
import UserHistoryPage from "./features/practice-history/components/UserHistoryPage.tsx";
import PersonalWordFolderPage from "./features/voca/components/PersonalWordFolderPage.tsx";
import FolderDetailsPage from "./features/voca/components/FolderDetailsPage.tsx";
import FolderPracticePage from "./features/voca/components/FolderPracticePage.tsx";
import ListListenGroup from "./features/listen/pages/ListListenGroup.tsx";
import ListenPractice from "./features/listen/pages/ListenPractice.tsx";

import { RoleEnum } from "./types/auth.ts";
import AccountIndexPage from "./features/admin/accounts/components/AccountIndexPage.tsx";
import WordIndexPage from "./features/admin/vocasets/pages/WordIndexPage.tsx";
import VocaLearningInstructionPage from "./features/voca/components/VocaLearningInstructionPage.tsx";
import VocaFilteringPage from "./features/voca/components/VocaFilteringPage.tsx";
import ExamIndexPage from "./features/admin/new_exams/components/ExamIndexPage.tsx";
import ToeicStatisticsPage from "./features/toeic-exam/components/ToeicStatisticsPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/account",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "exams",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <ExamsListPage />,
      },
      {
        path: ":examId",
        element: <Detail />,
      },
      {
        path: ":examId/partIndex",
        element: <PartIndex />,
      },
      {
        path: "result/:attemptId",
        element: <ResultPage />,
      },
      {
        path: "review/:attemptId",
        element: <PartResultIndex />,
      },
    ],
  },
  {
    path: "listen",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <ListListenGroup />,
      },
      {
        path: ":lessonId",
        element: <ListenPractice />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "history",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <UserHistoryPage />,
      },
    ],
  },
  {
    path: "toeic-statistics",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <ToeicStatisticsPage />,
      },
    ],
  },
  {
    path: "voca",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <VocaLibraryPage />,
      },
      {
        path: ":vocaSetId/lessons",
        element: <LessonsPage />,
      },
    ],
  },
  {
    path: "lesson",
    element: <ProtectedRoute />,
    children: [
      {
        path: "filtering",
        element: <VocaFilteringPage />,
      },
      {
        path: "learn",
        element: <LearningVocaPage />,
      },
      {
        path: "practice",
        element: <VocaPracticePage />,
      },
      {
        path: "learning-instruction",
        element: <VocaLearningInstructionPage />,
      },
      {
        path: "confirm-start-testing",
        element: <VocaTestConfirmPage />,
      },
      {
        path: "complete-learning",
        element: <CompleteLearningLessonPage />,
      },
      {
        path: "learning-result",
        element: <LessonLearningResultPage />,
      },
    ],
  },
  {
    path: "personal-word-folder",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <PersonalWordFolderPage />,
      },
      {
        path: ":folderId",
        element: <FolderDetailsPage />,
      },
      {
        path: ":folderId/practice",
        element: <FolderPracticePage />,
      },
      {
        path: ":folderId/practice-result",
        element: <LessonLearningResultPage />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRouteComponent authorizedRoles={[RoleEnum.Admin]}>
        <Admin />
      </ProtectedRouteComponent>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "exam-set",
        element: <ExamIndexPage />,
      },
      {
        path: "exam-set/:examId",
        element: <CreateExam />,
      },
      {
        path: "voca-set",
        element: <VocaIndexPage />,
      },
      {
        path: "voca-set/details",
        element: <VocaSetDetailsPage />,
      },
      {
        path: "lesson",
        element: <LessonDetailsPage />,
      },
      {
        path: "voca",
        element: <VocabularyDetailsPage />,
      },
      {
        path: "voca/create",
        element: <VocabularyDetailsPage />,
      },
      {
        path: "word",
        element: <WordIndexPage />,
      },
    ],
  },
  {
    path: "admin/account",
    element: (
      <ProtectedRouteComponent authorizedRoles={[RoleEnum.Admin]}>
        <Admin />
      </ProtectedRouteComponent>
    ),
    children: [
      {
        index: true,
        element: <AccountIndexPage />,
      },
    ],
  },
]);
