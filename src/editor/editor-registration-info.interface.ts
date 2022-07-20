export interface ComponentConfigFieldEditor {
    id: string;
    component: Function;
    options?: EditorOptions;
}

export interface EditorOptions {
    allowOverride?: boolean;
    useAppService?: string;
}