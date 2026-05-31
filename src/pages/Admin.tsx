import { useState } from 'react';
import { Users, Globe, Headphones, TrendingUp, Search } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import PlanBadge from '@/components/shared/PlanBadge';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockAdminUsers, mockProjects, mockDFYRequests } from '@/data/mockData';
import { formatDate, initials } from '@/lib/utils';
import type { DFYStatus } from '@/types';

type Tab = 'users' | 'projects' | 'dfy';

const DFY_COLORS: Record<DFYStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  in_review: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  in_progress: 'bg-purple-100 text-purple-700',
  delivered: 'bg-gray-100 text-gray-600',
  rejected: 'bg-red-100 text-red-600',
};

export default function Admin() {
  const [tab, setTab] = useState<Tab>('users');
  const [search, setSearch] = useState('');

  const stats = [
    { icon: Users, label: 'Total users', value: mockAdminUsers.length, color: 'from-blue-400 to-blue-600' },
    { icon: Globe, label: 'Total projects', value: mockProjects.length, color: 'from-emerald-400 to-emerald-600' },
    { icon: Headphones, label: 'DFY requests', value: mockDFYRequests.length, color: 'from-[#e040a0] to-[#8b5cf6]' },
    { icon: TrendingUp, label: 'Paid users', value: mockAdminUsers.filter(u => u.plan !== 'free').length, color: 'from-amber-400 to-orange-500' },
  ];

  const filteredUsers = mockAdminUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-gray-950">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Platform overview and management</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] text-xs font-semibold border border-[#8b5cf6]/20">
          Admin
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className="font-bold text-gray-950 text-2xl leading-none">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-6">
        {([['users', 'Users', Users], ['projects', 'Projects', Globe], ['dfy', 'DFY Requests', Headphones]] as [Tab, string, typeof Users][]).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => { setTab(key); setSearch(''); }}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all ${
              tab === key ? 'border-[#8b5cf6] text-[#8b5cf6]' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${tab}…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
        />
      </div>

      {/* Users table */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {['User', 'Email', 'Plan', 'Credits', 'Joined'].map(h => (
                  <th key={h} className="text-left px-6 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e040a0] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials(user.name)}
                      </div>
                      <span className="font-medium text-gray-950">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4"><PlanBadge plan={user.plan} /></td>
                  <td className="px-6 py-4 font-semibold text-gray-950">{user.credits}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">No users match your search</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Projects table */}
      {tab === 'projects' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {['Project', 'Industry', 'Status', 'Pages', 'Created'].map(h => (
                  <th key={h} className="text-left px-6 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockProjects
                .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
                .map(project => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-950">{project.name}</td>
                  <td className="px-6 py-4 text-gray-500">{project.intake.industry}</td>
                  <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{project.pages.length}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(project.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DFY Requests table */}
      {tab === 'dfy' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {['Applicant', 'Business', 'Budget', 'Timeline', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-6 py-3.5 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockDFYRequests
                .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.businessName.toLowerCase().includes(search.toLowerCase()))
                .map(req => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-950">{req.name}</p>
                    <p className="text-xs text-gray-500">{req.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{req.businessName}</td>
                  <td className="px-6 py-4 text-gray-500">{req.budget}</td>
                  <td className="px-6 py-4 text-gray-500">{req.timeline}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${DFY_COLORS[req.status]}`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(req.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
