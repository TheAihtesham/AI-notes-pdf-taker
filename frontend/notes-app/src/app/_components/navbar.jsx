
import React from 'react'

const NavbarContent = () => {
    return (
        <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 z-50">
            <div className="text-xl font-bold text-blue-600">PDFSense</div>
            <div className="space-x-6 text-sm text-gray-700">
                <a href="#how-to-use" className="hover:text-blue-600">How to Use</a>
                <a href="#faq" className="hover:text-blue-600">FAQs</a>
            </div>
        </nav>
    )
}

export default NavbarContent
