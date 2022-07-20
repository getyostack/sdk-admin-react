import {DataSourceOption} from "../data/data-source-option.interface";

export interface EditorProps<S=any> {
    value: any;
    name: string;
    label: string;
    config: {[key: string]: any};
    component: any;
    updateValue: (value: any) => void;
    updateConfig: (config: {[key: string]: any}) => void;
    appService?: S;
    getRepeatDataSourceOptions: () => DataSourceOption[];
    getValueDataSourceOptions: () => DataSourceOption[];
    getAllDataSourceOptions: () => DataSourceOption[];
    getActiveDataSourceOption: (options: DataSourceOption[], dataSourceAlias?: string) => DataSourceOption;
}