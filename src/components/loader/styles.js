import {color, fonts, fontSize, size} from '../../theme';

export const mainView = bgColor => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: bgColor ?? 'rgba(0, 0, 0, 0.6)',
  zIndex: 10,
});

export const lottieView = () => ({
  paddingVertical: size.moderateScale(5),
  alignItems: 'center',
  backgroundColor: color.white,
  flexDirection: 'row',
  width: size.moderateScale(300),
  borderRadius: size.moderateScale(4),
  elevation: size.moderateScale(10),
  shadowColor: color.mostlyBlack,
  shadowOpacity: 0.5,
  shadowRadius: size.moderateScale(10),
  shadowOffset: {width: size.moderateScale(2), height: size.moderateScale(2)},
});

export const lottieImage = () => ({
  height: size.moderateScale(50),
  width: size.moderateScale(70),
  alignSelf: 'center',
  justifyContent: 'center',
});

export const lottieText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.myriadProBold,
  color: color.primary,
});
