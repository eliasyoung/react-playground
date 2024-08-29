import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  loader: () => ({ text: "XIALUJIAOWOQUWOZENMQU" }),
  component: TestPost,
});

function TestPost () {
  const { postId } = Route.useParams();
  const { text } = Route.useLoaderData();

  return (
    <div>
      <h1>This is Post {postId}</h1>
      <h1>Loader Text: {text}</h1>
    </div>
  );
};
