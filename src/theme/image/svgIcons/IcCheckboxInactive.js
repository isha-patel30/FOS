import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

import {color} from '../../Colors';
import {size} from '../../Size';

export const CheckBoxInactive = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(15)}
      height={props.height ?? size.moderateScale(15)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        x={1}
        y={1}
        width={props.width ?? 18}
        height={props.height ?? 18}
        rx={3}
        stroke={props.fill ?? color.darkGray}
        strokeWidth={2}
      />
    </Svg>
  );
};
