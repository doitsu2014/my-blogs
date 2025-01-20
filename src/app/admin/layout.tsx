import { auth, signIn } from '@/auth';

export default async function AdminLayout({}: { children: React.ReactNode }) {
  console.log(auth);
  const session = await auth();
  // if (session) {
  //   return (
  //     <>
  //       {session.user?.email}
  //
  //       <button
  //         onClick={async () => {
  //           'use server';
  //           await signOut();
  //         }}
  //       >
  //         Sign out
  //       </button>
  //     </>
  //   );
  // }
  //
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>

        <div>
          <>
            Not signed in <br />
            <button
              onClick={async () => {
                'use server';
                await signIn('keycloak');
              }}
            >
              Sign in
            </button>
          </>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="min-h-screen bg-base-300">
          <div className="flex w-full h-40">
            <h1 className="flex-1 text-center">Good morning</h1>
          </div>
          <ul className="menu w-60">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
