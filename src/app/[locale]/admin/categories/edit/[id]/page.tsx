import { Home } from 'lucide-react';
import Breadcrumbs from '@/app/[locale]/admin/components/my-breadcrumbs';
import CategoryForm from '../../category-form';

export default async function AdminEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container-fluid mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin', href: '/admin', icon: <Home className="w-4 h-4" /> },
          { label: 'Categories', href: '/admin/categories' },
          { label: 'Edit Category' },
          { label: id }
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
        <CategoryForm id={id} />
      </div>
    </div>
  );
}
