'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Globe, Shield, AlertTriangle, Copy, Check, Fingerprint, Monitor, Smartphone, Cpu } from 'lucide-react'

export default function BrowserFingerprintingLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [fingerprintData, setFingerprintData] = useState<any>({})
  const [uniquenessScore, setUniquenessScore] = useState(0)
  const [isTracking, setIsTracking] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Simulate browser fingerprinting
    const generateFingerprint = () => {
      const fingerprint = {
        // Basic browser info
        userAgent: navigator.userAgent,
        language: navigator.language,
        languages: navigator.languages,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        
        // Screen properties
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
          availWidth: screen.availWidth,
          availHeight: screen.availHeight
        },
        
        // Canvas fingerprinting
        canvas: (() => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return null
          
          ctx.textBaseline = 'top'
          ctx.font = '14px Arial'
          ctx.fillText('Browser fingerprinting test', 2, 2)
          return canvas.toDataURL().slice(-50) // Last 50 chars as fingerprint
        })(),
        
        // WebGL fingerprinting
        webgl: (() => {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          if (!gl) return null
          
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
          return {
            vendor: gl.getParameter(gl.VENDOR),
            renderer: gl.getParameter(gl.RENDERER),
            version: gl.getParameter(gl.VERSION)
          }
        })(),
        
        // Audio fingerprinting
        audio: (() => {
          try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext
            const context = new AudioContext()
            const oscillator = context.createOscillator()
            const analyser = context.createAnalyser()
            const gain = context.createGain()
            
            oscillator.connect(analyser)
            analyser.connect(gain)
            gain.connect(context.destination)
            
            oscillator.start(0)
            const data = new Uint8Array(analyser.frequencyBinCount)
            analyser.getByteFrequencyData(data)
            oscillator.stop()
            
            return Array.from(data.slice(0, 10)).join(',')
          } catch {
            return null
          }
        })(),
        
        // Fonts detection
        fonts: (() => {
          const baseFonts = ['monospace', 'sans-serif', 'serif']
          const testFonts = [
            'Arial', 'Verdana', 'Times New Roman', 'Courier New',
            'Georgia', 'Palatino', 'Garamond', 'Bookman',
            'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'
          ]
          
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return []
          
          const detected = []
          testFonts.forEach(font => {
            ctx.font = `72px ${font}`
            const width = ctx.measureText('mmmmmmmmmmlli').width
            ctx.font = `72px ${baseFonts[0]}`
            const baseWidth = ctx.measureText('mmmmmmmmmmlli').width
            
            if (width !== baseWidth) {
              detected.push(font)
            }
          })
          
          return detected
        })(),
        
        // Timezone and location
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: new Date().getTimezoneOffset(),
        
        // Hardware detection
        hardware: {
          cores: navigator.hardwareConcurrency || 'unknown',
          memory: (navigator as any).deviceMemory || 'unknown',
          connection: (navigator as any).connection ? {
            effectiveType: (navigator as any).connection.effectiveType,
            downlink: (navigator as any).connection.downlink,
            rtt: (navigator as any).connection.rtt
          } : null
        },
        
        // Plugin detection
        plugins: Array.from(navigator.plugins).map(plugin => ({
          name: plugin.name,
          description: plugin.description,
          filename: plugin.filename
        })),
        
        // Battery API
        battery: (() => {
          try {
            return (navigator as any).getBattery ? 'supported' : 'not supported'
          } catch {
            return 'error'
          }
        })(),
        
        // WebGL parameters
        webglParams: (() => {
          const canvas = document.createElement('canvas')
          const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
          if (!gl) return null
          
          return {
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
            maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
            aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
            maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
          }
        })()
      }
      
      return fingerprint
    }

    if (isTracking) {
      const fp = generateFingerprint()
      setFingerprintData(fp)
      
      // Calculate uniqueness score (simplified)
      let score = 0
      if (fp.canvas) score += 25
      if (fp.webgl) score += 20
      if (fp.audio) score += 15
      if (fp.fonts.length > 5) score += 15
      if (fp.hardware.cores !== 'unknown') score += 10
      if (fp.webglParams) score += 10
      if (fp.plugins.length > 0) score += 5
      
      setUniquenessScore(Math.min(score, 100))
    }
  }, [isTracking])

  const startFingerprinting = () => {
    setIsTracking(true)
  }

  const stopFingerprinting = () => {
    setIsTracking(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateHash = (data: any) => {
    // Simple hash simulation (in real apps, use crypto.subtle or similar)
    return btoa(JSON.stringify(data)).slice(0, 16)
  }

  const realWorldAttacks = [
    {
      name: 'Browser Fingerprinting for Tracking',
      description: 'Websites create unique fingerprints to track users across sites without cookies',
      technique: 'Canvas + WebGL + Font + Audio fingerprinting',
      impact: 'Privacy violation, cross-site tracking',
      example: 'FingerprintJS library used by 5.8% of top websites'
    },
    {
      name: 'Device Fingerprinting for Fraud',
      description: 'Financial services use fingerprints to detect multiple accounts',
      technique: 'Hardware + Browser + Behavior analysis',
      impact: 'Account linking, fraud prevention (dual-use)',
      example: 'Banking apps detect device changes for suspicious activity'
    },
    {
      name: 'Cross-Device Tracking',
      description: 'Link user behavior across multiple devices',
      technique: 'Fingerprint correlation + timing analysis',
      impact: 'Complete user profiling, privacy erosion',
      example: 'Ad tech companies build comprehensive user profiles'
    }
  ]

  const defenseStrategies = [
    {
      name: 'Browser Privacy Settings',
      description: 'Configure browser to resist fingerprinting',
      techniques: [
        'Disable JavaScript (extreme)',
        'Use privacy-respecting browsers',
        'Install anti-fingerprinting extensions',
        'Regularly clear browser data',
        'Use VPN/Tor for anonymity'
      ]
    },
    {
      name: 'Technical Countermeasures',
      description: 'Technical approaches to reduce fingerprint uniqueness',
      techniques: [
        'Canvas randomization',
        'Font spoofing',
        'WebGL parameter noise',
        'Audio context blocking',
        'Hardware info obfuscation'
      ]
    },
    {
      name: 'Organizational Protection',
      description: 'Enterprise-level fingerprinting resistance',
      techniques: [
        'Standardized browser configurations',
        'Remote browser isolation',
        'Virtual desktop infrastructure',
        'Network-level privacy controls',
        'Regular security audits'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-teal-500 rounded-lg">
              <Fingerprint className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Browser Fingerprinting Lab</h1>
              <p className="text-slate-600">Learn how attackers uniquely identify and track users without cookies</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Browser fingerprinting can identify users with 94% accuracy even without cookies. This lab demonstrates the techniques and defenses.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="demo">Fingerprinting Demo</TabsTrigger>
            <TabsTrigger value="attacks">Real-World Attacks</TabsTrigger>
            <TabsTrigger value="defense">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Fingerprinting Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5" />
                    <span>Fingerprinting Control</span>
                  </CardTitle>
                  <CardDescription>
                    Start and stop browser fingerprinting simulation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      onClick={startFingerprinting}
                      disabled={isTracking}
                      className="w-full"
                    >
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Start Fingerprinting
                    </Button>
                    
                    <Button
                      onClick={stopFingerprinting}
                      disabled={!isTracking}
                      variant="outline"
                      className="w-full"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Stop Fingerprinting
                    </Button>
                  </div>

                  {isTracking && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-amber-600" />
                        <span className="text-sm text-amber-800">Fingerprinting in progress...</span>
                      </div>
                    </div>
                  )}

                  {/* Uniqueness Score */}
                  {uniquenessScore > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Uniqueness Score:</span>
                        <Badge variant={uniquenessScore > 80 ? 'destructive' : uniquenessScore > 50 ? 'default' : 'secondary'}>
                          {uniquenessScore}%
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${uniquenessScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-600">
                        {uniquenessScore > 80 && 'Very unique - easily tracked across sites'}
                        {uniquenessScore > 50 && uniquenessScore <= 80 && 'Moderately unique - some tracking resistance'}
                        {uniquenessScore <= 50 && 'Less unique - better privacy'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fingerprint Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fingerprint className="w-5 h-5" />
                    <span>Fingerprint Data</span>
                  </CardTitle>
                  <CardDescription>
                    Browser information collected for fingerprinting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.keys(fingerprintData).length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {/* Basic Info */}
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-sm mb-2">Basic Browser Info</h4>
                        <div className="text-xs space-y-1">
                          <p><strong>User Agent:</strong> {fingerprintData.userAgent?.slice(0, 50)}...</p>
                          <p><strong>Language:</strong> {fingerprintData.language}</p>
                          <p><strong>Platform:</strong> {fingerprintData.platform}</p>
                          <p><strong>Timezone:</strong> {fingerprintData.timezone}</p>
                        </div>
                      </div>

                      {/* Screen Info */}
                      {fingerprintData.screen && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Screen Properties</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>Resolution:</strong> {fingerprintData.screen.width}x{fingerprintData.screen.height}</p>
                            <p><strong>Color Depth:</strong> {fingerprintData.screen.colorDepth} bits</p>
                            <p><strong>Available:</strong> {fingerprintData.screen.availWidth}x{fingerprintData.screen.availHeight}</p>
                          </div>
                        </div>
                      )}

                      {/* Canvas Fingerprint */}
                      {fingerprintData.canvas && (
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Canvas Fingerprint</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>Canvas Hash:</strong> {fingerprintData.canvas}</p>
                            <p className="text-purple-600">Unique rendering characteristics detected</p>
                          </div>
                        </div>
                      )}

                      {/* WebGL Info */}
                      {fingerprintData.webgl && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">WebGL Information</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>Vendor:</strong> {fingerprintData.webgl.vendor}</p>
                            <p><strong>Renderer:</strong> {fingerprintData.webgl.renderer}</p>
                            <p><strong>Version:</strong> {fingerprintData.webgl.version}</p>
                          </div>
                        </div>
                      )}

                      {/* Font Detection */}
                      {fingerprintData.fonts && (
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Detected Fonts</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>Count:</strong> {fingerprintData.fonts.length} fonts detected</p>
                            <p><strong>Sample:</strong> {fingerprintData.fonts.slice(0, 5).join(', ')}</p>
                          </div>
                        </div>
                      )}

                      {/* Hardware Info */}
                      {fingerprintData.hardware && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Hardware Information</h4>
                          <div className="text-xs space-y-1">
                            <p><strong>CPU Cores:</strong> {fingerprintData.hardware.cores}</p>
                            <p><strong>Memory:</strong> {fingerprintData.hardware.memory} GB</p>
                            {fingerprintData.hardware.connection && (
                              <p><strong>Connection:</strong> {fingerprintData.hardware.connection.effectiveType}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Generated Hash */}
                      <div className="p-3 bg-slate-100 rounded-lg border border-slate-300">
                        <h4 className="font-semibold text-sm mb-2">Generated Fingerprint Hash</h4>
                        <div className="flex items-center justify-between">
                          <code className="text-xs bg-white p-2 rounded">{generateHash(fingerprintData)}</code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generateHash(fingerprintData))}
                          >
                            {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <Fingerprint className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p>Click "Start Fingerprinting" to see collected data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Fingerprinting Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>🔍 How Fingerprinting Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Monitor className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">Canvas</h4>
                    <p className="text-sm text-slate-700">
                      Text rendering differences create unique signatures
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Cpu className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">WebGL</h4>
                    <p className="text-sm text-slate-700">
                      Graphics hardware variations are detectable
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Smartphone className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Fonts</h4>
                    <p className="text-sm text-slate-700">
                      Installed fonts create unique combinations
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">Hardware</h4>
                    <p className="text-sm text-slate-700">
                      Device specs provide additional entropy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-World Attacks Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realWorldAttacks.map((attack, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{attack.name}</CardTitle>
                    <CardDescription>{attack.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Technique:</h4>
                      <p className="text-sm text-slate-700">{attack.technique}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Impact:</h4>
                      <p className="text-sm text-slate-700">{attack.impact}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Real Example:</h4>
                      <p className="text-sm text-slate-600">{attack.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Case Studies */}
            <Card>
              <CardHeader>
                <CardTitle>🌍 Notable Fingerprinting Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2021: Panopticlick Investigation</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Research revealed that 94% of browsers have unique fingerprints, making cross-site tracking possible without cookies.
                    </p>
                    <Badge variant="destructive">Privacy Impact: Critical</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2022: FingerprintJS Commercialization</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      FingerprintJS library acquired by major ad tech company, expanding fingerprinting to millions of websites.
                    </p>
                    <Badge variant="default">Commercial Adoption: High</Badge>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2">2023: Safari 17 Anti-Fingerprinting</h4>
                    <p className="text-sm text-slate-700 mb-2">
                      Apple introduced fingerprinting resistance in Safari 17, but researchers found bypasses within weeks.
                    </p>
                    <Badge variant="secondary">Defense Evasion: Demonstrated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm mb-2">Techniques:</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        {strategy.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="flex items-start">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technical Implementation */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Technical Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Browser Extensions for Privacy</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Canvas randomization extension
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function() {
  // Add random noise to canvas
  const ctx = this.getContext('2d');
  const imageData = ctx.getImageData(0, 0, this.width, this.height);
  const data = imageData.data;
  
  // Add subtle random noise
  for (let i = 0; i < data.length; i += 4) {
    if (Math.random() < 0.001) {
      data[i] = Math.floor(Math.random() * 256);
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  return originalToDataURL.call(this);
};`}
                    </Code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Server-Side Protection</h4>
                    <Code className="block p-3 bg-blue-50 border border-blue-200 rounded text-sm">
{`// Require consent for fingerprinting
app.use((req, res, next) => {
  if (req.path.includes('/fingerprint')) {
    // Check for explicit consent
    if (!req.cookies.fingerprint_consent) {
      return res.status(403).json({
        error: 'Fingerprinting requires explicit consent'
      });
    }
    
    // Rate limit fingerprinting attempts
    const key = \`fp_limit:\${req.ip}\`;
    const attempts = await redis.get(key);
    if (attempts > 10) {
      return res.status(429).json({
        error: 'Rate limit exceeded'
      });
    }
  }
  next();
});`}
                    </Code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Privacy-Preserving Design</h4>
                    <Code className="block p-3 bg-purple-50 border border-purple-200 rounded text-sm">
{`// Privacy-first web development principles
1. Progressive Enhancement
   - Core functionality works without JavaScript
   - Enhanced features require explicit opt-in
   
2. Data Minimization
   - Collect only essential data
   - Local processing when possible
   
3. Transparency
   - Clear privacy policy
   - Visible data collection notices
   - Easy opt-out mechanisms
   
4. Security by Design
   - Privacy as a requirement, not feature
   - Regular privacy audits
   - User control over data`}
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