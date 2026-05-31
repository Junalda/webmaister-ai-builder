import { useState } from 'react';
import { Users, Globe, Headphones, TrendingUp, CreditCard, FileText } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import PlanBadge from '@/components/shared/PlanBadge';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockAdminUsers, mockProjects, mockDFYRequests } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import type { DFYStatus } from '@/types';

type Tab = 'users' | 'projects' | 'dfy';

const DFY_STATUS_COLORS: Record<DFYStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  in_review: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  in_progress: 'bg-purple-100 text-purple-700',
  delivered: 'bg-gray-100 text-gray-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function Admin() {
  const [tab, setTab] = useState<Tab>('users');

  const stats = [
    { icon: Users, label: 'Total users', value: mockAdminUsers.length },
    { icon: Globe, label: 'Total projects', value: mockProjects.length },
    { icon: Headphones, label: 'DFY requests', value: mockDFYRequests.length },
    { icon: TrendingUp, label: 'Pro/Agency users', value: mockAdminUsers.filter(u => u.plan === 'pro' || u.plan === 'agency').length },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-gray-950 mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 px-6 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-brand-purple" />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-0.5">{label}</p>
              <p className="font-bold text-gray-950 text-2xl">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {([
          ['users', 'Users', Users],
          ['projects', 'Projects', Globe],
          ['dfy', 'DFY Requests', Headphones],
        ] as [Tab, string, typeof Users][]).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all ${
              tab === key ? 'border-brand-purple text-brand-purple' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Users table */}
      {tab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Plan</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Credits</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Joined</th>
              </tr>
            </thead>
            <tbody>
              {mockAdminUsers.map((user, i) => (
                <tr key={user.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === mockAdminUsers.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-950">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4"><PlanBadge plan={user.plan} /></td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{user.credits}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
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
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Project</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Pages</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.map((project, i) => (
                <tr key={project.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === mockProjects.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-6 py-4 font-medium text-gray-950">{project.name}</td>
                  <td className="px-6 py-4 text-gray-500">{project.intake.industry}</td>
                  <td className="px-6 py-4"><StatusBadge status={project.status} /></td>
                  <td className="px-6 py-4 text-gray-700">{project.pages.length}</td>
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
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Business</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Budget</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Timeline</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-700">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {mockDFYRequests.map((req, i) => (
                <tr key={req.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i === mockDFYRequests.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-950">{req.name}</p>
                    <p className="text-xs text-gray-500">{req.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{req.businessName}</td>
                  <td className="px-6 py-4 text-gray-500">{req.budget}</td>
                  <td className="px-6 py-4 text-gray-500">{req.timeline}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${DFY_STATUS_COLORS[req.status]}`}>
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
