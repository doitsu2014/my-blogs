import { useTranslations } from 'next-intl';
import { signInAction } from './sign-in.form-action';

export default function SignIn() {
  const t = useTranslations('components.signInKeycloak')

  return (
    <form
      action={signInAction}
    >
      <button type="submit" className="btn btn-accent w-full">
        {t('title')}
      </button>
    </form>
  );
}
