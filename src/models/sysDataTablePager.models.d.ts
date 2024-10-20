export interface sysDataTablePager<T> {
    aaData: T[]
    iTotalRecords: number;
    iTotalDisplayRecords: number;
    page: number;
}
