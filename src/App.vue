<template>
  <div id="app">
    <h3>表格测试</h3>
    <BaseForm 
      :baseForm.sync="baseForm" 
      :formList="formList" 
      :defaultProps="{ span: 8 }" 
      @submit="getFormData"
      @cancel="getFormData">
        <template slot="slot">
            <el-input v-model="baseForm.slot" placeholder="我是插槽" />
        </template>
    </BaseForm>
  </div>
</template>

<script>
import BaseForm from './package/base-form/index.vue'

export default {
  name: 'App',
  components: {
    BaseForm
  },
  data () {
    return {
      baseForm: {
        input1: '123'
      },
      formList: [
        {
          type: 'input', // 设置表单类型
          field: 'input1', // 绑定的参数值
          label: '输入框',
          minlength: 10, // 最小输入长度
          maxlength: 20, // 最大输入长度
          rules: [{
            required: true, message: '不能为空', trigger: 'blur'
          }]
        },
        {
          type: 'input',
          field: 'input3',
          label: '禁止编辑',
          initVal: '初始值2',
          disabled: true
        },
        {
          type: 'slot',
          field: 'slot',
          label: '插槽'
        },
        {
          type: 'select',
          field: 'select1',
          label: '下拉框单选',
          options: [
            {
              code: '选项1',
              name: '黄金糕'
            }, {
              code: '选项2',
              name: '双皮奶'
            }, {
              code: '选项3',
              name: '蚵仔煎'
            }
          ],
          defaultProp: {// 设置options的label和value
            label: 'name',
            value: 'code'
          }
        },
        {
          type: 'select',
          field: 'select2',
          label: '下拉框多选',
          multiple: true, // 下拉框是否多选
          multipleLimit: 2, // 限制多选数量
          options: [
            {
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }
          ]
        },
        {
          type: 'cascader',
          field: 'cascader',
          label: '级联选择器',
          showAllLevels: false, // false则仅显示最后一级
          props: {
            multiple: true // 开启多选
          },
          collapseTags: false, // 是否折叠展示
          filterable: true, // 是否支持搜索
          options: [
            {
              value: 'zhinan',
              label: '指南',
              children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                  value: 'yizhi',
                  label: '一致'
                }, {
                  value: 'fankui',
                  label: '反馈'
                }, {
                  value: 'xiaolv',
                  label: '效率'
                }, {
                  value: 'kekong',
                  label: '可控'
                }]
              }, {
                value: 'daohang',
                label: '导航',
                children: [{
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }, {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }]
              }]
            },
            {
              value: 'zujian',
              label: '组件',
              children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                  value: 'layout',
                  label: 'Layout 布局'
                }, {
                  value: 'color',
                  label: 'Color 色彩'
                }, {
                  value: 'typography',
                  label: 'Typography 字体'
                }, {
                  value: 'icon',
                  label: 'Icon 图标'
                }, {
                  value: 'button',
                  label: 'Button 按钮'
                }]
              }
              ],
              defaultProp: {// 设置options的label和value
                label: 'name',
                value: 'code'
              }
            }]
        },
        {
          type: 'date',
          field: 'date',
          label: '日期',
          dateType: 'date', // 设置日期是年、月、日
          valueFormat: '', // 日期格式，默认是yyyy-MM-dd
          initVal: '2022-08-01',
          pickerOptions: {
            disabledDate (time) {
              return time.getTime() > Date.now() - 8.64e6
            }
          }
        },
        {
          type: 'date',
          field: 'daterange',
          label: '日期范围',
          dateType: 'daterange', // 设置日期是年、月、日
          valueFormat: '', // 日期格式，默认是yyyy-MM-dd
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          rangeSeparator: '至',
          pickerOptions: {
            disabledDate (time) {
              let curDate = (new Date()).getTime()
              let three = 30 * 24 * 3600 * 1000
              let threeMonths = curDate - three
              return (time.getTime() > Date.now() - 8.64e6) || time.getTime() < threeMonths
            }
          }
        },
        {
          type: 'time',
          field: 'time',
          label: '时间',
          valueFormat: 'HH-mm-ss', // 时间格式，默认是HH-mm-ss
          pickerOptions: {}
        },
        {
          type: 'timeRange',
          field: 'timeRange',
          label: '时间范围',
          valueFormat: 'HH-mm-ss', // 时间格式，默认是HH-mm-ss
          pickerOptions: {},
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期'
        },
        {
          type: 'radio',
          field: 'radio',
          label: '单选框',
          initVal: 1,
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            }
          ]
        },
        {
          type: 'checkbox',
          field: 'checkbox',
          label: '多选框',
          // initVal: [],
          min: 1,
          max: 2,
          options: [
            {
              label: '选项1',
              value: 1
            },
            {
              label: '选项2',
              value: 2
            },
            {
              label: '选项2',
              value: 3
            },
            {
              label: '选项2',
              value: 4
            }
          ]
        },
        {
          type: 'switch',
          field: 'switch',
          label: '开关',
          activeColor:'#13ce66',
          inactiveColor:'#cccccc'
        },
        {
          type: 'textarea',
          field: 'textarea',
          label: '文本域',
          span: 24,
          rows: 5, // 设置文本域高度，默认是4
          autosize: { minRows: 4, maxRows: 6 },
          maxlength: 20,
          showWordLimit: true // 是否显示输入字数统计，只在type = "text"或type = "textarea"时有效
        }
      ],
      groupBtn: [ // 自定义按钮
        {
          type: 'primary',
          label: '搜索',
          handle: this.search // 自定义按钮事件
        },
        {
          type: '',
          label: '重置',
          handle: this.resetFormData
        }
      ]
    }
  },
  methods: {
    getFormData () {
      
    }
  }
}
</script>

<style>
#app {

}
</style>
