"use client";

import { Button } from "@/components/ui/button";
import { Editor, EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Menubar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <Button
        onClickCapture={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={
          editor.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
        type="button"
      >
        H1
      </Button>
      <Button
        onClickCapture={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={
          editor.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
        type="button"
      >
        H2
      </Button>
      <Button
        onClickCapture={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={
          editor.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
        type="button"
      >
        H3
      </Button>

      <Button
        onClickCapture={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
        type="button"
      >
        B
      </Button>
      <Button
        onClickCapture={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
        type="button"
      >
        I
      </Button>
      <Button
        onClickCapture={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
        type="button"
      >
        U
      </Button>
    </div>
  );
};

export const TipTapEditor = ({
  json,
  setJson,
}: {
  json: JSONContent | null;
  setJson: any;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
    onUpdate: ({ editor }) => {
      setJson(editor.getJSON());
    },
  });

  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="rounded-md border p-2 min-h-[150px] mt-4  "
      />
    </div>
  );
};
