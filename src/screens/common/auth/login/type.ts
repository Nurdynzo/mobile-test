import * as z from 'zod';

export const loginSchema = z.object({
  emailAddress: z.string().email({message: 'Invalid email'}),
  password: z.string().min(1, {message: 'Password is required'}),
});

export type LoginSchema = z.infer<typeof loginSchema>;
