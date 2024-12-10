import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "../../styles/components/admin/RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__toolbar">
        <button
          className={`toolbar-btn ${editor?.isActive("bold") ? "active" : ""}`}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          className={`toolbar-btn ${
            editor?.isActive("italic") ? "active" : ""
          }`}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          className={`toolbar-btn ${
            editor?.isActive("bulletList") ? "active" : ""
          }`}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button
          className={`toolbar-btn ${
            editor?.isActive("orderedList") ? "active" : ""
          }`}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
