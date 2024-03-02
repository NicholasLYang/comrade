import { useAwareness, useText } from "@y-sweet/react";
import { useEffect, useRef } from "react";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";

import "quill/dist/quill.snow.css";

interface Props {
  coords: number[];
}

export default function Editor({ coords }: Props) {
  const awareness = useAwareness();
  const yText = useText(`editor-${coords[0]}-${coords[1]}`);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const bindingRef = useRef<QuillBinding | null>(null);

  useEffect(() => {
    if (bindingRef.current !== null) {
      return;
    }
    if (editorRef.current && awareness) {
      // These libraries are designed to work in the browser, and will cause warnings
      // if imported on the server. Nextjs renders components on both the server and
      // the client, so we import them lazily here when they are used on the client.

      Quill.register("modules/cursors", QuillCursors);
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Start collaborating...",
        modules: {
          cursors: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }],
            ["link"],
          ],
        },
      });
      bindingRef.current = new QuillBinding(yText!, quill, awareness!);
    }
  }, [yText, awareness]);

  return (
    <div className="p-4 sm:p-8 space-y-3">
      <div className="bg-white/90">
        <div ref={editorRef} />
      </div>
    </div>
  );
}
