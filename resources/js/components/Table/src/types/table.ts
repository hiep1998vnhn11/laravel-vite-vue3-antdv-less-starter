import type { VNodeChild } from 'vue'
import type { PaginationProps } from './pagination'
import type { FormProps } from '/@/components/Form'
import type {
    ColumnProps,
    TableRowSelection as ITableRowSelection,
} from 'ant-design-vue/lib/table/interface'

import { ComponentType } from './componentType'
import { VueNode } from '/@/utils/propTypes'
import { RoleEnum } from '/@/enums/roleEnum'

export declare type SortOrder = 'ascend' | 'descend'

export interface TableCurrentDataSource<T = Recordable> {
    currentDataSource: T[]
}

export interface TableRowSelection<T = any> extends ITableRowSelection {
    /**
     * Callback executed when selected rows change
     * @type Function
     */
    onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any

    /**
     * Callback executed when select/deselect one row
     * @type FunctionT
     */
    onSelect?: (
        record: T,
        selected: boolean,
        selectedRows: Object[],
        nativeEvent: Event
    ) => any

    /**
     * Callback executed when select/deselect all rows
     * @type Function
     */
    onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any

    /**
     * Callback executed when row selection is inverted
     * @type Function
     */
    onSelectInvert?: (selectedRows: string[] | number[]) => any
}

export interface TableCustomRecord<T> {
    record?: T
    index?: number
}

export interface ExpandedRowRenderRecord<T> extends TableCustomRecord<T> {
    indent?: number
    expanded?: boolean
}
export interface ColumnFilterItem {
    text?: string
    value?: string
    children?: any
}

export interface TableCustomRecord<T = Recordable> {
    record?: T
    index?: number
}

export interface SorterResult {
    column: ColumnProps
    order: SortOrder
    field: string
    columnKey: string
}

export interface FetchParams {
    searchInfo?: Recordable
    page?: number
    sortInfo?: Recordable
    filterInfo?: Recordable
}

export interface GetColumnsParams {
    ignoreIndex?: boolean
    ignoreAction?: boolean
    sort?: boolean
}

export type SizeType = 'default' | 'middle' | 'small' | 'large'

export interface TableActionType {
    reload: (opt?: FetchParams) => Promise<void>
    getSelectRows: <T = Recordable>() => T[]
    clearSelectedRowKeys: () => void
    expandAll: () => void
    collapseAll: () => void
    getSelectRowKeys: () => string[]
    deleteSelectRowByKey: (key: string) => void
    setPagination: (info: Partial<PaginationProps>) => void
    setTableData: <T = Recordable>(values: T[]) => void
    updateTableDataRecord: (
        rowKey: string | number,
        record: Recordable
    ) => Recordable | void
    getColumns: (opt?: GetColumnsParams) => BasicColumn[]
    setColumns: (columns: BasicColumn[] | string[]) => void
    getDataSource: <T = Recordable>() => T[]
    setLoading: (loading: boolean) => void
    setProps: (props: Partial<BasicTableProps>) => void
    redoHeight: () => void
    setSelectedRowKeys: (rowKeys: string[] | number[]) => void
    getPaginationRef: () => PaginationProps | boolean
    getSize: () => SizeType
    getRowSelection: () => TableRowSelection<Recordable>
    getCacheColumns: () => BasicColumn[]
    emit?: EmitType
    updateTableData: (index: number, key: string, value: any) => Recordable
    setShowPagination: (show: boolean) => Promise<void>
    getShowPagination: () => boolean
    setCacheColumnsByField?: (
        dataIndex: string | undefined,
        value: BasicColumn
    ) => void
}

export interface FetchSetting {
    pageField: string
    sizeField: string
    listField: string
    totalField: string
}

export interface TableSetting {
    redo?: boolean
    size?: boolean
    setting?: boolean
    fullScreen?: boolean
}

export interface BasicTableProps<T = any> {
    clickToRowSelect?: boolean
    isTreeTable?: boolean
    sortFn?: (sortInfo: SorterResult) => any
    filterFn?: (data: Partial<Recordable<string[]>>) => any
    inset?: boolean
    showTableSetting?: boolean
    tableSetting?: TableSetting
    striped?: boolean
    autoCreateKey?: boolean
    summaryFunc?: (...arg: any) => Recordable[]
    summaryData?: Recordable[]
    showSummary?: boolean
    canColDrag?: boolean
    api?: (...arg: any) => Promise<any>
    beforeFetch?: Fn
    afterFetch?: Fn
    handleSearchInfoFn?: Fn
    fetchSetting?: Partial<FetchSetting>
    immediate?: boolean
    emptyDataIsShowTable?: boolean
    searchInfo?: Recordable
    useSearchForm?: boolean
    formConfig?: Partial<FormProps>
    columns: BasicColumn[]
    showIndexColumn?: boolean
    indexColumnProps?: BasicColumn
    actionColumn?: BasicColumn
    ellipsis?: boolean
    canResize?: boolean
    resizeHeightOffset?: number
    clearSelectOnPageChange?: boolean
    rowKey?: string | ((record: Recordable) => string)
    dataSource?: Recordable[]
    titleHelpMessage?: string | string[]
    maxHeight?: number
    bordered?: boolean
    pagination?: PaginationProps | boolean
    loading?: boolean
    childrenColumnName?: string
    components?: object
    defaultExpandAllRows?: boolean
    defaultExpandedRowKeys?: string[]
    expandedRowKeys?: string[]
    expandedRowRender?: (
        record?: ExpandedRowRenderRecord<T>
    ) => VNodeChild | JSX.Element
    expandIcon?: Function | VNodeChild | JSX.Element
    expandRowByClick?: boolean
    expandIconColumnIndex?: number
    footer?: Function | VNodeChild | JSX.Element
    indentSize?: number

    locale?: object

    rowClassName?: (record: TableCustomRecord<T>) => string

    rowSelection?: TableRowSelection

    scroll?: { x?: number | true; y?: number }

    showHeader?: boolean

    size?: SizeType

    title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string)

    customHeaderRow?: (column: ColumnProps, index: number) => object

    customRow?: (record: T, index: number) => object

    tableLayout?: 'auto' | 'fixed' | string

    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement

    transformCellText?: Function

    onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void
    onExpand?: (expande: boolean, record: T) => void
    onExpandedRowsChange?: (expandedRows: string[] | number[]) => void

    onColumnsChange?: (data: ColumnChangeParam[]) => void
}

export type CellFormat =
    | string
    | ((text: string, record: Recordable, index: number) => string | number)
    | Map<string | number, any>

// @ts-ignore
export interface BasicColumn extends ColumnProps {
    children?: BasicColumn[]
    filters?: {
        text: string
        value: string
        children?:
            | unknown[]
            | (((props: Record<string, unknown>) => unknown[]) &
                  (() => unknown[]) &
                  (() => unknown[]))
    }[]

    //
    flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION' | '#'
    customTitle?: VueNode

    slots?: Recordable

    defaultHidden?: boolean

    helpMessage?: string | string[]

    format?: CellFormat

    edit?: boolean
    editRow?: boolean
    editable?: boolean
    editComponent?: ComponentType
    editComponentProps?: Recordable
    editRule?: boolean | ((text: string, record: Recordable) => Promise<string>)
    editValueMap?: (value: any) => string
    onEditRow?: () => void
    auth?: RoleEnum | RoleEnum[] | string | string[]
    ifShow?: boolean | ((column: BasicColumn) => boolean)
}

export type ColumnChangeParam = {
    dataIndex: string
    fixed: boolean | 'left' | 'right' | undefined
    visible: boolean
}

export interface InnerHandlers {
    onColumnsChange: (data: ColumnChangeParam[]) => void
}
