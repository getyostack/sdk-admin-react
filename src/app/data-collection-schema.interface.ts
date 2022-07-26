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
    type: DataCollectionSchemaSupportedType;

    /** Schemas of the object properties. Use when `type` is 'object'. */
    properties?: {[property: string]: DataCollectionSchema};

    /** Schema of array items. use when `type` is 'array'. */
    items?: {[property: string]: DataCollectionSchema};

    /** Extra configuration options to be shown when the collection is selected. */
    extraConfigOptions?: Array<DataColectionExtraConfigOptionSchema>;
}

export interface DataColectionExtraConfigOptionSchema {
    name: string;
    displayName: string;
    description?: string;
    type: string;
    options?: Array<{name: string; value: string}>;
    defaultValue?: any;
    editor?: string;
    hideCondition?: string; // JavaScript expression to be evaluated, e.g. `config.url && config.altText`
}

export type DataCollectionSchemaSupportedType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'asset' | 'image' | 'video' | 'location';