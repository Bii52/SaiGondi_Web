"use client";

import { useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiImage, FiVideo } from "react-icons/fi";

interface PostFormProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export default function PostForm({
  title,
  content,
  onTitleChange,
  onContentChange,
}: PostFormProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const placeCaretInside = (el: HTMLElement, atEnd = false) => {
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(atEnd);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  };

  const moveCaretAfterFigure = (figure: Element | HTMLElement) => {
    const htmlElement = figure as HTMLElement;
    
    if (!htmlElement.nextSibling && htmlElement.parentNode) {
      const p = document.createElement("p");
      p.innerHTML = "<br>";
      htmlElement.parentNode.insertBefore(p, htmlElement.nextSibling);
    }

    const sel = window.getSelection();
    if (!sel) return;
    
    const range = document.createRange();
    range.setStartAfter(htmlElement);
    range.collapse(true);
    
    sel.removeAllRanges();
    sel.addRange(range);
    editorRef.current?.focus();
  };

  const insertImage = (url: string) => {
    const capId = `cap-${Date.now()}`;
    execCommand(
      "insertHTML",
      `
      <figure class="editor-figure" contenteditable="false" style="margin:8px 0; text-align:center;">
        <img src="${url}" style="max-width:100%; border-radius:6px; display:inline-block;" />
        <figcaption 
          id="${capId}" 
          data-caption 
          data-placeholder="Nhập nội dung ghi chú (Không bắt buộc)" 
          contenteditable="true" 
          style="display:block; margin-top:6px; outline:none; min-height:1.2em;"
        ></figcaption>
      </figure>
      `
    );

    setTimeout(() => {
      const cap = editorRef.current?.querySelector<HTMLElement>(`#${capId}`);
      if (cap) placeCaretInside(cap, false);
    }, 50);
  };

  const insertVideo = (url: string) => {
    const capId = `cap-${Date.now()}`;
    execCommand(
      "insertHTML",
      `
      <figure class="editor-figure" contenteditable="false" style="margin:8px 0; text-align:center;">
        <video controls src="${url}" style="max-width:100%; border-radius:6px; display:inline-block;"></video>
        <figcaption 
          id="${capId}" 
          data-caption 
          data-placeholder="Nhập nội dung ghi chú (Không bắt buộc)" 
          contenteditable="true" 
          style="display:block; margin-top:6px; outline:none; min-height:1.2em;"
        ></figcaption>
      </figure>
      `
    );

    setTimeout(() => {
      const cap = editorRef.current?.querySelector<HTMLElement>(`#${capId}`);
      if (cap) placeCaretInside(cap, false);
    }, 50);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    insertImage(imageUrl);
    e.target.value = "";
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const videoUrl = URL.createObjectURL(file);
    insertVideo(videoUrl);
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (e.key === "Enter" && target?.hasAttribute("data-caption")) {
      e.preventDefault();
      e.stopPropagation();

      const figure = target.closest(".editor-figure");
      if (figure) moveCaretAfterFigure(figure);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    editorRef.current?.querySelectorAll<HTMLElement>("[data-caption]").forEach((caption) => {
      if (caption.innerHTML.trim() === "<br>" || caption.innerHTML.trim() === "&nbsp;") {
        caption.innerHTML = "";
      }
    });
    
    onContentChange((e.target as HTMLDivElement).innerHTML);
  };

  return (
    <div className="bg-[var(--background)] rounded-lg border border-[var(--gray-5)] p-5">
      <h3 className="font-bold mb-3 text-[var(--foreground)]">THÔNG TIN BÀI ĐĂNG</h3>

      <label className="font-medium text-[var(--gray-2)] mb-1 pt-2">Tiêu đề</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Nhập tiêu đề..."
        className="w-full bg-[#F9F9FC] border border-[var(--gray-5)] rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-[var(--primary)]"
      />

      <div className="flex justify-between items-center mb-2 pt-6">
        <span className="font-medium text-[var(--gray-2)]">Nội dung</span>
        <div className="flex gap-2">
          <button type="button" title="In đậm" className="p-2 hover:bg-[var(--gray-6)] rounded" onClick={() => execCommand("bold")}>
            <FiBold />
          </button>
          <button type="button" title="In nghiêng" className="p-2 hover:bg-[var(--gray-6)] rounded" onClick={() => execCommand("italic")}>
            <FiItalic />
          </button>
          <button type="button" title="Gạch chân" className="p-2 hover:bg-[var(--gray-6)] rounded" onClick={() => execCommand("underline")}>
            <FiUnderline />
          </button>
          <button type="button" title="Thêm hình" className="p-2 hover:bg-[var(--gray-6)] rounded" onClick={() => imageInputRef.current?.click()}>
            <FiImage />
          </button>
          <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <button type="button" title="Thêm video" className="p-2 hover:bg-[var(--gray-6)] rounded" onClick={() => videoInputRef.current?.click()}>
            <FiVideo />
          </button>
          <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full bg-[#F9F9FC] border border-[var(--gray-5)] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] h-[450px] overflow-y-auto"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />

      <style jsx global>{`
        [data-caption]:empty::before,
        [data-caption]:has(> br:only-child)::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
          pointer-events: none;
        }
        .editor-figure img,
        .editor-figure video {
          max-width: 100%;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}