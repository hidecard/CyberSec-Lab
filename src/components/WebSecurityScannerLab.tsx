'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Search, Shield, AlertTriangle, Play, Eye, Lock, FileText, CheckCircle, XCircle, AlertCircle, Target } from 'lucide-react'

export default function WebSecurityScannerLab() {
  const [activeTab, setActiveTab] = useState('scanner')
  const [targetUrl, setTargetUrl] = useState('')
  const [scanType, setScanType] = useState('quick')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<any>(null)
  const [scanProgress, setScanProgress] = useState(0)

  const scanTypes = {
    quick: {
      name: 'Quick Scan',
      description: 'Basic vulnerability assessment',
      duration: '30 seconds',
      checks: ['XSS', 'SQL Injection', 'CSRF', 'Directory Traversal']
    },
    comprehensive: {
      name: 'Comprehensive Scan',
      description: 'Full security assessment',
      duration: '2 minutes',
      checks: ['XSS', 'SQL Injection', 'CSRF', 'Directory Traversal', 'File Upload', 'Authentication', 'Session Management', 'Headers']
    },
    api: {
      name: 'API Security Scan',
      description: 'REST API vulnerability testing',
      duration: '1 minute',
      checks: ['SQL Injection', 'NoSQL Injection', 'Rate Limiting', 'Authentication', 'Authorization', 'Data Exposure']
    }
  }

  const vulnerabilityDatabase = {
    xss: {
      name: 'Cross-Site Scripting (XSS)',
      severity: 'High',
      description: 'Application vulnerable to script injection',
      locations: ['search parameter', 'comment field', 'user profile'],
      payload: '<script>alert("XSS")</script>',
      fix: 'Implement input validation and output encoding'
    },
    sql: {
      name: 'SQL Injection',
      severity: 'Critical',
      description: 'Database vulnerable to injection attacks',
      locations: ['login form', 'search functionality', 'user profile'],
      payload: "' OR '1'='1",
      fix: 'Use parameterized queries and input validation'
    },
    csrf: {
      name: 'Cross-Site Request Forgery',
      severity: 'Medium',
      description: 'Application lacks CSRF protection',
      locations: ['password change', 'profile update', 'settings'],
      payload: 'Malicious form submission',
      fix: 'Implement CSRF tokens'
    },
    directory: {
      name: 'Directory Traversal',
      severity: 'High',
      description: 'File system access through path manipulation',
      locations: ['file download', 'image display', 'document access'],
      payload: '../../../etc/passwd',
      fix: 'Validate and sanitize file paths'
    },
    upload: {
      name: 'Malicious File Upload',
      severity: 'High',
      description: 'Application allows malicious file uploads',
      locations: ['profile picture', 'document upload', 'media files'],
      payload: 'webshell.php',
      fix: 'Implement file type validation and scanning'
    },
    auth: {
      name: 'Authentication Bypass',
      severity: 'Critical',
      description: 'Weak authentication mechanisms',
      locations: ['login page', 'admin panel', 'api endpoints'],
      payload: 'SQL injection or brute force',
      fix: 'Implement strong authentication and rate limiting'
    },
    session: {
      name: 'Session Management Issues',
      severity: 'Medium',
      description: 'Insecure session handling',
      locations: ['session cookies', 'timeout handling', 'session fixation'],
      payload: 'Session hijacking',
      fix: 'Use secure session management practices'
    },
    headers: {
      name: 'Security Headers Missing',
      severity: 'Low',
      description: 'Missing important security headers',
      locations: ['HTTP response headers'],
      payload: 'Header analysis',
      fix: 'Implement security headers (CSP, HSTS, etc.)'
    },
    nosql: {
      name: 'NoSQL Injection',
      severity: 'High',
      description: 'NoSQL database vulnerable to injection',
      locations: ['API endpoints', 'user queries', 'search functionality'],
      payload: '{"$ne": null}',
      fix: 'Use input validation and safe query methods'
    },
    rate: {
      name: 'Rate Limiting Issues',
      severity: 'Medium',
      description: 'Insufficient rate limiting',
      locations: ['API endpoints', 'login attempts', 'form submissions'],
      payload: 'Brute force attacks',
      fix: 'Implement proper rate limiting'
    },
    exposure: {
      name: 'Data Exposure',
      severity: 'High',
      description: 'Sensitive data exposed in responses',
      locations: ['API responses', 'error messages', 'debug info'],
      payload: 'Data analysis',
      fix: 'Remove sensitive data from responses'
    },
    authorization: {
      name: 'Authorization Bypass',
      severity: 'Critical',
      description: 'Improper access control',
      locations: ['admin functions', 'user data', 'sensitive operations'],
      payload: 'Direct access attempts',
      fix: 'Implement proper authorization checks'
    }
  }

  const runScan = () => {
    if (!targetUrl.trim()) return
    
    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)
    
    const scanDuration = scanType === 'quick' ? 3000 : scanType === 'comprehensive' ? 6000 : 4000
    const progressInterval = scanDuration / 20
    
    const progressTimer = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressTimer)
          return 95
        }
        return prev + 5
      })
    }, progressInterval)
    
    setTimeout(() => {
      clearInterval(progressTimer)
      setScanProgress(100)
      
      // Generate scan results based on scan type
      const checks = scanTypes[scanType as keyof typeof scanTypes].checks
      const results = checks.map(check => {
        const vulnKey = check.toLowerCase().replace(' ', '').replace(' ', '')
        const vuln = Object.values(vulnerabilityDatabase).find(v => 
          v.name.toLowerCase().includes(check.toLowerCase().split(' ')[0])
        ) || {
          name: check,
          severity: 'Low',
          description: 'Security check completed',
          locations: [],
          payload: '',
          fix: 'Review and implement security best practices'
        }
        
        // Randomly determine if vulnerability is found (70% chance for demo)
        const isVulnerable = Math.random() > 0.3
        
        return {
          ...vuln,
          status: isVulnerable ? 'vulnerable' : 'safe',
          confidence: Math.floor(Math.random() * 30) + 70 // 70-100% confidence
        }
      })
      
      setScanResults({
        url: targetUrl,
        scanType: scanType,
        timestamp: new Date().toISOString(),
        totalChecks: checks.length,
        vulnerabilitiesFound: results.filter(r => r.status === 'vulnerable').length,
        results: results
      })
      
      setIsScanning(false)
    }, scanDuration)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'vulnerable': return <XCircle className="w-4 h-4 text-red-500" />
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const realWorldTools = [
    {
      name: 'OWASP ZAP',
      description: 'Free, open-source web application security scanner',
      features: ['Automated scanning', 'Passive scanning', 'Fuzzing', 'API testing'],
      pricing: 'Free',
      difficulty: 'Beginner'
    },
    {
      name: 'Burp Suite',
      description: 'Comprehensive web application security testing platform',
      features: ['Intercepting proxy', 'Scanner', 'Intruder', 'Repeater'],
      pricing: 'Free/Professional ($399/year)',
      difficulty: 'Intermediate'
    },
    {
      name: 'Nessus',
      description: 'Vulnerability assessment and network security scanner',
      features: ['Network scanning', 'Compliance checks', 'Vulnerability database'],
      pricing: 'Professional ($2,988/year)',
      difficulty: 'Advanced'
    },
    {
      name: 'Acunetix',
      description: 'Web vulnerability scanner with advanced detection',
      features: ['SQL injection', 'XSS detection', 'Network scanning'],
      pricing: 'Enterprise (Contact sales)',
      difficulty: 'Intermediate'
    }
  ]

  const scanTechniques = [
    {
      name: 'Black Box Testing',
      description: 'Testing without knowledge of internal structure',
      advantages: ['Real-world simulation', 'No insider knowledge needed', 'Customer perspective'],
      disadvantages: ['Limited coverage', 'Time consuming', 'May miss logical flaws']
    },
    {
      name: 'White Box Testing',
      description: 'Testing with full knowledge of the application',
      advantages: ['Comprehensive coverage', 'Faster testing', 'Can test edge cases'],
      disadvantages: ['Requires source code', 'May miss deployment issues', 'Not realistic']
    },
    {
      name: 'Gray Box Testing',
      description: 'Testing with partial knowledge of the system',
      advantages: ['Balanced approach', 'Realistic testing', 'Good coverage'],
      disadvantages: ['Requires some access', 'Complex to set up', 'Limited by knowledge']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Web Security Scanner Lab</h1>
              <p className="text-slate-600">Learn to identify and analyze web application vulnerabilities using automated scanning tools</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Web security scanners help identify vulnerabilities quickly. This lab demonstrates various scanning techniques and how to interpret results.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="scanner" className="text-xs sm:text-sm">Security Scanner</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs sm:text-sm">Real Tools</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs sm:text-sm">Scanning Techniques</TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="text-xs sm:text-sm">Vulnerability Database</TabsTrigger>
          </TabsList>

          {/* Security Scanner Tab */}
          <TabsContent value="scanner" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scanner Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Scanner Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Configure and run security scans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Target URL</label>
                      <input
                        type="url"
                        value={targetUrl}
                        onChange={(e) => setTargetUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Scan Type</label>
                      <div className="space-y-2">
                        {Object.entries(scanTypes).map(([key, type]) => (
                          <div
                            key={key}
                            className={`p-3 border rounded cursor-pointer transition-colors ${
                              scanType === key ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50'
                            }`}
                            onClick={() => setScanType(key)}
                          >
                            <div className="font-medium text-sm">{type.name}</div>
                            <div className="text-xs text-slate-600">{type.description}</div>
                            <div className="text-xs text-blue-600 mt-1">Duration: {type.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={runScan}
                      disabled={!targetUrl.trim() || isScanning}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isScanning ? 'Scanning...' : 'Start Scan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Scan Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Scan Results</span>
                  </CardTitle>
                  <CardDescription>
                    Vulnerability assessment results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isScanning && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Scanning Progress</span>
                        <span className="text-sm">{scanProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {scanResults && (
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Target:</span>
                            <p className="text-slate-600">{scanResults.url}</p>
                          </div>
                          <div>
                            <span className="font-medium">Scan Type:</span>
                            <p className="text-slate-600 capitalize">{scanResults.scanType}</p>
                          </div>
                          <div>
                            <span className="font-medium">Total Checks:</span>
                            <p className="text-slate-600">{scanResults.totalChecks}</p>
                          </div>
                          <div>
                            <span className="font-medium">Vulnerabilities:</span>
                            <p className="text-red-600 font-medium">{scanResults.vulnerabilitiesFound}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        <h4 className="font-semibold text-sm">Detailed Results:</h4>
                        {scanResults.results.map((result: any, index: number) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(result.status)}
                                <span className="font-medium text-sm">{result.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={result.status === 'vulnerable' ? 'destructive' : 'secondary'}>
                                  {result.status}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {result.confidence}% confidence
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-slate-600">{result.description}</p>
                              {result.status === 'vulnerable' && (
                                <>
                                  {result.locations && result.locations.length > 0 && (
                                    <div className="text-xs">
                                      <span className="font-medium">Locations:</span> {result.locations.join(', ')}
                                    </div>
                                  )}
                                  {result.fix && (
                                    <div className="text-xs">
                                      <span className="font-medium">Fix:</span> {result.fix}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isScanning && !scanResults && (
                    <div className="text-center text-slate-500 py-8">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Configure and run a scan to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {realWorldTools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant={tool.pricing === 'Free' ? 'secondary' : 'default'}>
                      {tool.pricing}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{tool.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-sm">Features:</span>
                        <ul className="mt-1 space-y-1">
                          {tool.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-sm">Difficulty:</span>
                        <Badge variant="outline" className="ml-2">{tool.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scanning Techniques Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scanTechniques.map((technique, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{technique.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{technique.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-sm text-green-600">Advantages:</span>
                        <ul className="mt-1 space-y-1">
                          {technique.advantages.map((advantage, advIndex) => (
                            <li key={advIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-sm text-red-600">Disadvantages:</span>
                        <ul className="mt-1 space-y-1">
                          {technique.disadvantages.map((disadvantage, disIndex) => (
                            <li key={disIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vulnerability Database Tab */}
          <TabsContent value="vulnerabilities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(vulnerabilityDatabase).map(([key, vuln]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {vuln.name}
                      <Badge className={getSeverityColor(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{vuln.description}</p>
                    
                    <div className="space-y-2">
                      {vuln.locations && vuln.locations.length > 0 && (
                        <div>
                          <span className="font-semibold text-sm">Common Locations:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {vuln.locations.map((location, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {location}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {vuln.payload && (
                        <div>
                          <span className="font-semibold text-sm">Example Payload:</span>
                          <Code className="block text-xs mt-1">{vuln.payload}</Code>
                        </div>
                      )}
                      
                      <div>
                        <span className="font-semibold text-sm">Recommended Fix:</span>
                        <p className="text-sm text-slate-600 mt-1">{vuln.fix}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}