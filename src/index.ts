export interface App<Settings extends any> {
    supports?: {
        ecommerce?: boolean;
        data?: boolean;
    };
    settings?: AppSettings[];
    setupText?: string;
    serviceProvider?: (settings: Settings) => AppService;
    editors?: Editor[]
}

export interface AppSettings {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    label: string;
    helpText?: string;
    required?: boolean;
    public?: boolean;
}

export interface Editor {
    id: string;
    component: Function;
    options?: EditorOptions;
}

export interface EditorOptions {
    allowOverride?: boolean;
    useAppService?: string;
}

export interface EditorProps<S=any> {
    value: any;
    name: string;
    label: string;
    config: any;
    component: any;
    updateValue: (value: any) => void;
    updateConfig: (config: {[key: string]: any}) => void;
    appService?: S;
}

export interface AppService {}

export interface EcommerceService {
    findProductById: (id: string) => Promise<Product>;
    searchProducts: (search: string) => Promise<Product[]>;
    findCategoryById: (id: string) => Promise<Category>;
    searchCategories: (search: string) => Promise<Category[]>;
}

export interface DataService {
    findData: (collection: string, query: string) => Promise<any>;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    url: string;
    originalData: any;
}

export interface Category {
    id: string;
    title: string;
    price: number;
    images: string[];
    url: string;
    originalData: any;
}