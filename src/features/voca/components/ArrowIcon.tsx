import { SvgIcon, SvgIconProps } from "@mui/material";

const ArrowIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="63"
        height="69"
        viewBox="0 0 63 69"
        // fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="31.5"
          transform="matrix(-1 0 0 1 31.5 37.1541)"
          fill="#E5E5E5"
        ></circle>
        <circle
          r="30.5"
          transform="matrix(-1 0 0 1 31.5 31.5)"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="2"
        ></circle>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.4314 43.5132C34.2299 44.7264 32.282 44.7264 31.0804 43.5132C29.879 42.3 29.879 40.333 31.0804 39.1198L35.5648 34.5917L20.0388 34.5917C18.3396 34.5917 16.9621 33.2008 16.9621 31.4851C16.9621 29.7694 18.3396 28.3785 20.0388 28.3785L35.5352 28.3785L31.0804 23.8802C29.879 22.6671 29.879 20.7001 31.0804 19.4869C32.282 18.2736 34.2299 18.2736 35.4314 19.4869L45.138 29.2881C45.7423 29.8983 46.0429 30.7023 46.039 31.5C46.0429 32.2978 45.7423 33.1017 45.138 33.7119L35.4314 43.5132Z"
          fill="currentColor"
        ></path>
      </svg>
    </SvgIcon>
  );
};

export default ArrowIcon;
