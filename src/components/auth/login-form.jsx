"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import GoogleLogo from "@/components/auth/google-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "../ui/toast";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const user = Object.fromEntries(formData.entries())
    console.log(user);
    const { data, error } = await authClient.signIn.email({
      ...user,
    })

    if (data) {
      console.log(data);
      toast.add({
        title: "Login successful!",
        description: "You successfully logged in!",
        type: "success",
      });
      redirect("/");
    }
    if (error) {
      console.log(error);
      toast.add({
        title: "Unable to login you",
        description: submitError.message,
        type: "error",
      });
    }
  }

  const handleGoogle = async () => {
    console.log("google click");
    const data = await authClient.signIn.social({ provider: 'google' });
  }

  return (
    <Card className="w-full max-w-xl gap-0 rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-card-foreground sm:text-4xl">Welcome Back</h1>
        <p className="mt-2 text-base text-muted-foreground">Log in to your StudioSpace account.</p>
      </div>

      <form className="mt-9 grid gap-6" onSubmit={handleLogin}>
        <FormField label="Email">
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input name="email" type="email" className="h-12 pl-11" placeholder="Enter your email" autoComplete="email" required />
          </div>
        </FormField>

        <FormField label="Password">
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input name="password" type={showPassword ? "text" : "password"} className="h-12 pr-11 pl-11" placeholder="Enter your password" autoComplete="current-password" required />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </FormField>

        <Link href="#" className="-mt-2 justify-self-end font-semibold text-primary hover:underline">Forgot Password?</Link>

        <Button type="submit" className="h-12 w-full text-base font-bold">Login</Button>

        <div className="flex items-center gap-4 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          Or login with
        </div>

        <Button onClick={handleGoogle} type="button" variant="outline" className="h-12 w-full bg-background text-base font-semibold">
          <GoogleLogo /> Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href="/register" className="font-semibold text-primary hover:underline">Register</Link>
        </p>
      </form>
    </Card>
  );
};

const FormField = ({ label, children }) => (
  <label className="grid gap-2 text-sm font-bold text-card-foreground">
    {label}
    {children}
  </label>
);

export default LoginForm;
