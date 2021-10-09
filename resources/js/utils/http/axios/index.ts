import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '/#/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { useGlobSetting } from '/@/hooks/setting'
import { useMessage } from '/@/hooks/web/useMessage'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum'
import { isString } from '/@/utils/is'
import { getToken } from '/@/utils/auth'
import { setObjToUrlParams, deepMerge } from '/@/utils'
import { store } from '/@/store'
import { router } from '/@/router'
import { useI18n } from '/@/hooks/web/useI18n'
import { joinTimestamp, formatRequestDate } from './helper'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix
const { createMessage, createErrorModal } = useMessage()

const transform: AxiosTransform = {
    transformRequestHook: (
        res: AxiosResponse<Result>,
        options: RequestOptions
    ) => {
        const { t } = useI18n()
        const { isTransformResponse, isReturnNativeResponse } = options
        if (isReturnNativeResponse) {
            return res
        }
        if (!isTransformResponse) {
            return res.data
        }
        const { data } = res
        if (!data) {
            throw new Error(t('sys.api.apiRequestFailed'))
        }
        const { code, result, message } = data
        const hasSuccess =
            data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
        if (hasSuccess) {
            return result
        }
        let timeoutMsg = ''
        switch (code) {
            case ResultEnum.TIMEOUT:
                timeoutMsg = t('sys.api.timeoutMessage')
                break
            default:
                if (message) {
                    timeoutMsg = message
                }
        }
        if (options.errorMessageMode === 'modal') {
            createErrorModal({
                title: t('sys.api.errorTip'),
                content: timeoutMsg,
            })
        } else if (options.errorMessageMode === 'message') {
            createMessage.error(timeoutMsg)
        }

        throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
    },
    beforeRequestHook: (config, options) => {
        const {
            apiUrl,
            joinPrefix,
            joinParamsToUrl,
            formatDate,
            joinTime = true,
        } = options

        if (joinPrefix) {
            config.url = `${urlPrefix}${config.url}`
        }

        if (apiUrl && isString(apiUrl)) {
            config.url = `${apiUrl}${config.url}`
        }
        const params = config.params || {}
        const data = config.data || false
        formatDate && data && !isString(data) && formatRequestDate(data)
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            if (!isString(params)) {
                config.params = Object.assign(
                    params || {},
                    joinTimestamp(joinTime, false)
                )
            } else {
                config.url =
                    config.url + params + `${joinTimestamp(joinTime, true)}`
                config.params = undefined
            }
        } else {
            if (!isString(params)) {
                formatDate && formatRequestDate(params)
                if (
                    Reflect.has(config, 'data') &&
                    config.data &&
                    Object.keys(config.data).length > 0
                ) {
                    config.data = data
                    config.params = params
                } else {
                    config.data = params
                    config.params = undefined
                }
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(
                        config.url as string,
                        Object.assign({}, config.params, config.data)
                    )
                }
            } else {
                config.url = config.url + params
                config.params = undefined
            }
        }
        return config
    },
    requestInterceptors: (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },

    responseInterceptors: (res: AxiosResponse<any>) => {
        return res
    },
    responseInterceptorsCatch: (error: any) => {
        const { t } = useI18n()
        store.dispatch('errorLog/addAjaxErrorInfo', error)
        const { response, code, message, config } = error || {}
        const errorMessageMode =
            config?.requestOptions?.errorMessageMode || 'none'
        const msg: string = response?.data?.error?.message ?? ''
        const err: string = error?.toString?.() ?? ''
        let errMessage = ''

        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                errMessage = t('sys.api.apiTimeoutMessage')
            }
            if (err?.includes('Network Error')) {
                errMessage = t('sys.api.networkExceptionMsg')
            }

            if (errMessage) {
                if (errorMessageMode === 'modal') {
                    createErrorModal({
                        title: t('sys.api.errorTip'),
                        content: errMessage,
                    })
                } else if (errorMessageMode === 'message') {
                    createMessage.error(errMessage)
                }
                return Promise.reject(error)
            }
        } catch (error: any) {
            throw new Error(error)
        }

        checkStatus(error?.response?.status, msg, errorMessageMode)
        return Promise.reject(error)
    },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
        deepMerge(
            {
                authenticationScheme: '',
                timeout: 20 * 1000,
                urlPrefix: urlPrefix,
                headers: {
                    'Content-Type': ContentTypeEnum.JSON,
                    environment: localStorage.getItem('env'),
                },
                transform,
                requestOptions: {
                    joinPrefix: true,
                    isReturnNativeResponse: false,
                    isTransformResponse: true,
                    joinParamsToUrl: false,
                    formatDate: true,
                    errorMessageMode: 'message',
                    apiUrl: globSetting.apiUrl,
                    joinTime: true,
                    ignoreCancelToken: true,
                    withToken: true,
                },
            },
            opt || {}
        )
    )
}
export const defHttp = createAxios()
