import { Response } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    success: (data?: any, message?: string, statusCode?: number,meta?:object) => void;
    paginate:(data:any[],totalCount:number,page:number,limit:number,message?:string,statusCode?:number) => void;
    error: (message?: string, statusCode?: number, details?: any) => void;
    validationError: (errors: any[], message?: string) => void;
    unauthorized: (message?: string) => void;
    notFound: (message?: string) => void;
    conflict: (message?: string) => void;
    rateLimitExceeded: () => void;
  }
}