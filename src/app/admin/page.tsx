import { Home, BookOpen, FolderTree, TrendingUp, Users, Eye } from 'lucide-react';
import Breadcrumbs from './components/my-breadcrumbs';

export default async function AdminHomePage() {
  // Mock data - in a real app you would fetch this from your database
  const statsData = {
    categories: {
      total: 12,
      trend: '+8%',
      isUp: true
    },
    blogs: {
      total: 48,
      trend: '+12%',
      isUp: true
    },
    views: {
      total: 1254,
      trend: '+24%',
      isUp: true
    }
  };
  
  return (
    <div className="">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin', icon: <Home className="w-4 h-4" /> },
          { label: 'Dashboard' }
        ]}
      />

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Summary Stats */}
      <div className="stats shadow w-full mb-8 bg-gradient-to-r from-base-200 to-base-100">
        <div className="stat">
          <div className="stat-figure text-primary animate-pulse">
            <FolderTree className="w-8 h-8" />
          </div>
          <div className="stat-title font-medium">Categories</div>
          <div className="stat-value text-primary">{statsData.categories.total}</div>
          <div className="stat-desc flex items-center gap-1">
            {statsData.categories.isUp ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingUp className="w-4 h-4 text-error transform rotate-180" />
            )}
            <span className={statsData.categories.isUp ? "text-success" : "text-error"}>
              {statsData.categories.trend} since last month
            </span>
          </div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary animate-bounce">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="stat-title font-medium">Blogs</div>
          <div className="stat-value text-secondary">{statsData.blogs.total}</div>
          <div className="stat-desc flex items-center gap-1">
            {statsData.blogs.isUp ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingUp className="w-4 h-4 text-error transform rotate-180" />
            )}
            <span className={statsData.blogs.isUp ? "text-success" : "text-error"}>
              {statsData.blogs.trend} since last month
            </span>
          </div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <Eye className="w-8 h-8" />
          </div>
          <div className="stat-title font-medium">Total Views</div>
          <div className="stat-value text-accent">{statsData.views.total}</div>
          <div className="stat-desc flex items-center gap-1">
            {statsData.views.isUp ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingUp className="w-4 h-4 text-error transform rotate-180" />
            )}
            <span className={statsData.views.isUp ? "text-success" : "text-error"}>
              {statsData.views.trend} since last month
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Categories Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary/10">
          <div className="card-body">
            <h2 className="card-title text-primary flex justify-between">
              Categories
              <div className="badge badge-primary">{statsData.categories.trend}</div>
            </h2>
            <p>Organize your content with categories</p>
            <div className="mt-4">
              <div className="radial-progress text-primary" style={{"--value": (statsData.categories.total/20)*100} as any} role="progressbar">
                {statsData.categories.total}
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-secondary/10">
          <div className="card-body">
            <h2 className="card-title text-secondary flex justify-between">
              Blogs
              <div className="badge badge-secondary">{statsData.blogs.trend}</div>
            </h2>
            <p>Track your published articles</p>
            <div className="mt-4">
              <progress 
                className="progress progress-secondary w-full" 
                value={statsData.blogs.total} 
                max="100"
              ></progress>
              <p className="text-right mt-1">{statsData.blogs.total}/100</p>
            </div>
          </div>
        </div>

        {/* Views Card */}
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-accent/10">
          <div className="card-body">
            <h2 className="card-title text-accent flex justify-between">
              Total Views
              <div className="badge badge-accent">{statsData.views.trend}</div>
            </h2>
            <p>Monitor user engagement</p>
            <div className="stats bg-base-200 text-base-content mt-2">
              <div className="stat">
                <div className="stat-title">This week</div>
                <div className="stat-value text-accent text-2xl">452</div>
              </div>
              <div className="stat">
                <div className="stat-title">Last week</div>
                <div className="stat-value text-2xl">389</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
