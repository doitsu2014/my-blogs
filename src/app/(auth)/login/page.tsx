import SignIn from '../../admin/components/sign-in';

export default async function AuthLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6">Sign in to access the dashboard</p>
        <SignIn />
      </div>
    </div>
  );
}
