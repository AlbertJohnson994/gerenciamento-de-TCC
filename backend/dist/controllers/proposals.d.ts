import { Request, Response } from 'express';
declare global {
    namespace Express {
        interface User {
            id: string;
            name: string;
            email: string;
            role: 'STUDENT' | 'ADMIN' | 'ORIENTADOR' | string;
        }
        interface Request {
            user?: User;
        }
    }
}
export declare const createProposal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProposals: (req: Request, res: Response) => Promise<void>;
export declare const getProposalById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProposal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProposal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyProposals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getOrientadorProposals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=proposals.d.ts.map