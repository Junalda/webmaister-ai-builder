import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Monitor, Tablet, Smartphone, ArrowLeft, RefreshCw, ExternalLink, Pencil,
} from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockProjects } from '@/data/mockData';
import { previewGradient } from '@/data/images';

type Viewport = 'desktop' | 'tablet' | 'mobile';

const VP_WIDTHS: Record<Viewport, string> = {
  desktop: 'w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[390px]',
};

const VP_ICONS: [Viewport, typeof Monitor][] = [
  ['desktop', Monitor],
  ['tablet', Tablet],
  ['mobile', Smartphone],
];

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [activeIdx, setActiveIdx] = useState(0);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <p className="text-gray-500">Project not found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium text-violet-600 hover:underline"
          >
            Back to dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  const activePage = project.pages[activeIdx];
  const grad = previewGradient(project.id);

  function val(field: string, fallback = '') {
    return edits[`${activePage?.id}:${field}`] ?? fallback;
  }

  function save(field: string, value: string) {
    setEdits(prev => ({ ...prev, [`${activePage?.id}:${field}`]: value }));
    setEditingKey(null);
  }

  return (
    <AppLayout>
      {/* Topbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-xl text-gray-950 leading-tight">
                {project.name}
              </h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {project.intake.industry} · {project.intake.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport switcher */}
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-xl p-1">
            {VP_ICONS.map(([vp, Icon]) => (
              <button
                key={vp}
                onClick={() => setViewport(vp)}
                title={vp.charAt(0).toUpperCase() + vp.slice(1)}
                className={`p-2 rounded-lg transition-all ${
                  viewport === vp
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>

          <button
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all shadow-sm"
            style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>
      </div>

      {/* Page tabs */}
      {project.pages.length > 0 && (
        <div className="flex mb-5 border-b border-gray-200 overflow-x-auto">
          {project.pages.map((page, i) => (
            <button
              key={page.id}
              onClick={() => {
                setActiveIdx(i);
                setEditingKey(null);
              }}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap shrink-0 -mb-px ${
                i === activeIdx
                  ? 'border-violet-500 text-violet-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      )}

      {/* Preview frame */}
      <div className="flex justify-center transition-all duration-300">
        <div className={`${VP_WIDTHS[viewport]} w-full transition-all duration-300`}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            {/* Browser chrome */}
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center gap-3 px-4">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 h-5 bg-white rounded border border-gray-200 flex items-center px-3 gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <span className="text-gray-400 text-xs font-mono truncate">
                  {project.name.toLowerCase().replace(/\s+/g, '-')}.webmaister.io/
                  {activePage?.slug ?? ''}
                </span>
              </div>
            </div>

            {/* Page content */}
            {activePage ? (
              <div className="p-8 space-y-6 min-h-[520px]">
                {activePage.content.headline && (
                  <Block
                    fieldKey="headline"
                    value={val('headline', activePage.content.headline)}
                    editing={editingKey === 'headline'}
                    onEdit={() => setEditingKey('headline')}
                    onSave={v => save('headline', v)}
                    onCancel={() => setEditingKey(null)}
                    className="font-display font-bold text-3xl sm:text-4xl text-gray-950 leading-tight"
                  />
                )}
                {activePage.content.subheadline && (
                  <Block
                    fieldKey="subheadline"
                    value={val('subheadline', activePage.content.subheadline)}
                    editing={editingKey === 'subheadline'}
                    onEdit={() => setEditingKey('subheadline')}
                    onSave={v => save('subheadline', v)}
                    onCancel={() => setEditingKey(null)}
                    className="text-lg text-gray-500 leading-relaxed"
                  />
                )}
                {activePage.content.body && (
                  <Block
                    fieldKey="body"
                    value={val('body', activePage.content.body)}
                    editing={editingKey === 'body'}
                    onEdit={() => setEditingKey('body')}
                    onSave={v => save('body', v)}
                    onCancel={() => setEditingKey(null)}
                    className="text-gray-700 leading-relaxed"
                    multiline
                  />
                )}
                {activePage.content.ctaText && (
                  <div>
                    <button
                      className="px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-md"
                      style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
                    >
                      {val('ctaText', activePage.content.ctaText)}
                    </button>
                  </div>
                )}
                {activePage.content.sections?.map(section => (
                  <div
                    key={section.id}
                    className="rounded-2xl bg-gray-50 border border-gray-200 p-6"
                  >
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                      {section.type}
                    </span>
                    {section.heading && (
                      <h3 className="font-display font-semibold text-gray-950 text-lg mb-2">
                        {section.heading}
                      </h3>
                    )}
                    {section.content && (
                      <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                    )}
                  </div>
                ))}
                {(activePage.content.seoTitle || activePage.content.seoDescription) && (
                  <div className="rounded-2xl border border-dashed border-violet-300 bg-violet-50/60 p-5">
                    <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">
                      SEO Preview
                    </p>
                    {activePage.content.seoTitle && (
                      <Block
                        fieldKey="seoTitle"
                        value={val('seoTitle', activePage.content.seoTitle)}
                        editing={editingKey === 'seoTitle'}
                        onEdit={() => setEditingKey('seoTitle')}
                        onSave={v => save('seoTitle', v)}
                        onCancel={() => setEditingKey(null)}
                        className="text-blue-600 font-medium text-sm mb-1"
                      />
                    )}
                    {activePage.content.seoDescription && (
                      <Block
                        fieldKey="seoDescription"
                        value={val('seoDescription', activePage.content.seoDescription)}
                        editing={editingKey === 'seoDescription'}
                        onEdit={() => setEditingKey('seoDescription')}
                        onSave={v => save('seoDescription', v)}
                        onCancel={() => setEditingKey(null)}
                        className="text-gray-600 text-xs leading-relaxed"
                        multiline
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* No pages — abstract gradient placeholder, no images */
              <div
                className={`min-h-[400px] bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-4`}
              >
                <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center">
                  <p className="text-white font-semibold mb-1">No pages generated yet</p>
                  <p className="text-white/70 text-sm">
                    Go back to the wizard to generate website content
                  </p>
                </div>
              </div>
            )}
          </div>

          {activePage && (
            <p className="text-xs text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
              <Pencil className="w-3 h-3" />
              Click any text to edit it inline
            </p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// ——— Inline editable block ———

interface BlockProps {
  fieldKey: string;
  value: string;
  editing: boolean;
  onEdit: () => void;
  onSave: (v: string) => void;
  onCancel: () => void;
  className?: string;
  multiline?: boolean;
}

function Block({ value, editing, onEdit, onSave, onCancel, className, multiline }: BlockProps) {
  const [draft, setDraft] = useState(value);

  if (editing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border-2 border-violet-500 rounded-xl text-sm resize-none focus:outline-none bg-white"
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="w-full px-3 py-2 border-2 border-violet-500 rounded-xl text-sm focus:outline-none bg-white"
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={() => onSave(draft)}
            className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors"
            style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onEdit}
      className={`cursor-text rounded-xl px-2 py-1 -mx-2 hover:bg-yellow-50 hover:outline hover:outline-2 hover:outline-dashed hover:outline-violet-400/40 transition-all group relative ${className}`}
    >
      {value}
      <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs px-2 py-0.5 rounded-lg font-medium pointer-events-none"
        style={{ background: 'linear-gradient(to right, #e040a0, #8b5cf6)' }}
      >
        Edit
      </span>
    </div>
  );
}
