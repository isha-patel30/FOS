import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {color} from '../../Colors';
import {size} from '../../Size';

export const Minus = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(20)}
      height={props.height ?? size.moderateScale(20)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2 12a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1z"
        fill={props.fill ?? color.mostlyBlack}
      />
    </Svg>
  );
};
