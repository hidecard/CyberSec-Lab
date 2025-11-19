'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Eye, EyeOff, Shield, AlertTriangle, Copy, Check, ExternalLink } from 'lucide-react'

export default function PhishingSimulation() {
  const [activeTab, setActiveTab] = useState('demo')
  const [showRealUrl, setShowRealUrl] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [showWarning, setShowWarning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const phishingTechniques = [
    {
      name: 'URL Obfuscation',
      description: 'Using similar-looking domains or special characters',
      example: 'g00gle.com vs google.com',
      risk: 'High'
    },
    {
      name: 'UI Hijacking',
      description: 'Overlapping legitimate UI with malicious elements',
      example: 'Fake login form over real content',
      risk: 'Critical'
    },
    {
      name: 'Tabnabbing',
      description: 'Changing page content when tab is inactive',
      example: 'Bank website becomes fake login',
      risk: 'High'
    },
    {
      name: 'Clickjacking',
      description: 'Transparent iframe over legitimate buttons',
      example: 'Like button actually transfers money',
      risk: 'Critical'
    }
  ]

  const defenseTechniques = [
    {
      technique: 'URL Validation',
      code: `function validateUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'yourdomain.com';
  } catch {
    return false;
  }
}`,
      description: 'Always verify the actual domain, not just the appearance'
    },
    {
      technique: 'Frame Busting',
      code: `<script>
if (top !== self) {
  top.location = self.location;
}
</script>`,
      description: 'Prevent your site from being embedded in iframes'
    },
    {
      technique: 'CSP Headers',
      code: `Content-Security-Policy: 
  frame-ancestors 'none';
  default-src 'self';`,
      description: 'Control who can embed your content'
    },
    {
      technique: 'Subresource Integrity',
      code: `<script src="https://cdn.com/lib.js" 
        integrity="sha384-..."></script>`,
      description: 'Ensure external resources haven\'t been tampered with'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-blue-500 rounded-lg self-start">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Phishing Simulation Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Learn how attackers create convincing fake interfaces and how to defend against them</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              This is an educational simulation. Never enter real credentials in untrusted forms, even if they look legitimate.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Phishing Demo</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs sm:text-sm">Attack Techniques</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Phishing Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fake Login Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Fake Login Form</span>
                  </CardTitle>
                  <CardDescription>
                    This looks like a real login form, but it's designed to steal credentials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* URL Display */}
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">URL:</span>
                        <code className="text-sm bg-white px-2 py-1 rounded">
                          {showRealUrl ? 'http://evil-site.com/fake-login' : 'https://secure-bank.com/login'}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowRealUrl(!showRealUrl)}
                      >
                        {showRealUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Warning Overlay */}
                  {showWarning && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        ⚠️ This is a phishing simulation! In a real attack, your credentials would be stolen.
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Fake Login Form */}
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Username</label>
                      <input
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full p-2 border border-slate-300 rounded"
                        placeholder="Enter your password"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>

                  {/* Visual Deception Elements */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Visual Deception Elements:</h4>
                    <ul className="text-sm space-y-1 text-slate-600">
                      <li>• Professional styling and layout</li>
                      <li>• HTTPS-looking URL (actually fake)</li>
                      <li>• Security indicators (can be faked)</li>
                      <li>• Familiar branding and colors</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Attack Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    How this phishing attack works and how to detect it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">🎯 Attack Vector:</h4>
                      <p className="text-sm text-slate-700">
                        The attacker creates a pixel-perfect replica of a legitimate login page 
                        but hosts it on a malicious domain. Users enter credentials thinking 
                        they're on the real site.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">🔍 Detection Methods:</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• Check the actual URL in the browser bar</li>
                        <li>• Look for HTTPS certificate details</li>
                        <li>• Verify domain spelling carefully</li>
                        <li>• Check for browser security warnings</li>
                        <li>• Avoid clicking suspicious email links</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">💡 Real Impact:</h4>
                      <p className="text-sm text-slate-700">
                        Stolen credentials can lead to account takeover, financial loss, 
                        identity theft, and unauthorized access to sensitive data.
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <h4 className="font-semibold text-amber-900 mb-1">⚠️ Red Flags in This Demo:</h4>
                      <ul className="text-sm space-y-1 text-amber-800">
                        <li>• URL can be revealed as fake</li>
                        <li>• No actual SSL certificate verification</li>
                        <li>• Form submission is simulated</li>
                        <li>• Missing security headers</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attack Techniques Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phishingTechniques.map((technique, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{technique.name}</span>
                      <Badge variant={technique.risk === 'Critical' ? 'destructive' : 
                                     technique.risk === 'High' ? 'destructive' : 'default'}>
                        {technique.risk}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Example:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs">
                          {technique.example}
                        </Code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">How it works:</h4>
                        <p className="text-sm text-slate-700">
                          {technique.name === 'URL Obfuscation' && 
                            'Attackers register domains that look similar to legitimate ones using homoglyphs, typos, or different TLDs.'}
                          {technique.name === 'UI Hijacking' && 
                            'Malicious elements are positioned over legitimate UI elements, intercepting user interactions.'}
                          {technique.name === 'Tabnabbing' && 
                            'Pages detect when inactive and replace content, tricking users when they return to the tab.'}
                          {technique.name === 'Clickjacking' && 
                            'Invisible iframes with malicious content are positioned over visible buttons or links.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Advanced Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Advanced Phishing Techniques</CardTitle>
                <CardDescription>
                  Sophisticated methods that bypass traditional security measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Browser-in-the-Middle Attacks</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Malicious browser extension
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url.includes('login')) {
      return { redirectUrl: 'https://evil-site.com/fake-login' };
    }
  },
  { urls: ['<all_urls>'] },
  ['blocking']
);`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Malicious browser extensions can redirect login pages to phishing sites.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">DNS Hijacking</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Compromised DNS entry
// bank.com -> 192.168.1.100 (attacker IP)
// Instead of -> 52.1.2.3 (real bank IP)

// User types bank.com -> gets attacker server`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Compromised DNS servers redirect legitimate domains to malicious IPs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defenseTechniques.map((defense, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{defense.technique}</span>
                    </CardTitle>
                    <CardDescription>{defense.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code className="block p-3 bg-slate-50 rounded text-sm">
                      {defense.code}
                    </Code>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comprehensive Defense Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Comprehensive Defense Checklist</CardTitle>
                <CardDescription>
                  Implement these measures to protect against phishing attacks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Frontend Protections</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>✅ Implement CSP headers</li>
                      <li>✅ Use frame-busting scripts</li>
                      <li>✅ Validate all URLs</li>
                      <li>✅ Use HTTPS everywhere</li>
                      <li>✅ Implement HSTS headers</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">User Education</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>✅ Teach URL verification</li>
                      <li>✅ Show security indicators</li>
                      <li>✅ Explain phishing signs</li>
                      <li>✅ Encourage 2FA usage</li>
                      <li>✅ Regular security training</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Backend Protections</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>✅ Monitor login patterns</li>
                      <li>✅ Implement rate limiting</li>
                      <li>✅ Use certificate pinning</li>
                      <li>✅ Deploy anti-bot measures</li>
                      <li>✅ Log security events</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-World Examples */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Real-World Phishing Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2023: OAuth Phishing Campaign</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Attackers created fake OAuth consent screens that looked identical to Google, Microsoft, and GitHub. 
                      Users granted permissions thinking they were legitimate, giving attackers access to their accounts.
                    </p>
                    <Badge variant="outline">50,000+ compromised accounts</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2022: SMS-Based Phishing (Smishing)</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Attackers sent SMS messages claiming package delivery issues with links to fake postal service websites. 
                      The sites collected personal information and payment details.
                    </p>
                    <Badge variant="outline">$2M+ in losses</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}