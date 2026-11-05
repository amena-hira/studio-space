import LoginForm from "@/components/auth/login-form";

const LoginPage = async ({ searchParams }) => {
  const params = await searchParams;
  const requestedRoute = params?.callbackURL;
  const callbackURL = typeof requestedRoute === "string" && requestedRoute.startsWith("/") && !requestedRoute.startsWith("//")
    ? requestedRoute
    : "/";

  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-8">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner/photography-c.png')" }}
      />
      <div className="absolute inset-0 -z-10 bg-background/45 dark:bg-black/40" />
      <LoginForm callbackURL={callbackURL} />
    </main>
  );
};

export default LoginPage;
