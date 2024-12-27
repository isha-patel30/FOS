import {color, fonts, fontSize, size} from '../../theme';

export const mainView = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: size.moderateScale(50),
  backgroundColor: color.white,
  elevation: size.moderateScale(10),
  shadowColor: color.darkGray,
  shadowOpacity: 0.5,
  shadowRadius: size.moderateScale(10),
  shadowOffset: {width: size.moderateScale(2), height: size.moderateScale(2)},
});

export const iconView = () => ({
  width: size.moderateScale(40),
  height: size.moderateScale(50),
  alignItems: 'center',
  justifyContent: 'center',
});

export const headerTextView = icon => ({
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingHorizontal: icon ? null : size.moderateScale(10),
});

export const headerText = () => ({
  fontSize: fontSize.middleMedium,
  fontFamily: fonts.myriadProBold,
  color: color.secondary,
  letterSpacing: size.moderateScale(0.7),
});
