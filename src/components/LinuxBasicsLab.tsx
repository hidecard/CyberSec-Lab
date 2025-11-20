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
import { Terminal, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, FileText, Shield, Users, HardDrive } from 'lucide-react'

interface CommandChallenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  expectedCommand: string
  expectedOutput: string
  hints: string[]
  explanation: string
  scenario: string
}

const commandChallenges: CommandChallenge[] = [
  {
    id: 'pwd-ls',
    title: 'Navigation Basics',
    description: 'Learn to navigate the file system and list directory contents',
    difficulty: 'Beginner',
    category: 'Navigation',
    task: 'Navigate to the /home directory and list its contents.',
    expectedCommand: 'cd /home && ls -la',
    expectedOutput: 'total 12\ndrwxr-xr-x  3 root root 4096 Jan 15 10:30 .\ndrwxr-xr-x 18 root root 4096 Jan 15 10:30 ..\ndrwxr-xr-x  2 user user 4096 Jan 15 10:31 user',
    hints: [
      'Use cd to change directory',
      'Use ls -la to list all files with details',
      'Combine commands with &&'
    ],
    explanation: 'pwd shows current directory, cd changes directory, ls lists files. The -la flags show hidden files and detailed information.',
    scenario: 'You\'re investigating a compromised server and need to check the home directory for suspicious files.'
  },
  {
    id: 'file-permissions',
    title: 'File Permissions',
    description: 'Understand and modify file permissions',
    difficulty: 'Beginner',
    category: 'Permissions',
    task: 'Check permissions of /etc/passwd and make it readable by owner only.',
    expectedCommand: 'ls -l /etc/passwd && chmod 600 /etc/passwd && ls -l /etc/passwd',
    expectedOutput: '-rw-r--r-- 1 root root 1234 Jan 15 10:30 /etc/passwd\n-rw------- 1 root root 1234 Jan 15 10:30 /etc/passwd',
    hints: [
      'ls -l shows permissions',
      'chmod 600 sets read/write for owner only',
      'Numbers represent permission levels (4=read, 2=write, 1=execute)'
    ],
    explanation: 'File permissions control access. chmod changes permissions. 600 means owner can read/write, others have no access.',
    scenario: 'A sensitive configuration file has incorrect permissions that could allow unauthorized access.'
  },
  {
    id: 'process-management',
    title: 'Process Management',
    description: 'Monitor and manage running processes',
    difficulty: 'Intermediate',
    category: 'Processes',
    task: 'Find and terminate a suspicious process named "malware" running as user "attacker".',
    expectedCommand: 'ps aux | grep malware && killall malware && ps aux | grep malware',
    expectedOutput: 'attacker   1234  0.0  0.1  12345  6789 ?        S    10:30   0:00 malware\n[no output - process terminated]',
    hints: [
      'ps aux shows all processes',
      'grep filters output',
      'killall terminates processes by name'
    ],
    explanation: 'Process management is crucial for system security. ps monitors processes, kill terminates them.',
    scenario: 'You\'ve detected malware running on a system and need to stop it immediately.'
  },
  {
    id: 'log-analysis',
    title: 'Log Analysis',
    description: 'Analyze system logs for security events',
    difficulty: 'Intermediate',
    category: 'Logs',
    task: 'Check authentication logs for failed login attempts in the last hour.',
    expectedCommand: 'grep "Failed password" /var/log/auth.log | tail -10',
    expectedOutput: 'Jan 15 10:25 sshd[1234]: Failed password for invalid user admin from 192.168.1.100 port 22 ssh2\nJan 15 10:26 sshd[1235]: Failed password for root from 192.168.1.100 port 22 ssh2',
    hints: [
      'grep searches for patterns in files',
      'tail -n shows last n lines',
      '/var/log/auth.log contains authentication logs'
    ],
    explanation: 'Log analysis helps detect security incidents. Failed login attempts may indicate brute force attacks.',
    scenario: 'Multiple failed login attempts suggest someone is trying to break into the system.'
  },
  {
    id: 'network-connections',
    title: 'Network Connections',
    description: 'Monitor network connections and open ports',
    difficulty: 'Intermediate',
    category: 'Networking',
    task: 'Check for suspicious network connections and listening ports.',
    expectedCommand: 'netstat -tlnp | grep LISTEN && ss -tlnp | grep LISTEN',
    expectedOutput: 'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1234/sshd\ntcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      1235/mysqld',
    hints: [
      'netstat -tlnp shows listening TCP ports',
      'ss is a modern replacement for netstat',
      'LISTEN indicates open ports'
    ],
    explanation: 'Monitoring network connections helps detect unauthorized services or backdoors.',
    scenario: 'You suspect a backdoor is running on the system, listening for connections.'
  },
  {
    id: 'user-management',
    title: 'User Management',
    description: 'Manage system users and groups',
    difficulty: 'Intermediate',
    category: 'Users',
    task: 'Create a new user "security" with restricted access and add them to the "audit" group.',
    expectedCommand: 'sudo useradd -m -s /bin/bash security && sudo usermod -aG audit security && id security',
    expectedOutput: 'uid=1001(security) gid=1001(security) groups=1001(security),1002(audit)',
    hints: [
      'useradd creates users',
      '-m creates home directory',
      'usermod modifies user properties',
      '-aG appends to groups'
    ],
    explanation: 'Proper user management is essential for access control. Users should have minimal required privileges.',
    scenario: 'Setting up a security auditor account with appropriate permissions.'
  },
  {
    id: 'firewall-config',
    title: 'Firewall Configuration',
    description: 'Configure iptables firewall rules',
    difficulty: 'Advanced',
    category: 'Firewall',
    task: 'Block all incoming traffic except SSH (port 22) and allow all outgoing traffic.',
    expectedCommand: 'sudo iptables -F && sudo iptables -P INPUT DROP && sudo iptables -P FORWARD DROP && sudo iptables -P OUTPUT ACCEPT && sudo iptables -A INPUT -i lo -j ACCEPT && sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT && sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
    expectedOutput: 'iptables rules configured successfully',
    hints: [
      'iptables -F flushes existing rules',
      'Default policies: INPUT DROP, OUTPUT ACCEPT',
      'Allow loopback and established connections',
      'Accept SSH on port 22'
    ],
    explanation: 'Firewalls control network traffic. Default deny with explicit allow is a security best practice.',
    scenario: 'Hardening a server by configuring restrictive firewall rules.'
  },
  {
    id: 'file-integrity',
    title: 'File Integrity Monitoring',
    description: 'Monitor file changes using integrity checking',
    difficulty: 'Advanced',
    category: 'Monitoring',
    task: 'Create and verify file checksums to detect unauthorized changes.',
    expectedCommand: 'echo "Important config" > /etc/important.conf && sha256sum /etc/important.conf > /etc/important.conf.sha256 && echo "Modified content" > /etc/important.conf && sha256sum -c /etc/important.conf.sha256',
    expectedOutput: '/etc/important.conf: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match',
    hints: [
      'sha256sum creates checksums',
      'Store checksums separately',
      'sha256sum -c verifies integrity'
    ],
    explanation: 'File integrity monitoring detects unauthorized changes to critical system files.',
    scenario: 'Ensuring configuration files haven\'t been tampered with by malware.'
  }
]

export default function LinuxBasicsLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<CommandChallenge>(commandChallenges[0])
  const [userCommand, setUserCommand] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserCommand('')
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  const runCommand = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      // Simulate command execution
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simple validation for demo purposes
      let simulatedOutput = ''

      if (selectedChallenge.id === 'pwd-ls') {
        if (userCommand.includes('cd /home') && userCommand.includes('ls -la')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'file-permissions') {
        if (userCommand.includes('chmod 600') && userCommand.includes('/etc/passwd')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'process-management') {
        if (userCommand.includes('killall malware')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'log-analysis') {
        if (userCommand.includes('grep "Failed password"') && userCommand.includes('tail')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'network-connections') {
        if (userCommand.includes('netstat') || userCommand.includes('ss')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'user-management') {
        if (userCommand.includes('useradd') && userCommand.includes('usermod')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'firewall-config') {
        if (userCommand.includes('iptables') && userCommand.includes('DROP') && userCommand.includes('--dport 22')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      } else if (selectedChallenge.id === 'file-integrity') {
        if (userCommand.includes('sha256sum') && userCommand.includes('-c')) {
          simulatedOutput = selectedChallenge.expectedOutput
        }
      }

      if (simulatedOutput) {
        setOutput(simulatedOutput)
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      } else {
        setOutput('Command executed but output not captured. Check your command syntax.')
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
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
            <div className="p-2 sm:p-3 bg-green-500 rounded-lg self-start">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Linux Basics Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Master essential Linux commands for cybersecurity investigations</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Learn Linux command-line skills through realistic security scenarios. Each challenge simulates common cybersecurity tasks and investigations.
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
                    Select a Linux command challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {commandChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-green-50 border-green-200'
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

              {/* Challenge Details and Terminal */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Terminal className="w-5 h-5" />
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
                    <h4 className="font-semibold mb-2">Command Input:</h4>
                    <Textarea
                      value={userCommand}
                      onChange={(e) => setUserCommand(e.target.value)}
                      placeholder="Enter your Linux command here..."
                      className="font-mono text-sm h-20"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={runCommand}
                      disabled={isRunning || !userCommand.trim()}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isRunning ? 'Executing...' : 'Run Command'}</span>
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
                      <h4 className="font-semibold mb-2">Expected Command:</h4>
                      <Code className="block text-sm">{selectedChallenge.expectedCommand}</Code>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Terminal Output:</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-32">
                      <div className="text-slate-400 mb-2">$ {userCommand}</div>
                      {output || 'Execute a command to see output here...'}
                    </div>
                  </div>

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
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {completedChallenges.size}/{commandChallenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / commandChallenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Skills Learned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">File System Navigation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">File Permissions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Process Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Log Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Network Monitoring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HardDrive className="w-5 h-5" />
                    <span>Essential Commands</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p><code className="bg-slate-100 px-1 rounded">ls, cd, pwd</code> - Navigation</p>
                    <p><code className="bg-slate-100 px-1 rounded">chmod, chown</code> - Permissions</p>
                    <p><code className="bg-slate-100 px-1 rounded">ps, kill, top</code> - Processes</p>
                    <p><code className="bg-slate-100 px-1 rounded">grep, tail, cat</code> - Text processing</p>
                    <p><code className="bg-slate-100 px-1 rounded">netstat, ss, iptables</code> - Networking</p>
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
