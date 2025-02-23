import { auth, signOut } from '@/auth';
import SignIn from './sign-in';
import MenuItem from './menu-item';

export default async function LeftMenu() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-base-300">
      <div className="flex flex-col w-full h-40 shadow-sm">
        <h1 className="flex-1 text-center">Good morning</h1>
        {session ? (
          <div className="flex-1 text-center">
            <h3>
              {session.user?.email}
              <br />
            </h3>
            <button
              onClick={async () => {
                'use server';
                await signOut();
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex-1 text-center">
            <SignIn />
          </div>
        )}
      </div>
      <ul className="menu w-60">
        {session ? (
          <>
            <li>
              <MenuItem displayName="Home" slug="/admin" />
            </li>
            <li>
              <MenuItem displayName="Blogs" slug="/admin/blogs" />
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
