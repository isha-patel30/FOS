import {color, fonts, fontSize, size} from '../../theme';

export const scrollScreen = () => ({
  flexGrow: 1,
});

export const mainView = () => ({
  flex: 1,
});

export const emptyView = () => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: size.moderateScale(20),
});

export const emptyViewText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.myriadProSemiboldSemiExtended,
  color: color.mostlyBlack,
});
