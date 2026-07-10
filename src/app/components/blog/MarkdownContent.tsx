import Image from "next/image";
import Markdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Markdown
      components={{
        img: ({ src, alt }) =>
          src ? (
            <Image
              src={src}
              alt={alt ?? ""}
              width={1200}
              height={800}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 65ch"
            />
          ) : null,
      }}
    >
      {content}
    </Markdown>
  );
}
