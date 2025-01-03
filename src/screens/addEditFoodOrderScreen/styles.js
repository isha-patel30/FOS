import {color, fonts, fontSize, size} from '../../theme';

export const header = () => ({
  elevation: size.moderateScale(10),
});

export const scrollStyle = () => ({
  flexGrow: 1,
  marginTop: size.moderateScale(40),
  marginHorizontal: size.moderateScale(30),
  paddingBottom: size.moderateScale(100),
});

export const orderTable = () => ({
  width: '100%',
  backgroundColor: color.white,
  paddingVertical: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(5),
  borderRadius: size.moderateScale(8),
});

export const orderTableHeader = () => ({
  width: '100%',
  paddingVertical: size.moderateScale(10),
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: size.moderateScale(10),
  gap: size.moderateScale(20),
});

export const dropdownView = () => ({
  borderWidth: size.moderateScale(0),
  borderBottomWidth: size.moderateScale(1),
  width: size.moderateScale(200),
  flex: 1,
  height: size.moderateScale(40),
});

export const nameView = () => ({
  flex: 1,
  justifyContent: 'space-between',
});

export const labelTextTitle = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
  position: 'absolute',
  left: size.moderateScale(10),
});

export const labelTextInfo = () => ({
  fontSize: fontSize.verySmallMedium,
  fontFamily: fonts.latoRegular,
  color: color.mostlyBlack,
});
