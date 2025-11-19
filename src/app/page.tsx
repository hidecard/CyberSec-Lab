'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Bug, Lock, Eye, Target, Zap, Globe, FileText, Key, Link, Users, Package, ArrowLeft, Fingerprint, Monitor, BarChart, Database, TerminalSquare, Code2, Search, Menu, BookOpen } from 'lucide-react'

// Import attack modules
import DOMAttackPlayground from '@/components/DOMAttackPlayground'
import PhishingSimulation from '@/components/PhishingSimulation'
import ClickjackingSimulator from '@/components/ClickjackingSimulator'
import CORSAttackLab from '@/components/CORSAttackLab'
import CSRFAttackLab from '@/components/CSRFAttackLab'
import HTMLInjectionLab from '@/components/HTMLInjectionLab'
import FileUploadAttackLab from '@/components/FileUploadAttackLab'
import JWTTokenTamperingLab from '@/components/JWTTokenTamperingLab'
import AdvancedSocialEngineeringLab from '@/components/AdvancedSocialEngineeringLab'
import APIRateLimitingBypassLab from '@/components/APIRateLimitingBypassLab'
// import WebCachePoisoningLab from '@/components/WebCachePoisoningLab'
import BrowserFingerprintingLab from '@/components/BrowserFingerprintingLab'
import SQLInjectionLab from '@/components/SQLInjectionLab'
import CommandInjectionLab from '@/components/CommandInjectionLab'
import XSSLab from '@/components/XSSLab'
import WebSecurityScannerLab from '@/components/WebSecurityScannerLab'
import CybersecurityRoadmap from '@/components/CybersecurityRoadmap'


interface AttackModule {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  category: string
  icon: React.ReactNode
  status: 'available' | 'coming-soon'
  component?: React.ComponentType
}

const attackModules: AttackModule[] = [
  {
    id: 'cybersecurity-roadmap',
    title: 'Cybersecurity Learning Roadmap',
    description: 'Follow a comprehensive learning path to master cybersecurity concepts, from basics to advanced techniques.',
    difficulty: 'All Levels' as const,
    category: 'Learning',
    icon: <BookOpen className="w-5 h-5" />,
    status: 'available',
    component: CybersecurityRoadmap
  },
  {
    id: 'dom-attacks',
    title: 'DOM-Based Attack Playground',
    description: 'Master DOM-based XSS, DOM clobbering, and client-side injection attacks that bypass traditional filters.',
    difficulty: 'Intermediate',
    category: 'Injection',
    icon: <Bug className="w-5 h-5" />,
    status: 'available',
    component: DOMAttackPlayground
  },
  {
    id: 'phishing',
    title: 'Phishing Simulation',
    description: 'Create and detect sophisticated phishing attacks. Learn how UI deception tricks users and developers.',
    difficulty: 'Beginner',
    category: 'Social Engineering',
    icon: <Eye className="w-5 h-5" />,
    status: 'available',
    component: PhishingSimulation
  },
  {
    id: 'clickjacking',
    title: 'Clickjacking Simulator',
    description: 'Experience invisible iframe attacks and learn how to protect your UI from being hijacked.',
    difficulty: 'Intermediate',
    category: 'Browser Security',
    icon: <Target className="w-5 h-5" />,
    status: 'available',
    component: ClickjackingSimulator
  },
  {
    id: 'cors-attacks',
    title: 'CORS Misconfiguration Lab',
    description: 'Exploit CORS vulnerabilities and understand how cross-origin requests can compromise your frontend.',
    difficulty: 'Advanced',
    category: 'Network Security',
    icon: <Globe className="w-5 h-5" />,
    status: 'available',
    component: CORSAttackLab
  },
  {
    id: 'csrf-attacks',
    title: 'CSRF Attack Lab',
    description: 'Simulate cross-site request forgery attacks and learn token-based defenses.',
    difficulty: 'Intermediate',
    category: 'Session Security',
    icon: <Users className="w-5 h-5" />,
    status: 'available',
    component: CSRFAttackLab
  },
  {
    id: 'html-injection',
    title: 'HTML/URL Injection',
    description: 'Inject malicious HTML and URLs into public pages. Break layouts and steal data.',
    difficulty: 'Beginner',
    category: 'Injection',
    icon: <FileText className="w-5 h-5" />,
    status: 'available',
    component: HTMLInjectionLab
  },
  {
    id: 'file-upload',
    title: 'File Upload Attack',
    description: 'Bypass frontend file validation and upload malicious executables disguised as images.',
    difficulty: 'Intermediate',
    category: 'File Security',
    icon: <Package className="w-5 h-5" />,
    status: 'available',
    component: FileUploadAttackLab
  },
  {
    id: 'jwt-tampering',
    title: 'JWT Token Tampering',
    description: 'Modify client-side JWT tokens to escalate privileges and understand token security.',
    difficulty: 'Advanced',
    category: 'Authentication',
    icon: <Key className="w-5 h-5" />,
    status: 'available',
    component: JWTTokenTamperingLab
  },
  {
    id: 'social-engineering',
    title: 'Advanced Social Engineering',
    description: 'Real-world social engineering scenarios from major security breaches.',
    difficulty: 'Advanced',
    category: 'Social Engineering',
    icon: <Users className="w-5 h-5" />,
    status: 'available',
    component: AdvancedSocialEngineeringLab
  },
  {
    id: 'browser-fingerprinting',
    title: 'Browser Fingerprinting Lab',
    description: 'Learn how attackers uniquely identify and track users without cookies.',
    difficulty: 'Intermediate',
    category: 'Privacy & Tracking',
    icon: <Eye className="w-5 h-5" />,
    status: 'available',
    component: BrowserFingerprintingLab
  },
  {
    id: 'api-rate-limiting',
    title: 'API Rate Limiting Bypass Lab',
    description: 'Learn how attackers bypass API rate limits using distributed attacks and sophisticated techniques.',
    difficulty: 'Advanced',
    category: 'Infrastructure Attacks',
    icon: <BarChart className="w-5 h-5" />,
    status: 'available',
    component: APIRateLimitingBypassLab
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection Lab',
    description: 'Master database injection techniques and learn how to prevent data breaches through SQL vulnerabilities.',
    difficulty: 'Advanced',
    category: 'Injection',
    icon: <Database className="w-5 h-5" />,
    status: 'available',
    component: SQLInjectionLab
  },
  {
    id: 'command-injection',
    title: 'Command Injection Lab',
    description: 'Execute system commands through vulnerable applications and learn critical defense mechanisms.',
    difficulty: 'Advanced',
    category: 'Infrastructure Attacks',
    icon: <TerminalSquare className="w-5 h-5" />,
    status: 'available',
    component: CommandInjectionLab
  },
  {
    id: 'xss-attacks',
    title: 'Cross-Site Scripting (XSS) Lab',
    description: 'Inject malicious scripts into web pages and learn comprehensive XSS defense strategies.',
    difficulty: 'Intermediate',
    category: 'Injection',
    icon: <Code2 className="w-5 h-5" />,
    status: 'available',
    component: XSSLab
  },
  {
    id: 'security-scanner',
    title: 'Web Security Scanner Lab',
    description: 'Learn to identify and analyze web application vulnerabilities using automated scanning tools.',
    difficulty: 'Intermediate',
    category: 'Assessment',
    icon: <Search className="w-5 h-5" />,
    status: 'available',
    component: WebSecurityScannerLab
  },

  {
    id: 'xss-chain',
    title: 'XSS → Account Takeover Chain',
    description: 'Chain XSS attacks into full account compromise. Create self-propagating worms.',
    difficulty: 'Advanced',
    category: 'Advanced Attacks',
    icon: <Zap className="w-5 h-5" />,
    status: 'coming-soon'
  },
  {
    id: 'supply-chain',
    title: 'Supply-Chain Attack',
    description: 'Compromise third-party scripts and CDNs. Learn about Subresource Integrity.',
    difficulty: 'Advanced',
    category: 'Infrastructure',
    icon: <Link className="w-5 h-5" />,
    status: 'coming-soon'
  }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'home' | 'modules' | 'learning'>('home')
  const [currentModule, setCurrentModule] = useState<string | null>(null)

  const scrollToSection = (section: 'home' | 'modules' | 'learning') => {
    setActiveSection(section)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleModuleClick = (moduleId: string) => {
    if (attackModules.find(m => m.id === moduleId)?.status === 'available') {
      setCurrentModule(moduleId)
      window.location.hash = `#${moduleId}`
    }
  }

  const handleBackToHome = () => {
    setCurrentModule(null)
    window.location.hash = ''
  }

  const filteredModules = attackModules.filter(module => {
    const matchesCategory = selectedCategory === 'All' || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || module.difficulty === selectedDifficulty
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && attackModules.find(m => m.id === hash)) {
      setCurrentModule(hash)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'modules', 'learning']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section as 'home' | 'modules' | 'learning')
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Render specific module if selected
  if (currentModule) {
    const selectedModule = attackModules.find(m => m.id === currentModule)
    if (selectedModule?.component) {
      const ModuleComponent = selectedModule.component
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
          {/* Back Button */}
          <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={handleBackToHome}
                  variant="outline"
                  className="hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Modules
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg shadow-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium">Module Active</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <ModuleComponent />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">CyberSec Lab</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('modules')}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === 'modules' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Modules
                </button>
                <button
                  onClick={() => scrollToSection('learning')}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === 'learning' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Learning Path
                </button>
              </nav>
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200/50 py-3">
              <nav className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    scrollToSection('home')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-sm font-medium text-left transition-colors duration-200 ${
                    activeSection === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    scrollToSection('modules')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-sm font-medium text-left transition-colors duration-200 ${
                    activeSection === 'modules' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Modules
                </button>
                <button
                  onClick={() => {
                    scrollToSection('learning')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-sm font-medium text-left transition-colors duration-200 ${
                    activeSection === 'learning' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  Learning Path
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section id="home" className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Master Cybersecurity Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline"> Hands-On Labs</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore interactive security labs covering XSS, SQL injection, CSRF, and more. Learn by doing in a safe, controlled environment designed for cybersecurity professionals and enthusiasts.
          </p>
        </section>

        {/* Filters */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="All">All Categories</option>
                <option value="Injection">Injection</option>
                <option value="Social Engineering">Social Engineering</option>
                <option value="Authentication">Authentication</option>
                <option value="Network">Network</option>
                <option value="Browser">Browser</option>
                <option value="Practice">Practice</option>
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Attack Modules Grid */}
        <section id="modules" className="mb-12 sm:mb-16 px-4 sm:px-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center sm:text-left">Security Labs & Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredModules.map((module) => (
              <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 hover:border-blue-200/50 bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                      {module.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {module.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {module.description}
                  </CardDescription>
                  {module.status === 'available' && (
                    <Button
                      onClick={() => handleModuleClick(module.id)}
                      className="w-full mt-4 group-hover:shadow-md transition-all duration-300 group-hover:from-blue-500 group-hover:to-blue-600"
                      size="sm"
                    >
                      <span className="flex items-center justify-center">
                        Start Attack Simulation
                        <ArrowLeft className="w-3 h-3 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Path */}
        <section id="learning" className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">🎯 Cybersecurity Learning Roadmap</h3>
          <p className="text-center text-slate-600 mb-6">Start your cybersecurity journey with our comprehensive learning path</p>
          <div className="text-center">
            <Button
              onClick={() => handleModuleClick('cybersecurity-roadmap')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              View Full Roadmap
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}


