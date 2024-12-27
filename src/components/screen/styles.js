import {color} from '../../theme';

export const mainContainer = secondary => ({
  flex: 1,
  backgroundColor: secondary ?? color.lightestGray,
});

export const full = () => ({
  flexGrow: 1,
});

export const container = (style, secondary) => [
  {
    flex: 1,
    backgroundColor: secondary ?? color.lightestGray,
    overflow: 'hidden',
  },
  style,
];
