import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Type,
} from "lucide-react";
import "../../styles/components/admin/RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "rich-text-link",
        },
      }),
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__toolbar">
        <div className="toolbar-group">
          <button
            title="Paragraph"
            className={`toolbar-btn ${
              editor?.isActive("paragraph") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().setParagraph().run()}
          >
            <Type size={18} />
          </button>
          <button
            title="Heading 1"
            className={`toolbar-btn ${
              editor?.isActive("heading", { level: 1 }) ? "active" : ""
            }`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={18} />
          </button>
          <button
            title="Heading 2"
            className={`toolbar-btn ${
              editor?.isActive("heading", { level: 2 }) ? "active" : ""
            }`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={18} />
          </button>
          <button
            title="Heading 3"
            className={`toolbar-btn ${
              editor?.isActive("heading", { level: 3 }) ? "active" : ""
            }`}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            title="Bold"
            className={`toolbar-btn ${
              editor?.isActive("bold") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold size={18} />
          </button>
          <button
            title="Italic"
            className={`toolbar-btn ${
              editor?.isActive("italic") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic size={18} />
          </button>
          <button
            title="Link"
            className={`toolbar-btn ${
              editor?.isActive("link") ? "active" : ""
            }`}
            onClick={setLink}
          >
            <Link2 size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            title="Align Left"
            className={`toolbar-btn ${
              editor?.isActive({ textAlign: "left" }) ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={18} />
          </button>
          <button
            title="Align Center"
            className={`toolbar-btn ${
              editor?.isActive({ textAlign: "center" }) ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={18} />
          </button>
          <button
            title="Align Right"
            className={`toolbar-btn ${
              editor?.isActive({ textAlign: "right" }) ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            title="Bullet List"
            className={`toolbar-btn ${
              editor?.isActive("bulletList") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List size={18} />
          </button>
          <button
            title="Ordered List"
            className={`toolbar-btn ${
              editor?.isActive("orderedList") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={18} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button
            title="Blockquote"
            className={`toolbar-btn ${
              editor?.isActive("blockquote") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={18} />
          </button>
          <button
            title="Code Block"
            className={`toolbar-btn ${
              editor?.isActive("codeBlock") ? "active" : ""
            }`}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            <Code size={18} />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
