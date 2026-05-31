import { useState, useRef, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableTextBlockProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
}

export function EditableTextBlock({
  value,
  onChange,
  multiline = false,
  className,
  placeholder = 'Click to edit...',
  label,
}: EditableTextBlockProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      setDraft(value);
    }
  }, [editing, value]);

  function save() {
    onChange(draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !multiline) { e.preventDefault(); save(); }
    if (e.key === 'Escape') cancel();
    if (e.key === 'Enter' && e.metaKey && multiline) save();
  }

  return (
    <div className="group relative">
      {label && (
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{label}</p>
      )}

      {editing ? (
        <div className="relative">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              placeholder={placeholder}
              className={cn(
                'w-full px-3 py-2 rounded-lg border-2 border-brand-purple/50 bg-white text-gray-900 text-sm resize-none outline-none focus:border-brand-purple transition-colors',
                className
              )}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                'w-full px-3 py-2 rounded-lg border-2 border-brand-purple/50 bg-white text-gray-900 text-sm outline-none focus:border-brand-purple transition-colors',
                className
              )}
            />
          )}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={save}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-purple text-white text-xs font-medium hover:bg-brand-purple-dark transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            {multiline && (
              <span className="text-xs text-gray-400 ml-2">⌘+Enter to save</span>
            )}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'relative cursor-pointer rounded-lg px-3 py-2 -mx-3 hover:bg-brand-purple/5 transition-colors',
          )}
          onClick={() => setEditing(true)}
        >
          <span className={cn('text-sm text-gray-800', !value && 'text-gray-400 italic', className)}>
            {value || placeholder}
          </span>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md bg-white shadow-sm border border-gray-100">
            <Pencil className="w-3 h-3 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}
