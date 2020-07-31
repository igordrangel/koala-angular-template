export interface ResponseInterface {
  error: boolean;
  statusCode?: number;
  urlRequest?: string;
  message: string;
  data?: any;
}
