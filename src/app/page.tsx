'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Shield, Bug, Lock, Eye, Target, Zap, Globe, FileText, Key, Link, Users, Package, ArrowLeft, Fingerprint, Monitor, BarChart, Database, TerminalSquare, Code2, Search, Menu } from 'lucide-react'

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


interface AttackModule {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  icon: React.ReactNode
  status: 'available' | 'coming-soon'
  component?: React.ComponentType
}

const attackModules: AttackModule[] = [
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

const difficultyColors = {
  Beginner: 'bg-green-100 text-green-800 border-green-200',
  Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Advanced: 'bg-red-100 text-red-800 border-red-200'
}

const categoryColors = {
  'Injection': 'bg-purple-50 text-purple-700 border-purple-200',
  'Social Engineering': 'bg-blue-50 text-blue-700 border-blue-200',
  'Browser Security': 'bg-orange-50 text-orange-700 border-orange-200',
  'Network Security': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Session Security': 'bg-pink-50 text-pink-700 border-pink-200',
  'File Security': 'bg-amber-50 text-amber-700 border-amber-200',
  'Authentication': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Advanced Attacks': 'bg-red-50 text-red-700 border-red-200',
  'Infrastructure': 'bg-gray-50 text-gray-700 border-gray-200',
  'Privacy & Tracking': 'bg-teal-50 text-teal-700 border-teal-200',
  'Infrastructure Attacks': 'bg-red-50 text-red-700 border-red-200',
  'Assessment': 'bg-green-50 text-green-700 border-green-200',
  'Practice': 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200'
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [currentModule, setCurrentModule] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && attackModules.find(m => m.id === hash)) {
      setCurrentModule(hash)
    }
  }, [])

  const categories = ['all', ...Array.from(new Set(attackModules.map(m => m.category)))]
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredModules = attackModules.filter(module => {
    const categoryMatch = selectedCategory === 'all' || module.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Button 
                  onClick={handleBackToHome}
                  variant="outline"
                  className="mb-2 sm:mb-0 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Modules
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg shadow-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      {selectedModule.title}
                    </h1>
                    <p className="text-slate-600 text-sm">{selectedModule.description}</p>
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
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CyberSec Lab
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Home
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Modules
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
                Learning Path
              </Button>
              <Badge variant="outline" className="border-slate-300 bg-white/50">
                <Shield className="w-3 h-3 mr-1" />
                Learn by Attacking
              </Badge>
            </nav>
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => {/* TODO: Implement mobile menu toggle */}}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Hero Section */}
          <div className="py-6 sm:py-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Interactive Cybersecurity Training Platform
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Master real-world security vulnerabilities through hands-on attack simulations.
                Learn ethical hacking techniques and defense strategies in a safe, controlled environment.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Warning Banner */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl shadow-sm">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-lg sm:text-xl">⚠️ Ethical Learning Environment</h3>
              <p className="text-amber-800 text-sm sm:text-base mt-2 leading-relaxed">
                This is a controlled learning environment for educational purposes only. 
                These techniques are demonstrated to help you understand and defend against real attacks. 
                Never use these methods against unauthorized systems.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'shadow-md scale-105' 
                        : 'hover:scale-105 hover:shadow-sm'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`text-xs transition-all duration-200 ${
                      selectedDifficulty === difficulty 
                        ? 'shadow-md scale-105' 
                        : 'hover:scale-105 hover:shadow-sm'
                    }`}
                  >
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredModules.map(module => (
            <Card 
              key={module.id} 
              className={`group relative overflow-hidden transition-all duration-300 cursor-pointer rounded-xl border border-slate-200/50 ${
                module.status === 'coming-soon' 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:shadow-xl hover:scale-105 hover:-translate-y-1 hover:border-slate-300 hover:bg-white/80'
              }`}
              onClick={() => module.status === 'available' && handleModuleClick(module.id)}
            >
              {/* Gradient overlay for available modules */}
              {module.status === 'available' && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      module.status === 'available' 
                        ? 'bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-slate-200 group-hover:to-slate-300' 
                        : 'bg-slate-100'
                    }`}>
                      <div className={`${module.status === 'available' ? 'text-slate-700' : 'text-slate-500'}`}>
                        {module.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight truncate">
                        {module.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium ${difficultyColors[module.difficulty]}`}
                        >
                          {module.difficulty}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-medium ${categoryColors[module.category as keyof typeof categoryColors]}`}
                        >
                          {module.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {module.status === 'coming-soon' && (
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600 border-slate-200">
                      Coming Soon
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {module.description}
                </CardDescription>
                {module.status === 'available' && (
                  <Button className="w-full mt-4 group-hover:shadow-md transition-all duration-300 group-hover:from-blue-500 group-hover:to-blue-600" size="sm">
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

        {/* Learning Path */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">🎯 Recommended Learning Path</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { step: 1, color: 'bg-blue-500', title: 'Injection', desc: 'XSS, HTML injection' },
              { step: 2, color: 'bg-green-500', title: 'Browser Attacks', desc: 'Clickjacking, Keylogging' },
              { step: 3, color: 'bg-yellow-500', title: 'Session & Auth', desc: 'CSRF, Token theft' },
              { step: 4, color: 'bg-orange-500', title: 'Network Attacks', desc: 'CORS, MITM' },
              { step: 5, color: 'bg-red-500', title: 'Advanced', desc: 'Chaining, Supply chain' }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}