import BaseForm from './base-form/index.vue' // 引入当前组件
import BaseTable from './base-table/index.vue' // 引入当前组件
const components = [BaseForm, BaseTable]

// 批量注册组件
const install = function (Vue) {
    components.forEach((item) => {
        Vue.component(item.name, item)
    })
}
export default install
