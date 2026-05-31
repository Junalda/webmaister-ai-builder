import { useState } from 'react';
import { ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditableTextBlock } from '@/components/EditableTextBlock';
import type { WebsitePage } from '@/types';
import { cn } from '@/lib/utils';

interface WebsitePreviewProps {
  pages: WebsitePage[];
  projectName: string;
  onUpdatePage: (pageId: string, field: string, value: string) => void;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

const viewportWidth: Record<ViewportMode, string> = {
  desktop: 'w-full',
  tablet: 'max-w-[768px]',
  mobile: 'max-w-[375px]',
};

export function WebsitePreview({ pages, projectName, onUpdatePage }: WebsitePreviewProps) {
  const [activePage, setActivePage] = useState(pages[0]?.id ?? '');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  const currentPage = pages.find(p => p.id === activePage) ?? pages[0];

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        No pages generated yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 rounded-t-xl">
        {/* Page tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                activePage === page.id
                  ? 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {page.title}
            </button>
          ))}
        </div>

        {/* Viewport toggles */}
        <div className="flex items-center gap-1">
          {([['desktop', Monitor], ['tablet', Tablet], ['mobile', Smartphone]] as const).map(([mode, Icon]) => (
            <button
              key={mode}
              onClick={() => setViewport(mode)}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewport === mode ? 'bg-white shadow-sm border border-gray-200 text-brand-purple' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <Button size="sm" variant="outline" className="text-xs gap-1">
            <ExternalLink className="w-3.5 h-3.5" />
            Preview
          </Button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-6 rounded-b-xl">
        <div className={cn('mx-auto transition-all duration-300', viewportWidth[viewport])}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-400 border border-gray-200 text-left truncate">
                {projectName.toLowerCase().replace(/\s+/g, '-')}.webmaister.io/{currentPage.slug}
              </div>
            </div>

            {/* Page content preview */}
            <div className="p-8 space-y-6">
              {/* Hero section */}
              <div className="text-center py-10 border-b border-gray-50">
                <EditableTextBlock
                  label="Headline"
                  value={currentPage.content.headline}
                  onChange={v => onUpdatePage(currentPage.id, 'headline', v)}
                  className="text-2xl font-display font-bold text-gray-950"
                />
                {currentPage.content.subheadline && (
                  <div className="mt-3">
                    <EditableTextBlock
                      label="Subheadline"
                      value={currentPage.content.subheadline}
                      onChange={v => onUpdatePage(currentPage.id, 'subheadline', v)}
                      className="text-base text-gray-500"
                    />
                  </div>
                )}
                {currentPage.content.ctaText && (
                  <div className="mt-6">
                    <span className="inline-block px-5 py-2.5 rounded-lg bg-gray-950 text-white text-sm font-medium">
                      {currentPage.content.ctaText}
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div>
                <EditableTextBlock
                  label="Body Copy"
                  value={currentPage.content.body}
                  onChange={v => onUpdatePage(currentPage.id, 'body', v)}
                  multiline
                  className="text-sm text-gray-600 leading-relaxed"
                />
              </div>

              {/* SEO section */}
              {(currentPage.content.seoTitle || currentPage.content.seoDescription) && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SEO Preview</p>
                  {currentPage.content.seoTitle && (
                    <EditableTextBlock
                      label="SEO Title"
                      value={currentPage.content.seoTitle}
                      onChange={v => onUpdatePage(currentPage.id, 'seoTitle', v)}
                      className="text-sm text-blue-600"
                    />
                  )}
                  {currentPage.content.seoDescription && (
                    <EditableTextBlock
                      label="Meta Description"
                      value={currentPage.content.seoDescription}
                      onChange={v => onUpdatePage(currentPage.id, 'seoDescription', v)}
                      multiline
                      className="text-xs text-gray-500"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
