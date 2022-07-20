import {AppContext} from "./app-context.interface";
import {DataCollectionSchema} from "./data-collection-schema.interface";
import {DataProviderOptions} from "./data-provider-options.interface";
import {EditorOptions} from "../editor/editor-registration-info.interface";

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
     * @returns true, if the registration succeeded.
     */
    registerConfigFieldEditor: (id: string, component: Function, options?: EditorOptions) => boolean;

    /**
     * Function to register a service, which will be provided to registered config field editors.
     *
     * @param service An app-specific service instance.
     * @returns true, if the registration succeeded.
     */
    registerService: (service: (appContext: AppContext<Settings>) => void) => boolean;

    /**
     * Function to register a data provider.
     *
     * @param dataProviderId A unique identifier.
     * @param name Name to be shown to users.
     * @param collectionSchemas An array of schemas that describe the collections.
     *                          Can be an empty array if `options.getCollections` is provided.
     * @param options Additional options.
     * @returns true, if the registration succeeded.
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

// export interface ServerSideRequestDetails {
//     id: string;
//     url: string;
//     headers: {[name: string]: string};
// }