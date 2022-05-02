export interface AppSettings {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    label: string;
    helpText?: string;
    required?: boolean;
    public?: boolean;
}

export interface AppInitContext<Settings = any> {
    /**
     * The current app settings.
     */
    settings: Settings;

    /**
     * Function to register a component config field editor.
     *
     * @param id A unique identifier.
     * @param component A React component to be used to render the editor.
     * @param options Additional options.
     */
    registerConfigFieldEditor: (id: string, component: Function, options?: EditorOptions) => boolean;

    /**
     * Function to register a service, which will be provided to registered config field editors.
     *
     * @param service An app-specific service instance.
     */
    registerService: (service: any) => boolean;

    /**
     * Function to register a data provider.
     *
     * @param dataProviderId A unique identifier.
     * @param name Name to be shown to users.
     * @param collectionSchemas An array of schemas that describe the collections.
     *                          Can be an empty array if `options.getCollections` is provided.
     * @param options Additional options.
     */
    registerDataProvider: (dataProviderId: string, name: string, collectionSchemas: DataCollectionSchema[],
                           options?: DataProviderOptions) => boolean;

    /**
     * Details for requests that can be made server-side.
     * Server-side requests should be used if sensitive settings, such as API keys, need to be
     * sent with the request. The `url` and `headers` allow settings to be added server-side
     * via string interpolation.
     *
     * Example request details, which interpolate `accountId` and `apiKey` from the settings server-side,
     * and `path` from a client-side provided value.
     * <code>
     *     {
     *         id: 'mySecureApiRequest',
     *         url: 'https://api.yostack.com/{settings.accountId}/{path}',
     *         headers: {
     *             'Authorization': 'Bearer {settings.apiKey}'
     *         }
     *     }
     * </code>
     *
     * @param requestDetails Array of request details for the server-side requests.
     */
    // TODO Probably move this in some JSON file so that we can read it on app publish and store in DB
    //registerServerSideRequests: (requestDetails: ServerSideRequestDetails[]) => boolean;

}

export interface DataProviderOptions {
    /**
     * Set to show a different label than "Collection" (e.g. "Data Type", "Content Type", "Base", "Model").
     */
    collectionLabel?: string;

    /**
     * Function to dynamically provide a list of available collections.
     * Useful, when the list of collections is dynamic and needs to be retrieved from an API.
     *
     * @returns A promise with an array of collection schemas.
     */
    getCollections?: (appContext: AppContext) => Promise<DataCollectionSchema[]>;

    /**
     * Function to dynamically provide additional collection schema details for the given collection schema.
     * This function is called after a collection was selected by the user.
     * Useful, when the initial collection schema doesn't include all details (e.g. only the collection name
     * but not the item schema).
     *
     * @param schema The schema of the selected collection.
     * @returns A promise with the complete collection schema.
     */
    getCollectionDetails?: (schema: DataCollectionSchema, appContext: AppContext) => Promise<DataCollectionSchema>;

}

export interface AppContext<Settings = any> {
    settings: Settings;
    makeServerSideRequest: <T = any>(id: string, variables: {[name: string]: string}) => Promise<T>;
}

/**
 * The data collection schema provides meta data, such as the collection title, as well as,
 * defines the collection's expected response data structure.
 */
export interface DataCollectionSchema {
    /** A unique identifier. */
    $id?: string;

    /** The name to be shown to users. */
    title?: string;

    /** The data type. */
    type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';

    /** Schemas of the object properties. Use when `type` is 'object'. */
    properties?: {[property: string]: DataCollectionSchema};

    /** Schema of array items. use when `type` is 'array'. */
    items?: {[property: string]: DataCollectionSchema};

    /** Extra configuration options to be shown when the collection is selected. */
    extraConfigOptions?: Array<{
        name: string;
        displayName: string;
        description?: string;
        type: string;
        options?: Array<{name: string; value: string}>;
        defaultValue?: any;
        editor?: string;
        hideCondition?: string; // JavaScript expression to be evaluated, e.g. `config.url && config.altText`
    }>;
}

export interface ComponentConfigFieldEditor {
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

export interface ServerSideRequestDetails {
    id: string;
    url: string;
    headers: {[name: string]: string};
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