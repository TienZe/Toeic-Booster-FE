import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const ExamDateIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="32"
        height="31"
        viewBox="0 0 32 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.0417 7.75H6.95833C5.5316 7.75 4.375 8.9066 4.375 10.3333V24.5417C4.375 25.9684 5.5316 27.125 6.95833 27.125H25.0417C26.4684 27.125 27.625 25.9684 27.625 24.5417V10.3333C27.625 8.9066 26.4684 7.75 25.0417 7.75Z"
          stroke="#54565A"
          strokeWidth="2"
        />
        <path
          d="M4.375 12.9167C4.375 10.4806 4.375 9.26383 5.13192 8.50692C5.88883 7.75 7.10558 7.75 9.54167 7.75H22.4583C24.8944 7.75 26.1112 7.75 26.8681 8.50692C27.625 9.26383 27.625 10.4806 27.625 12.9167H4.375Z"
          fill="#54565A"
        />
        <path
          d="M9.54167 3.875V7.75M22.4583 3.875V7.75"
          stroke="#54565A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default ExamDateIcon;
