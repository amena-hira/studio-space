import { notFound } from "next/navigation";
import StudioForm from "@/components/studios/studio-form";

const apiUrl = process.env.BACKEND_URL;

export const dynamic = "force-dynamic";

const EditStudioPage = async ({ params }) => {
  const { id } = await params;
  let studio = null;

  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/studios/${id}`, { cache: "no-store" });
      if (response.ok) studio = await response.json();
    } catch {
      studio = null;
    }
  }

  if (!studio || !studio._id) notFound();

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 lg:px-10">
      <StudioForm
        mode="edit"
        endpoint={`${apiUrl}/studios/${id}`}
        method="PATCH"
        studio={studio}
        user={{ name: studio.userName, email: studio.userEmail }}
      />
    </main>
  );
};

export default EditStudioPage;
