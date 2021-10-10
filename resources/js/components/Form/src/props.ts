import type { FieldMapToTime, FormSchema } from './types/form'
import type { CSSProperties, PropType } from 'vue'
import type { ColEx } from './types'
import type { TableActionType } from '/@/components/Table'
import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import type { RowProps } from 'ant-design-vue/lib/grid/Row'
import { propTypes } from '/@/utils/propTypes'

export const basicProps = {
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 0,
  },
  fieldMapToTime: {
    type: Array as PropType<FieldMapToTime>,
    default: () => [],
  },
  compact: propTypes.bool,
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  mergeDynamicData: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
  },
  baseColProps: {
    type: Object as PropType<Partial<ColEx>>,
  },
  autoSetPlaceHolder: propTypes.bool.def(true),
  autoSubmitOnEnter: propTypes.bool.def(false),
  submitOnReset: propTypes.bool,
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  disabled: propTypes.bool,
  emptySpan: {
    type: [Number, Object] as PropType<number>,
    default: 0,
  },
  showAdvancedButton: propTypes.bool,
  transformDateFunc: {
    type: Function as PropType<Fn>,
    default: (date: any) => {
      return date._isAMomentObject ? date?.format('YYYY-MM-DD HH:mm:ss') : date
    },
  },
  rulesMessageJoinLabel: propTypes.bool.def(true),
  autoAdvancedLine: propTypes.number.def(3),
  showActionButtonGroup: propTypes.bool.def(true),
  actionColOptions: Object as PropType<Partial<ColEx>>,
  showResetButton: propTypes.bool.def(true),
  autoFocusFirstItem: propTypes.bool,
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  showSubmitButton: propTypes.bool.def(true),
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  resetFunc: Function as PropType<() => Promise<void>>,
  submitFunc: Function as PropType<() => Promise<void>>,

  hideRequiredMark: propTypes.bool,

  labelCol: Object as PropType<Partial<ColEx>>,

  layout: propTypes
    .oneOf(['horizontal', 'vertical', 'inline'])
    .def('horizontal'),
  tableAction: {
    type: Object as PropType<TableActionType>,
  },

  wrapperCol: Object as PropType<Partial<ColEx>>,

  colon: propTypes.bool,

  labelAlign: propTypes.string,

  rowProps: Object as PropType<RowProps>,
}
