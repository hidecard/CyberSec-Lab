'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Code, Shield, Database, Globe, Lock, Eye, Target, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function ModulePage() {
  const modules = [
    {
      id: 'web-security-basics',
      title: 'Web Security Basics',
      description: 'Learn fundamental web security concepts including HTTP, HTTPS, and basic authentication.',
      level: 'Beginner',
      duration: '2 hours',
      icon: Globe,
      topics: ['HTTP/HTTPS', 'Authentication', 'Session Management']
    },
    {
      id: 'xss-attacks',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Master XSS attacks and defenses through interactive labs and real-world scenarios.',
      level: 'Intermediate',
      duration: '4 hours',
      icon: Code,
      topics: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS']
    },
    {
      id: 'sql-injection',
      title: 'SQL Injection Attacks',
      description: 'Understand SQL injection vulnerabilities and learn how to prevent them.',
      level: 'Intermediate',
      duration: '3 hours',
      icon: Database,
      topics: ['Union-based', 'Blind SQLi', 'Time-based attacks']
    },
    {
      id: 'csrf-protection',
      title: 'CSRF & Authentication',
      description: 'Learn about Cross-Site Request Forgery and secure authentication mechanisms.',
      level: 'Intermediate',
      duration: '3 hours',
      icon: Shield,
      topics: ['CSRF Tokens', 'SameSite Cookies', 'OAuth']
    },
    {
      id: 'advanced-attacks',
      title: 'Advanced Attack Techniques',
      description: 'Explore complex attack vectors including command injection and file upload vulnerabilities.',
      level: 'Advanced',
      duration: '5 hours',
      icon: Target,
      topics: ['Command Injection', 'File Upload Attacks', 'Race Conditions']
    },
    {
      id: 'cryptography-fundamentals',
      title: 'Cryptography Fundamentals',
      description: 'Master encryption, hashing, and digital signatures for secure communications.',
      level: 'Intermediate',
      duration: '4 hours',
      icon: Lock,
      topics: ['Symmetric Encryption', 'Hash Functions', 'Digital Certificates']
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navigation />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
            Cybersecurity Learning
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline"> Modules</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive collection of cybersecurity modules. Each module includes interactive labs, detailed explanations, and hands-on practice to build your security expertise.
          </p>
        </section>

        {/* Modules Grid */}
        <section className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {modules.map((module) => (
              <Card key={module.id} className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <module.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge className={getLevelColor(module.level)}>
                      {module.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>Duration: {module.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      <a href="/lab">
                        Start Module
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="mb-12 sm:mb-16 p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4">Recommended Learning Path</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Follow our structured learning path to build a strong foundation in cybersecurity, from basics to advanced concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Phase 1: Foundations</h4>
              <p className="text-sm text-slate-600">Web Security Basics, Authentication</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Phase 2: Core Attacks</h4>
              <p className="text-sm text-slate-600">XSS, SQL Injection, CSRF</p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Phase 3: Advanced</h4>
              <p className="text-sm text-slate-600">Cryptography, Advanced Attacks</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Ready to Start Learning?</h3>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Begin with our foundational modules or jump into specific topics that interest you most.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <BookOpen className="w-5 h-5 mr-2" />
            View All Modules
          </Button>
        </section>
      </main>
    </div>
  )
}
