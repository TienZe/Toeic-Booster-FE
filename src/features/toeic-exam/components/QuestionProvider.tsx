import React, {
  createContext,
  useRef,
  useContext,
  ReactNode,
  MutableRefObject,
} from "react";

// Define the context value type
interface QuestionContextType {
  questionRefs: MutableRefObject<HTMLDivElement[][][]>;
  scrollToQuestion: (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => void;
}

// Create the context with an initial undefined value
const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined,
);

interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider: React.FC<QuestionProviderProps> = ({
  children,
}) => {
  const questionRefs = useRef<HTMLDivElement[][][]>([]);

  const scrollToQuestion = (
    part: number,
    groupIndex: number,
    questionIndex: number,
  ) => {
    setTimeout(() => {
      questionRefs.current[part]?.[groupIndex]?.[questionIndex]?.scrollIntoView(
        {
          behavior: "smooth",
          block: "center",
        },
      );
    }, 300);
  };

  return (
    <QuestionContext.Provider value={{ questionRefs, scrollToQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = (): QuestionContextType => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error(
      "useQuestionContext must be used within a QuestionProvider",
    );
  }
  return context;
};
