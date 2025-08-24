import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["STUDENT", "ORIENTADOR", "COORDENADOR", "ADMIN"]>>;
    matriculation: z.ZodOptional<z.ZodString>;
    course: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    role?: "STUDENT" | "ORIENTADOR" | "ADMIN" | "COORDENADOR" | undefined;
    matriculation?: string | undefined;
    course?: string | undefined;
}, {
    email: string;
    password: string;
    name: string;
    role?: "STUDENT" | "ORIENTADOR" | "ADMIN" | "COORDENADOR" | undefined;
    matriculation?: string | undefined;
    course?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const proposalSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    orientadorId: z.ZodOptional<z.ZodString>;
    deadline: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    deadline?: string | undefined;
    orientadorId?: string | undefined;
}, {
    title: string;
    description: string;
    deadline?: string | undefined;
    orientadorId?: string | undefined;
}>;
//# sourceMappingURL=validation.d.ts.map