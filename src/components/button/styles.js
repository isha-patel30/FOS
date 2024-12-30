import {color, fonts, fontSize, size} from '../../theme';

export const mainView = () => ({
  flexDirection: 'row',
  backgroundColor: color.primary,
  height: size.moderateScale(35),
  paddingHorizontal: size.moderateScale(20),
  borderRadius: size.moderateScale(8),
  elevation: size.moderateScale(10),
  shadowColor: color.primary,
  shadowOpacity: 0.5,
  shadowRadius: size.moderateScale(2),
  shadowOffset: {width: size.moderateScale(2), height: size.moderateScale(2)},
  justifyContent: 'center',
  alignItems: 'center',
  gap: size.moderateScale(5),
});

export const btnText = () => ({
  color: color.white,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.myriadProBoldSemiExtended,
  letterSpacing: size.moderateScale(0.8),
});

export const iconView = () => ({
  color: color.white,
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.myriadProSemiboldSemiExtended,
  letterSpacing: size.moderateScale(0.8),
});
