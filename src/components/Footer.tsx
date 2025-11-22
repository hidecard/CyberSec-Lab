import React from 'react'
import { Twitter, Facebook, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left max-w-xs">
          <h4 className="text-2xl font-extrabold mb-2 text-white">CyberSec Lab</h4>
          <p className="text-gray-400 text-sm">
            Empowering you with hands-on cybersecurity experience through interactive labs and challenges.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition-colors duration-300"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white transition-colors duration-300"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-white transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-xs select-none">
        &copy; {new Date().getFullYear()} CyberSec Lab. All rights reserved.
      </div>
    </footer>
  )
}
