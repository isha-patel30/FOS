import {color, fonts, fontSize, size} from '../../theme';

export const scrollScreen = () => ({
  flexGrow: 1,
});

export const mainView = () => ({
  flex: 1,
});

export const refreshIconView = () => ({
  marginVertical: size.moderateScale(10),
  position: 'absolute',
  right: size.moderateScale(20),
  backgroundColor: color.primary,
  paddingHorizontal: size.moderateScale(10),
  paddingVertical: size.moderateScale(10),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: size.moderateScale(15),
  flexDirection: 'row',
  gap: size.moderateScale(10),
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

export const bodyText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.myriadProSemiboldSemiExtended,
  color: color.white,
});
