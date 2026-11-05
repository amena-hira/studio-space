import StudioForm from "@/components/studios/studio-form";

const apiUrl = process.env.BACKEND_URL;

const AddStudioPage = () => {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-8 lg:px-10">
      <StudioForm
        mode="create"
        endpoint={`${apiUrl}/studios`}
        method="POST"
        user={{ name: "Alex Rivera", email: "alex.rivera@example.com" }}
      />
    </main>
  );
};

export default AddStudioPage;
