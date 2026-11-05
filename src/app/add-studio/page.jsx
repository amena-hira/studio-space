import StudioForm from "@/components/studios/studio-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const apiUrl = process.env.BACKEND_URL;

const AddStudioPage = async() => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const user = session?.user
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 lg:px-10">
      <StudioForm
        mode="create"
        endpoint={`${apiUrl}/studios`}
        method="POST"
        user={{ name: user?.name, email: user?.email }}
      />
    </main>
  );
};

export default AddStudioPage;
