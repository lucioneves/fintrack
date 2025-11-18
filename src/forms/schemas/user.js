import z from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'O e-mail é inválido' })
    .trim()
    .min(1, { message: 'O e-mail é obrigatório' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
})

export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'O sobrenome é obrigatório' }),
    email: z
      .string()
      .email({ message: 'O e-mail é inválido' })
      .trim()
      .min(1, { message: 'O e-mail é obrigatório' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),

    confirmPassword: z.string().min(6, {
      message: 'A confirmação da senha deve ter pelo menos 6 caracteres',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você deve aceitar os termos.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
