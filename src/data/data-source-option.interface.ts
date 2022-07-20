export interface DataSourceOption {
    dataName: string;
    alias: string;
    displayName: string;
    options: DataPathOption[];
}

export interface DataPathOption {
    name: string;
    value: string;
}