import { useAwareness } from "@y-sweet/react";
import { useEffect, useRef } from "react";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { Text as YText } from "yjs";

import "quill/dist/quill.snow.css";

interface Props {
  yText: YText | null;
}

export default function Editor({ yText }: Props) {
  const awareness = useAwareness();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const bindingRef = useRef<QuillBinding | null>(null);

  useEffect(() => {
    if (bindingRef.current !== null && yText) {
      return;
    }

    if (editorRef.current && awareness && yText) {
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
      bindingRef.current = new QuillBinding(yText, quill, awareness!);
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
