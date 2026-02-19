export type Config = {
  PORT: string | undefined;
  NODE: {
    enviroment: string | undefined;
    version?: string;
    build?: string;
  };
  avalanche: {
    mainnet_rpc: string | undefined;
    testnet_rpc: string | undefined;
  }
  postgres : {
    connection_string : string;
  };
};

// Prisma schema based on the provided TypeScript types

export type Game = {
  uuid: string;
  name: string;
  description: string;
  release: string;
  studio: string;
  // tags: Tags[];
};

export type User = {
  username: string;
  uuid : string;
  bio: string;
  email : string;
  avatar: Blob;
  catalogue: Game[];
  socials: [];
  friends : User[];
  platforms : [];
  
};

export type Platforms = {
  name : string;
  added : string;
  type : "console" | "pc";
  icon : string;
}