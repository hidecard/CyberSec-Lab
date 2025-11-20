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
  },
  {
    id: 'icmp-analysis',
    title: 'ICMP Protocol Analysis',
    description: 'Analyze ICMP traffic for network diagnostics and potential attacks',
    difficulty: 'Beginner',
    category: 'ICMP',
    task: 'Examine ICMP echo request/reply packets and identify any unusual activity.',
    scenario: 'Network connectivity issues reported. Analyze ICMP traffic to diagnose the problem.',
    expectedAnalysis: 'ICMP Echo Request from 192.168.1.100 to 8.8.8.8 (Google DNS)\nEcho Reply from 8.8.8.8 to 192.168.1.100\nRound trip time: 23ms\nNo ICMP redirects or suspicious activity detected',
    packetData: `# ICMP Echo Request
IP 192.168.1.100 > 8.8.8.8
ICMP Echo request (ping)
ID: 0x1234, Seq: 1
Data: 56 bytes

# ICMP Echo Reply
IP 8.8.8.8 > 192.168.1.100
ICMP Echo reply
ID: 0x1234, Seq: 1
Data: 56 bytes

# ICMP Time Exceeded (TTL expired)
IP 10.0.0.1 > 192.168.1.100
ICMP Time exceeded, TTL expired in transit
Original IP: 192.168.1.100 > 1.1.1.1`,
    hints: [
      'ICMP Type 8 = Echo Request, Type 0 = Echo Reply',
      'Type 11 = Time Exceeded (TTL expired)',
      'Check for unusual ICMP types or frequencies',
      'Large ICMP packets may indicate tunneling'
    ],
    explanation: 'ICMP is used for network diagnostics (ping, traceroute) but can also be exploited for reconnaissance or tunneling attacks.',
    keyFindings: [
      'Normal ping traffic detected',
      'Network connectivity confirmed',
      'Traceroute in progress (TTL expired)',
      'No malicious ICMP activity'
    ]
  },
  {
    id: 'dhcp-process',
    title: 'DHCP Lease Process',
    description: 'Analyze DHCP client-server communication for IP address assignment',
    difficulty: 'Intermediate',
    category: 'DHCP',
    task: 'Examine the DHCP DORA process and identify the assigned network configuration.',
    scenario: 'New device connecting to network. Monitor DHCP process for proper configuration.',
    expectedAnalysis: 'DHCP Discover → Offer → Request → Acknowledgment (DORA)\nClient MAC: aa:bb:cc:dd:ee:ff\nAssigned IP: 192.168.1.50\nSubnet: 255.255.255.0, Gateway: 192.168.1.1\nDNS: 8.8.8.8, 8.8.4.4\nLease time: 24 hours',
    packetData: `# DHCP Discover (Broadcast)
Client MAC: aa:bb:cc:dd:ee:ff
DHCP Discover
Transaction ID: 0x12345678
Requested IP: 0.0.0.0

# DHCP Offer (Unicast)
Server IP: 192.168.1.1
DHCP Offer
Transaction ID: 0x12345678
Offered IP: 192.168.1.50
Subnet Mask: 255.255.255.0
Gateway: 192.168.1.1
DNS: 8.8.8.8, 8.8.4.4

# DHCP Request
DHCP Request
Transaction ID: 0x12345678
Requested IP: 192.168.1.50

# DHCP ACK
DHCP ACK
Transaction ID: 0x12345678
Assigned IP: 192.168.1.50
Lease Time: 86400 seconds`,
    hints: [
      'DORA: Discover, Offer, Request, Acknowledgment',
      'DHCP uses ports 67 (server) and 68 (client)',
      'Transaction IDs must match',
      'Check for DHCP spoofing attempts'
    ],
    explanation: 'DHCP dynamically assigns IP addresses and network configuration. Rogue DHCP servers can perform man-in-the-middle attacks.',
    keyFindings: [
      'Successful DHCP lease process',
      'Client received full network config',
      'Legitimate DHCP server used',
      'No DHCP spoofing detected'
    ]
  },
  {
    id: 'ftp-analysis',
    title: 'FTP Protocol Analysis',
    description: 'Examine FTP control and data connections',
    difficulty: 'Intermediate',
    category: 'FTP',
    task: 'Analyze FTP authentication and file transfer, identifying security vulnerabilities.',
    scenario: 'File transfer activity detected. Investigate FTP usage and check for cleartext credentials.',
    expectedAnalysis: 'FTP control connection on port 21\nData connection on port 20 (active mode)\nAuthentication: USER anonymous, PASS (empty)\nFile download: 2048 bytes transferred\nSecurity issue: Credentials sent in cleartext',
    packetData: `# FTP Control Connection
220 FTP Server Ready
USER anonymous
331 Password required
PASS
230 Login successful

# File Transfer Request
TYPE I
200 Type set to I
SIZE testfile.txt
213 2048
RETR testfile.txt
150 Opening data connection
226 Transfer complete

# Data Connection (separate TCP stream)
[Binary file data - 2048 bytes]`,
    hints: [
      'FTP uses separate control (21) and data (20) connections',
      'Commands: USER, PASS, RETR, STOR, LIST',
      'Responses start with 3-digit codes',
      'FTP sends credentials in cleartext'
    ],
    explanation: 'FTP transfers files but sends all commands including passwords in cleartext. FTPS or SFTP should be used instead.',
    keyFindings: [
      'FTP authentication successful',
      'File transfer completed',
      'Cleartext credentials exposed',
      'Security vulnerability identified'
    ]
  },
  {
    id: 'smtp-analysis',
    title: 'SMTP Email Transmission',
    description: 'Analyze SMTP protocol for email delivery and potential spam/malware',
    difficulty: 'Intermediate',
    category: 'SMTP',
    task: 'Examine SMTP conversation and identify email headers, recipients, and content.',
    scenario: 'Outbound email traffic detected. Analyze SMTP transmission for malicious content.',
    expectedAnalysis: 'SMTP session: MAIL FROM → RCPT TO → DATA → Message\nFrom: user@company.com\nTo: recipient@external.com\nSubject: Quarterly Report\nAttachments: quarterly-report.pdf (2.1MB)\nPotential malware: Suspicious PDF attachment',
    packetData: `# SMTP Conversation
220 mail.company.com ESMTP ready
EHLO workstation.company.com
250-mail.company.com Hello workstation.company.com
MAIL FROM:<user@company.com>
250 OK
RCPT TO:<recipient@external.com>
250 OK
DATA
354 Start mail input
From: user@company.com
To: recipient@external.com
Subject: Quarterly Report
Content-Type: multipart/mixed

--boundary
Content-Type: text/plain
Please find attached quarterly report.

--boundary
Content-Type: application/pdf
Content-Disposition: attachment; filename=quarterly-report.pdf
[Base64 encoded PDF data]

--boundary--
.
250 OK: queued as ABC123`,
    hints: [
      'SMTP commands: MAIL FROM, RCPT TO, DATA',
      'Email headers contain metadata',
      'Check for suspicious attachments',
      'Look for spam indicators'
    ],
    explanation: 'SMTP delivers email but lacks authentication by default. Email headers can reveal sender information and routing path.',
    keyFindings: [
      'Email successfully queued',
      'Large PDF attachment present',
      'External recipient',
      'Potential malware vector'
    ]
  },
  {
    id: 'ntp-analysis',
    title: 'NTP Time Synchronization',
    description: 'Analyze NTP protocol for time synchronization and potential attacks',
    difficulty: 'Intermediate',
    category: 'NTP',
    task: 'Examine NTP client-server communication and check for time synchronization.',
    scenario: 'System clock drift detected. Investigate NTP synchronization process.',
    expectedAnalysis: 'NTP client query to pool.ntp.org\nServer response with timestamp\nTime offset: +2.3ms\nSynchronization successful\nNo NTP amplification attack indicators',
    packetData: `# NTP Query
IP 192.168.1.100:123 > 216.239.35.8:123
NTP Version 4, Mode 3 (Client)
Transmit Timestamp: 1234567890.123456789

# NTP Response
IP 216.239.35.8:123 > 192.168.1.100:123
NTP Version 4, Mode 4 (Server)
Receive Timestamp: 1234567890.123456789
Transmit Timestamp: 1234567890.145678901
Reference Timestamp: 1234567890.145678901

# Calculated values:
# Offset: +2.3ms
# Delay: 22.2ms
# Stratum: 2`,
    hints: [
      'NTP uses UDP port 123',
      'Mode 3 = Client, Mode 4 = Server',
      'Timestamps used to calculate offset',
      'Check for monlist queries (amplification attack)'
    ],
    explanation: 'NTP synchronizes system clocks but can be abused for DDoS amplification attacks due to UDP and large responses.',
    keyFindings: [
      'Successful time synchronization',
      'Low latency connection',
      'No amplification attack detected',
      'Accurate time reference'
    ]
  },
  {
    id: 'snmp-analysis',
    title: 'SNMP Network Monitoring',
    description: 'Analyze SNMP protocol for network device monitoring',
    difficulty: 'Advanced',
    category: 'SNMP',
    task: 'Examine SNMP queries and identify MIB objects being monitored.',
    scenario: 'Network monitoring system querying devices. Check for exposed sensitive information.',
    expectedAnalysis: 'SNMP v2c GET requests to network devices\nCommunity string: public (default)\nMIB objects: sysDescr, ifOperStatus, hrStorageUsed\nSecurity issue: Default community string exposes device information',
    packetData: `# SNMP GET Request
IP 192.168.1.10:161 > 192.168.1.1:161
SNMPv2c, Community: public
GET REQUEST
sysDescr.0
ifOperStatus.1
hrStorageUsed.1

# SNMP GET Response
IP 192.168.1.1:161 > 192.168.1.10:161
SNMPv2c, Community: public
GET RESPONSE
sysDescr.0 = "Cisco IOS Software, C2960 Software (C2960-LANBASEK9-M), Version 15.0(2)SE11"
ifOperStatus.1 = up(1)
hrStorageUsed.1 = 45%`,
    hints: [
      'SNMP uses UDP port 161',
      'Community strings act as passwords',
      'MIB objects identify specific data',
      'Default "public" community is insecure'
    ],
    explanation: 'SNMP monitors network devices but often uses weak authentication. Default community strings can expose sensitive device information.',
    keyFindings: [
      'SNMP monitoring active',
      'Default community string used',
      'Device information exposed',
      'Security vulnerability present'
    ]
  },
  {
    id: 'ipsec-vpn',
    title: 'IPsec VPN Tunnel Analysis',
    description: 'Analyze IPsec VPN tunnel establishment and encrypted traffic',
    difficulty: 'Advanced',
    category: 'VPN',
    task: 'Examine IKE handshake and ESP traffic in VPN connection.',
    scenario: 'VPN connection established. Verify secure tunnel setup and encryption.',
    expectedAnalysis: 'IKE Phase 1: Main Mode, Pre-shared key authentication\nPhase 2: Quick Mode, ESP tunnel established\nEncryption: AES-256, Authentication: SHA-256\nPerfect Forward Secrecy enabled\nSecure VPN tunnel confirmed',
    packetData: `# IKE Phase 1 - Main Mode
IP 192.168.1.100:500 > 203.0.113.1:500
IKE SA INIT
DH Group: 14 (2048-bit MODP)
Encryption: AES-CBC-256
Integrity: SHA-256
PRF: SHA-256

# IKE Phase 1 - Authentication
IKE AUTH
ID: 192.168.1.100
AUTH: Pre-shared key

# IKE Phase 2 - Quick Mode
CREATE CHILD SA
ESP SPI: 0x12345678
Encryption: AES-GCM-256
ESN: Enabled

# ESP Encrypted Traffic
IP 192.168.1.100 > 203.0.113.1
Protocol: ESP (50)
SPI: 0x12345678
Sequence: 1
[Encrypted payload]`,
    hints: [
      'IKE uses UDP port 500',
      'Phase 1 establishes ISAKey',
      'Phase 2 creates IPsec SAs',
      'ESP (50) indicates encrypted traffic'
    ],
    explanation: 'IPsec VPNs provide secure encrypted tunnels using IKE for key exchange and ESP/AH for traffic protection.',
    keyFindings: [
      'IPsec tunnel established',
      'Strong encryption (AES-256)',
      'PFS enabled for security',
      'VPN connection secure'
    ]
  },
  {
    id: 'wireless-wpa2',
    title: 'WPA2 Wireless Handshake',
    description: 'Analyze WPA2 4-way handshake for wireless security',
    difficulty: 'Advanced',
    category: 'Wireless',
    task: 'Examine WPA2 authentication process and verify security parameters.',
    scenario: 'Wireless client connecting to WPA2 network. Analyze handshake for security.',
    expectedAnalysis: 'WPA2-Personal (PSK) 4-way handshake\nAP: 00:11:22:33:44:55, Client: aa:bb:cc:dd:ee:ff\nSSID: CorporateWiFi\nEncryption: CCMP (AES)\nSecure key exchange completed',
    packetData: `# EAPOL Message 1 (AP → Client)
802.11 Auth: Success
EAPOL-Key: Pairwise
Key MIC: present
Key Data: ANonce

# EAPOL Message 2 (Client → AP)
EAPOL-Key: Pairwise
Key MIC: present
Key Data: SNonce, MIC(PTK)

# EAPOL Message 3 (AP → Client)
EAPOL-Key: Pairwise
Key MIC: present
Key Data: GTK, MIC(PTK)

# EAPOL Message 4 (Client → AP)
EAPOL-Key: Pairwise
Key MIC: present
Key Data: MIC(PTK)

# Data traffic (encrypted)
802.11 Data, CCMP encrypted`,
    hints: [
      '4-way handshake establishes PTK',
      'ANonce from AP, SNonce from client',
      'MIC prevents forgery attacks',
      'GTK protects multicast traffic'
    ],
    explanation: 'WPA2 uses a 4-way handshake to establish encryption keys. The process prevents replay attacks and ensures mutual authentication.',
    keyFindings: [
      'WPA2 handshake successful',
      'Strong encryption (AES-CCMP)',
      'No handshake attacks detected',
      'Wireless security verified'
    ]
  },
  {
    id: 'ipv6-analysis',
    title: 'IPv6 Protocol Analysis',
    description: 'Analyze IPv6 traffic and extension headers',
    difficulty: 'Intermediate',
    category: 'IPv6',
    task: 'Examine IPv6 packets and identify address types, extension headers, and potential security issues.',
    scenario: 'IPv6 traffic detected on network. Analyze protocol usage and security.',
    expectedAnalysis: 'IPv6 traffic: Source 2001:db8::1, Destination 2001:db8::2\nExtension headers: Hop-by-Hop, Routing, Fragmentation\nAddress types: Global unicast\nNeighbor Discovery protocol active\nNo IPv6 security extensions detected',
    packetData: `# IPv6 Packet with Extension Headers
IPv6 2001:db8::1 > 2001:db8::2
Hop-by-Hop Options Header
Routing Header (Type 0)
Fragment Header
Upper Layer: TCP 80

# ICMPv6 Neighbor Solicitation
IPv6 :: > ff02::1:ff00:2
ICMPv6 Neighbor Solicitation
Target: 2001:db8::2

# ICMPv6 Neighbor Advertisement
IPv6 2001:db8::2 > 2001:db8::1
ICMPv6 Neighbor Advertisement
Target: 2001:db8::2

# IPv6 TCP SYN
IPv6 2001:db8::1:80 > 2001:db8::2:54321
TCP SYN
Flags: SYN
Seq: 1000`,
    hints: [
      'IPv6 addresses are 128-bit',
      'Extension headers chain after main header',
      'ICMPv6 replaces ARP for neighbor discovery',
      'Check for IPv6-specific attacks'
    ],
    explanation: 'IPv6 introduces new features like extension headers and larger address space, but also new security considerations.',
    keyFindings: [
      'IPv6 traffic normal',
      'Extension headers present',
      'Neighbor Discovery working',
      'No security issues detected'
    ]
  },
  {
    id: 'sip-voip',
    title: 'SIP VoIP Protocol Analysis',
    description: 'Analyze SIP signaling for VoIP calls',
    difficulty: 'Advanced',
    category: 'VoIP',
    task: 'Examine SIP call setup and RTP media stream establishment.',
    scenario: 'VoIP call detected. Analyze SIP signaling and media setup.',
    expectedAnalysis: 'SIP INVITE → 100 Trying → 180 Ringing → 200 OK → ACK\nCall from sip:alice@company.com to sip:bob@company.com\nRTP media: UDP ports 10000-10001, Codec: G.711\nSDP negotiation completed successfully',
    packetData: `# SIP INVITE
SIP/2.0 200 OK
Via: SIP/2.0/UDP 192.168.1.100:5060
From: <sip:alice@company.com>
To: <sip:bob@company.com>
Call-ID: abc123@192.168.1.100
CSeq: 1 INVITE
Content-Type: application/sdp

v=0
o=alice 123456 123456 IN IP4 192.168.1.100
s=Call from Alice
c=IN IP4 192.168.1.100
m=audio 10000 RTP/AVP 0 8 101
a=rtpmap:0 PCMU/8000

# SIP 200 OK
SIP/2.0 200 OK
Via: SIP/2.0/UDP 192.168.1.100:5060
From: <sip:alice@company.com>
To: <sip:bob@company.com>
Call-ID: abc123@192.168.1.100

# SIP ACK
ACK sip:bob@company.com SIP/2.0

# RTP Media Stream
UDP 192.168.1.100:10000 > 192.168.1.200:10000
[RTP payload - G.711 audio data]`,
    hints: [
      'SIP uses port 5060 (UDP/TCP)',
      'INVITE starts call setup',
      'SDP describes media capabilities',
      'RTP carries actual media'
    ],
    explanation: 'SIP establishes VoIP calls while RTP carries the actual audio/video data. SIP can be vulnerable to various attacks.',
    keyFindings: [
      'SIP call setup successful',
      'RTP media flowing',
      'Standard codecs used',
      'VoIP communication normal'
    ]
  },
  {
    id: 'mysql-protocol',
    title: 'MySQL Database Protocol',
    description: 'Analyze MySQL client-server communication',
    difficulty: 'Intermediate',
    category: 'Database',
    task: 'Examine MySQL authentication and query execution.',
    scenario: 'Database traffic detected. Analyze MySQL protocol for security issues.',
    expectedAnalysis: 'MySQL login: User "appuser" authenticated\nQuery: SELECT * FROM users WHERE id = 1\nResult: 1 row returned\nSecurity: Password hashed, queries parameterized\nNo SQL injection detected',
    packetData: `# MySQL Login Request
MySQL Protocol
Login Request
Username: appuser
Password: [SHA1 hash]
Database: webapp

# MySQL Login Response
Login OK
Server version: 8.0.28

# Query Request
COM_QUERY
Query: SELECT * FROM users WHERE id = ?

# Query Response
Resultset
Field count: 5
Fields: id, username, email, created_at, status
Row data: 1, "john_doe", "john@example.com", "2023-01-15", "active"`,
    hints: [
      'MySQL uses port 3306',
      'Authentication uses SHA1 hashing',
      'COM_QUERY packets contain SQL',
      'Check for SQL injection patterns'
    ],
    explanation: 'MySQL protocol reveals database queries and authentication. Cleartext queries can expose sensitive data.',
    keyFindings: [
      'MySQL authentication successful',
      'Parameterized query used',
      'No cleartext credentials',
      'Secure database access'
    ]
  },
  {
    id: 'mqtt-iot',
    title: 'MQTT IoT Protocol Analysis',
    description: 'Analyze MQTT protocol used in IoT communications',
    difficulty: 'Advanced',
    category: 'IoT',
    task: 'Examine MQTT publish/subscribe pattern and message content.',
    scenario: 'IoT device communication detected. Analyze MQTT traffic for security.',
    expectedAnalysis: 'MQTT CONNECT → CONNACK → PUBLISH → PUBACK\nClient: sensor-001, Topic: sensors/temperature\nQoS: 1 (at least once), Retained: false\nMessage: {"temperature": 23.5, "humidity": 65}\nNo authentication detected - security vulnerability',
    packetData: `# MQTT CONNECT
MQTT Protocol
CONNECT
Client ID: sensor-001
Username: (null)
Password: (null)
Clean Session: true
Keep Alive: 60

# MQTT CONNACK
CONNACK
Return Code: 0 (Accepted)

# MQTT PUBLISH
PUBLISH
Topic: sensors/temperature
QoS: 1
Message ID: 1234
Payload: {"temperature": 23.5, "humidity": 65, "timestamp": 1673745600}

# MQTT PUBACK
PUBACK
Message ID: 1234

# MQTT SUBSCRIBE
SUBSCRIBE
Message ID: 1235
Topic: sensors/+/status
QoS: 0

# MQTT PUBLISH (another sensor)
PUBLISH
Topic: sensors/humidity
QoS: 0
Payload: {"humidity": 65, "device_id": "sensor-002"}`,
    hints: [
      'MQTT uses port 1883 (unencrypted)',
      'CONNECT establishes session',
      'PUBLISH sends messages to topics',
      'SUBSCRIBE receives messages'
    ],
    explanation: 'MQTT is lightweight for IoT but often lacks security. Topics can reveal device information, and messages may contain sensitive data.',
    keyFindings: [
      'MQTT communication active',
      'No authentication used',
      'Sensor data exposed',
      'Security vulnerability present'
    ]
  },
  {
    id: 'bgp-analysis',
    title: 'BGP Routing Protocol',
    description: 'Analyze BGP routing updates and potential route hijacking',
    difficulty: 'Advanced',
    category: 'Routing',
    task: 'Examine BGP UPDATE messages and verify route authenticity.',
    scenario: 'BGP routing changes detected. Investigate for potential route hijacking.',
    expectedAnalysis: 'BGP UPDATE: AS 65001 advertising 192.168.0.0/16\nAS Path: 65001 65002 65003\nOrigin: IGP, Next Hop: 10.0.0.1\nNo BGP hijacking indicators\nRoute appears legitimate',
    packetData: `# BGP OPEN
BGP OPEN
Version: 4
AS: 65001
Hold Time: 180
BGP ID: 192.168.1.1

# BGP KEEPALIVE
BGP KEEPALIVE

# BGP UPDATE
BGP UPDATE
Withdrawn Routes: none
Path Attributes:
  Origin: IGP
  AS Path: 65001 65002 65003
  Next Hop: 10.0.0.1
  MED: 100
NLRI: 192.168.0.0/16

# Another UPDATE (route change)
BGP UPDATE
Withdrawn Routes: 192.168.0.0/16
Path Attributes:
  Origin: IGP
  AS Path: 65001 65004 65005
  Next Hop: 10.0.0.2
NLRI: 192.168.0.0/16`,
    hints: [
      'BGP uses TCP port 179',
      'AS numbers identify autonomous systems',
      'AS Path shows route traversal',
      'Check for AS path manipulation'
    ],
    explanation: 'BGP routes internet traffic but lacks built-in security. Route hijacking can redirect traffic to malicious destinations.',
    keyFindings: [
      'BGP routing updates normal',
      'AS path appears legitimate',
      'No hijacking detected',
      'Route convergence occurring'
    ]
  },
  {
    id: 'http2-analysis',
    title: 'HTTP/2 Protocol Analysis',
    description: 'Analyze HTTP/2 traffic with multiplexing and header compression',
    difficulty: 'Intermediate',
    category: 'HTTP',
    task: 'Examine HTTP/2 frames and identify multiplexing, header compression, and security features.',
    scenario: 'Modern web traffic detected. Analyze HTTP/2 optimizations and security.',
    expectedAnalysis: 'HTTP/2 connection: SETTINGS frame, WINDOW_UPDATE\nStream 1: HEADERS (GET /), DATA frames\nStream 3: HEADERS (GET /css), DATA frames\nHPACK header compression active\nServer push enabled\nTLS 1.3 encryption',
    packetData: `# HTTP/2 SETTINGS
HTTP/2 SETTINGS
SETTINGS_MAX_CONCURRENT_STREAMS: 100
SETTINGS_INITIAL_WINDOW_SIZE: 65535

# Stream 1 - Main page
HEADERS (Stream 1)
:method: GET
:path: /
:authority: example.com
user-agent: Mozilla/5.0

DATA (Stream 1)
[HTML content]

# Stream 3 - CSS file
HEADERS (Stream 3)
:method: GET
:path: /style.css
:authority: example.com

DATA (Stream 3)
[CSS content]

# Server Push
PUSH_PROMISE (Stream 5)
:method: GET
:path: /logo.png

DATA (Stream 5)
[PNG image data]`,
    hints: [
      'HTTP/2 uses binary framing',
      'Multiple streams over single TCP connection',
      'HPACK compresses headers',
      'Server push sends resources proactively'
    ],
    explanation: 'HTTP/2 improves performance with multiplexing and compression but requires TLS encryption.',
    keyFindings: [
      'HTTP/2 multiplexing active',
      'Header compression working',
      'Server push enabled',
      'Secure TLS connection'
    ]
  },
  {
    id: 'ssh-analysis',
    title: 'SSH Protocol Analysis',
    description: 'Analyze SSH connection establishment and key exchange',
    difficulty: 'Intermediate',
    category: 'SSH',
    task: 'Examine SSH handshake, key exchange, and authentication process.',
    scenario: 'Remote access traffic detected. Verify secure SSH connection setup.',
    expectedAnalysis: 'SSH Version Exchange: Client/Server version strings\nKey Exchange: ECDH with curve25519\nHost Key: RSA 2048-bit\nAuthentication: Public key\nEncryption: AES-256-GCM\nMAC: HMAC-SHA2-256',
    packetData: `# SSH Version Exchange
SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.4
SSH-2.0-OpenSSH_8.9p1 Ubuntu-3

# Key Exchange Init
SSH_MSG_KEXINIT
kex_algorithms: curve25519-sha256,ecdh-sha2-nistp256
server_host_key_algorithms: rsa-sha2-512,rsa-sha2-256
encryption_algorithms: aes256-gcm@openssh.com
mac_algorithms: hmac-sha2-256

# Key Exchange
SSH_MSG_KEX_ECDH_INIT
Client public key (curve25519)

SSH_MSG_KEX_ECDH_REPLY
Server host key (RSA)
Server public key (curve25519)
Signature

# New Keys
SSH_MSG_NEWKEYS

# Authentication
SSH_MSG_USERAUTH_REQUEST
method: publickey
key: ssh-rsa AAAAB3NzaC1yc2E...

SSH_MSG_USERAUTH_SUCCESS`,
    hints: [
      'SSH uses TCP port 22',
      'Version exchange first',
      'Key exchange establishes session keys',
      'Public key authentication preferred'
    ],
    explanation: 'SSH provides secure remote access with strong encryption and authentication.',
    keyFindings: [
      'SSH handshake successful',
      'Strong key exchange (ECDH)',
      'Public key authentication',
      'Secure encryption (AES-256-GCM)'
    ]
  },
  {
    id: 'smb-analysis',
    title: 'SMB Protocol Analysis',
    description: 'Analyze SMB/CIFS file sharing protocol',
    difficulty: 'Intermediate',
    category: 'File Sharing',
    task: 'Examine SMB session setup, authentication, and file operations.',
    scenario: 'File sharing traffic detected. Analyze SMB protocol usage and security.',
    expectedAnalysis: 'SMB2 Negotiate: Dialect 0x0311 (SMB 3.1.1)\nSession Setup: NTLMSSP authentication\nTree Connect: \\\\server\\share\nFile Open: document.docx\nRead operations: 64KB blocks\nSMB signing enabled',
    packetData: `# SMB2 Negotiate
SMB2 Negotiate Request
Dialects: 0x0202, 0x0210, 0x0300, 0x0302, 0x0311
Capabilities: DFS, LEASING, LARGE_MTU

SMB2 Negotiate Response
Dialect: 0x0311 (SMB 3.1.1)
Server GUID: 12345678-1234-1234-1234-123456789012

# Session Setup
SMB2 Session Setup Request
Security Blob: NTLMSSP_NEGOTIATE

SMB2 Session Setup Response
Security Blob: NTLMSSP_CHALLENGE
Server Challenge: abcdef0123456789

# Tree Connect
SMB2 Tree Connect Request
Path: \\\\fileserver\\documents

SMB2 Tree Connect Response
Share Type: DISK
Share Flags: MANUAL_CACHING

# File Operations
SMB2 Create Request
File: report.docx
Desired Access: GENERIC_READ

SMB2 Read Request
Length: 65536
Offset: 0`,
    hints: [
      'SMB uses TCP port 445',
      'SMB2/SMB3 are modern versions',
      'NTLMSSP for authentication',
      'Signing prevents man-in-the-middle'
    ],
    explanation: 'SMB enables file and printer sharing but has had security vulnerabilities. Modern versions include encryption.',
    keyFindings: [
      'SMB 3.1.1 negotiated',
      'NTLM authentication',
      'File operations normal',
      'SMB signing enabled'
    ]
  },
  {
    id: 'rdp-analysis',
    title: 'RDP Protocol Analysis',
    description: 'Analyze Remote Desktop Protocol connection',
    difficulty: 'Intermediate',
    category: 'Remote Access',
    task: 'Examine RDP connection establishment and security features.',
    scenario: 'Remote desktop traffic detected. Analyze RDP protocol and security.',
    expectedAnalysis: 'RDP Connection: X.224 Connection Request\nMCS Connect: Server capabilities\nSecurity: TLS encryption enabled\nAuthentication: NLA (Network Level Authentication)\nDisplay: 1920x1080, 32-bit color\nKeyboard/Mouse: US English layout',
    packetData: `# X.224 Connection Request
RDP Connection Request
Cookie: mstshash=admin
Protocol: PROTOCOL_TLS

# MCS Connect Initial
MCS Connect Initial PDU
Client Core Data:
Version: RDP 7.1
Desktop Width: 1920
Desktop Height: 1080
Color Depth: 32 bpp
Keyboard Layout: 0x0409 (US)
Security: TLS + NLA

# Server Core Data
Server Core Data:
Version: RDP 10.3
Client Supported: RDP 7.1+
Early Capability Flags: 0x0007

# Security Exchange
RDP Security Commencement
Encryption Method: TLS
Encryption Level: High

# TLS Handshake
Client Hello
Cipher Suites: TLS_RSA_WITH_AES_256_CBC_SHA
Server Hello
Certificate: [Server certificate]

# Channel Join Requests
MCS Channel Join: RDPDR (Device Redirect)
MCS Channel Join: RDPSND (Audio)
MCS Channel Join: CLIPRDR (Clipboard)`,
    hints: [
      'RDP uses TCP port 3389',
      'X.224 establishes connection',
      'NLA prevents man-in-the-middle',
      'TLS encrypts the session'
    ],
    explanation: 'RDP allows remote desktop access. NLA and TLS provide security against common attacks.',
    keyFindings: [
      'RDP connection established',
      'NLA authentication enabled',
      'TLS encryption active',
      'High security settings'
    ]
  },
  {
    id: 'syslog-analysis',
    title: 'Syslog Protocol Analysis',
    description: 'Analyze system logging protocol for security monitoring',
    difficulty: 'Intermediate',
    category: 'Logging',
    task: 'Examine syslog messages and identify security-relevant events.',
    scenario: 'System logs being transmitted. Analyze syslog protocol and content.',
    expectedAnalysis: 'Syslog over UDP: Facility 4 (auth), Severity 6 (info)\nMessage: sshd[1234]: Accepted publickey for user\nTimestamp: Jan 15 10:30:15\nHostname: webserver01\nSecurity events: Failed login attempts, sudo usage',
    packetData: `# Syslog Messages
<38>Jan 15 10:30:15 webserver01 sshd[1234]: Accepted publickey for admin from 192.168.1.100 port 54321 ssh2: RSA SHA256:abc123

<34>Jan 15 10:30:16 webserver01 sudo: admin : TTY=pts/0 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/ls

<165>Jan 15 10:30:17 webserver01 systemd: Started Session 1234 of user admin.

<84>Jan 15 10:30:18 webserver01 CRON[5678]: (root) CMD (run-parts /etc/cron.hourly)

<132>Jan 15 10:30:19 webserver01 sshd[1235]: Failed password for invalid user hacker from 10.0.0.5 port 22 ssh2

<132>Jan 15 10:30:20 webserver01 sshd[1235]: Connection closed by invalid user hacker 10.0.0.5 port 22 [preauth]

<38>Jan 15 10:30:21 webserver01 iptables: DROP IN=eth0 OUT= MAC=... SRC=203.0.113.1 DST=192.168.1.1 LEN=40 TOS=0x00 PREC=0x00 TTL=64 ID=12345 PROTO=TCP SPT=445 DPT=139 WINDOW=1024 RES=0x00 SYN URGP=0`,
    hints: [
      'Syslog uses UDP port 514',
      'PRI = Facility*8 + Severity',
      'Facility 4 = auth, Severity 6 = info',
      'Look for security events like failed logins'
    ],
    explanation: 'Syslog collects system messages for monitoring. Security events like authentication failures are critical.',
    keyFindings: [
      'Syslog messages normal',
      'SSH authentication logged',
      'Failed login attempt detected',
      'Firewall drops logged'
    ]
  },
  {
    id: 'ospf-analysis',
    title: 'OSPF Routing Protocol',
    description: 'Analyze OSPF link-state routing protocol',
    difficulty: 'Advanced',
    category: 'Routing',
    task: 'Examine OSPF hello packets, neighbor discovery, and route updates.',
    scenario: 'Internal routing protocol traffic detected. Analyze OSPF operation.',
    expectedAnalysis: 'OSPF Hello: Router ID 192.168.1.1, Area 0.0.0.0\nNeighbors: 192.168.1.2 (DR), 192.168.1.3\nDatabase Description: LSA headers exchanged\nLink State Update: Router and Network LSAs\nAuthentication: MD5 enabled',
    packetData: `# OSPF Hello
OSPF Hello Packet
Router ID: 192.168.1.1
Area ID: 0.0.0.0
Network Mask: 255.255.255.0
Hello Interval: 10
Dead Interval: 40
Neighbors: 192.168.1.2, 192.168.1.3
Designated Router: 192.168.1.2
Backup Designated Router: 192.168.1.3

# Database Description
OSPF Database Description
Interface MTU: 1500
Options: 0x02 (External Routing)
DD Sequence: 0x1234
LSA Headers:
  Router LSA: Link ID 192.168.1.1
  Network LSA: Link ID 192.168.1.2

# Link State Update
OSPF Link State Update
Number of LSAs: 2

Router LSA:
  Link ID: 192.168.1.1
  Links: 2
    Type: Transit, ID: 192.168.1.2, Data: 192.168.1.1
    Type: Stub, ID: 10.0.0.0, Data: 255.255.255.0

Network LSA:
  Link ID: 192.168.1.2
  Attached Routers: 192.168.1.1, 192.168.1.3`,
    hints: [
      'OSPF uses IP protocol 89',
      'Hello packets discover neighbors',
      'DR/BDR elected on multi-access networks',
      'LSA flooding builds topology database'
    ],
    explanation: 'OSPF builds a link-state database for optimal routing. Authentication prevents route injection attacks.',
    keyFindings: [
      'OSPF neighbor relationships',
      'DR/BDR election normal',
      'LSA exchange completed',
      'MD5 authentication enabled'
    ]
  },
  {
    id: 'ldap-analysis',
    title: 'LDAP Protocol Analysis',
    description: 'Analyze LDAP directory service queries',
    difficulty: 'Intermediate',
    category: 'Directory',
    task: 'Examine LDAP bind, search, and modify operations.',
    scenario: 'Directory service queries detected. Analyze LDAP protocol usage.',
    expectedAnalysis: 'LDAP Bind: Simple authentication, DN: cn=admin,dc=company,dc=com\nSearch: Base DN dc=company,dc=com, Filter (uid=user123)\nAttributes: cn, mail, departmentNumber\nModify: Change user password\nUnbind: Close connection',
    packetData: `# LDAP Bind Request
LDAP Bind Request
Version: 3
Name: cn=admin,dc=company,dc=com
Authentication: Simple
Password: [redacted]

# LDAP Bind Response
LDAP Bind Response
Result Code: success (0)

# LDAP Search Request
LDAP Search Request
Base DN: dc=company,dc=com
Scope: subtree
Filter: (uid=user123)
Attributes: cn, mail, departmentNumber, telephoneNumber

# LDAP Search Response
LDAP Search Result Entry
DN: uid=user123,ou=users,dc=company,dc=com
cn: John Doe
mail: john.doe@company.com
departmentNumber: IT
telephoneNumber: +1 555 123 4567

# LDAP Modify Request
LDAP Modify Request
DN: uid=user123,ou=users,dc=company,dc=com
Modification: replace: userPassword
New Value: {SSHA}hashedpassword

# LDAP Modify Response
LDAP Modify Response
Result Code: success (0)

# LDAP Unbind Request
LDAP Unbind Request`,
    hints: [
      'LDAP uses TCP/UDP port 389',
      'LDAPS uses port 636 with TLS',
      'Bind authenticates the connection',
      'Search retrieves directory entries'
    ],
    explanation: 'LDAP provides directory services for user authentication and information lookup. LDAPS encrypts traffic.',
    keyFindings: [
      'LDAP authentication successful',
      'User search completed',
      'Password modification',
      'Secure operations'
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
      } else if (selectedChallenge.id === 'icmp-analysis') {
        if (userAnalysis.toLowerCase().includes('icmp') && (userAnalysis.includes('ping') || userAnalysis.includes('echo'))) {
          analysisResult = 'Correct! ICMP traffic analyzed successfully.'
        }
      } else if (selectedChallenge.id === 'dhcp-process') {
        if (userAnalysis.toLowerCase().includes('dhcp') && (userAnalysis.toLowerCase().includes('discover') || userAnalysis.toLowerCase().includes('dora'))) {
          analysisResult = 'Correct! DHCP lease process identified.'
        }
      } else if (selectedChallenge.id === 'ftp-analysis') {
        if (userAnalysis.toLowerCase().includes('ftp') && (userAnalysis.toLowerCase().includes('cleartext') || userAnalysis.toLowerCase().includes('password'))) {
          analysisResult = 'Correct! FTP security vulnerability detected.'
        }
      } else if (selectedChallenge.id === 'smtp-analysis') {
        if (userAnalysis.toLowerCase().includes('smtp') && (userAnalysis.toLowerCase().includes('mail') || userAnalysis.toLowerCase().includes('attachment'))) {
          analysisResult = 'Correct! SMTP email transmission analyzed.'
        }
      } else if (selectedChallenge.id === 'ntp-analysis') {
        if (userAnalysis.toLowerCase().includes('ntp') && (userAnalysis.toLowerCase().includes('time') || userAnalysis.toLowerCase().includes('synchronization'))) {
          analysisResult = 'Correct! NTP time synchronization examined.'
        }
      } else if (selectedChallenge.id === 'snmp-analysis') {
        if (userAnalysis.toLowerCase().includes('snmp') && (userAnalysis.toLowerCase().includes('community') || userAnalysis.toLowerCase().includes('mib'))) {
          analysisResult = 'Correct! SNMP monitoring analyzed.'
        }
      } else if (selectedChallenge.id === 'ipsec-vpn') {
        if (userAnalysis.toLowerCase().includes('ipsec') || userAnalysis.toLowerCase().includes('ike') || userAnalysis.toLowerCase().includes('vpn')) {
          analysisResult = 'Correct! IPsec VPN tunnel analyzed.'
        }
      } else if (selectedChallenge.id === 'wireless-wpa2') {
        if (userAnalysis.toLowerCase().includes('wpa2') || userAnalysis.toLowerCase().includes('handshake') || userAnalysis.toLowerCase().includes('wireless')) {
          analysisResult = 'Correct! WPA2 wireless security examined.'
        }
      } else if (selectedChallenge.id === 'ipv6-analysis') {
        if (userAnalysis.toLowerCase().includes('ipv6') || userAnalysis.toLowerCase().includes('extension') || userAnalysis.toLowerCase().includes('neighbor')) {
          analysisResult = 'Correct! IPv6 protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'sip-voip') {
        if (userAnalysis.toLowerCase().includes('sip') || userAnalysis.toLowerCase().includes('rtp') || userAnalysis.toLowerCase().includes('voip')) {
          analysisResult = 'Correct! SIP VoIP protocol examined.'
        }
      } else if (selectedChallenge.id === 'mysql-protocol') {
        if (userAnalysis.toLowerCase().includes('mysql') || userAnalysis.toLowerCase().includes('database') || userAnalysis.toLowerCase().includes('query')) {
          analysisResult = 'Correct! MySQL database protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'mqtt-iot') {
        if (userAnalysis.toLowerCase().includes('mqtt') || userAnalysis.toLowerCase().includes('iot') || userAnalysis.toLowerCase().includes('publish')) {
          analysisResult = 'Correct! MQTT IoT protocol examined.'
        }
      } else if (selectedChallenge.id === 'bgp-analysis') {
        if (userAnalysis.toLowerCase().includes('bgp') || userAnalysis.toLowerCase().includes('routing') || userAnalysis.toLowerCase().includes('as')) {
          analysisResult = 'Correct! BGP routing protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'http2-analysis') {
        if (userAnalysis.toLowerCase().includes('http/2') || userAnalysis.toLowerCase().includes('multiplexing') || userAnalysis.toLowerCase().includes('hpack')) {
          analysisResult = 'Correct! HTTP/2 protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'ssh-analysis') {
        if (userAnalysis.toLowerCase().includes('ssh') || userAnalysis.toLowerCase().includes('key exchange') || userAnalysis.toLowerCase().includes('authentication')) {
          analysisResult = 'Correct! SSH protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'smb-analysis') {
        if (userAnalysis.toLowerCase().includes('smb') || userAnalysis.toLowerCase().includes('file sharing') || userAnalysis.toLowerCase().includes('ntlm')) {
          analysisResult = 'Correct! SMB protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'rdp-analysis') {
        if (userAnalysis.toLowerCase().includes('rdp') || userAnalysis.toLowerCase().includes('remote desktop') || userAnalysis.toLowerCase().includes('nla')) {
          analysisResult = 'Correct! RDP protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'syslog-analysis') {
        if (userAnalysis.toLowerCase().includes('syslog') || userAnalysis.toLowerCase().includes('logging') || userAnalysis.toLowerCase().includes('facility')) {
          analysisResult = 'Correct! Syslog protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'ospf-analysis') {
        if (userAnalysis.toLowerCase().includes('ospf') || userAnalysis.toLowerCase().includes('link-state') || userAnalysis.toLowerCase().includes('lsa')) {
          analysisResult = 'Correct! OSPF routing protocol analyzed.'
        }
      } else if (selectedChallenge.id === 'ldap-analysis') {
        if (userAnalysis.toLowerCase().includes('ldap') || userAnalysis.toLowerCase().includes('directory') || userAnalysis.toLowerCase().includes('bind')) {
          analysisResult = 'Correct! LDAP protocol analyzed.'
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
                      <span className="text-sm">HTTP/HTTPS & DNS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">SSL/TLS & IPsec</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Attack Detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">IoT Protocols (MQTT)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">VoIP & Routing</span>
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
                    <p>• Protocol dissection (TCP, UDP, ICMP)</p>
                    <p>• Threat detection (scanning, spoofing)</p>
                    <p>• Network forensics</p>
                    <p>• Traffic pattern analysis</p>
                    <p>• Encryption analysis (SSL/TLS, IPsec)</p>
                    <p>• IoT protocol security (MQTT)</p>
                    <p>• Routing protocols (BGP, OSPF)</p>
                    <p>• Remote access (SSH, RDP)</p>
                    <p>• File sharing (SMB, FTP)</p>
                    <p>• Directory services (LDAP)</p>
                    <p>• System logging (Syslog)</p>
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
