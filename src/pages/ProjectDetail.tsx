import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Monitor, Tablet, Smartphone, ArrowLeft, RefreshCw, ExternalLink } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockProjects } from '@/data/mockData';

type Viewport = 'desktop' | 'tablet' | 'mobile';

const viewportWidths: Record<Viewport, string> = {
  desktop: 'w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[375px]',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 mb-4">Project not found.</p>
          <button onClick={() => navigate('/dashboard')} className="text-brand-purple hover:underline text-sm font-medium">
            Back to dashboard
          </button>
        </div>
      </AppLayout>
    );
  }

  const pages = project.pages;
  const activePage = pages[activePageIdx];

  function getContent(field: string, fallback: string) {
    const key = `${activePage?.id}:${field}`;
    return edits[key] ?? fallback;
  }

  function saveEdit(field: string, value: string) {
    const key = `${activePage?.id}:${field}`;
    setEdits(prev => ({ ...prev, [key]: value }));
    setEditingId(null);
  }

  return (
    <AppLayout>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl text-gray-950">{project.name}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{project.intake.industry} · {project.intake.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as [Viewport, typeof Monitor][]).map(([vp, Icon]) => (
              <button
                key={vp}
                onClick={() => setViewport(vp)}
                className={`p-2 rounded-lg transition-colors ${viewport === vp ? 'bg-white shadow-sm text-gray-950' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white text-sm font-semibold hover:from-brand-pink-dark hover:to-brand-purple-dark transition-all shadow-sm">
            <ExternalLink className="w-3.5 h-3.5" />
            Publish
          </button>
        </div>
      </div>

      {/* Page tabs */}
      {pages.length > 0 && (
        <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
          {pages.map((page, i) => (
            <button
              key={page.id}
              onClick={() => setActivePageIdx(i)}
              className={`px-4 py-2.5 text-sm font-medium shrink-0 border-b-2 transition-all -mb-px ${
                i === activePageIdx
                  ? 'border-brand-purple text-brand-purple'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      )}

      {/* Preview frame */}
      <div className="flex justify-center">
        <div className={`${viewportWidths[viewport]} transition-all duration-300 mx-auto`}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Browser chrome */}
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <div className="flex-1 mx-4 bg-white rounded-md h-5 border border-gray-200 flex items-center px-3">
                <span className="text-gray-400 text-xs truncate">{project.name.toLowerCase().replace(/\s+/g, '')}.com/{activePage?.slug}</span>
              </div>
            </div>

            {/* Page content */}
            {activePage ? (
              <div className="p-8 space-y-6 min-h-[500px]">
                {/* Headline */}
                {activePage.content.headline && (
                  <EditableBlock
                    fieldId="headline"
                    value={getContent('headline', activePage.content.headline)}
                    editing={editingId === 'headline'}
                    onEdit={() => setEditingId('headline')}
                    onSave={v => saveEdit('headline', v)}
                    onCancel={() => setEditingId(null)}
                    className="text-3xl font-display font-bold text-gray-950"
                    multiline={false}
                  />
                )}
                {/* Subheadline */}
                {activePage.content.subheadline && (
                  <EditableBlock
                    fieldId="subheadline"
                    value={getContent('subheadline', activePage.content.subheadline)}
                    editing={editingId === 'subheadline'}
                    onEdit={() => setEditingId('subheadline')}
                    onSave={v => saveEdit('subheadline', v)}
                    onCancel={() => setEditingId(null)}
                    className="text-lg text-gray-500 leading-relaxed"
                    multiline={false}
                  />
                )}
                {/* Body */}
                {activePage.content.body && (
                  <EditableBlock
                    fieldId="body"
                    value={getContent('body', activePage.content.body)}
                    editing={editingId === 'body'}
                    onEdit={() => setEditingId('body')}
                    onSave={v => saveEdit('body', v)}
                    onCancel={() => setEditingId(null)}
                    className="text-gray-700 leading-relaxed"
                    multiline={true}
                  />
                )}
                {/* CTA */}
                {activePage.content.ctaText && (
                  <div>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple text-white font-semibold text-sm shadow-md">
                      {getContent('ctaText', activePage.content.ctaText)}
                    </button>
                  </div>
                )}
                {/* Sections */}
                {activePage.content.sections?.map(section => (
                  <div key={section.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{section.type}</div>
                    {section.heading && <h3 className="font-display font-semibold text-gray-950 text-lg mb-2">{section.heading}</h3>}
                    {section.content && <p className="text-gray-600 text-sm">{section.content}</p>}
                  </div>
                ))}
                {/* SEO block */}
                {(activePage.content.seoTitle || activePage.content.seoDescription) && (
                  <div className="border border-dashed border-brand-purple/30 rounded-xl p-5 bg-brand-purple/5">
                    <p className="text-xs font-semibold text-brand-purple mb-2 uppercase tracking-wide">SEO Preview</p>
                    {activePage.content.seoTitle && <p className="text-blue-600 font-medium text-sm mb-1">{getContent('seoTitle', activePage.content.seoTitle)}</p>}
                    {activePage.content.seoDescription && <p className="text-gray-600 text-xs leading-relaxed">{getContent('seoDescription', activePage.content.seoDescription)}</p>}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <p className="text-sm">No pages generated yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Inline editable block component
interface EditableBlockProps {
  fieldId: string;
  value: string;
  editing: boolean;
  onEdit: () => void;
  onSave: (v: string) => void;
  onCancel: () => void;
  className?: string;
  multiline?: boolean;
}

function EditableBlock({ value, editing, onEdit, onSave, onCancel, className, multiline }: EditableBlockProps) {
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
            className="w-full px-3 py-2 border-2 border-brand-purple rounded-lg text-sm resize-none focus:outline-none"
          />
        ) : (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="w-full px-3 py-2 border-2 border-brand-purple rounded-lg text-sm focus:outline-none"
          />
        )}
        <div className="flex gap-2">
          <button onClick={() => onSave(draft)} className="px-3 py-1.5 rounded-lg bg-brand-purple text-white text-xs font-medium">Save</button>
          <button onClick={onCancel} className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-medium">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onEdit}
      className={`cursor-text rounded-lg px-2 py-1 -mx-2 -my-1 hover:bg-brand-purple/5 hover:outline hover:outline-2 hover:outline-dashed hover:outline-brand-purple/30 transition-all group relative ${className}`}
    >
      {value}
      <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-brand-purple font-medium bg-white px-1.5 py-0.5 rounded shadow-sm border border-brand-purple/20">
        Edit
      </span>
    </div>
  );
}
