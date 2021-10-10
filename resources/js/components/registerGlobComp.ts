import type { App } from 'vue'
import { Button, Input, Layout, Row, Col } from 'ant-design-vue'
const compList = [Input, Button, Layout, Row, Col]

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp)
  })
}
