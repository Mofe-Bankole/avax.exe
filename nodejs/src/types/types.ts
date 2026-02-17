export type Config = {
    PORT : number,
    SUPABASE_URL : string;
    SUPABASE_PUBLISHABLE_DEFAULT_KEY : string;
    NODE : {
        enviroment : string,
        version? : string,
        build? : string,
    },
    avalanche : {
        mainnet_rpc : string,
        testnet_rpc : string
    }
}

