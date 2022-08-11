import {AppContext} from "./app-context.interface";
import {DataCollectionSchema} from "./data-collection-schema.interface";

export interface DataProviderOptions<Settings = any> {

    /**
     * List of available collections. Also see `getCollections` and `getCollectionDetails` for
     * dynamically providing collections.
     */
    collections?: DataCollectionSchema[];

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
    getCollections?: (appContext: AppContext<Settings>) => Promise<DataCollectionSchema[]>;

    /**
     * Function to dynamically provide additional collection schema details for the given collection schema.
     * This function is called after a collection was selected by the user.
     * Useful, when the initial collection schema doesn't include all details (e.g. only the collection name
     * but not the item schema).
     *
     * @param schema The schema of the selected collection.
     * @returns A promise with the complete collection schema.
     */
    getCollectionDetails?: (schema: DataCollectionSchema, appContext: AppContext<Settings>) => Promise<DataCollectionSchema>;

}