import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

import {color} from '../../Colors';
import {size} from '../../Size';

export const CheckBoxActive = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(15)}
      height={props.height ?? size.moderateScale(15)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        width={20}
        height={20}
        rx={4}
        fill={props.fill ?? color.secondary}
      />
      <Path
        d="M6.767 13.468L3.21 9.736 2 10.998 6.767 16 17 5.262 15.798 4l-9.031 9.468z"
        fill={color.white}
      />
    </Svg>
  );
};
