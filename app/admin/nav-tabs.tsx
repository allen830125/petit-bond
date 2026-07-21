import Link from 'next/link';

const TABS = [
  { href: '/admin/products', key: 'products', label: '商品管理' },
  { href: '/admin/inquiries', key: 'inquiries', label: '預購單管理' },
] as const;

export default function AdminNavTabs({ active }: { active: 'products' | 'inquiries' }) {
  return (
    <div className="flex gap-6 -mb-px">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`font-noto-sans-tc text-sm py-3 border-b-2 transition-colors ${
            active === tab.key
              ? 'border-pb-green text-pb-green font-medium'
              : 'border-transparent text-taupe-500 hover:text-taupe-700'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
