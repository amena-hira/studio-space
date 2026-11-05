import { notFound } from "next/navigation";
import StudioForm from "@/components/studios/studio-form";

const apiUrl = process.env.BACKEND_URL;

const EditStudioPage = async ({ params }) => {
  const { id } = await params;
  const response = await fetch(`${apiUrl}/studios/${id}`);

  if (!response.ok) notFound();

  const studio = await response.json();

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
