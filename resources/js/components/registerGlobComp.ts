import type { App } from 'vue'
import { Button } from './Button'
import { Button as AntButton, Input, Layout, Row, Col } from 'ant-design-vue'
const compList = [AntButton.Group, Input, Button, Layout, Row, Col]

export function registerGlobComp(app: App) {
    compList.forEach((comp) => {
        app.component(comp.name || comp.displayName, comp)
    })
}
