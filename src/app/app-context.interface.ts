export interface AppContext<Settings = any> {
    settings: Settings;
    //makeServerSideRequest: <T = any>(id: string, variables: {[name: string]: string}) => Promise<T>;
}