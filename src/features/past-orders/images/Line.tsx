import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Line(props: any) {
  return (
    <Svg
      width={8}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="m1 1 5 5-5 5" stroke="#070707" strokeWidth={1.5} />
    </Svg>
  );
}

export default Line;
