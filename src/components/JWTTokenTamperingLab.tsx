'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Key, Shield, AlertTriangle, Copy, Check, Lock, Unlock } from 'lucide-react'

export default function JWTTokenTamperingLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [currentToken, setCurrentToken] = useState('')
  const [tamperedToken, setTamperedToken] = useState('')
  const [validationResult, setValidationResult] = useState('')
  const [userRole, setUserRole] = useState('user')
  const [serverValidation, setServerValidation] = useState<'none' | 'basic' | 'strict'>('strict')

  // Generate a simple JWT-like token (for demo purposes)
  const generateToken = (role: string) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
      sub: '1234567890',
      name: 'John Doe',
      role: role,
      iat: Date.now() / 1000,
      exp: Date.now() / 1000 + 3600
    }))
    const signature = btoa('signature-placeholder') // In real JWT, this would be cryptographically signed
    return `${header}.${payload}.${signature}`
  }

  const handleGenerateToken = () => {
    const token = generateToken(userRole)
    setCurrentToken(token)
    setTamperedToken('')
    setValidationResult('')
  }

  const handleTamperToken = () => {
    if (!currentToken) return

    try {
      const [header, payload, signature] = currentToken.split('.')
      const decodedPayload = JSON.parse(atob(payload))
      
      // Tamper with the payload
      const tamperedPayload = {
        ...decodedPayload,
        role: 'admin',
        permissions: ['read', 'write', 'delete', 'admin']
      }
      
      const tamperedPayloadB64 = btoa(JSON.stringify(tamperedPayload))
      const newToken = `${header}.${tamperedPayloadB64}.${signature}`
      setTamperedToken(newToken)
      setValidationResult('')
    } catch (error) {
      setValidationResult('❌ Error tampering token')
    }
  }

  const handleValidateToken = (token: string) => {
    if (!token) {
      setValidationResult('❌ No token to validate')
      return
    }

    try {
      const [header, payload, signature] = token.split('.')
      const decodedPayload = JSON.parse(atob(payload))

      switch (serverValidation) {
        case 'none':
          setValidationResult(`✅ ACCEPTED: Role = ${decodedPayload.role} (No validation)`)
          break

        case 'basic':
          // Basic validation - checks structure but not signature
          if (decodedPayload.exp && decodedPayload.exp < Date.now() / 1000) {
            setValidationResult('❌ REJECTED: Token expired')
          } else {
            setValidationResult(`✅ ACCEPTED: Role = ${decodedPayload.role} (Basic validation)`)
          }
          break

        case 'strict':
          // Strict validation - would verify signature in real implementation
          if (token === currentToken) {
            setValidationResult(`✅ ACCEPTED: Role = ${decodedPayload.role} (Signature valid)`)
          } else if (token === tamperedToken) {
            setValidationResult('❌ REJECTED: Invalid signature - Token tampered!')
          } else {
            setValidationResult('❌ REJECTED: Invalid token format')
          }
          break
      }
    } catch (error) {
      setValidationResult('❌ REJECTED: Invalid token format')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [copied, setCopied] = useState(false)

  const attackScenarios = [
    {
      name: 'Privilege Escalation',
      description: 'Change user role to admin',
      impact: 'Critical',
      code: `// Original payload
{"role":"user","id":123}

// Tampered payload  
{"role":"admin","id":123}`
    },
    {
      name: 'Expiration Bypass',
      description: 'Extend token validity',
      impact: 'High',
      code: `// Original
{"exp":1640995200}

// Tampered
{"exp":9999999999}`
    },
    {
      name: 'User Impersonation',
      description: 'Change user ID',
      impact: 'Critical',
      code: `// Original
{"sub":"user123"}

// Tampered
{"sub":"admin456"}`
    },
    {
      name: 'Permission Injection',
      description: 'Add unauthorized permissions',
      impact: 'High',
      code: `// Original
{"permissions":["read"]}

// Tampered
{"permissions":["read","write","delete","admin"]}`
    }
  ]

  const validationModes = [
    {
      mode: 'none',
      name: 'No Validation',
      description: 'Accepts any token without verification',
      risk: 'Critical'
    },
    {
      mode: 'basic',
      name: 'Basic Validation',
      description: 'Checks structure and expiration only',
      risk: 'High'
    },
    {
      mode: 'strict',
      name: 'Strict Validation',
      description: 'Verifies cryptographic signature',
      risk: 'Safe'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-indigo-500 rounded-lg">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">JWT Token Tampering Lab</h1>
              <p className="text-slate-600">Learn how attackers modify JWT tokens to escalate privileges and bypass authentication</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              JWT tokens are client-readable and can be tampered with if not properly signed and validated on the server.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Token Manipulation</TabsTrigger>
            <TabsTrigger value="attacks" className="text-xs sm:text-sm">Attack Scenarios</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Token Manipulation Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Token Generator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>Token Generator</span>
                  </CardTitle>
                  <CardDescription>
                    Generate and tamper with JWT tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Role:</label>
                    <div className="flex space-x-2">
                      {['user', 'moderator', 'admin'].map(role => (
                        <Button
                          key={role}
                          variant={userRole === role ? "default" : "outline"}
                          size="sm"
                          onClick={() => setUserRole(role)}
                        >
                          {role}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleGenerateToken} className="w-full">
                    🔑 Generate Token
                  </Button>

                  {/* Original Token */}
                  {currentToken && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Original Token:</label>
                      <div className="p-3 bg-slate-100 rounded-lg border border-slate-300">
                        <code className="text-xs break-all">{currentToken}</code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(currentToken)}
                        className="w-full"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        Copy Token
                      </Button>
                    </div>
                  )}

                  {/* Token Decode */}
                  {currentToken && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Decoded Payload:</label>
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <pre className="text-xs">
                          {JSON.stringify(JSON.parse(atob(currentToken.split('.')[1])), null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  <Button onClick={handleTamperToken} className="w-full" variant="destructive">
                    🚨 Tamper Token (Escalate to Admin)
                  </Button>
                </CardContent>
              </Card>

              {/* Token Validator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Token Validator</span>
                  </CardTitle>
                  <CardDescription>
                    Simulate server-side token validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Validation Mode */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Server Validation:</label>
                    <div className="space-y-1">
                      {validationModes.map(mode => (
                        <Button
                          key={mode.mode}
                          variant={serverValidation === mode.mode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setServerValidation(mode.mode as any)}
                          className="w-full justify-start"
                        >
                          {serverValidation === mode.mode && <Shield className="w-4 h-4 mr-2" />}
                          {mode.name}
                          <Badge variant="outline" className="ml-auto text-xs">
                            {mode.risk}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Tampered Token */}
                  {tamperedToken && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tampered Token:</label>
                      <div className="p-3 bg-red-50 rounded-lg border border-red-300">
                        <code className="text-xs break-all">{tamperedToken}</code>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <pre className="text-xs">
                          {JSON.stringify(JSON.parse(atob(tamperedToken.split('.')[1])), null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Validation Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleValidateToken(currentToken)}
                      className="w-full"
                      variant="outline"
                    >
                      ✅ Validate Original Token
                    </Button>
                    {tamperedToken && (
                      <Button
                        onClick={() => handleValidateToken(tamperedToken)}
                        className="w-full"
                        variant="outline"
                      >
                        🚨 Validate Tampered Token
                      </Button>
                    )}
                  </div>

                  {/* Validation Result */}
                  {validationResult && (
                    <Alert className={validationResult.includes('REJECTED') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                      <AlertDescription className={validationResult.includes('REJECTED') ? 'text-red-800' : 'text-green-800'}>
                        {validationResult}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* JWT Structure Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>🔍 JWT Structure and Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Key className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Header</h4>
                    <p className="text-sm text-slate-700">
                      Algorithm and token type<br/>
                      <code className="text-xs">{"{alg: 'HS256', typ: 'JWT'}"}</code>
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Unlock className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Payload</h4>
                    <p className="text-sm text-slate-700">
                      User data and claims<br/>
                      <code className="text-xs">{"{role: 'user', id: 123}"}</code><br/>
                      <span className="text-red-600">⚠️ Can be tampered!</span>
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Signature</h4>
                    <p className="text-sm text-slate-700">
                      Cryptographic signature<br/>
                      <code className="text-xs">HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)</code><br/>
                      <span className="text-green-600">✅ Prevents tampering</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attack Scenarios Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <h4 className="font-semibold text-sm mb-1">Example:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs">
                          {scenario.code}
                        </Code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Impact:</h4>
                        <p className="text-sm text-slate-700">
                          {scenario.name === 'Privilege Escalation' && 'Gains administrative access to all system functions.'}
                          {scenario.name === 'Expiration Bypass' && 'Extends session indefinitely, preventing logout.'}
                          {scenario.name === 'User Impersonation' && 'Accesses another user\'s account and data.'}
                          {scenario.name === 'Permission Injection' && 'Gains unauthorized access to restricted resources.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Real-World Examples */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Real-World JWT Vulnerabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2021: SolarWinds Attack</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Attackers exploited weak JWT secrets to create valid tokens for privileged access.
                    </p>
                    <Badge variant="destructive">Supply Chain Compromise</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2020: JWT Algorithm Confusion</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Applications accepting tokens with 'none' algorithm allowed unlimited token creation.
                    </p>
                    <Badge variant="destructive">Authentication Bypass</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Secure JWT Implementation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Node.js with jsonwebtoken
const jwt = require('jsonwebtoken');

// Strong secret key
const JWT_SECRET = process.env.JWT_SECRET; // 256+ bits

// Generate token
const token = jwt.sign(
  { 
    userId: user.id, 
    role: user.role 
  },
  JWT_SECRET,
  { 
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: 'your-app.com'
  }
);

// Verify token
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  // Use decoded data
} catch (err) {
  // Invalid token
}`}
                  </Code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Token Validation Best Practices</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Comprehensive validation
function validateToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'your-app.com',
      audience: 'your-app.com'
    });
    
    // Additional checks
    if (!decoded.userId || !decoded.role) {
      throw new Error('Invalid claims');
    }
    
    return decoded;
  } catch (error) {
    console.error('Token validation failed:', error);
    return null;
  }
}`}
                  </Code>
                </CardContent>
              </Card>
            </div>

            {/* Security Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ JWT Security Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Token Creation</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Use strong secret keys (256+ bits)</li>
                      <li>□ Set appropriate expiration times</li>
                      <li>□ Include issuer and audience claims</li>
                      <li>□ Use strong algorithms (HS256/RS256)</li>
                      <li>□ Avoid sensitive data in payload</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Token Validation</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Always verify signature</li>
                      <li>□ Check expiration and not before</li>
                      <li>□ Validate issuer and audience</li>
                      <li>□ Reject 'none' algorithm</li>
                      <li>□ Implement token revocation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Security Measures */}
            <Card>
              <CardHeader>
                <CardTitle>🔒 Advanced Security Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Token Rotation</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Refresh token mechanism
app.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  // Validate refresh token
  const user = validateRefreshToken(refreshToken);
  if (!user) return res.status(401).send('Invalid');
  
  // Issue new access token
  const newAccessToken = generateAccessToken(user);
  res.json({ accessToken: newAccessToken });
});`}
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Token Blacklisting</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Redis-based blacklist
const redis = require('redis');
const blacklist = redis.createClient();

function logout(token) {
  const decoded = jwt.decode(token);
  const key = \`blacklist:\${decoded.jti}\`;
  blacklist.setex(key, decoded.exp - Date.now()/1000, '1');
}

function isBlacklisted(token) {
  const decoded = jwt.decode(token);
  const key = \`blacklist:\${decoded.jti}\`;
  return blacklist.exists(key);
}`}
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