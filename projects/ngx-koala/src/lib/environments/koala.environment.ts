export interface KoalaEnvironmentInterface {
  production: boolean;
  storageTokenName: string;
  endpointApi: string;
}

export const koalaEnvironment = {
  production: true,
  storageTokenName: 'koalaStorageToken',
  endpointApi: 'http://localhost:3000'
};
