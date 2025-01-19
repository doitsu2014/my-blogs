import { auth, signIn, signOut } from '@/auth';

export default async function AdminLayout({}: { children: React.ReactNode }) {
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
    <div>
      <ul className="menu bg-base-200 rounded-box w-56">
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
  );
}
