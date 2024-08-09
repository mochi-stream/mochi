import ReactMarkdown from "react-markdown";

export default function Bio({ content }: { content: string }) {
  return (
    <ReactMarkdown className="prose prose-neutral dark:prose-invert rounded-sm border border-white border-opacity-10 p-6 ">
      {content}
    </ReactMarkdown>
  );
}
