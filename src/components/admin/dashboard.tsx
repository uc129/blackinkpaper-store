'use client';
import PageToolbar from "@/app/page-toolbar";
import { TrendingUp, ShoppingBag, Users, AlertTriangle, ArrowUpRight } from "lucide-react";
import { ContainerSimple, Grid } from "../_ui/containers/container-simple";



export type AdminDashboardProps ={

}

export default function AdminDashboard({}:AdminDashboardProps) {
  // Mock data - eventually fetched from your .NET API
  const stats = [
    { label: 'Total Revenue', value: '₹4,25,000', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Customers', value: '842', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Low Stock Items', value: '5', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <ContainerSimple  className="gap-8">
      {/* 1. Sets the Title in your Redux Toolbar */}
      {/* <PageToolbar title="Dashboard Overview" hide={false} /> */}

      {/* 2. Stats Grid */}
      <Grid className="gap-4">
      {/* <PageToolbar title="Dashboard Overview" hide={false} /> */}

        {stats.map((stat) => (
          <div key={stat.label} className="col-6 lg:col-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-2 py-1 rounded">
                +12% <ArrowUpRight size={12} />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </Grid>

      {/* 3. Recent Activity / Charts Placeholder */}
      <Grid className="grid gap-4">
        {/* Charts etc. */}

        <div className="col-12 lg:col-6 2xl:col-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-75">
          <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
          <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-400">
            [Chart.js or Recharts Component will go here]
          </div>
        </div>

        {/* Recent Orders Card */}

        <div className="col-12 lg:col-6 2xl:col-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">Order #102{i}</p>
                  <p className="text-xs text-slate-500">2 mins ago</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">₹2,499</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View All Orders
          </button>
        </div>


         {/* Recent Activities Card */}
        <div className="col-12 lg:col-6 2xl:col-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">Order #102{i}</p>
                  <p className="text-xs text-slate-500">2 mins ago</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">₹2,499</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View All Activities
          </button>
        </div>
      </Grid>
    </ContainerSimple>
  );
}