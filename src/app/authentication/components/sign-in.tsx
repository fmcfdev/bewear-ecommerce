"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, {
    error: "A senha deve ter no mínimo 8 caracteres",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          console.log("Autenticando");
        },
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (
            ctx.error.code === "INVALID_EMAIL_OR_PASSWORD" ||
            ctx.error.code === "USER_NOT_FOUND"
          ) {
            toast.error("E-mail e/ou senha inválido(s)");
            form.setError("email", {
              message: "E-mail ou senha inválido",
            });
            return form.setError("password", {
              message: "E-mail ou senha inválido",
            });
          }
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Faça login para continuar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe seu e-mail" {...field} />
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
                    <Input
                      placeholder="Informe sua senha"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Entrar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SignInForm;
