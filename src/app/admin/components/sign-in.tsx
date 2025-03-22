import { signInAction } from './sign-in.form-action';

export default function SignIn() {
  return (
    <form
      action={signInAction}
    >
      <button type="submit" className="btn btn-accent w-full">
        Signin with Keycloak
      </button>
    </form>
  );
}
