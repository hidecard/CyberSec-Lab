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
import { Code2, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, Terminal, FileText } from 'lucide-react'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  starterCode: string
  solution: string
  testCases: { input: string; expected: string }[]
  hints: string[]
  explanation: string
}

const challenges: Challenge[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Write your first Python program that prints "Hello, Cybersecurity!"',
    difficulty: 'Beginner',
    category: 'Basics',
    task: 'Create a Python script that outputs "Hello, Cybersecurity!" to the console.',
    starterCode: '# Write your first Python program here\n\n',
    solution: 'print("Hello, Cybersecurity!")',
    testCases: [
      { input: '', expected: 'Hello, Cybersecurity!' }
    ],
    hints: [
      'Use the print() function to output text',
      'Remember to use double quotes around your text'
    ],
    explanation: 'The print() function is the most basic way to output information in Python. It takes a string as an argument and displays it to the console.'
  },
  {
    id: 'variables',
    title: 'Variables and Data Types',
    description: 'Learn about variables and basic data types in Python',
    difficulty: 'Beginner',
    category: 'Basics',
    task: 'Create variables for a security tool name, version number, and whether it\'s open source. Then print them.',
    starterCode: '# Create variables for a security tool\n# tool_name = ?\n# version = ?\n# is_open_source = ?\n\n# Print the variables\n',
    solution: 'tool_name = "Wireshark"\nversion = 4.0\nis_open_source = True\n\nprint(f"Tool: {tool_name}")\nprint(f"Version: {version}")\nprint(f"Open Source: {is_open_source}")',
    testCases: [
      { input: '', expected: 'Tool: Wireshark\nVersion: 4.0\nOpen Source: True' }
    ],
    hints: [
      'Use descriptive variable names',
      'Strings use quotes, numbers don\'t, booleans are True/False',
      'Use f-strings for formatted output'
    ],
    explanation: 'Variables store data values. Python has several data types: strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).'
  },
  {
    id: 'password-checker',
    title: 'Simple Password Checker',
    description: 'Create a basic password strength checker',
    difficulty: 'Beginner',
    category: 'Security',
    task: 'Write a function that checks if a password is at least 8 characters long and contains both letters and numbers.',
    starterCode: 'def check_password(password):\n    # Check if password meets criteria\n    # Return True if strong, False if weak\n    pass\n\n# Test the function\nprint(check_password("password123"))  # Should be True\nprint(check_password("pass"))         # Should be False',
    solution: 'def check_password(password):\n    # Check length\n    if len(password) < 8:\n        return False\n    \n    # Check for letters and numbers\n    has_letter = any(c.isalpha() for c in password)\n    has_digit = any(c.isdigit() for c in password)\n    \n    return has_letter and has_digit\n\nprint(check_password("password123"))\nprint(check_password("pass"))',
    testCases: [
      { input: 'password123', expected: 'True' },
      { input: 'pass', expected: 'False' },
      { input: '12345678', expected: 'False' },
      { input: 'abcdefgh', expected: 'False' }
    ],
    hints: [
      'Use len() to check password length',
      'Use any() with a generator expression to check character types',
      'isalpha() checks for letters, isdigit() checks for numbers'
    ],
    explanation: 'Password strength checking is a fundamental security practice. This function demonstrates basic validation rules that are commonly used in authentication systems.'
  },
  {
    id: 'file-analyzer',
    title: 'Log File Analyzer',
    description: 'Analyze security log files for suspicious activity',
    difficulty: 'Intermediate',
    category: 'Automation',
    task: 'Write a script that reads a log file and counts failed login attempts per IP address.',
    starterCode: '# Sample log data (normally this would come from a file)\nlogs = [\n    "192.168.1.1 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.1 - Login failed",\n    "192.168.1.3 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.2 - Login failed"\n]\n\n# Count failed logins per IP\nfailed_logins = {}\n\n# Your code here\n\nprint("Failed login attempts per IP:")\nfor ip, count in failed_logins.items():\n    print(f"{ip}: {count}")',
    solution: '# Sample log data (normally this would come from a file)\nlogs = [\n    "192.168.1.1 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.1 - Login failed",\n    "192.168.1.3 - Login successful",\n    "192.168.1.2 - Login failed",\n    "192.168.1.2 - Login failed"\n]\n\n# Count failed logins per IP\nfailed_logins = {}\n\nfor log in logs:\n    if "Login failed" in log:\n        ip = log.split(" - ")[0]\n        failed_logins[ip] = failed_logins.get(ip, 0) + 1\n\nprint("Failed login attempts per IP:")\nfor ip, count in failed_logins.items():\n    print(f"{ip}: {count}")',
    testCases: [
      { input: '', expected: 'Failed login attempts per IP:\n192.168.1.1: 1\n192.168.1.2: 3' }
    ],
    hints: [
      'Split each log entry to extract the IP address',
      'Use a dictionary to count occurrences',
      'Check for "Login failed" in each log entry'
    ],
    explanation: 'Log analysis is crucial for security monitoring. This script demonstrates how to parse log files and identify patterns that might indicate security threats like brute force attacks.'
  },
  {
    id: 'encryption-basic',
    title: 'Basic Caesar Cipher',
    description: 'Implement a simple encryption algorithm',
    difficulty: 'Intermediate',
    category: 'Cryptography',
    task: 'Create functions to encrypt and decrypt text using a Caesar cipher with a shift of 3.',
    starterCode: 'def caesar_encrypt(text, shift=3):\n    # Encrypt the text using Caesar cipher\n    pass\n\ndef caesar_decrypt(text, shift=3):\n    # Decrypt the text using Caesar cipher\n    pass\n\n# Test the functions\nmessage = "HELLO SECURITY"\nprint("Original:", message)\nprint("Encrypted:", caesar_encrypt(message))\nprint("Decrypted:", caesar_decrypt(caesar_encrypt(message)))',
    solution: 'def caesar_encrypt(text, shift=3):\n    result = ""\n    for char in text:\n        if char.isalpha():\n            # Shift alphabetic characters\n            base = ord(\'A\') if char.isupper() else ord(\'a\')\n            result += chr((ord(char) - base + shift) % 26 + base)\n        else:\n            result += char\n    return result\n\ndef caesar_decrypt(text, shift=3):\n    return caesar_encrypt(text, -shift)\n\n# Test the functions\nmessage = "HELLO SECURITY"\nprint("Original:", message)\nprint("Encrypted:", caesar_encrypt(message))\nprint("Decrypted:", caesar_decrypt(caesar_encrypt(message)))',
    testCases: [
      { input: 'HELLO', expected: 'KHOOR' },
      { input: 'ABC', expected: 'DEF' },
      { input: 'XYZ', expected: 'ABC' }
    ],
    hints: [
      'Use ord() and chr() to work with ASCII values',
      'Handle uppercase and lowercase letters separately',
      'Use modulo 26 for alphabet wrapping',
      'Decryption is just encryption with negative shift'
    ],
    explanation: 'The Caesar cipher is one of the oldest encryption techniques. It demonstrates basic cryptographic concepts like substitution and key-based encryption.'
  },
  {
    id: 'network-scanner',
    title: 'Simple Port Scanner',
    description: 'Create a basic network port scanner',
    difficulty: 'Advanced',
    category: 'Networking',
    task: 'Write a script that checks if common ports are open on a target host (simulated).',
    starterCode: '# Simulate a port scanner (in real scenarios, use proper libraries)\nimport time\n\n# Common ports to check\ncommon_ports = {\n    80: "HTTP",\n    443: "HTTPS",\n    22: "SSH",\n    21: "FTP",\n    25: "SMTP"\n}\n\n# Simulated open ports (in reality, this would be checked)\nopen_ports = [80, 443, 22]\n\ndef scan_port(port):\n    # Simulate port scanning delay\n    time.sleep(0.1)\n    return port in open_ports\n\n# Scan ports and report results\nprint("Port Scan Results:")\nfor port, service in common_ports.items():\n    if scan_port(port):\n        print(f"Port {port} ({service}): OPEN")\n    else:\n        print(f"Port {port} ({service}): CLOSED")',
    solution: '# Simulate a port scanner (in real scenarios, use proper libraries)\nimport time\n\n# Common ports to check\ncommon_ports = {\n    80: "HTTP",\n    443: "HTTPS",\n    22: "SSH",\n    21: "FTP",\n    25: "SMTP"\n}\n\n# Simulated open ports (in reality, this would be checked)\nopen_ports = [80, 443, 22]\n\ndef scan_port(port):\n    # Simulate port scanning delay\n    time.sleep(0.1)\n    return port in open_ports\n\n# Scan ports and report results\nprint("Port Scan Results:")\nfor port, service in common_ports.items():\n    if scan_port(port):\n        print(f"Port {port} ({service}): OPEN")\n    else:\n        print(f"Port {port} ({service}): CLOSED")',
    testCases: [
      { input: '', expected: 'Port Scan Results:\nPort 80 (HTTP): OPEN\nPort 443 (HTTPS): OPEN\nPort 22 (SSH): OPEN\nPort 21 (FTP): CLOSED\nPort 25 (SMTP): CLOSED' }
    ],
    hints: [
      'Use socket library for real port scanning (not shown here for safety)',
      'Handle connection timeouts and errors',
      'Common ports: 80 (HTTP), 443 (HTTPS), 22 (SSH), etc.'
    ],
    explanation: 'Port scanning is a reconnaissance technique used to discover open services on a network. This demonstrates basic network enumeration concepts.'
  }
]

export default function ProgrammingBasicsLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0])
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserCode(selectedChallenge.starterCode)
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      // Simulate code execution (in a real implementation, this would run Python code)
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simple validation for demo purposes
      let simulatedOutput = ''

      if (selectedChallenge.id === 'hello-world') {
        if (userCode.includes('print("Hello, Cybersecurity!")')) {
          simulatedOutput = 'Hello, Cybersecurity!'
        }
      } else if (selectedChallenge.id === 'variables') {
        if (userCode.includes('tool_name = "Wireshark"') && userCode.includes('print(f"Tool:')) {
          simulatedOutput = 'Tool: Wireshark\nVersion: 4.0\nOpen Source: True'
        }
      } else if (selectedChallenge.id === 'password-checker') {
        if (userCode.includes('def check_password') && userCode.includes('len(password)')) {
          simulatedOutput = 'True\nFalse'
        }
      } else if (selectedChallenge.id === 'file-analyzer') {
        if (userCode.includes('for log in logs') && userCode.includes('Login failed')) {
          simulatedOutput = 'Failed login attempts per IP:\n192.168.1.1: 1\n192.168.1.2: 3'
        }
      } else if (selectedChallenge.id === 'encryption-basic') {
        if (userCode.includes('def caesar_encrypt') && userCode.includes('ord(')) {
          simulatedOutput = 'Original: HELLO SECURITY\nEncrypted: KHOOR VHFZULWB\nDecrypted: HELLO SECURITY'
        }
      } else if (selectedChallenge.id === 'network-scanner') {
        if (userCode.includes('for port, service in common_ports.items()')) {
          simulatedOutput = 'Port Scan Results:\nPort 80 (HTTP): OPEN\nPort 443 (HTTPS): OPEN\nPort 22 (SSH): OPEN\nPort 21 (FTP): CLOSED\nPort 25 (SMTP): CLOSED'
        }
      }

      if (simulatedOutput) {
        setOutput(simulatedOutput)
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      } else {
        setOutput('Code executed but no output captured. Check your implementation.')
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
            <div className="p-2 sm:p-3 bg-blue-500 rounded-lg self-start">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Programming Basics Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Learn Python programming through cybersecurity-focused challenges</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Master Python fundamentals with hands-on security challenges. Each exercise builds practical skills for cybersecurity automation and analysis.
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
                    Select a programming challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {challenges.map((challenge) => (
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

              {/* Challenge Details and Code Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
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
                  <div>
                    <h4 className="font-semibold mb-2">Task:</h4>
                    <p className="text-sm text-slate-700">{selectedChallenge.task}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Code Editor:</h4>
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your Python code here..."
                      className="font-mono text-sm h-64"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={runCode}
                      disabled={isRunning}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
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
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <Code className="block text-sm">{selectedChallenge.solution}</Code>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Output:</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-24">
                      {output || 'Run your code to see output here...'}
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
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {completedChallenges.size}/{challenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Skills Learned</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Python Syntax</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Variables & Data Types</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Functions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">String Manipulation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Basic Security Concepts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Learn file I/O operations</p>
                    <p>• Explore Python libraries (requests, scapy)</p>
                    <p>• Practice with real security tools</p>
                    <p>• Build automation scripts</p>
                    <p>• Study advanced Python concepts</p>
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
