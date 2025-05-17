import { Alert, Box, Stack, Typography } from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../components/UI/CustomModal";
import StarIcon from "./StarIcon";
import { useEffect, useState } from "react";
import RoundedInput from "../../../components/UI/RoundedInput";
import BoldStrokeButton from "./BoldStrokeButton";
import { useMutation } from "@tanstack/react-query";
import { postVocaSetRating } from "../api/voca-domain";
import { PostVocaSetRatingRequest } from "../types/VocaSetRequest";
import { toast } from "react-toastify";

interface VocaSetRatingModalProps extends CustomModalProps {
  vocaSetId: string;
  onPosted?: () => void;
}

type ValidateError = {
  message: string;
  field: "rating" | "ratingContent";
};

const VocaSetRatingModal: React.FC<VocaSetRatingModalProps> = ({
  vocaSetId,
  onPosted,
  ...customModalProps
}) => {
  const [rate, setRate] = useState(0);
  const [isSet, setIsSet] = useState(false);

  const [review, setReview] = useState("");
  const [validateError, setValidateError] = useState<ValidateError | null>(
    null,
  );

  const postReviewMutation = useMutation({
    mutationFn: postVocaSetRating,
    onSuccess: () => {
      customModalProps.onClose?.();
      onPosted?.();

      toast(
        <p style={{ textAlign: "center" }}>
          Thank you, we really appreciate your review!
        </p>,
        {
          position: "bottom-center",
          hideProgressBar: true,
          autoClose: 3000,
        },
      );
    },
    onError: (error: { message: string }) => {
      if (error.message == "Rating already exists") {
        setValidateError({
          field: "rating",
          message: "You have already rated this set",
        });
      }
    },
    onSettled: () => {
      postReviewMutation.reset();
    },
  });

  const handleHoverStarIcon = (index: number) => {
    setRate(index);
    setIsSet(false);
  };

  const handleMouseLeaveStarIcon = () => {
    if (!isSet) {
      setRate(0);
    }
  };

  const handleClickStarIcon = () => {
    setIsSet(true);

    if (validateError && validateError.field == "rating") {
      setValidateError(null);
    }
  };

  const handlePostReview = () => {
    if (!isSet) {
      setValidateError({
        field: "rating",
        message: "Please set your satisfaction level (1 - 5 stars)",
      });
      return;
    }

    if (!review) {
      setValidateError({
        field: "ratingContent",
        message: "Please write down your review",
      });
      return;
    }

    const request: PostVocaSetRatingRequest = {
      collectionId: vocaSetId,
      rate,
      personalMessage: review,
    };

    postReviewMutation.mutate(request);
  };

  useEffect(() => {
    // reset state when modal is closed
    if (!customModalProps.open) {
      setRate(0);
      setIsSet(false);
      setReview("");
      setValidateError(null);
    }
  }, [customModalProps.open, setRate, setIsSet, setReview, setValidateError]);

  return (
    <CustomModal
      containerSx={{ "& .MuiPaper-root": { borderRadius: "15px" } }}
      {...customModalProps}
    >
      <Box sx={{ width: "750px", minHeight: "400px" }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            padding: "20px",
            paddingTop: "50px",
            borderBottom: "1px solid #ddd",
          }}
        >
          Submit your review
        </Typography>

        <Box sx={{ padding: "10px 50px 25px" }}>
          {validateError && (
            <Alert severity="error">{validateError.message}</Alert>
          )}
          <Box>
            <Typography
              sx={{ fontSize: "15px", textAlign: "center", my: "10px" }}
              color="secondary.dark"
            >
              Satisfaction level
            </Typography>

            <Stack
              direction="row"
              spacing={0.25}
              justifyContent="center"
              sx={{ marginBottom: 1 }}
            >
              <StarIcon
                active={rate >= 1}
                sx={{ fontSize: "37px" }}
                onMouseEnter={() => handleHoverStarIcon(1)}
                onMouseLeave={handleMouseLeaveStarIcon}
                onClick={handleClickStarIcon}
              />
              <StarIcon
                active={rate >= 2}
                sx={{ fontSize: "37px" }}
                onMouseEnter={() => handleHoverStarIcon(2)}
                onMouseLeave={handleMouseLeaveStarIcon}
                onClick={handleClickStarIcon}
              />
              <StarIcon
                active={rate >= 3}
                sx={{ fontSize: "37px" }}
                onMouseEnter={() => handleHoverStarIcon(3)}
                onMouseLeave={handleMouseLeaveStarIcon}
                onClick={handleClickStarIcon}
              />
              <StarIcon
                active={rate >= 4}
                sx={{ fontSize: "37px" }}
                onMouseEnter={() => handleHoverStarIcon(4)}
                onMouseLeave={handleMouseLeaveStarIcon}
                onClick={handleClickStarIcon}
              />
              <StarIcon
                active={rate >= 5}
                sx={{ fontSize: "37px" }}
                onMouseEnter={() => handleHoverStarIcon(5)}
                onMouseLeave={handleMouseLeaveStarIcon}
                onClick={handleClickStarIcon}
              />
            </Stack>

            <RoundedInput
              label="Write down your review"
              placeholder="Your review..."
              gap={0.5}
              multiline
              rows={4}
              borderRadius={4}
              inputSx={{
                border: "1px solid #ddd",
                backgroundColor: "#F6F6F6",
                "&.Mui-focused": { backgroundColor: "inherit" },
                "& fieldset": { borderWidth: "none" },
              }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              error={
                validateError ? validateError.field == "ratingContent" : false
              }
            />

            <BoldStrokeButton
              variant="contained"
              sx={{ margin: "20px auto", maxWidth: "323px", display: "block" }}
              onClick={handlePostReview}
              disabled={postReviewMutation.isPending}
            >
              {postReviewMutation.isPending ? "Please wait..." : "Send"}
            </BoldStrokeButton>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default VocaSetRatingModal;
