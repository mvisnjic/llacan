import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Pomes = () => (
  <Svg width={40} height={40} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 1C4.858 1 1.5 3.246 1.5 7.25C1.5 7.2795 1.526 7.629 1.5625 8.0045C1.6955 7.9975 9 14 9 14C9 14 16.3035 7.997 16.4355 8.004C16.4605 7.757 16.5 7.2885 16.5 7.25C16.5 3.246 13.142 1 9 1Z"
      fill="#BE1931"
    />
    <Path
      d="M15.083 5.7545C14.9234 5.73664 14.7624 5.77103 14.624 5.8525C14.6225 5.6365 14.5945 5.447 14.523 5.3005L14.711 4.7365C14.7739 4.54786 14.7592 4.34198 14.6704 4.16412C14.5815 3.98626 14.4256 3.85097 14.237 3.788C14.0685 3.73158 13.8852 3.73798 13.721 3.806C13.675 3.62955 13.5658 3.4761 13.4142 3.37474C13.2627 3.27337 13.0792 3.23113 12.8985 3.256C12.8388 3.26483 12.7803 3.28095 12.7245 3.304C12.6791 3.13716 12.5774 2.99113 12.4367 2.89059C12.296 2.79005 12.125 2.74118 11.9524 2.75223C11.7798 2.76329 11.6164 2.83359 11.4897 2.95125C11.363 3.06892 11.2808 3.22673 11.257 3.398L11.1 4.551C11.0255 4.44974 10.9265 4.36909 10.8123 4.31661C10.698 4.26413 10.5723 4.24155 10.447 4.251C10.2946 4.26207 10.1493 4.3195 10.0305 4.41558C9.9117 4.51167 9.82516 4.6418 9.7825 4.7885L9.746 4.4245C9.72524 4.22855 9.62815 4.04866 9.47574 3.92376C9.32333 3.79886 9.12787 3.73901 8.93166 3.75715C8.73545 3.77529 8.55428 3.86997 8.42736 4.0207C8.30044 4.17142 8.23798 4.36607 8.2535 4.5625L8.2435 4.5675C8.25588 4.43896 8.23476 4.30941 8.18218 4.19147C8.12961 4.07352 8.04737 3.97121 7.9435 3.8945L7.735 2.8525C7.69601 2.65743 7.58113 2.48584 7.41563 2.37548C7.25013 2.26511 7.04756 2.22501 6.8525 2.264C6.65743 2.30299 6.48584 2.41787 6.37548 2.58337C6.26511 2.74887 6.22501 2.95143 6.264 3.1465L6.623 4.942L6.432 5.7445L5.705 3.7435C5.67131 3.65092 5.61972 3.56588 5.55317 3.49323C5.48663 3.42059 5.40642 3.36176 5.31714 3.32012C5.13682 3.23601 4.93048 3.22697 4.7435 3.295C4.55652 3.36303 4.40422 3.50255 4.32011 3.68286C4.236 3.86318 4.22697 4.06952 4.295 4.2565L4.849 5.78C4.6765 5.898 4.552 6.085 4.526 6.309L4.4035 7.3585L4.24 6.377C4.20525 6.18271 4.09532 6.00995 3.93404 5.89618C3.77276 5.78241 3.57314 5.7368 3.37845 5.76924C3.18377 5.80167 3.00972 5.90954 2.89404 6.06946C2.77836 6.22937 2.73038 6.42844 2.7605 6.6235L3.5355 11.273H15.188C15.2125 11.212 15.746 6.583 15.746 6.583C15.7678 6.38525 15.7102 6.18694 15.5859 6.03161C15.4616 5.87628 15.2807 5.77662 15.083 5.7545Z"
      fill="#F4900C"
    />
    <Path
      d="M13.743 3.89849C13.7385 3.86649 13.729 3.83699 13.721 3.80649C13.675 3.63004 13.5659 3.47659 13.4143 3.37523C13.2627 3.27386 13.0792 3.23161 12.8985 3.25649C12.8388 3.26532 12.7804 3.28144 12.7245 3.30449C12.5686 3.36569 12.4378 3.47747 12.3531 3.6219C12.2683 3.76633 12.2345 3.93504 12.257 4.10099L13.235 11.2725H14.749L13.743 3.89849ZM11.248 4.94649C11.2374 4.80331 11.1859 4.6662 11.0995 4.55149C11.025 4.45023 10.926 4.36958 10.8118 4.3171C10.6976 4.26462 10.5719 4.24204 10.4465 4.25149C10.2942 4.26256 10.1488 4.31999 10.03 4.41607C9.91124 4.51215 9.8247 4.64229 9.78203 4.78899C9.75617 4.87446 9.74584 4.96387 9.75153 5.05299L10.191 11.209L10.1955 11.2725H11.7L11.699 11.259L11.248 4.94649ZM5.35753 5.65049C5.178 5.63041 4.99729 5.67626 4.84903 5.77949C4.67653 5.89749 4.55203 6.08449 4.52603 6.30849L3.94653 11.273H5.45653L6.01553 6.48249C6.02697 6.38465 6.01902 6.28552 5.99213 6.19076C5.96525 6.096 5.91997 6.00746 5.85887 5.9302C5.79776 5.85294 5.72204 5.78847 5.63602 5.74048C5.55 5.69248 5.45537 5.66191 5.35753 5.65049ZM7.73553 2.85299C7.69655 2.65792 7.58167 2.48633 7.41617 2.37597C7.25066 2.2656 7.0481 2.2255 6.85303 2.26449C6.65797 2.30348 6.48638 2.41835 6.37601 2.58386C6.26565 2.74936 6.22555 2.95192 6.26453 3.14699L7.88953 11.273H9.41903L7.73553 2.85299Z"
      fill="#FFCC4D"
    />
    <Path
      d="M14.5 8.49999C14.5 9.88099 12.3135 11 9 11C5.6865 11 3.5 9.88099 3.5 8.49999C3.5 7.94799 2.552 7.99999 2 7.99999C1.842 7.99999 1.6955 7.9975 1.5625 8.0045C1.593 8.322 2.5 15.5 2.5 15.5C2.5 16.0304 2.71071 16.5391 3.08579 16.9142C3.46086 17.2893 3.96957 17.5 4.5 17.5H13.5C14.0304 17.5 14.5391 17.2893 14.9142 16.9142C15.2893 16.5391 15.5 16.0304 15.5 15.5C15.5 15.5 16.429 8.06799 16.4355 8.00399C16.3035 7.99699 16.157 7.99999 16 7.99999C15.448 7.99999 14.5 7.94799 14.5 8.49999Z"
      fill="#DD2E44"
    />
    <Path
      d="M9 16C10.1046 16 11 15.1046 11 14C11 12.8954 10.1046 12 9 12C7.89543 12 7 12.8954 7 14C7 15.1046 7.89543 16 9 16Z"
      fill="#BE1931"
    />
  </Svg>
);

export default Pomes;
