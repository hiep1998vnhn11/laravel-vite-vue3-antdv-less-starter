import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import { TooltipProps } from 'ant-design-vue/es/tooltip/Tooltip'
import { RoleEnum } from '/@/enums/roleEnum'
export interface ActionItem extends ButtonProps {
  onClick?: Fn
  label?: string
  color?: 'success' | 'error' | 'warning'
  icon?: string
  popConfirm?: PopConfirm
  disabled?: boolean
  divider?: boolean
  auth?: RoleEnum | RoleEnum[] | string | string[]
  ifShow?: boolean | ((action: ActionItem) => boolean)
  tooltip?: string | TooltipProps
}

export interface PopConfirm {
  title: string
  okText?: string
  cancelText?: string
  confirm: Fn
  cancel?: Fn
  icon?: string
}
