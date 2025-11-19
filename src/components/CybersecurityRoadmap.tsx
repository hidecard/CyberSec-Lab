'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BookOpen, Clock, Users, Shield, Zap, Globe, Database, Terminal, Code, Eye, AlertTriangle, ExternalLink, Lock } from 'lucide-react'

interface RoadmapStep {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  icon: React.ReactNode
  prerequisites: string[]
  skills: string[]
  resources: { name: string; url: string; type: 'video' | 'article' | 'lab' | 'course' }[]
  estimatedTime: string
  completed?: boolean
  locked?: boolean
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 'basics',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn the core concepts of cybersecurity, including threats, vulnerabilities, and basic security principles.',
    difficulty: 'Beginner',
    category: 'Foundations',
    icon: <Shield className="w-5 h-5" />,
    prerequisites: [],
    skills: ['Security terminology', 'CIA triad', 'Risk assessment basics'],
    resources: [
      { name: 'OWASP Top 10 Overview', url: 'https://owasp.org/www-project-top-ten/', type: 'article' },
      { name: 'Cybersecurity Fundamentals Course', url: 'https://www.coursera.org/learn/cybersecurity-basics', type: 'course' },
      { name: 'MDN Web Security', url: 'https://developer.mozilla.org/en-US/docs/Web/Security', type: 'article' },
      { name: 'freeCodeCamp — What is Cybersecurity?', url: 'https://www.freecodecamp.org/news/what-is-cybersecurity/', type: 'article' },
      { name: 'Introduction to Programming (Python)', url: 'https://www.learnpython.org/', type: 'video' },
      { name: 'Intro to Linux (The Linux Foundation)', url: 'https://training.linuxfoundation.org/resources/', type: 'article' },
      { name: 'Computer Networking Primer', url: 'https://www.freecodecamp.org/news/computer-networking-basics/', type: 'article' }
    ],
    estimatedTime: '2-3 hours'
  },
  {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Master common web vulnerabilities including XSS, SQL injection, CSRF, and secure coding practices.',
    difficulty: 'Beginner',
    category: 'Web Security',
    icon: <Globe className="w-5 h-5" />,
    prerequisites: ['basics'],
    skills: ['XSS prevention', 'SQL injection defense', 'Input validation', 'Secure headers'],
    resources: [
      { name: 'Web Security Academy', url: 'https://portswigger.net/web-security', type: 'lab' },
      { name: 'OWASP Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/', type: 'article' },
      { name: 'PayloadsAllTheThings (GitHub)', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings', type: 'article' },
      { name: 'PortSwigger YouTube Channel', url: 'https://www.youtube.com/c/PortSwigger', type: 'video' },
      { name: 'Burp Suite Community', url: 'https://portswigger.net/burp/communitydownload', type: 'lab' },
      { name: 'MDN — HTTP Security', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', type: 'article' }
    ],
    estimatedTime: '8-10 hours',
    completed: false,
    locked: false
  },
  {
    id: 'network-security',
    title: 'Network Security',
    description: 'Understand network protocols, firewalls, VPNs, and common network-based attacks.',
    difficulty: 'Intermediate',
    category: 'Network Security',
    icon: <Zap className="w-5 h-5" />,
    prerequisites: ['basics'],
    skills: ['TCP/IP fundamentals', 'Firewall configuration', 'VPN setup', 'Network scanning'],
    resources: [
      { name: 'Network Security Course', url: 'https://www.udemy.com/course/network-security/', type: 'course' },
      { name: 'Wireshark Tutorials', url: 'https://www.wireshark.org/docs/', type: 'article' },
      { name: 'Cisco — Networking Basics', url: 'https://www.cisco.com/c/en/us/solutions/small-business/resource-center/networking/networking-basics.html', type: 'article' },
      { name: 'TCP/IP Guide', url: 'https://www.tcpipguide.com/', type: 'article' }
    ],
    estimatedTime: '6-8 hours',
    completed: false,
    locked: false
  },
  {
    id: 'cryptography',
    title: 'Cryptography & Encryption',
    description: 'Learn encryption algorithms, digital signatures, certificates, and cryptographic best practices.',
    difficulty: 'Intermediate',
    category: 'Cryptography',
    icon: <Lock className="w-5 h-5" />,
    prerequisites: ['basics'],
    skills: ['Symmetric/Asymmetric encryption', 'Hash functions', 'Digital certificates', 'Key management'],
    resources: [
      { name: 'Cryptography I', url: 'https://www.coursera.org/learn/crypto', type: 'course' },
      { name: 'Practical Cryptography', url: 'https://cryptobook.nakov.com/', type: 'article' },
      { name: 'Crypto 101', url: 'https://crypto101.io/', type: 'article' }
    ],
    estimatedTime: '10-12 hours',
    completed: false,
    locked: false
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering & Phishing',
    description: 'Master psychological manipulation techniques, phishing detection, and social engineering defenses.',
    difficulty: 'Beginner',
    category: 'Social Engineering',
    icon: <Users className="w-5 h-5" />,
    prerequisites: ['basics'],
    skills: ['Phishing recognition', 'Social engineering tactics', 'Security awareness', 'Incident reporting'],
    resources: [
      { name: 'Social Engineering Toolkit', url: 'https://www.social-engineer.org/', type: 'article' },
      { name: 'Phishing Quiz', url: 'https://phishingquiz.withgoogle.com/', type: 'lab' }
    ],
    estimatedTime: '4-6 hours',
    completed: false,
    locked: false
  },
  {
    id: 'penetration-testing',
    title: 'Penetration Testing',
    description: 'Learn ethical hacking methodologies, vulnerability assessment, and penetration testing frameworks.',
    difficulty: 'Advanced',
    category: 'Offensive Security',
    icon: <Terminal className="w-5 h-5" />,
    prerequisites: ['web-security', 'network-security'],
    skills: ['Reconnaissance', 'Vulnerability scanning', 'Exploitation', 'Reporting'],
    resources: [
      { name: 'Metasploit Framework', url: 'https://docs.metasploit.com/', type: 'article' },
      { name: 'PWK Course', url: 'https://www.offsec.com/courses/penetration-testing/', type: 'course' },
      { name: 'TryHackMe', url: 'https://tryhackme.com/', type: 'lab' },
      { name: 'Hack The Box', url: 'https://www.hackthebox.com/', type: 'lab' }
    ],
    estimatedTime: '20-30 hours',
    completed: false,
    locked: true
  },
  {
    id: 'incident-response',
    title: 'Incident Response & Forensics',
    description: 'Master incident handling, digital forensics, malware analysis, and recovery procedures.',
    difficulty: 'Advanced',
    category: 'Incident Response',
    icon: <AlertTriangle className="w-5 h-5" />,
    prerequisites: ['penetration-testing'],
    skills: ['Incident triage', 'Evidence collection', 'Malware analysis', 'Recovery planning'],
    resources: [
      { name: 'NIST Incident Response', url: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final', type: 'article' },
      { name: 'Digital Forensics Course', url: 'https://www.sans.org/cyber-security-skills/training/digital-forensics/', type: 'course' },
      { name: 'Volatility Framework', url: 'https://www.volatilityfoundation.org/', type: 'article' }
    ],
    estimatedTime: '15-20 hours',
    completed: false,
    locked: true
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security',
    description: 'Understand cloud security principles, AWS/Azure/GCP security, and cloud-native security tools.',
    difficulty: 'Intermediate',
    category: 'Cloud Security',
    icon: <Database className="w-5 h-5" />,
    prerequisites: ['network-security'],
    skills: ['Cloud architecture security', 'IAM best practices', 'Container security', 'Cloud compliance'],
    resources: [
      { name: 'AWS Security Best Practices', url: 'https://aws.amazon.com/architecture/security-identity-compliance/', type: 'article' },
      { name: 'Cloud Security Course', url: 'https://www.coursera.org/specializations/cloud-security', type: 'course' },
      { name: 'CIS Benchmarks', url: 'https://www.cisecurity.org/cis-benchmarks/', type: 'article' },
      { name: 'OWASP Cloud Security Project', url: 'https://owasp.org/www-project-cloud-security/', type: 'article' }
    ],
    estimatedTime: '8-10 hours',
    completed: false,
    locked: false
  },
  {
    id: 'compliance',
    title: 'Security Compliance & Governance',
    description: 'Learn about regulatory frameworks, compliance standards, and security governance.',
    difficulty: 'Intermediate',
    category: 'Compliance',
    icon: <BookOpen className="w-5 h-5" />,
    prerequisites: ['basics'],
    skills: ['GDPR compliance', 'ISO 27001', 'Risk management', 'Audit preparation'],
    resources: [
      { name: 'Compliance Frameworks', url: 'https://www.iso.org/isoiec-27001-information-security.html', type: 'article' },
      { name: 'Security Governance Course', url: 'https://www.isaca.org/credentialing/cisa', type: 'course' },
      { name: 'GDPR Reference', url: 'https://gdpr-info.eu/', type: 'article' }
    ],
    estimatedTime: '6-8 hours',
    completed: false,
    locked: false
  },
  {
    id: 'advanced-threats',
    title: 'Advanced Persistent Threats',
    description: 'Master advanced threat detection, APT analysis, and threat intelligence.',
    difficulty: 'Advanced',
    category: 'Threat Intelligence',
    icon: <Eye className="w-5 h-5" />,
    prerequisites: ['incident-response'],
    skills: ['Threat hunting', 'APT analysis', 'Threat intelligence', 'Advanced malware'],
    resources: [
      { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org/', type: 'article' },
      { name: 'Advanced Threat Hunting', url: 'https://www.sans.org/cyber-security-skills/training/threat-hunting/', type: 'course' },
      { name: 'VirusTotal', url: 'https://www.virustotal.com/', type: 'article' }
    ],
    estimatedTime: '25-30 hours',
    completed: false,
    locked: true
  },
  {
    id: 'secure-coding',
    title: 'Secure Coding Practices',
    description: 'Adopt secure-by-design principles, threat modeling, static analysis, and secure code reviews.',
    difficulty: 'Intermediate',
    category: 'Development',
    icon: <Code className="w-5 h-5" />,
    prerequisites: ['web-security'],
    skills: ['Secure design', 'Static analysis', 'Threat modeling', 'Code review practices'],
    resources: [
      { name: 'OWASP Secure Coding Practices', url: 'https://owasp.org/www-project-secure-coding-practices/', type: 'article' },
      { name: 'Snyk — Secure Coding', url: 'https://snyk.io/learn/secure-coding/', type: 'article' }
    ],
    estimatedTime: '6-8 hours',
    completed: false,
    locked: false
  },
  {
    id: 'devsecops',
    title: 'DevSecOps & CI/CD Security',
    description: 'Integrate security into CI/CD pipelines, scan IaC, and automate security testing across the SDLC.',
    difficulty: 'Intermediate',
    category: 'DevOps',
    icon: <Terminal className="w-5 h-5" />,
    prerequisites: ['cryptography', 'cloud-security'],
    skills: ['Pipeline security', 'IaC scanning', 'Automated SAST/DAST', 'Secret management'],
    resources: [
      { name: 'OWASP DevSecOps Guidance', url: 'https://owasp.org/www-project-devsecops-guides/', type: 'article' },
      { name: 'Snyk — DevSecOps', url: 'https://snyk.io/learn/devsecops/', type: 'article' }
    ],
    estimatedTime: '8-12 hours',
    completed: false,
    locked: false
  },
  {
    id: 'mobile-security',
    title: 'Mobile App Security',
    description: 'Secure mobile application development, common mobile threats and testing tools.',
    difficulty: 'Intermediate',
    category: 'Application Security',
    icon: <Code className="w-5 h-5" />,
    prerequisites: ['web-security'],
    skills: ['Mobile threat modeling', 'Secure storage', 'Mobile app testing', 'Reverse engineering basics'],
    resources: [
      { name: 'OWASP Mobile Top 10', url: 'https://owasp.org/www-project-mobile-top-10/', type: 'article' },
      { name: 'MobSF (Mobile Security Framework)', url: 'https://mobsf.github.io/docs/', type: 'lab' }
    ],
    estimatedTime: '6-10 hours',
    completed: false,
    locked: false
  },
  {
    id: 'malware-analysis',
    title: 'Malware Analysis',
    description: 'Dynamic and static malware analysis, sandboxing and threat intelligence workflows.',
    difficulty: 'Advanced',
    category: 'Forensics',
    icon: <AlertTriangle className="w-5 h-5" />,
    prerequisites: ['incident-response'],
    skills: ['Static analysis', 'Dynamic analysis', 'Sandboxing', 'Indicator extraction'],
    resources: [
      { name: 'Practical Malware Analysis', url: 'http://practicalmalwareanalysis.com/', type: 'article' },
      { name: 'REMnux', url: 'https://remnux.org/', type: 'lab' }
    ],
    estimatedTime: '20-30 hours',
    completed: false,
    locked: true
  },
  {
    id: 'iot-security',
    title: 'IoT & Embedded Security',
    description: 'Secure development and assessment of IoT devices, firmware analysis and network protections.',
    difficulty: 'Intermediate',
    category: 'Embedded',
    icon: <Globe className="w-5 h-5" />,
    prerequisites: ['network-security'],
    skills: ['Firmware analysis', 'Embedded exploit mitigation', 'IoT network security'],
    resources: [
      { name: 'OWASP IoT Project', url: 'https://owasp.org/www-project-internet-of-things/', type: 'article' },
      { name: 'IoT Security Foundation', url: 'https://www.iotsecurityfoundation.org/', type: 'article' }
    ],
    estimatedTime: '8-12 hours',
    completed: false,
    locked: false
  },
  {
    id: 'privacy-engineering',
    title: 'Privacy Engineering',
    description: 'Design privacy-preserving systems, data minimization, and privacy compliance best practices.',
    difficulty: 'Intermediate',
    category: 'Governance',
    icon: <ExternalLink className="w-5 h-5" />,
    prerequisites: ['compliance'],
    skills: ['Data minimization', 'Privacy-by-design', 'Consent management', 'Privacy impact assessments'],
    resources: [
      { name: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', type: 'article' },
      { name: 'GDPR Reference', url: 'https://gdpr-info.eu/', type: 'article' }
    ],
    estimatedTime: '6-10 hours',
    completed: false,
    locked: false
  },
  {
    id: 'programming-basics',
    title: 'Programming Basics',
    description: 'Learn a programming language (Python recommended) to automate tasks and understand exploit proof-of-concepts.',
    difficulty: 'Beginner',
    category: 'Foundations',
    icon: <Code className="w-5 h-5" />,
    prerequisites: [],
    skills: ['Scripting with Python', 'Parsing data', 'Regular expressions', 'Basic algorithms'],
    resources: [
      { name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', type: 'article' },
      { name: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'article' }
    ],
    estimatedTime: '8-12 hours',
    completed: false,
    locked: false
  },
  {
    id: 'linux-basics',
    title: 'Linux Fundamentals',
    description: 'Essential Linux skills for security: shell, package management, permissions, and scripting.',
    difficulty: 'Beginner',
    category: 'Systems',
    icon: <Terminal className="w-5 h-5" />,
    prerequisites: [],
    skills: ['Shell commands', 'Permissions', 'System logs', 'Bash scripting'],
    resources: [
      { name: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'article' },
      { name: 'The Linux Command Line (book)', url: 'http://linuxcommand.org/tlcl.php', type: 'article' }
    ],
    estimatedTime: '6-10 hours',
    completed: false,
    locked: false
  },
  {
    id: 'http-fundamentals',
    title: 'HTTP & Web Fundamentals',
    description: 'Understand how web requests, responses, headers, cookies and sessions work.',
    difficulty: 'Beginner',
    category: 'Web Security',
    icon: <Globe className="w-5 h-5" />,
    prerequisites: ['web-security'],
    skills: ['HTTP methods', 'Status codes', 'Headers & cookies', 'Session management'],
    resources: [
      { name: 'MDN — HTTP Overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', type: 'article' },
      { name: 'HTTP: The Definitive Guide (summary)', url: 'https://www.oreilly.com/library/view/http-the-definitive/1565925092/', type: 'article' }
    ],
    estimatedTime: '4-6 hours',
    completed: false,
    locked: false
  },
  {
    id: 'git-version-control',
    title: 'Git & Version Control',
    description: 'Use Git effectively for collaboration, code review, and secure code practices.',
    difficulty: 'Beginner',
    category: 'Development',
    icon: <Code className="w-5 h-5" />,
    prerequisites: ['programming-basics'],
    skills: ['Git basics', 'Branching', 'Code review', 'Using CI hooks'],
    resources: [
      { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'article' },
      { name: 'GitHub Learning Lab', url: 'https://lab.github.com/', type: 'lab' }
    ],
    estimatedTime: '3-5 hours',
    completed: false,
    locked: false
  },
  {
    id: 'red-team',
    title: 'Red Teaming & Offensive Techniques',
    description: 'Advanced adversary simulation, attack emulation and persistence techniques.',
    difficulty: 'Advanced',
    category: 'Offensive Security',
    icon: <AlertTriangle className="w-5 h-5" />,
    prerequisites: ['penetration-testing'],
    skills: ['Adversary emulation', 'Post-exploitation', 'Persistence techniques', 'OpSec'],
    resources: [
      { name: 'MITRE ATT&CK Techniques', url: 'https://attack.mitre.org/techniques/', type: 'article' },
      { name: 'Red Team Field Manual (RTFM)', url: 'https://github.com/maaaaz/RTFM', type: 'article' }
    ],
    estimatedTime: '30-40 hours',
    completed: false,
    locked: true
  },
  {
    id: 'blue-team',
    title: 'Blue Team & Detection',
    description: 'Defensive monitoring, detection engineering, SIEM and incident containment.',
    difficulty: 'Advanced',
    category: 'Defensive Security',
    icon: <Shield className="w-5 h-5" />,
    prerequisites: ['incident-response'],
    skills: ['SIEM', 'Log analysis', 'Detection rules', 'Containment strategies'],
    resources: [
      { name: 'ELK Stack Tutorial', url: 'https://www.elastic.co/what-is/elk-stack', type: 'article' },
      { name: 'Splunk Essentials', url: 'https://www.splunk.com/en_us/training.html', type: 'course' }
    ],
    estimatedTime: '20-30 hours',
    completed: false,
    locked: true
  },
  {
    id: 'kubernetes-security',
    title: 'Kubernetes Security',
    description: 'Secure container orchestration, RBAC, pod security and network policies.',
    difficulty: 'Intermediate',
    category: 'Cloud Security',
    icon: <Database className="w-5 h-5" />,
    prerequisites: ['cloud-security'],
    skills: ['K8s RBAC', 'NetworkPolicy', 'Pod security', 'Image scanning'],
    resources: [
      { name: 'Kubernetes Hardening Guide', url: 'https://kubernetes.io/docs/concepts/security/', type: 'article' },
      { name: 'CNCF – Kubernetes Security', url: 'https://www.cncf.io/projects/kubernetes/', type: 'article' }
    ],
    estimatedTime: '10-15 hours',
    completed: false,
    locked: false
  }
]

export default function CybersecurityRoadmap() {
  const [activeTab, setActiveTab] = useState('roadmap')

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥'
      case 'article': return '📄'
      case 'lab': return '🧪'
      case 'course': return '🎓'
      default: return '📚'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">🎯 Cybersecurity Learning Roadmap</h2>
          <p className="text-base text-slate-600">Master cybersecurity step by step with our comprehensive learning path</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full gap-2 overflow-x-auto py-2 no-scrollbar">
            <TabsTrigger value="roadmap" className="text-sm whitespace-nowrap">Roadmap</TabsTrigger>
            <TabsTrigger value="detailed" className="text-sm whitespace-nowrap">Detailed Path</TabsTrigger>
            <TabsTrigger value="resources" className="text-sm whitespace-nowrap">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">🎯 Cyber Security Roadmap</h1>
              <p className="text-center text-slate-600 mb-8">A comprehensive guide to becoming a cybersecurity professional</p>

              {roadmapSteps.map((step, index) => (
                <section key={step.id} className="mb-8 p-6 rounded-lg border border-slate-200 bg-white hover:shadow-md transition-shadow cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-blue-500 text-white">
                        {index + 1}
                      </div>
                      <h2 className="text-xl font-semibold flex items-center space-x-2">
                        {step.icon}
                        <span>{step.title}</span>
                        <Badge className={`${getDifficultyColor(step.difficulty)} text-white text-xs`}>
                          {step.difficulty}
                        </Badge>
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-4">{step.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-slate-800">Skills You'll Learn</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        {step.skills.map((skill, idx) => (
                          <li key={idx} className="text-slate-600">{skill}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-slate-800">Resources ({step.resources.length})</h3>
                      <div className="space-y-2">
                        {step.resources.slice(0, 4).map((resource, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <span className="text-sm">{getResourceIcon(resource.type)}</span>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-2"
                            >
                              <span>{resource.name}</span>
                            </a>
                          </div>
                        ))}
                        {step.resources.length > 4 && (
                          <p className="text-sm text-slate-500">+{step.resources.length - 4} more resources</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {step.prerequisites.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <h3 className="font-semibold mb-2 text-slate-800">Prerequisites:</h3>
                      <div className="flex flex-wrap gap-2">
                        {step.prerequisites.map(prereq => {
                          const prereqStep = roadmapSteps.find(s => s.id === prereq)
                          return (
                            <Badge key={prereq} variant="outline" className="flex items-center space-x-1">
                              <span>{prereqStep?.title}</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            {roadmapSteps.map((step, index) => (
              <Card key={step.id} className="rounded-lg hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          {step.icon}
                          <span>{step.title}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getDifficultyColor(step.difficulty)}>{step.difficulty}</Badge>
                          <span className="text-sm text-slate-500">{step.category}</span>
                          <span className="text-sm text-slate-500">• {step.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-700">{step.description}</p>

                  {step.prerequisites.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Prerequisites:</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.prerequisites.map(prereq => {
                          const prereqStep = roadmapSteps.find(s => s.id === prereq)
                          return (
                            <Badge key={prereq} variant="outline" className="flex items-center space-x-1">
                              <span>{prereqStep?.title}</span>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                    <div className="space-y-2">
                      {step.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                          <span className="text-lg">{getResourceIcon(resource.type)}</span>
                          <div className="flex-1">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium inline-flex items-center gap-2">
                              <span>{resource.name}</span>
                            </a>
                            <Badge variant="outline" className="ml-2 text-xs">{resource.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                Here are all the recommended resources organized by category. Click on any resource to access it.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['article', 'lab', 'video'].map(type => {
                 const resourcesOfType = roadmapSteps.flatMap(step => step.resources.filter(r => r.type === type))
                 if (resourcesOfType.length === 0) return null

                 return (
                   <Card key={type}>
                     <CardHeader>
                       <CardTitle className="flex items-center space-x-2 capitalize">
                         <span className="text-lg">{getResourceIcon(type)}</span>
                         <span>{type}s</span>
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <div className="space-y-3">
                         {resourcesOfType.map((resource, idx) => (
                           <div key={idx} className="border-l-2 border-blue-200 pl-3">
                             <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium block">
                               {resource.name}
                             </a>
                             <p className="text-sm text-slate-600 mt-1">
                               From: {roadmapSteps.find(s => s.resources.includes(resource))?.title}
                             </p>
                           </div>
                         ))}
                       </div>
                     </CardContent>
                   </Card>
                 )
               })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
