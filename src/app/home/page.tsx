'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Bug, Lock, Eye, Target, Zap, Globe, FileText, Key, Link, Users, Package, ArrowLeft, Fingerprint, Monitor, BarChart, Database, TerminalSquare, Code2, Search, Menu, BookOpen, Award, CheckCircle, Star, Users as UsersIcon, Zap as ZapIcon } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function Home() {
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
            Master Cybersecurity Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline"> Hands-On Labs</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore interactive security labs covering XSS, SQL injection, CSRF, and more. Learn by doing in a safe, controlled environment designed for cybersecurity professionals and enthusiasts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
            <Button variant="outline" className="px-8 py-3 rounded-lg font-semibold border-slate-300 hover:bg-slate-50 transition-colors duration-300">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 sm:mb-10 text-center">
            Why Choose CyberSec Lab?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            <Card className="border-slate-200/50 bg-white/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="p-4 bg-blue-100 rounded-lg w-fit mx-auto">
                  <Shield className="w-8 h-8 text-blue-700" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 mt-4 text-center">
                  Safe Learning Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-700 text-center">
                  Practice real-world attacks in a controlled, isolated environment without risking actual systems or data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-green-100 rounded-lg w-fit">
                  <ZapIcon className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">Interactive Labs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Hands-on experience with XSS, SQL injection, CSRF, and advanced attack techniques through guided labs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-lg w-fit">
                  <UsersIcon className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Learn from comprehensive tutorials, detailed explanations, and best practices from cybersecurity experts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-orange-100 rounded-lg w-fit">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">Certification Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Earn certificates by completing challenges and exams. Showcase your cybersecurity skills to employers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-red-100 rounded-lg w-fit">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">Real-World Scenarios</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Experience attacks based on real security breaches and learn how to prevent them in production environments.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200/50 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-indigo-100 rounded-lg w-fit">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">Comprehensive Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Follow a structured roadmap from beginner basics to advanced cybersecurity techniques and certifications.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16 sm:mb-20 p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-200/40 shadow-xl">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              About CyberSec Lab
            </h3>
            <p className="text-slate-700 max-w-3xl mx-auto leading-relaxed text-lg">
              CyberSec Lab is an interactive platform designed to teach cybersecurity through hands-on experience.
              Whether you're a beginner looking to start your journey or an experienced professional wanting to sharpen your skills,
              our labs provide a safe space to learn, practice, and master essential security concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-3">20+</div>
              <div className="text-slate-700 text-lg">Interactive Labs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-700 mb-3">1000+</div>
              <div className="text-slate-700 text-lg">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700 mb-3">50+</div>
              <div className="text-slate-700 text-lg">Attack Scenarios</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
            Ready to Start Your Cybersecurity Journey?
          </h3>
          <p className="text-slate-700 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Join thousands of learners who are mastering cybersecurity through our interactive labs and comprehensive learning paths.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-10 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center mx-auto">
            <BookOpen className="w-5 h-5 mr-3" />
            Explore Learning Paths
          </Button>
        </section>
      </main>
    </div>
  )
}
