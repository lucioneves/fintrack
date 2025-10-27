import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { publicApi } from '@/lib/axios'

const signupSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
  lastName: z.string().trim().min(1, { message: 'O sobrenome é obrigatório' }),
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

const SignupPage = () => {
  const [user, setUser] = useState(null)
  const SignupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const handleSubmit = (data) => {
    SignupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refresshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refresshToken)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao criar a conta. Tente novamente.')
      },
    })
  }

  if (user) {
    return <h1>Usuário criado com sucesso!</h1>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="terms"
                      />
                    </FormControl>
                    <div className="leading-none">
                      <label
                        htmlFor="terms"
                        className={`text-xs text-muted-foreground opacity-75 ${
                          form.formState.errors.terms && 'text-red-500'
                        }`}
                      >
                        Ao clicar em `Criar conta`, você aceita{' '}
                        <a
                          href="#"
                          className={`text-white underline ${
                            form.formState.errors.terms && 'text-red-500'
                          }`}
                        >
                          nosso termos de uso e politicas de privacidade
                        </a>
                      </label>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="mt-4 text-sm text-muted-foreground">
          Já possui uma conta?
          <Button variant="link" asChild>
            <Link to="/login">Faça login</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
