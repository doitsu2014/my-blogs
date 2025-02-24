import { auth, signOut } from '@/auth';
import MenuItem from './menu-item';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Heroicons

export default async function LeftMenu() {
  const session = await auth();
  const avatar = session?.user?.image || undefined;
  return (
    <div className="w-64 min-h-screen bg-base-200 flex flex-col p-4">
      <div className="flex items-center space-x-3 p-2 bg-base-100 rounded-box shadow-md">
        {avatar ? (
          <img src={avatar} alt="User Avatar" className="w-16 h-16 rounded-full border" />
        ) : (
          <UserCircleIcon className="w-16 h-16 text-gray-500" /> // Fallback Icon
        )}
        <div>
          <h2 className="text-lg font-bold">{session?.user?.name}</h2>
          <p className="text-sm text-gray-500 truncate w-40">
            {session?.user?.email || 'admin@example.com'}
          </p>
        </div>
      </div>
      <ul className="menu bg-base-200 rounded-box flex-1 mt-4">
        <li>
          <MenuItem displayName="Dashboard" slug="/admin/dashboard" />
        </li>
        <li>
          <details open>
            <summary>Resources</summary>
            <ul>
              <li>
                <MenuItem displayName="Categories" slug="/admin/categories" />
              </li>
              <li>
                <MenuItem displayName="Blogs" slug="/admin/blogs" />
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <div className="mt-4 pb-6">
        {session ? (
          <button
            className="btn btn-error w-full"
            onClick={async () => {
              'use server';
              await signOut();
            }}
          >
            Logout
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
