import {color, fonts, fontSize, size} from '../../theme';

export const scrollStyle = () => ({
  flexGrow: 1,
  marginTop: size.moderateScale(40),
  marginHorizontal: size.moderateScale(30),
  paddingBottom: size.moderateScale(100),
});

export const header = () => ({
  elevation: size.moderateScale(10),
});

export const buttonView = () => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: size.moderateScale(20),
  paddingBottom: size.moderateScale(10),
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
});

export const labelTextInfo = () => ({
  fontSize: fontSize.verySmallMedium,
  fontFamily: fonts.latoRegular,
  color: color.mostlyBlack,
});

export const orderTableBody = () => ({
  borderColor: color.borderColor,
  borderWidth: size.moderateScale(1),
});

export const tableHeader = () => ({
  backgroundColor: color.lightestGray,
  flexDirection: 'row',
  borderBottomColor: color.borderColor,
  borderBottomWidth: size.moderateScale(1),
});

export const itemsViewHeader = () => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth: size.moderateScale(1),
  paddingVertical: size.moderateScale(10),
  borderRightColor: color.borderColor,
  paddingHorizontal: size.moderateScale(10),
});

export const portionViewHeader = () => ({
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: size.moderateScale(10),
});

export const tableTitle = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
});

export const tableBody = () => ({});

export const subHeader = () => ({
  backgroundColor: color.gray,
  paddingVertical: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(10),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const categoryText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
});

export const categoryItemCount = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
});

export const listItem = () => ({
  flexDirection: 'row',
  backgroundColor: color.white,
  minHeight: size.moderateScale(50),
});

export const itemsViewBody = () => ({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  minHeight: size.moderateScale(50),
  paddingVertical: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(10),
  borderRightWidth: size.moderateScale(1),
  borderRightColor: color.borderColor,
  borderBottomWidth: size.moderateScale(1),
  borderBottomColor: color.borderColor,
});

export const itemDetails = () => ({
  gap: size.moderateScale(5),
  justifyContent: 'flex-start',
});

export const foodItem = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
});
export const foodDetailItem = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.latoRegular,
  color: color.mostlyBlack,
});

export const checkBoxView = () => ({
  width: size.moderateScale(30),
});

export const portionViewBody = () => ({
  flex: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: size.moderateScale(10),
  flexDirection: 'row',
  gap: size.moderateScale(8),
  borderBottomWidth: size.moderateScale(1),
  borderBottomColor: color.borderColor,
});

export const iconview = () => ({
  width: size.moderateScale(20),
  height: size.moderateScale(20),
  backgroundColor: color.mostlyWhite,
  alignItems: 'center',
  justifyContent: 'center',
});

export const quantityTextView = () => ({
  width: size.moderateScale(40),
});

export const quantityText = () => ({
  fontSize: fontSize.small,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
  textAlign: 'center',
});

export const totalQuantityView = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRightWidth: size.moderateScale(1),
  borderRightColor: color.borderColor,
  paddingVertical: size.moderateScale(10),
  paddingHorizontal: size.moderateScale(10),
});

export const totalPortionView = () => ({
  flex: 0.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingVertical: size.moderateScale(10),
  gap: size.moderateScale(10),
});

export const tableBottomView = () => ({
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth: size.moderateScale(1),
  borderTopColor: color.borderColor,
});

export const tableBottomText = () => ({
  fontSize: fontSize.littleMedium,
  fontFamily: fonts.latoBlack,
  color: color.mostlyBlack,
  paddingRight: size.moderateScale(10),
});
