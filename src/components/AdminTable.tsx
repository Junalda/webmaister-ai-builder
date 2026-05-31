import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface AdminTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function AdminTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No data available.',
}: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                {columns.map(col => {
                  const value = row[col.key as keyof T];
                  return (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                      {col.render ? col.render(value, row) : String(value ?? '—')}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Reusable status badge for admin tables
export function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    in_review: 'bg-blue-50 text-blue-700 border-blue-200',
    accepted: 'bg-purple-50 text-purple-700 border-purple-200',
    in_progress: 'bg-orange-50 text-orange-700 border-orange-200',
    delivered: 'bg-green-50 text-green-700 border-green-200',
    active: 'bg-green-50 text-green-700 border-green-200',
    canceled: 'bg-red-50 text-red-700 border-red-200',
    free: 'bg-gray-50 text-gray-600 border-gray-200',
    starter: 'bg-blue-50 text-blue-700 border-blue-200',
    pro: 'bg-purple-50 text-purple-700 border-purple-200',
    agency: 'bg-pink-50 text-pink-700 border-pink-200',
    draft: 'bg-gray-50 text-gray-600 border-gray-200',
    ready: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <Badge className={cn('text-xs font-medium border capitalize', colorMap[status] ?? 'bg-gray-50 text-gray-600 border-gray-200')}>
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
