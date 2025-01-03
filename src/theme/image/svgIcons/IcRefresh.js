import React from 'react';
import Svg, {Path} from 'react-native-svg';

import {size} from '../../Size';
import {color} from '../../Colors';

export const Refresh = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(23)}
      height={props.height ?? size.moderateScale(23)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 21A9 9 0 015.292 6L8 3m4 0a9 9 0 016.708 15L16 21M3 3h5m0 0v5m13 13h-5m0 0v-5"
        stroke={props.stroke ?? color.mostlyBlack}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
