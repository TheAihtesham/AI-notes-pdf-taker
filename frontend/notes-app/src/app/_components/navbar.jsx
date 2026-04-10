import React from 'react'
import Link from 'next/link'

const NavbarContent = () => {
    return (
        <nav className="w-full flex justify-between items-center px-8 md:px-16 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 fixed top-0 z-50">
            {/* Logo with slight letter spacing for a premium feel */}
            <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                PDF<span className="text-blue-600">Sense</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
                <a 
                    href="#how-to-use" 
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                    How to Use
                </a>
                <a 
                    href="#faq" 
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                    FAQs
                </a>
                
                {/* Optional: Simple CTA in Nav */}
                <Link 
                    href="/login" 
                    className="ml-4 px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-all duration-200"
                >
                    Sign In
                </Link>
            </div>

            {/* Mobile Menu Icon (Placeholder for functionality) */}
            <div className="md:hidden text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </div>
        </nav>
    )
}

export default NavbarContent