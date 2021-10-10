// import { ComputedRef } from 'vue';
// import { ThemeEnum } from '/@/enums/appEnum';
// import { MenuModeEnum } from '/@/enums/menuEnum';
export interface MenuState {
  defaultSelectedKeys: string[]

  inlineIndent?: number

  openKeys: string[]

  selectedKeys: string[]

  collapsedOpenKeys: string[]
}
