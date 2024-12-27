import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {color} from '../../Colors';
import {size} from '../../Size';

export const Plus = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(23)}
      height={props.height ?? size.moderateScale(23)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 12h12m-6-6v12"
        stroke={props.stroke ?? color.mostlyBlack}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
