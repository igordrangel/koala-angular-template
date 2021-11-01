export interface KoalaListBtnCollapseSubListConfigInterface<DataType> {
  koalaIcon?: boolean;
  tooltip?: string;
  backgroundColor?: string;
  iconColor?: string;
  icon: string;
  show: (itemLine: DataType) => boolean;
}
