'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Target, Shield, Eye, EyeOff, AlertTriangle, Layers } from 'lucide-react'

export default function ClickjackingSimulator() {
  const [activeTab, setActiveTab] = useState('demo')
  const [showIframe, setShowIframe] = useState(false)
  const [isProtected, setIsProtected] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [attackerAction, setAttackerAction] = useState('')
  const victimSiteRef = useRef<HTMLDivElement>(null)

  const handleVictimClick = () => {
    if (!isProtected && showIframe) {
      setAttackerAction('🎯 You clicked the victim button, but the attacker\'s hidden button was triggered!')
      setClickCount(clickCount + 1)
    } else {
      setAttackerAction('✅ Click protected - no attack executed')
    }
  }

  const handleAttackerClick = () => {
    setAttackerAction('💰 Attacker action: Transfer $100 to attacker account!')
  }

  const toggleProtection = () => {
    setIsProtected(!isProtected)
    setAttackerAction('')
  }

  const toggleIframe = () => {
    setShowIframe(!showIframe)
    setAttackerAction('')
  }

  const clickjackingVariants = [
    {
      name: 'Like Jacking',
      description: 'Hidden Facebook Like button over interesting content',
      risk: 'Medium',
      example: 'User clicks "Download" but actually Likes a page'
    },
    {
      name: 'Cursor Jacking',
      description: 'Custom cursor that misrepresents actual click position',
      risk: 'High',
      example: 'Cursor shows one position, click registers elsewhere'
    },
    {
      name: 'Form Jacking',
      description: 'Invisible form over legitimate form',
      risk: 'Critical',
      example: 'User fills login form, data goes to attacker'
    },
    {
      name: 'Redirection Jacking',
      description: 'Invisible redirect button over navigation',
      risk: 'High',
      example: 'Clicking menu item redirects to malicious site'
    }
  ]

  const defenseMethods = [
    {
      method: 'X-Frame-Options Header',
      code: `X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN`,
      description: 'Prevents site from being embedded in iframes'
    },
    {
      method: 'Content Security Policy',
      code: `Content-Security-Policy: 
  frame-ancestors 'none';
  frame-ancestors 'self' https://trusted.com;`,
      description: 'Modern replacement for X-Frame-Options'
    },
    {
      method: 'JavaScript Frame Busting',
      code: `<script>
if (top !== self) {
  top.location = self.location;
}
</script>`,
      description: 'Client-side protection (can be bypassed)'
    },
    {
      method: 'Attribute Frame Busting',
      code: `<body onload="if(top!=self) top.location=self.location">`,
      description: 'HTML attribute-based protection'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-500 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Clickjacking Simulator</h1>
              <p className="text-slate-600">Learn how invisible UI elements can hijack user clicks and steal actions</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This simulation demonstrates how attackers can hide malicious elements behind legitimate UI to trick users.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Interactive Demo</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs sm:text-sm">Attack Variants</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Methods</TabsTrigger>
          </TabsList>

          {/* Interactive Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attacker Site */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Attacker Site</span>
                  </CardTitle>
                  <CardDescription>
                    Malicious site that embeds your site in a hidden iframe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">🎯 Attack Configuration:</h4>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="iframe-toggle"
                        checked={showIframe}
                        onChange={toggleIframe}
                        className="rounded"
                      />
                      <label htmlFor="iframe-toggle" className="text-sm">
                        Enable hidden iframe attack
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="protection-toggle"
                        checked={isProtected}
                        onChange={toggleProtection}
                        className="rounded"
                      />
                      <label htmlFor="protection-toggle" className="text-sm">
                        Enable frame protection
                      </label>
                    </div>
                  </div>

                  {/* Attack Visualization */}
                  <div className="relative">
                    <div className="p-4 bg-slate-100 rounded-lg border border-slate-300">
                      <h5 className="font-semibold mb-2">Malicious Page Content:</h5>
                      <div className="space-y-2">
                        <p className="text-sm">🎁 Click here to win a free iPhone!</p>
                        <p className="text-sm">💰 Special offer - Click now!</p>
                        <p className="text-sm">🎮 Play this amazing game!</p>
                      </div>
                      
                      {/* Hidden iframe overlay */}
                      {showIframe && !isProtected && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="relative w-full h-full">
                            {/* Simulated invisible iframe */}
                            <div className="absolute top-8 left-0 w-32 h-8 opacity-0">
                              <Button 
                                onClick={handleAttackerClick}
                                className="w-full h-full"
                                size="sm"
                              >
                                Hidden Attacker Button
                              </Button>
                            </div>
                            <div className="absolute top-8 left-0 w-32 h-8 border-2 border-red-500 border-dashed">
                              <span className="text-xs text-red-600">Hidden Button Area</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attack Status */}
                  {attackerAction && (
                    <Alert className={attackerAction.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                      <AlertDescription className={attackerAction.includes('✅') ? 'text-green-800' : 'text-red-800'}>
                        {attackerAction}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-xs text-slate-600">
                    <p>Clicks intercepted: {clickCount}</p>
                    <p>Protection status: {isProtected ? '✅ Active' : '❌ Disabled'}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Victim Site */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Victim Site (Your Application)</span>
                  </CardTitle>
                  <CardDescription>
                    Your legitimate site that attackers want to hijack
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    ref={victimSiteRef}
                    className={`p-4 bg-white rounded-lg border-2 ${
                      isProtected ? 'border-green-300' : 'border-slate-300'
                    }`}
                  >
                    <h5 className="font-semibold mb-3">Secure Banking Dashboard</h5>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded">
                        <p className="text-sm font-medium">Account Balance</p>
                        <p className="text-lg font-bold text-green-600">$5,432.10</p>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          onClick={handleVictimClick}
                          className="w-full"
                          variant={isProtected ? "outline" : "default"}
                        >
                          💸 Transfer Money
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                          📊 View Transactions
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                          ⚙️ Account Settings
                        </Button>
                      </div>
                    </div>

                    {isProtected && (
                      <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-xs text-green-800">
                          🛡️ Frame protection active - Cannot be embedded in iframes
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Technical Details */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Technical Details:</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`Current Headers:
${isProtected ? 'X-Frame-Options: DENY' : 'X-Frame-Options: (not set)'}
${isProtected ? 'Content-Security-Policy: frame-ancestors none' : 'Content-Security-Policy: (not set)'}

Status: ${isProtected ? 'Protected' : 'Vulnerable'}`}
                    </Code>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visual Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 How Clickjacking Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Layers className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">1. Layer Creation</h4>
                    <p className="text-sm text-slate-700">
                      Attacker creates invisible iframe with victim site
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Eye className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">2. Positioning</h4>
                    <p className="text-sm text-slate-700">
                      Aligns invisible buttons over visible诱饵 elements
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">3. Hijack</h4>
                    <p className="text-sm text-slate-700">
                      User clicks诱饵 but triggers hidden action
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attack Variants Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clickjackingVariants.map((variant, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{variant.name}</span>
                      <Badge variant={variant.risk === 'Critical' ? 'destructive' : 
                                     variant.risk === 'High' ? 'destructive' : 'default'}>
                        {variant.risk}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{variant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Example:</h4>
                        <p className="text-sm text-slate-700">{variant.example}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Technical Implementation:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs">
{`<!-- Invisible iframe -->
<iframe src="victim-site.com" 
        style="opacity:0; 
               position:absolute;
               top:100px; left:50px;
               width:200px; height:50px;">
</iframe>

<!-- Visible诱饵 -->
<button>Click here for free prize!</button>`}
                        </Code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Advanced Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Advanced Clickjacking Techniques</CardTitle>
                <CardDescription>
                  Sophisticated methods that bypass basic protections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Cursor Position Spoofing</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Fake cursor that follows real cursor
document.addEventListener('mousemove', (e) => {
  fakeCursor.style.left = (e.clientX + 10) + 'px';
  fakeCursor.style.top = (e.clientY + 10) + 'px';
});

// Hide real cursor
document.body.style.cursor = 'none';`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Shows cursor in one position but clicks register elsewhere
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Drag and Drop Hijacking</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Intercept drag events
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  // Redirect to hidden drop zone
});

document.addEventListener('drop', (e) => {
  // Handle files in attacker context
});`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Hijacks drag-and-drop operations to steal files
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Methods Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {defenseMethods.map((defense, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>{defense.method}</span>
                    </CardTitle>
                    <CardDescription>{defense.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Code className="block p-3 bg-slate-50 rounded text-sm">
                      {defense.code}
                    </Code>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementation Guide */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Complete Defense Implementation</CardTitle>
                <CardDescription>
                  Step-by-step guide to protect your application from clickjacking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">1. Server-Side Headers (Recommended)</h4>
                    <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Express.js example
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', 
    "frame-ancestors 'none'");
  next();
});

// Nginx example
add_header X-Frame-Options "DENY";
add_header Content-Security-Policy "frame-ancestors 'none';";`}
                    </Code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">2. Client-Side Protection (Backup)</h4>
                    <Code className="block p-3 bg-blue-50 border border-blue-200 rounded text-sm">
{`// Frame busting script
(function() {
  if (self !== top) {
    // Try to break out of iframe
    top.location = self.location;
    
    // Fallback for browsers that block above
    var antiClickjack = document.body;
    antiClickjack.style.display = 'none';
    setTimeout(function() {
      antiClickjack.style.display = 'block';
    }, 1000);
  }
})();`}
                    </Code>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">3. User Interface Protections</h4>
                    <Code className="block p-3 bg-amber-50 border border-amber-200 rounded text-sm">
{`// Require user confirmation for sensitive actions
function confirmAction(action) {
  return confirm(\`Are you sure you want to \${action}?\`);
}

// Show action context
function performTransfer(amount, recipient) {
  const confirmation = confirm(
    \`Transfer \$\{amount} to \${recipient}?\`
  );
  if (confirmation) {
    // Proceed with transfer
  }
}`}
                    </Code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testing Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Security Testing Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Manual Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Try to embed site in iframe</li>
                      <li>□ Test with different frame ancestors</li>
                      <li>□ Verify headers in browser dev tools</li>
                      <li>□ Test frame-busting scripts</li>
                      <li>□ Check CSP report-only mode</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Automated Testing</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Security header scanners</li>
                      <li>□ CSP validation tools</li>
                      <li>□ Clickjacking vulnerability scanners</li>
                      <li>□ Integration with CI/CD pipeline</li>
                      <li>□ Regular security audits</li>
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