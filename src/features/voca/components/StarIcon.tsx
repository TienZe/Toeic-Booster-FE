import { SvgIcon, SvgIconProps } from "@mui/material";

const StarIcon: React.FC<{ active?: boolean } & SvgIconProps> = ({
  active = false,
  ...props
}) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="6440px"
        width="24.376px"
        height="23.36px"
        viewBox="0 0 24.376 23.36"
        enableBackground="new 0 0 24.376 23.36"
        // xml:space="preserve"
      >
        <path
          fill={active ? "#FFC107" : "#AFAFAF"}
          d="M24.313,8.828c-0.159-0.494-0.598-0.845-1.115-0.892l-7.036-0.639L13.38,0.786   C13.174,0.309,12.707,0,12.188,0s-0.986,0.309-1.191,0.787L8.215,7.298L1.178,7.937C0.661,7.984,0.224,8.334,0.063,8.828   c-0.16,0.493-0.012,1.034,0.379,1.376l5.318,4.664l-1.568,6.907c-0.115,0.508,0.083,1.033,0.504,1.338   c0.227,0.164,0.492,0.247,0.759,0.247c0.23,0,0.459-0.063,0.664-0.185l6.069-3.628l6.067,3.628c0.443,0.267,1.004,0.242,1.424-0.063   c0.422-0.306,0.619-0.831,0.504-1.338l-1.568-6.907l5.318-4.663C24.323,9.862,24.473,9.322,24.313,8.828L24.313,8.828z"
        />
      </svg>
    </SvgIcon>
  );
};

export default StarIcon;
