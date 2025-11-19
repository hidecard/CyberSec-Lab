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
      { name: 'Cybersecurity Fundamentals Course', url: 'https://www.coursera.org/learn/cybersecurity-basics', type: 'course' }
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
      { name: 'OWASP Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/', type: 'article' }
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
      { name: 'Wireshark Tutorials', url: 'https://www.wireshark.org/docs/', type: 'article' }
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
      { name: 'Practical Cryptography', url: 'https://cryptobook.nakov.com/', type: 'article' }
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
      { name: 'PWK Course', url: 'https://www.offsec.com/courses/penetration-testing/', type: 'course' }
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
      { name: 'Digital Forensics Course', url: 'https://www.sans.org/cyber-security-skills/training/digital-forensics/', type: 'course' }
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
      { name: 'Cloud Security Course', url: 'https://www.coursera.org/specializations/cloud-security', type: 'course' }
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
      { name: 'Security Governance Course', url: 'https://www.isaca.org/credentialing/cisa', type: 'course' }
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
      { name: 'Advanced Threat Hunting', url: 'https://www.sans.org/cyber-security-skills/training/threat-hunting/', type: 'course' }
    ],
    estimatedTime: '25-30 hours',
    completed: false,
    locked: true
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
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">🎯 Cybersecurity Learning Roadmap</h2>
        <p className="text-lg text-slate-600 mb-6">
          Master cybersecurity step by step with our comprehensive learning path
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2">
          <TabsTrigger value="roadmap" className="text-sm">Roadmap</TabsTrigger>
          <TabsTrigger value="detailed" className="text-sm">Detailed Path</TabsTrigger>
          <TabsTrigger value="resources" className="text-sm">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">🎯 Cyber Security Roadmap</h1>
            <p className="text-center text-slate-600 mb-8">A comprehensive guide to becoming a cybersecurity professional</p>

            {roadmapSteps.map((step, index) => (
              <section key={step.id} className="mb-8 p-6 rounded-lg border border-blue-200 bg-blue-50">
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
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {resource.name}
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
            <Card key={step.id}>
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
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                            {resource.name}
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
   )
 }
