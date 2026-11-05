"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, LinkIcon, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleLogo from "@/components/auth/google-logo";
import { toast } from "../ui/toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const requirements = [
    { label: "Must contain an uppercase letter (A–Z)", met: /[A-Z]/.test(password) },
    { label: "Must contain a lowercase letter (a–z)", met: /[a-z]/.test(password) },
    { label: "Must be at least 6 characters long", met: password.length >= 6 },
  ];

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    const user = Object.fromEntries(formData.entries())
    console.log(user);
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password,
      photo: user.photo,
      callbackURL: "/"
    })

    if (data) {
      console.log(data);
      toast.add({
        title: "Registration successful!",
        description: "Your information is saved!",
        type: "success",
      });
      redirect("/");
    }
    if (error) {
      console.log(error);
      toast.add({
        title: "Unable to register you",
        description: submitError.message,
        type: "error",
      });
    }
  }
  const handleGoogle = async () => {
    console.log("register clicked google");
    const data = await authClient.signIn.social({ provider: 'google' });
  }

  return (
    <Card className="w-full max-w-xl gap-0 rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-card-foreground sm:text-4xl">Create Your Account</h1>
        <p className="mt-2 text-base text-muted-foreground">Join StudioSpace and book or host creative spaces.</p>
      </div>

      <form className="mt-8 grid gap-5" onSubmit={handleRegister}>
        <FormField label="Name">
          <InputWithIcon icon={User} name="name" placeholder="Enter your name" autoComplete="name" required />
        </FormField>

        <FormField label="Email">
          <InputWithIcon icon={Mail} name="email" type="email" placeholder="Enter your email" autoComplete="email" required />
        </FormField>

        <FormField label="Photo URL">
          <InputWithIcon icon={LinkIcon} name="photo" type="url" placeholder="Enter your photo URL" />
        </FormField>

        <FormField label="Password">
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 pr-11 pl-11"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </FormField>

        <ul className="-mt-2 space-y-2 text-sm">
          {requirements.map((requirement) => (
            <li key={requirement.label} className={`flex items-center gap-2 ${requirement.met ? "text-emerald-500" : "text-muted-foreground"}`}>
              <span className={`grid size-5 place-items-center rounded-full border ${requirement.met ? "border-emerald-500 bg-emerald-500 text-white" : "border-border"}`}>
                {requirement.met && <Check className="size-3" />}
              </span>
              {requirement.label}
            </li>
          ))}
        </ul>

        <Button type="submit" className="mt-2 h-12 w-full text-base font-bold">Register</Button>

        <div className="flex items-center gap-4 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          Or register with
        </div>

        <Button onClick={handleGoogle} type="button" variant="outline" className="h-12 w-full bg-background text-base font-semibold">
          <GoogleLogo /> Continue with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Login</Link>
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

const InputWithIcon = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
    <Input className="h-12 pl-11" {...props} />
  </div>
);

export default RegisterForm;
