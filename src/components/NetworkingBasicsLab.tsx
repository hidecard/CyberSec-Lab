'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Network, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, FileText, Wifi, Globe, Shield, Search } from 'lucide-react'

interface NetworkChallenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  scenario: string
  expectedAnalysis: string
  packetData: string
  hints: string[]
  explanation: string
  keyFindings: string[]
}

const networkChallenges: NetworkChallenge[] = [
  {
    id: 'tcp-handshake',
    title: 'TCP Three-Way Handshake',
    description: 'Analyze the TCP connection establishment process',
    difficulty: 'Beginner',
    category: 'Protocols',
    task: 'Identify the three packets involved in establishing a TCP connection and explain their purpose.',
    scenario: 'You\'re monitoring network traffic and see a new connection being established. Analyze the packet sequence.',
    expectedAnalysis: 'SYN (192.168.1.100:54321 → 10.0.0.1:80) - Client initiates connection\nSYN-ACK (10.0.0.1:80 → 192.168.1.100:54321) - Server acknowledges and responds\nACK (192.168.1.100:54321 → 10.0.0.1:80) - Client acknowledges, connection established',
    packetData: `# Packet 1: SYN
IP 192.168.1.100:54321 > 10.0.0.1:80
Flags: SYN
Seq: 1000

# Packet 2: SYN-ACK
IP 10.0.0.1:80 > 192.168.1.100:54321
Flags: SYN, ACK
Seq: 2000, Ack: 1001

# Packet 3: ACK
IP 192.168.1.100:54321 > 10.0.0.1:80
Flags: ACK
Seq: 1001, Ack: 2001`,
    hints: [
      'Look for SYN, SYN-ACK, and ACK flags',
      'Sequence numbers increase by 1 for acknowledgments',
      'Each packet acknowledges the previous one\'s sequence number + 1'
    ],
    explanation: 'The TCP three-way handshake ensures reliable connection establishment. SYN initiates, SYN-ACK responds, ACK completes the connection.',
    keyFindings: [
      'Connection established successfully',
      'No retransmissions or errors',
      'Standard TCP port 80 (HTTP) used'
    ]
  },
  {
    id: 'dns-resolution',
    title: 'DNS Query Analysis',
    description: 'Examine DNS name resolution process',
    difficulty: 'Beginner',
    category: 'DNS',
    task: 'Analyze a DNS query and response, identifying the domain being resolved and the IP address returned.',
    scenario: 'A user is trying to access a website. Monitor the DNS resolution process.',
    expectedAnalysis: 'DNS Query: A record for "example.com" from client 192.168.1.100 to DNS server 8.8.8.8\nDNS Response: A record "example.com" resolves to 93.184.216.34\nQuery ID: 0x1234, Response time: 45ms',
    packetData: `# DNS Query
IP 192.168.1.100:54321 > 8.8.8.8:53
Transaction ID: 0x1234
Query: A example.com

# DNS Response
IP 8.8.8.8:53 > 192.168.1.100:54321
Transaction ID: 0x1234
Answer: example.com A 93.184.216.34
TTL: 3600 seconds`,
    hints: [
      'DNS uses UDP port 53',
      'A records map domain names to IPv4 addresses',
      'Transaction IDs match queries to responses'
    ],
    explanation: 'DNS translates human-readable domain names to IP addresses. Recursive resolvers query authoritative servers to resolve names.',
    keyFindings: [
      'Successful DNS resolution',
      'example.com resolves to 93.184.216.34',
      'Standard DNS server (Google Public DNS) used'
    ]
  },
  {
    id: 'http-request',
    title: 'HTTP Request/Response',
    description: 'Analyze HTTP communication between client and server',
    difficulty: 'Beginner',
    category: 'HTTP',
    task: 'Examine an HTTP GET request and its response, identifying key headers and content.',
    scenario: 'Monitor web traffic to understand client-server communication patterns.',
    expectedAnalysis: 'HTTP GET /index.html - Client requests homepage\nHost: example.com - Virtual hosting\nUser-Agent: Mozilla/5.0 - Browser identification\nResponse: 200 OK, Content-Type: text/html, Content-Length: 1234',
    packetData: `# HTTP Request
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Connection: keep-alive

# HTTP Response
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Server: nginx/1.18.0
Date: Mon, 15 Jan 2024 10:30:00 GMT
Connection: keep-alive

<html><body><h1>Welcome</h1></body></html>`,
    hints: [
      'HTTP requests include method, path, and headers',
      'Responses include status codes and content',
      'Headers provide metadata about the request/response'
    ],
    explanation: 'HTTP is the protocol for web communication. Requests specify actions, responses deliver content with status codes indicating success or errors.',
    keyFindings: [
      'Successful HTTP transaction (200 OK)',
      'nginx web server detected',
      'Keep-alive connection maintained'
    ]
  },
  {
    id: 'port-scanning',
    title: 'Port Scanning Detection',
    description: 'Identify and analyze port scanning activity',
    difficulty: 'Intermediate',
    category: 'Scanning',
    task: 'Detect a port scan attempt and determine the scanning technique used.',
    scenario: 'Your intrusion detection system alerts on suspicious network activity. Investigate the traffic pattern.',
    expectedAnalysis: 'TCP SYN scan detected: Attacker 192.168.1.100 scanning target 10.0.0.1\nPorts scanned: 22, 80, 443, 3389\nTechnique: Half-open scanning (SYN packets without completion)\nPotential threat: Reconnaissance for vulnerability assessment',
    packetData: `# Port scan packets
IP 192.168.1.100:54321 > 10.0.0.1:22  Flags: SYN
IP 192.168.1.100:54322 > 10.0.0.1:80  Flags: SYN
IP 192.168.1.100:54323 > 10.0.0.1:443 Flags: SYN
IP 192.168.1.100:54324 > 10.0.0.1:3389 Flags: SYN

# Responses (if ports open)
IP 10.0.0.1:22 > 192.168.1.100:54321  Flags: SYN, ACK
IP 10.0.0.1:80 > 192.168.1.100:54322  Flags: SYN, ACK
IP 10.0.0.1:443 > 192.168.1.100:54323 Flags: SYN, ACK
IP 10.0.0.1:3389 > 192.168.1.100:54324 Flags: RST, ACK`,
    hints: [
      'Multiple SYN packets to different ports',
      'Sequential source ports suggest automated scanning',
      'RST responses indicate closed/filtered ports',
      'SYN-ACK indicates open ports'
    ],
    explanation: 'Port scanning is reconnaissance to discover open services. SYN scans are stealthy as they don\'t complete connections.',
    keyFindings: [
      'TCP SYN scan detected',
      'Ports 22, 80, 443 open; 3389 closed',
      'Potential attacker reconnaissance activity'
    ]
  },
  {
    id: 'arp-spoofing',
    title: 'ARP Spoofing Attack',
    description: 'Detect and analyze ARP poisoning/man-in-the-middle attack',
    difficulty: 'Intermediate',
    category: 'ARP',
    task: 'Identify ARP spoofing attempts and explain the attack mechanism.',
    scenario: 'Network performance is degraded and you suspect an ARP poisoning attack.',
    expectedAnalysis: 'ARP spoofing detected: Attacker 192.168.1.100 claiming to be gateway 192.168.1.1\nGratuitous ARP replies sent to poison ARP cache\nAttack enables man-in-the-middle position for traffic interception',
    packetData: `# Legitimate ARP request
Who has 192.168.1.1? Tell 192.168.1.50

# Spoofed ARP reply
192.168.1.1 is at aa:bb:cc:dd:ee:ff  (Attacker's MAC)

# Another spoofed reply
192.168.1.1 is at aa:bb:cc:dd:ee:ff  (Gratuitous ARP)

# Normal traffic now routed through attacker
IP 192.168.1.50 > 192.168.1.1 (via attacker's MAC)`,
    hints: [
      'ARP replies without corresponding requests',
      'Multiple claims for same IP address',
      'Unexpected MAC address changes',
      'Gratuitous ARP packets'
    ],
    explanation: 'ARP spoofing poisons the ARP cache to redirect traffic through an attacker\'s machine, enabling man-in-the-middle attacks.',
    keyFindings: [
      'ARP cache poisoning detected',
      'Attacker MAC: aa:bb:cc:dd:ee:ff',
      'Gateway IP hijacked for MITM attack'
    ]
  },
  {
    id: 'ssl-tls-handshake',
    title: 'SSL/TLS Handshake',
    description: 'Analyze encrypted connection establishment',
    difficulty: 'Intermediate',
    category: 'Encryption',
    task: 'Examine the SSL/TLS handshake process and certificate validation.',
    scenario: 'Monitor encrypted web traffic to ensure secure connection establishment.',
    expectedAnalysis: 'TLS 1.3 handshake: Client Hello → Server Hello → Certificate → Client Key Exchange → Finished\nCertificate: example.com, Valid issuer: DigiCert, Expires: 2025-01-15\nCipher suite: TLS_AES_256_GCM_SHA384, Perfect forward secrecy enabled',
    packetData: `# Client Hello
TLS 1.3, Client Hello
Cipher Suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256
Supported Groups: secp256r1, secp384r1
Signature Algorithms: rsa_pss_rsae_sha256, rsa_pkcs1_sha256

# Server Hello
TLS 1.3, Server Hello
Cipher Suite: TLS_AES_256_GCM_SHA384
Selected Group: secp256r1

# Certificate
Subject: CN=example.com
Issuer: CN=DigiCert SHA2 Secure Server CA, O=DigiCert Inc
Valid: 2024-01-15 to 2025-01-15

# Client Key Exchange + Finished
Encrypted handshake data`,
    hints: [
      'Client Hello lists supported cipher suites',
      'Server Hello selects cipher suite and parameters',
      'Certificate chain validates server identity',
      'Key exchange establishes session keys'
    ],
    explanation: 'SSL/TLS provides encrypted communication. The handshake establishes secure parameters and authenticates the server.',
    keyFindings: [
      'TLS 1.3 connection established',
      'Valid certificate chain',
      'Strong cipher suite selected',
      'Forward secrecy enabled'
    ]
  },
  {
    id: 'syn-flood',
    title: 'SYN Flood Attack',
    description: 'Detect and analyze SYN flood DDoS attack',
    difficulty: 'Advanced',
    category: 'DDoS',
    task: 'Identify a SYN flood attack and assess its impact on the target system.',
    scenario: 'A web server is unresponsive. Network analysis reveals overwhelming traffic.',
    expectedAnalysis: 'SYN flood DDoS: 10,000+ SYN packets/second from spoofed IPs\nTarget port 80 overwhelmed, legitimate connections blocked\nAttack consumes server resources, preventing new connections',
    packetData: `# SYN flood traffic
IP 1.2.3.4:12345 > 10.0.0.1:80  Flags: SYN  (Spoofed)
IP 5.6.7.8:23456 > 10.0.0.1:80  Flags: SYN  (Spoofed)
IP 9.10.11.12:34567 > 10.0.0.1:80  Flags: SYN  (Spoofed)
... thousands more ...

# Server responses (limited)
IP 10.0.0.1:80 > 1.2.3.4:12345  Flags: SYN, ACK
IP 10.0.0.1:80 > 5.6.7.8:23456  Flags: SYN, ACK

# No ACK responses from spoofed IPs
# Server SYN queue fills up, legitimate connections dropped`,
    hints: [
      'High volume of SYN packets',
      'Spoofed source IP addresses',
      'No corresponding ACK responses',
      'Server becomes unresponsive'
    ],
    explanation: 'SYN floods exploit TCP handshake by sending SYN packets with spoofed IPs, filling the server\'s connection queue and denying service.',
    keyFindings: [
      'SYN flood attack confirmed',
      '10,000+ packets per second',
      'Spoofed source addresses',
      'Server resources exhausted'
    ]
  },
  {
    id: 'dns-tunneling',
    title: 'DNS Tunneling Exfiltration',
    description: 'Detect data exfiltration through DNS queries',
    difficulty: 'Advanced',
    category: 'Exfiltration',
    task: 'Identify DNS tunneling used for data exfiltration and decode the hidden data.',
    scenario: 'Unusual DNS traffic detected. Investigate if sensitive data is being exfiltrated.',
    expectedAnalysis: 'DNS tunneling detected: Base64-encoded data in subdomain queries\nDomain: dG9wLXNlY3JldC1kYXRh.base64.example.com (decodes to "top-secret-data")\nData exfiltration rate: ~1KB per minute through TXT records',
    packetData: `# DNS tunneling queries
dG9wLXNlY3JldC1kYXRh.base64.example.com A ?
c2Vuc2l0aXZlLWZpbGU=.base64.example.com TXT ?
Y3JlZGVudGlhbHM=.base64.example.com A ?

# Responses with encoded data
base64.example.com TXT "U2VjcmV0IGRhdGEgaW4gVEhUIHJlY29yZA=="

# Decoded data reveals:
# "Secret data in TXT record"
# "Sensitive file contents"
# "User credentials: admin/password123"`,
    hints: [
      'Unusually long subdomains',
      'Base64 or hex encoding patterns',
      'High query frequency to unusual domains',
      'Large TXT record responses'
    ],
    explanation: 'DNS tunneling hides data in DNS queries/responses to exfiltrate information past firewalls that allow DNS traffic.',
    keyFindings: [
      'DNS tunneling for data exfiltration',
      'Base64 encoding in subdomains',
      'Sensitive data being stolen',
      'Bypassing security controls'
    ]
  }
]

export default function NetworkingBasicsLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<NetworkChallenge>(networkChallenges[0])
  const [userAnalysis, setUserAnalysis] = useState('')
  const [output, setOutput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserAnalysis('')
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  const analyzePackets = async () => {
    setIsAnalyzing(true)
    setOutput('')

    try {
      // Simulate packet analysis
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simple validation for demo purposes
      let analysisResult = ''

      if (selectedChallenge.id === 'tcp-handshake') {
        if (userAnalysis.toLowerCase().includes('syn') && userAnalysis.toLowerCase().includes('ack')) {
          analysisResult = 'Correct! TCP three-way handshake identified.'
        }
      } else if (selectedChallenge.id === 'dns-resolution') {
        if (userAnalysis.includes('example.com') && userAnalysis.includes('93.184.216.34')) {
          analysisResult = 'Correct! DNS resolution properly analyzed.'
        }
      } else if (selectedChallenge.id === 'http-request') {
        if (userAnalysis.includes('200') && userAnalysis.includes('GET')) {
          analysisResult = 'Correct! HTTP transaction analyzed successfully.'
        }
      } else if (selectedChallenge.id === 'port-scanning') {
        if (userAnalysis.toLowerCase().includes('syn') && userAnalysis.toLowerCase().includes('scan')) {
          analysisResult = 'Correct! Port scanning activity detected.'
        }
      } else if (selectedChallenge.id === 'arp-spoofing') {
        if (userAnalysis.toLowerCase().includes('arp') && userAnalysis.toLowerCase().includes('spoof')) {
          analysisResult = 'Correct! ARP spoofing attack identified.'
        }
      } else if (selectedChallenge.id === 'ssl-tls-handshake') {
        if (userAnalysis.includes('TLS') && userAnalysis.includes('certificate')) {
          analysisResult = 'Correct! SSL/TLS handshake analyzed.'
        }
      } else if (selectedChallenge.id === 'syn-flood') {
        if (userAnalysis.toLowerCase().includes('syn') && userAnalysis.toLowerCase().includes('flood')) {
          analysisResult = 'Correct! SYN flood attack detected.'
        }
      } else if (selectedChallenge.id === 'dns-tunneling') {
        if (userAnalysis.toLowerCase().includes('dns') && userAnalysis.toLowerCase().includes('tunnel')) {
          analysisResult = 'Correct! DNS tunneling identified.'
        }
      }

      if (analysisResult) {
        setOutput(analysisResult + '\n\n' + selectedChallenge.expectedAnalysis)
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      } else {
        setOutput('Analysis submitted. Review the packet data and try again with more specific findings.')
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-blue-500 rounded-lg self-start">
              <Network className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Networking Basics Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Analyze network protocols and detect security threats through packet inspection</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Master network analysis skills by examining packet captures and identifying security threats. Learn to interpret protocol behaviors and detect malicious activity.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="challenges" className="text-xs sm:text-sm">Challenges</TabsTrigger>
            <TabsTrigger value="progress" className="text-xs sm:text-sm">Progress</TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Challenge List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Challenges</span>
                  </CardTitle>
                  <CardDescription>
                    Select a network analysis challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {networkChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-slate-50'
                      } ${completedChallenges.has(challenge.id) ? 'border-green-200' : 'border-slate-200'} border`}
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        {completedChallenges.has(challenge.id) && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white text-xs`}>
                        {challenge.difficulty}
                      </Badge>
                      <p className="text-xs text-slate-600 mt-1">{challenge.category}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Challenge Details and Analysis */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Search className="w-5 h-5" />
                        <span>{selectedChallenge.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                          {selectedChallenge.difficulty}
                        </Badge>
                        <span className="text-sm text-slate-600">{selectedChallenge.category}</span>
                      </div>
                    </div>
                    {completedChallenges.has(selectedChallenge.id) && (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <CardDescription>{selectedChallenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <h4 className="font-semibold mb-2 text-red-800">Security Scenario:</h4>
                    <p className="text-sm text-red-700">{selectedChallenge.scenario}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Task:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.task}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Packet Capture:</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                      <pre>{selectedChallenge.packetData}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Your Analysis:</h4>
                    <Textarea
                      value={userAnalysis}
                      onChange={(e) => setUserAnalysis(e.target.value)}
                      placeholder="Analyze the packet data and describe what you observe..."
                      className="text-sm h-32"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={analyzePackets}
                      disabled={isAnalyzing || !userAnalysis.trim()}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isAnalyzing ? 'Analyzing...' : 'Submit Analysis'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowHints(!showHints)}
                    >
                      💡 Hints
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      👁️ Solution
                    </Button>
                  </div>

                  {showHints && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Hints:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedChallenge.hints.map((hint, index) => (
                          <li key={index} className="text-sm">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {showSolution && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2">Expected Analysis:</h4>
                      <div className="text-sm whitespace-pre-line">{selectedChallenge.expectedAnalysis}</div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Analysis Results:</h4>
                    <div className="bg-slate-50 p-3 rounded-lg text-sm min-h-24">
                      {output || 'Submit your analysis to see results...'}
                    </div>
                  </div>

                  {completedChallenges.has(selectedChallenge.id) && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold mb-2 text-green-800">Key Findings:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedChallenge.keyFindings.map((finding, index) => (
                          <li key={index} className="text-sm text-green-700">{finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Progress Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {completedChallenges.size}/{networkChallenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / networkChallenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5" />
                    <span>Protocols Learned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">TCP/IP Fundamentals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">HTTP/HTTPS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">DNS Resolution</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SSL/TLS Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Attack Detection</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Packet analysis with Wireshark</p>
                    <p>• Protocol dissection</p>
                    <p>• Threat detection</p>
                    <p>• Network forensics</p>
                    <p>• Traffic pattern analysis</p>
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
