'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="font-noto-sans-tc cursor-pointer text-sm text-taupe-500 hover:text-pb-green transition-colors font-medium"
    >
      登出
    </button>
  );
}
