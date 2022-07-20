export interface AppSettings {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    label: string;
    helpText?: string;
    required?: boolean;
    public?: boolean;
}