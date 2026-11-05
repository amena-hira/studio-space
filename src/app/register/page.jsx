import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-8">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-20 dark:opacity-35"
        style={{ backgroundImage: "url('/images/banner/photography-c.png')" }}
      />
      <div className="absolute inset-0 -z-10 bg-background/70 backdrop-blur-[2px]" />
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
