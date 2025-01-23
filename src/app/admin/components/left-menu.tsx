import { auth, signOut } from '@/auth';
import SignIn from './sign-in';

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
              {/* <div className="flex w-8 max-w-8"> */}
              {/*   <p className="w-8 max-w-8 overflow-y-scroll"> */}
              {/*     {session.user?.roles?.reduce((a, b) => `${a} ${b}`)} */}
              {/*   </p> */}
              {/* </div> */}
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
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
