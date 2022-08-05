# base-ui-vue2

### 说明
```
基于Vue2.x 、element-ui的二次封装
```

### 安装
```
npm install base-ui-vue2 --save
```

### 应用
```
//在main.js中引入
import baseForm from 'base-ui-vue2'
Vue.use(baseForm)
```

### 用法示例
```
<template>
    <base-form 
        :formList="formList" 
        :baseForm.sync='form'
        @submit='submit' 
        @cancel='cancel'>
        <template slot="slot">
            <el-input v-model="baseForm.slot" placeholder="我是插槽" />
        </template>
    </base-form>
</template>

<script>
export default {
    data () {
        return {
            formList:[
                {
                    type: 'input', 
                    field: 'input1',
                    label: '输入框',
                    initVal:'123',
                    rules: [{
                        required: true, message: '不能为空', trigger: 'blur'
                    }]
                },
                {
                    type: 'select',
                    field: 'select',
                    label: '下拉框单选',
                    options: [
                        {
                            code: 1,
                            name: '黄金糕'
                        }
                    ],
                    defaultProp: {
                        label: 'name',
                        value: 'code'
                    }
                },
                {
                    type: 'slot',
                    field: 'slot',
                    label: '插槽'
                },
            ],
            form:{
                slot:''
            }
        }
    },
    methods:{
        submit(val){
            console.log('返回的表单值' + val)
            console.log(this.form)
        },
        cancel(){
            console.log('点击取消了')
        }
    }
}
</script>

```

### Props说明
 
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
formList | 表单渲染元素列表，详细说明如下文 | array | 是
baseForm | 表单初始数据 | object / null | 否
inline | 行内表单形式 | boolean | 否 | false
groupBtn | 自定义按钮，设置自定义按钮则不显示默认按钮，<br>详细说明如下文 | array | 否
isShowButton | 是否显示默认表单按钮 | boolean | 否 | true
buttonPosition | 按钮位置，左：left，中：center，右：right， | string | 否 | center
defaultProps | 默认表单统一属性，详细说明如下文 | object | 否 | width: '100%',<br>labelWidth: '120px',<br>labelPosition: 'right',<br>span: 24,<br>offset: 0,<br>gutter:0,<br>submitText: '提交',<br>cancelText: '取消'

### formList属性
属性 | 说明 | 类型 | 是否必传 | 可选值
:--- | :--- | :--- | :--- | :---
type | 表单域类型 | string | 是 | 'input'：输入框，<br> 'select'：下拉框，<br>'cascader'：级联选择器，<br>'date'：日期<br>'time'：时间，<br>'radio'：单选框，<br>'checkbox'：多选框，<br>'textarea'：文本域，<br>'switch'：开关，<br>'slot'：自定义插槽，<br>
field | 表单域绑定的参数 | string | 是 |
label | 表单域标签 | string | 否 |
width | 表单域宽度，单独设置某项宽度时可用，<br>统一设置则可以设置‘defaultProps’中的‘width’| string | 否 |
initVal | 初始值设置 | string/array | 否 |
rules | 表单域校验规则，用法与el-form一样 | array | 否 |
disabled | 表单域是否可编辑 | boolean | 否 |
options | 下拉框/级联选择器/单选框/多选框的列表数据,<br>每一项的数据项默认是label和value两个参数,<br>如若不是可以设置defaultProp | array | 否 |
defaultProp | 设置options的label和value对应的参数 | object | 否 |
dateType | 日期类型,默认date | string | 否 | year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
timeType | 时间类型,默认time | string | 否 | time/timeRange
#### tip
formList中每一个表单类型可配置的属性还有很多，与elementUi中的组件的属性配置相同

### defaultProps属性
属性 | 说明 | 类型 | 是否必传 | 默认值
:--- | :--- | :--- | :--- | :---
width | 表单域宽度 | string | 否 | 100%
labelWidth | 表单域标签宽度 | string | 否 | 120px
labelPosition | 表单域标签位置，左：left，右：right，上：top | string | 否 | right
span | 栅格占据的列数 | number | 否 | 24
offset | 栅格左侧的间隔格数 | number | 否 | 0
gutter | 栅格间隔 | number | 否 | 0
submitText | 默认按钮中第一个按钮的文本 | number | 否 | 提交
cancelText | 默认按钮中第二个按钮的文本 | number | 否 | 取消

### groupBtn属性
属性 | 说明 | 类型 | 是否必传  
:--- | :--- | :--- | :--- | 
type | 按钮类型（primary / success / warning / danger / info / text） | string | 是 
label | 按钮名称 | string | 是 
handle | 点击按钮时触发的事件 | function(form,formName) | 是 

### 表单事件
事件名称 | 说明 | 回调参数 
:--- | :--- | :--- | 
submit | 点击默认按钮中的提交按钮时触发 | 表单的值 
cancel | 点击默认按钮中的取消按钮时触发 | 无