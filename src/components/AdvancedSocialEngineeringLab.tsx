'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Users, Shield, AlertTriangle, Copy, Check, Eye, Mail, Smartphone, Globe, Clock } from 'lucide-react'

export default function AdvancedSocialEngineeringLab() {
  const [activeTab, setActiveTab] = useState('scenarios')
  const [selectedScenario, setSelectedScenario] = useState('')
  const [attackProgress, setAttackProgress] = useState(0)
  const [userVulnerability, setUserVulnerability] = useState('none')
  const [copied, setCopied] = useState(false)

  const realWorldScenarios = [
    {
      id: 'solarwinds',
      name: 'SolarWinds Supply Chain Attack',
      year: '2020',
      impact: 'Critical',
      description: 'Attackers compromised build system to inject malicious code into software updates',
      techniques: ['Supply chain compromise', 'Code signing bypass', 'Infrastructure persistence'],
      timeline: [
        'Mar 2020: Initial compromise of build environment',
        'Sep 2020: Malicious code injected into updates',
        'Dec 2020: 18,000+ customers affected',
        'Impact: $18M+ in damages, multiple government agencies'
      ],
      code: `// Malicious update payload
{
  "update_id": "ORION2020.2.1HF2",
  "signature": "VALID_ORION_SIGNATURE", // Forged
  "payload": {
    "backdoor": "SUNBURST",
    "c2_domain": "avsvmcloud[.]com",
    "persistence": "ScheduledTask",
    "lateral_movement": "SMB_WMI"
  }
}`,
      indicators: [
        'Suspicious C2 traffic to avsvmcloud.com',
        'Unusual DNS queries for solarwinds domain',
        'PowerShell commands from legitimate processes',
        'Scheduled tasks with suspicious names'
      ]
    },
    {
      id: 'colonial-pipeline',
      name: 'Colonial Pipeline Ransomware',
      year: '2021',
      impact: 'Critical',
      description: 'Attackers gained access through compromised VPN credentials and deployed ransomware',
      techniques: ['Credential theft', 'Lateral movement', 'Ransomware deployment'],
      timeline: [
        'Apr 2021: VPN credentials compromised via phishing',
        'May 2021: Initial access and reconnaissance',
        'May 7 2021: Ransomware deployment across network',
        'May 9 2021: Pipeline shutdown (6 days)',
        'Impact: $4.4M ransom paid, fuel shortages across US East Coast'
      ],
      code: `// Ransomware deployment script
$payload = Invoke-Mimikatz -DumpCreds
$network = Get-ADComputers -Filter *
foreach ($computer in $network) {
    Copy-Item $payload "\\\\$computer\\C$\\temp\\"
    Invoke-Command -Computer $computer -ScriptBlock {
        Start-Process "C:\\temp\\payload.exe"
    }
}
# Encrypt all critical files
Invoke-Encryption -Path "C:\\critical\\" -RansomNote "README_DECRYPT.txt"`,
      indicators: [
        'VPN login from unusual geographic locations',
        'Mimikatz execution artifacts',
        'SMB file transfers to multiple hosts',
        'Mass file encryption events'
      ]
    },
    {
      id: 'twitter-2022',
      name: 'Twitter 2022 API Breach',
      year: '2022',
      impact: 'High',
      description: 'Zero-day vulnerability exploited to access 5.4M accounts',
      techniques: ['API vulnerability', 'Data scraping', 'Account enumeration'],
      timeline: [
        'Jan 2022: Zero-day discovered in Twitter API',
        'Jan 2022: Attackers exploit vulnerability',
        'Dec 2022: Breach disclosed, 5.4M accounts affected',
        'Impact: Private data exposed, regulatory fines'
      ],
      code: `// API exploitation script
const vulnerability = {
  endpoint: "/api/1.1/account/verify_credentials",
  method: "POST",
  exploit: "SQL injection in phone_number field",
  payload: "123456' UNION SELECT email,phone FROM users--"
};

// Automated account harvesting
for (let i = 0; i < 5400000; i++) {
  const account = await exploitAPI(vulnerability, i);
  if (account.email) {
    await exfiltrateData(account);
  }
}`,
      indicators: [
        'Unusual API call patterns',
        'SQL injection attempts in logs',
        'High-volume account enumeration',
        'Data exfiltration to unknown IPs'
      ]
    },
    {
      id: 'okta-2022',
      name: 'Okta 2022 Authentication Breach',
      year: '2022',
      impact: 'High',
      description: 'Attackers accessed Okta support system with stolen credentials',
      techniques: ['Credential theft', 'Support system compromise', 'Customer data access'],
      timeline: [
        'Oct 2022: Okta support credentials compromised',
        'Oct 2022: Access to customer data via support tools',
        'Oct 2022: Multiple high-profile customers affected',
        'Impact: Hundreds of companies affected, data exposure'
      ],
      code: `// Support system access script
const compromisedCredentials = {
  "support_user": "okta_support_user",
  "password": "stolen_password",
  "mfa_bypass": "session_hijacking"
};

// Access customer data via support tools
function accessCustomerData(customerId) {
  const session = authenticateSupport(compromisedCredentials);
  return fetchSupportAPI("/customers/" + customerId, {
    headers: { "Authorization": "Bearer " + session.token }
  });
}`,
      indicators: [
        'Support login from new locations',
        'Unusual data access patterns',
        'MFA bypass attempts',
        'Bulk customer data downloads'
      ]
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const simulateAttack = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    setAttackProgress(0)
    
    const interval = setInterval(() => {
      setAttackProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const vulnerabilityFactors = [
    { factor: 'Urgency', description: 'Creating false time pressure' },
    { factor: 'Authority', description: 'Impersonating legitimate entities' },
    { factor: 'Consensus', description: 'Showing social proof' },
    { factor: 'Scarcity', description: 'Limited time offers' },
    { factor: 'Familiarity', description: 'Building rapport' },
    { factor: 'Trust', description: 'Exploating established relationships' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Advanced Social Engineering Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Real-world attack scenarios from major security breaches</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These scenarios are based on actual security breaches. Learn how attackers combine technical and psychological techniques to achieve their goals.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="scenarios" className="text-xs sm:text-sm">Real-World Scenarios</TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs sm:text-sm">Attack Techniques</TabsTrigger>
            <TabsTrigger value="defense" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Real-World Scenarios Tab */}
          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {realWorldScenarios.map((scenario) => (
                <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{scenario.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{scenario.year}</Badge>
                        <Badge variant={scenario.impact === 'Critical' ? 'destructive' : 'default'}>
                          {scenario.impact}
                        </Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Attack Timeline */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Attack Timeline:</h4>
                      <div className="space-y-1">
                        {scenario.timeline.map((event, index) => (
                          <div key={index} className="text-xs p-2 bg-slate-50 rounded border-l-4 border-red-500">
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Techniques Used */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Techniques Used:</h4>
                      <div className="flex flex-wrap gap-1">
                        {scenario.techniques.map((technique, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Attack Code */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Attack Code (Simplified):</h4>
                      <Code className="block p-2 bg-slate-50 rounded text-xs max-h-32 overflow-y-auto">
                        {scenario.code}
                      </Code>
                    </div>

                    {/* Simulation Button */}
                    <Button
                      onClick={() => simulateAttack(scenario.id)}
                      className="w-full"
                      variant={selectedScenario === scenario.id ? "default" : "outline"}
                    >
                      {selectedScenario === scenario.id ? (
                        <>
                          <Clock className="w-4 h-4 mr-2" />
                          Simulating... {attackProgress}%
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Simulate Attack
                        </>
                      )}
                    </Button>

                    {/* Progress Bar */}
                    {selectedScenario === scenario.id && (
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${attackProgress}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Attack Indicators */}
            {selectedScenario && (
              <Card>
                <CardHeader>
                  <CardTitle>🚨 Attack Indicators of Compromise (IoCs)</CardTitle>
                  <CardDescription>
                    Real indicators that would have triggered during this attack
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {realWorldScenarios.find(s => s.id === selectedScenario)?.indicators.map((indicator, index) => (
                      <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-800">{indicator}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Attack Techniques Tab */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Psychological Factors */}
              <Card>
                <CardHeader>
                  <CardTitle>🧠 Psychological Manipulation Factors</CardTitle>
                  <CardDescription>
                    Cialdini's 6 Principles of Influence in Cyber Attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vulnerabilityFactors.map((factor, index) => (
                    <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900">{factor.factor}</h4>
                      <p className="text-sm text-purple-700">{factor.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Modern Attack Vectors */}
              <Card>
                <CardHeader>
                  <CardTitle>📱 Modern Attack Vectors</CardTitle>
                  <CardDescription>
                    Current techniques used in sophisticated attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-1">SMS Phishing (Smishing)</h4>
                      <Code className="block p-2 bg-white rounded text-xs">
{`// Real-world smishing template
"Your package from Amazon is held.
Click here to verify: bit.ly/3kKj9m"
// Uses urgency and brand impersonation`}
                      </Code>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">QR Code Phishing</h4>
                      <Code className="block p-2 bg-white rounded text-xs">
{`// QR code attack in restaurants
Fake QR: "Scan for WiFi access"
Real URL: "http://evil[.]com/phish"
// Captures credentials when scanned`}
                      </Code>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-1">Voice Phishing (Vishing)</h4>
                      <Code className="block p-2 bg-white rounded text-xs">
{`// Bank impersonation script
"This is John from fraud detection.
We detected suspicious activity.
Please verify your account at: bank-security[.]xyz"
// Creates urgency and authority`}
                      </Code>
                    </div>

                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-1">Deepfake Video Scams</h4>
                      <Code className="block p-2 bg-white rounded text-xs">
{`// Deepfake CEO fraud video
"Hey team, I need you to urgently
transfer $50K to this supplier
for a confidential project. Video call proof available."`}
                      </Code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Vulnerability Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>🎯 User Vulnerability Assessment</CardTitle>
                <CardDescription>
                  Test your susceptibility to social engineering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Assessment Questions:</h4>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">1. You receive an urgent email from your "IT department" asking you to reset your password immediately. What do you do?</p>
                      <div className="space-y-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setUserVulnerability('high')}
                        >
                          Click the link and reset password
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setUserVulnerability('medium')}
                        >
                          Contact IT through known channels
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setUserVulnerability('low')}
                        >
                          Ignore the email
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium mb-2">2. A "colleague" messages you on LinkedIn with a "confidential job offer" and asks for your current salary details.</p>
                      <div className="space-y-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setUserVulnerability('high')}
                        >
                          Share salary details immediately
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          onClick={() => setUserVulnerability('low')}
                        >
                          Report as suspicious
                        </Button>
                      </div>
                    </div>
                  </div>

                  {userVulnerability && (
                    <Alert className={userVulnerability === 'high' ? 'border-red-200 bg-red-50' : 
                                     userVulnerability === 'medium' ? 'border-amber-200 bg-amber-50' : 
                                     'border-green-200 bg-green-50'}>
                      <AlertDescription className={userVulnerability === 'high' ? 'text-red-800' : 
                                                     userVulnerability === 'medium' ? 'text-amber-800' : 
                                                     'text-green-800'}>
                        {userVulnerability === 'high' && '⚠️ High vulnerability: You may be susceptible to sophisticated social engineering attacks.'}
                        {userVulnerability === 'medium' && '🔍 Medium risk: Some awareness but could be improved.'}
                        {userVulnerability === 'low' && '✅ Low vulnerability: Good security awareness.'}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defense" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Organizational Defense */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Organizational Defense</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Security Awareness Training</h4>
                      <Code className="block p-2 bg-green-50 rounded text-xs">
{`// Quarterly training program
1. Phishing simulation campaigns
2. Real-world case studies
3. Interactive workshops
4. Knowledge assessments
5. Reporting procedures`}
                      </Code>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Incident Response Plan</h4>
                      <Code className="block p-2 bg-green-50 rounded text-xs">
{`// 24/7 Security Operations
- Immediate containment procedures
- Forensic investigation protocols
- Communication templates
- Legal compliance requirements
- Recovery procedures`}
                      </Code>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Zero Trust Architecture</h4>
                      <Code className="block p-2 bg-green-50 rounded text-xs">
{`// Never trust, always verify
- Multi-factor authentication required
- Least privilege access
- Continuous authentication
- Micro-segmentation
- Encryption everywhere`}
                      </Code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Technical Controls</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Email Security Gateway</h4>
                      <Code className="block p-2 bg-blue-50 rounded text-xs">
{`// Advanced email protection
- SPF, DKIM, DMARC validation
- URL rewriting and sandboxing
- Attachment scanning
- Machine learning detection
- User behavior analytics`}
                      </Code>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Multi-Factor Authentication</h4>
                      <Code className="block p-2 bg-blue-50 rounded text-xs">
{`// Defense in depth
1. Something you know (password)
2. Something you have (phone/token)
3. Something you are (biometrics)
4. Somewhere you are (location)
5. Adaptive authentication based on risk`}
                      </Code>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Threat Intelligence Integration</h4>
                      <Code className="block p-2 bg-blue-50 rounded text-xs">
{`// Proactive threat hunting
- IOC sharing with industry partners
- Automated blocklist updates
- Dark web monitoring
- Brand impersonation detection
- Attack pattern analysis`}
                      </Code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-World Success Stories */}
            <Card>
              <CardHeader>
                <CardTitle>🏆 Real-World Defense Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Microsoft Stops 30M Account Takeovers</h4>
                    <p className="text-sm text-green-800 mb-2">
                      Through AI-powered behavioral analysis and MFA enforcement, Microsoft prevented over 30 million account compromises in 2022.
                    </p>
                    <div className="text-xs text-green-700">
                      <strong>Key Success Factors:</strong> Machine learning, real-time risk scoring, user education integration
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Financial Institution Thwarts $50M Heist</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      A European bank detected and stopped a sophisticated social engineering campaign targeting high-net-worth clients.
                    </p>
                    <div className="text-xs text-blue-700">
                      <strong>Key Success Factors:</strong> Transaction monitoring, behavioral biometrics, out-of-band verification
                    </div>
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