import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import LoginForm from './login-form';

export const metadata = {
  title: '登入 | Petit Bond',
  description: '賣家後台登入',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/admin/products');
  }

  return <LoginForm />;
}
