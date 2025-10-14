import { Link } from 'react-router'

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
import { Input } from '@/components/ui/input'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />
          <div className="items-top flex space-x-2">
            <Checkbox id="terms" />
            <div className="grid-1.5 grid leading-none">
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground opacity-75"
              >
                Ao clicar em `Criar conta`, você aceita{' '}
                <a href="#" className="text-white underline">
                  nosso termos de uso e politicas de privacidade
                </a>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
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
