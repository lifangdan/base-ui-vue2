<!-- 
    基础二次表单,
    author:'lifangdan',
    update:'20220804'
-->
<template>
    <el-form ref="ruleForm"
        :rules="rules"
        :model="form"
        :label-position="currentProps.labelPosition"
        :inline="inline">
        <el-row :gutter="currentProps.gutter">
            <el-col
                v-for="(item, index) in formList"
                :key="index"
                :span="item.span || currentProps.span"
                :offset="item.offset || currentProps.offset">
                <el-form-item
                    :label="item.label"
                    :prop="item.field"
                    :label-width="currentProps.labelWidth">
                    <!-- 输入框 / 文本域输入框-->
                    <el-input
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'input' || item.type === 'textarea'"
                        v-model.trim="form[item.field]"
                        :clearable="item.clearable || true"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder || '请输入'"
                        :type="item.type"
                        :rows="item.rows || 4"
                        :autosize="item.autosize"
                        :minlength="item.minlength"
                        :maxlength="item.maxlength"
                        :show-word-limit="item.showWordLimit">
                    </el-input>
                    <!-- 下拉框 -->
                    <el-select
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'select'"
                        v-model.trim="form[item.field]"
                        :clearable="item.clearable || true"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder || '请选择'"
                        :multiple="item.multiple"
                        :multiple-limit="item.multipleLimit || 0">
                        <el-option
                            v-for="(opt,index) in item.options"
                            :key="index"
                            :label=" (item.defaultProp && opt[item.defaultProp.label]) || opt.label"
                            :value="(item.defaultProp && opt[item.defaultProp.value]) || opt.value">
                        </el-option>
                    </el-select>
                    <!-- 级联选择器-->
                    <el-cascader
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'cascader'"
                        v-model.trim="form[item.field]"
                        :clearable="item.clearable || true"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder || '请选择'"
                        :options="item.options"
                        :show-all-levels="item.showAllLevels"
                        :props="item.props"
                        :collapse-tags="item.collapseTags"
                        :filterable="item.filterable">
                    </el-cascader>
                    <!-- 日期 -->
                    <el-date-picker
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'date'"
                        v-model.trim="form[item.field]"
                        :clearable="item.clearable||true"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder || '选择日期'"
                        :rangeSeparator="item.rangeSeparator || '-'"
                        :type="item.dateType || 'date'"
                        :value-format="item.valueFormat || 'yyyy-MM-dd'"
                        :end-placeholder="item.endPlaceholder"
                        :start-placeholder="item.startPlaceholder"
                        :picker-options="item.pickerOptions">
                    </el-date-picker>
                    <!-- 时间 -->
                    <el-time-picker
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'time'"
                        :is-range="item.timeType === 'timeRange'"
                        v-model.trim="form[item.field]"
                        :clearable="item.clearable || true"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder || '选择时间'"
                        :rangeSeparator="item.rangeSeparator || '-'"
                        :value-format="item.valueFormat || 'yyyy-MM-dd'"
                        :picker-options="item.pickerOptions"
                        >
                    </el-time-picker>
                    <!-- 单选框 -->
                    <el-radio-group
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'radio'"
                        v-model.trim="form[item.field]"
                        :disabled="item.disabled">
                        <el-radio
                            v-for="(opt,index) in item.options"
                            :key="index"
                            :label=" (item.defaultProp && opt[item.defaultProp.value]) || opt.value">
                            {{ (item.defaultProp && opt[item.defaultProp.label]) || opt.label }}
                        </el-radio>
                    </el-radio-group>
                    <!-- 多选框 -->
                    <el-checkbox-group
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'checkbox'"
                        v-model="form[item.field]"
                        :disabled="item.disabled"
                        :min="item.min"
                        :max="item.max">
                        <el-checkbox
                            v-for="(opt) in item.options"
                            :key="opt.value"
                            :label=" (item.defaultProp && opt[item.defaultProp.value]) || opt.value">
                            {{ (item.defaultProp && opt[item.defaultProp.label]) || opt.label }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <!-- 开关 -->
                    <el-switch
                        :style="{'width':item.width || currentProps.width}"
                        v-if="item.type === 'switch'"
                         v-model="form[item.field]"
                        :disabled="item.disabled"
                        :active-color="item.activeColor"
                        :inactive-color="item.inactiveColor"
                        :active-value="item.activeValue"
                        :inactive-value="item.inactiveValue"
                        :active-text="item.activeText"
                        :inactive-text="item.inactiveText">
                    </el-switch>
                    <!-- 插槽 -->
                    <slot :style="{'width':item.width || currentProps.width}" v-if="item.type==='slot'" :name="item.field"></slot>
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 自定义按钮 -->
        <el-form-item v-if="groupBtn" :style="{ textAlign: buttonPosition}">
            <el-button
                @click="groupFn('ruleForm',btnItem.handle)"
                v-for="(btnItem,ind) in groupBtn"
                :key="ind"
                :type="btnItem.type">
                {{ btnItem.label}}
            </el-button>
        </el-form-item>
        <el-form-item v-if="isShowButton && !groupBtn" :style="{ textAlign: buttonPosition}">
            <el-button type="primary" @click="submitForm('ruleForm')">{{currentProps.submitText}}</el-button>
            <el-button @click="cancel('ruleForm')">{{currentProps.cancelText}}</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: 'BaseForm',
    props: {
        formList: {// 表单元素列表，必传
            type: Array,
            required: true
        },
        baseForm: {// 表单初始值，不必传
            type: Object
        },
        inline: { // 是否是行内表单
            type: Boolean
        },
        groupBtn: { // 自定义按钮，设置自定义按钮则不限时默认按钮
            type: Array
        },
        isShowButton: {// 是否显示默认表单按钮
            type: Boolean,
            default: true
        },
        buttonPosition: {// 按钮位置,左：left，中：center，右：right，
            type: String,
            default: 'center'
        },
        defaultProps: {// 统一设置表单项，默认100%
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data () {
        return {
            form: {},
            rules: {},
            currentProps: {
                width: '100%', // 表单项长度
                labelWidth: '120px', // 标签长度，默认120px
                labelPosition: 'right', // 标签位置,左：left，右：right，上：top
                span: 24, // 栅格占据的列数
                offset: 0, // 栅格左侧的间隔格数
                gutter: 0, // 栅格间隔
                submitText: '提交',
                cancelText: '取消'
            }
        }
    },
    watch: {
        formList: {
            immediate: true,
            deep: true,
            handler (val) {
                if (!val || val.length < 1) {
                    return false
                }
                this.form = {}
                this.rules = {}
                for (const i of val) {
                    if (!i.field) {
                        return
                    }
                    // 收集表单初始值和表单检验
                    if ((i.type === 'select' && i.multiple) || i.type === 'checkbox') {
                        this.$set(this.form, i.field, i.initVal || [])
                    } else {
                        this.$set(this.form, i.field, i.initVal || '')
                    }

                    this.$set(this.rules, i.field, i.rules || [])
                }
            }
        },
        form: {
            immediate: true,
            deep: true,
            handler (val) {
                this.$emit('update:baseForm', val)
            }
        },
        baseForm: {
            immediate: true,
            deep: true,
            handler (val) {
                for (const i in val) {
                    this.form[i] = val[i]
                }
            }
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('submit', Object.assign({}, this.form))
                    console.log('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        cancel () {
            this.$emit('cancel')
        },
        resetForm (formName) {
            this.form = {}
            this.$refs[formName].resetFields()
        },
        // 自定义按钮的点击事件
        groupFn (formName, callback) {
            callback && callback(this.form, this.$refs[formName])
        }
    },
    created () {
        Object.assign(this.currentProps, this.defaultProps)
    }
}
</script>
<style scoped>

.el-row{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-sizing: border-box;
}
</style>
