import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

import {color} from '../../Colors';
import {size} from '../../Size';

export const Filter = props => {
  return (
    <Svg
      width={props.width ?? size.moderateScale(23)}
      height={props.height ?? size.moderateScale(23)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 7a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm3 5a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z"
        fill={props.fill ?? color.mostlyBlack}
      />
    </Svg>
  );
};
