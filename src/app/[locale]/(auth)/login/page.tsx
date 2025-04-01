import { useTranslations } from "next-intl";
import SignIn from "../../components/sign-in";

export default function AuthLogin() {
  const t = useTranslations('login')

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-600 mb-6">{t('subtitle')}</p>
        <SignIn />
      </div>
    </div>
  );
}
