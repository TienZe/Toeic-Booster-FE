export enum AnimationType {
  EnterRight = "enterRight",
  EnterLeft = "enterLeft",
  ExitRight = "exitRight",
  ExitLeft = "exitLeft",
}

type FlashCardCompositionAnimationType = AnimationType | undefined;

export default FlashCardCompositionAnimationType;
