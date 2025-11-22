import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Navigation() {
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Exams', href: '/exam' },
    { name: 'Labs', href: '/lab' }
  ]

  return (
    <nav className="flex items-center justify-between py-4">
      <Link href="/home" className="flex items-center space-x-2 sm:space-x-3">
        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 cursor-pointer">CyberSec Lab</h1>
      </Link>
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium transition-colors duration-200 text-slate-600 hover:text-blue-600"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
