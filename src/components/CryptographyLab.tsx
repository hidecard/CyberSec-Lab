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
import { Lock, Play, CheckCircle, XCircle, BookOpen, Target, Trophy, Zap, FileText, Key, Shield, Hash } from 'lucide-react'

interface CryptoChallenge {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  task: string
  plaintext: string
  encrypted: string
  algorithm: string
  key: string
  hints: string[]
  explanation: string
  interactive: boolean
}

const cryptoChallenges: CryptoChallenge[] = [
  {
    id: 'caesar-cipher',
    title: 'Caesar Cipher',
    description: 'Learn the basics of substitution ciphers',
    difficulty: 'Beginner',
    category: 'Classical',
    task: 'Decrypt the Caesar cipher message with a shift of 3.',
    plaintext: 'HELLO SECURITY',
    encrypted: 'KHOOR VHFZULWB',
    algorithm: 'Caesar',
    key: '3',
    hints: [
      'Each letter is shifted by a fixed number of positions',
      'A becomes D, B becomes E, etc.',
      'Numbers and spaces usually remain unchanged'
    ],
    explanation: 'The Caesar cipher is one of the oldest encryption techniques, where each letter is shifted by a fixed number of positions in the alphabet.',
    interactive: true
  },
  {
    id: 'vigenere-cipher',
    title: 'Vigenère Cipher',
    description: 'Master polyalphabetic substitution',
    difficulty: 'Beginner',
    category: 'Classical',
    task: 'Decrypt the message encrypted with the keyword "KEY".',
    plaintext: 'ATTACK AT DAWN',
    encrypted: 'KVVGCM AT UCVJ',
    algorithm: 'Vigenère',
    key: 'KEY',
    hints: [
      'Uses a keyword to determine shift for each letter',
      'Repeat the keyword to match message length',
      'A=0, B=1, C=2, ..., Z=25'
    ],
    explanation: 'The Vigenère cipher uses a keyword to create different shifts for each letter, making it more secure than simple substitution ciphers.',
    interactive: true
  },
  {
    id: 'base64-encoding',
    title: 'Base64 Encoding',
    description: 'Understand data encoding schemes',
    difficulty: 'Beginner',
    category: 'Encoding',
    task: 'Decode the Base64 encoded message.',
    plaintext: 'Hello, World!',
    encrypted: 'SGVsbG8sIFdvcmxkIQ==',
    algorithm: 'Base64',
    key: '',
    hints: [
      'Base64 encodes binary data as text',
      'Uses A-Z, a-z, 0-9, +, /, and = for padding',
      'Commonly used for email attachments and web data'
    ],
    explanation: 'Base64 encoding converts binary data to a text format using 64 different characters, often used to transmit binary data over text-only channels.',
    interactive: true
  },
  {
    id: 'aes-encryption',
    title: 'AES Encryption',
    description: 'Explore modern symmetric encryption',
    difficulty: 'Intermediate',
    category: 'Symmetric',
    task: 'Understand AES encryption concepts and key sizes.',
    plaintext: 'This is a secret message',
    encrypted: 'U2FsdGVkX1+9vY7nqG8mKQ2xYzN8cKvQK8mKQ2xYzN8cKvQK8mKQ2xYzN8cKv',
    algorithm: 'AES-256',
    key: 'mySecretKey12345678901234567890',
    hints: [
      'AES is a symmetric block cipher',
      'Common key sizes: 128, 192, 256 bits',
      'Used worldwide for data protection',
      'Much more secure than classical ciphers'
    ],
    explanation: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used to protect sensitive data. It uses the same key for encryption and decryption.',
    interactive: false
  },
  {
    id: 'rsa-keygen',
    title: 'RSA Key Generation',
    description: 'Learn asymmetric cryptography fundamentals',
    difficulty: 'Intermediate',
    category: 'Asymmetric',
    task: 'Understand how RSA public/private key pairs are generated.',
    plaintext: 'RSA uses prime numbers',
    encrypted: 'Not applicable - conceptual',
    algorithm: 'RSA',
    key: 'Public: (e=65537, n=p*q), Private: (d, n)',
    hints: [
      'Choose two large prime numbers p and q',
      'Compute n = p * q',
      'Compute φ(n) = (p-1)*(q-1)',
      'Choose e that is coprime with φ(n)',
      'Compute d as modular inverse of e mod φ(n)'
    ],
    explanation: 'RSA is an asymmetric encryption algorithm that uses different keys for encryption and decryption, enabling secure key exchange and digital signatures.',
    interactive: false
  },
  {
    id: 'hash-functions',
    title: 'Hash Functions',
    description: 'Explore cryptographic hash functions',
    difficulty: 'Intermediate',
    category: 'Hashing',
    task: 'Compare different hash function outputs for the same input.',
    plaintext: 'The quick brown fox jumps over the lazy dog',
    encrypted: 'SHA256: a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    algorithm: 'SHA-256',
    key: '',
    hints: [
      'Hash functions are one-way (cannot decrypt)',
      'Small input changes cause large output changes',
      'Used for integrity checking and password storage',
      'Common algorithms: MD5, SHA-1, SHA-256, SHA-3'
    ],
    explanation: 'Cryptographic hash functions convert input data of any size into a fixed-size output, commonly used for data integrity verification and password hashing.',
    interactive: false
  },
  {
    id: 'digital-signatures',
    title: 'Digital Signatures',
    description: 'Understand digital signature concepts',
    difficulty: 'Advanced',
    category: 'Signatures',
    task: 'Learn how digital signatures provide authentication and integrity.',
    plaintext: 'This document is authentic',
    encrypted: 'Signature: RSA-SHA256 signature of document hash',
    algorithm: 'RSA-SHA256',
    key: 'Private key for signing, public key for verification',
    hints: [
      'Sign the hash of the document, not the document itself',
      'Private key signs, public key verifies',
      'Provides authentication, integrity, and non-repudiation',
      'Used in SSL certificates, code signing, etc.'
    ],
    explanation: 'Digital signatures use asymmetric cryptography to verify the authenticity and integrity of digital messages or documents.',
    interactive: false
  },
  {
    id: 'man-in-middle',
    title: 'Man-in-the-Middle Attack',
    description: 'Analyze encryption vulnerabilities',
    difficulty: 'Advanced',
    category: 'Attacks',
    task: 'Understand how MITM attacks can compromise encrypted communications.',
    plaintext: 'Bank account: 123456, Password: secret123',
    encrypted: 'Intercepted and decrypted by attacker',
    algorithm: 'Compromised TLS',
    key: 'Attacker has fake certificates',
    hints: [
      'Attacker positions between client and server',
      'Can intercept and modify encrypted traffic',
      'Certificate pinning helps prevent MITM',
      'HTTPS everywhere reduces attack surface'
    ],
    explanation: 'Man-in-the-middle attacks intercept encrypted communications by presenting fake certificates, allowing attackers to read and modify sensitive data.',
    interactive: false
  },
  {
    id: 'rail-fence-cipher',
    title: 'Rail Fence Cipher',
    description: 'Learn transposition cipher techniques',
    difficulty: 'Beginner',
    category: 'Classical',
    task: 'Decrypt the Rail Fence cipher with 3 rails.',
    plaintext: 'WE ARE DISCOVEREDFLEE AT ONCE',
    encrypted: 'WECRLTEERDSOEEFEAOCAIVDEN',
    algorithm: 'Rail Fence',
    key: '3',
    hints: [
      'Write the ciphertext in a zigzag pattern',
      'Read off the rails in order',
      '3 rails means 3 rows in the zigzag',
      'Ignores spaces and punctuation'
    ],
    explanation: 'The Rail Fence cipher is a transposition cipher that arranges plaintext in a zigzag pattern across multiple "rails" or rows.',
    interactive: true
  },
  {
    id: 'playfair-cipher',
    title: 'Playfair Cipher',
    description: 'Master digraph substitution ciphers',
    difficulty: 'Intermediate',
    category: 'Classical',
    task: 'Decrypt using the keyword "PLAYFAIR" and 5x5 matrix.',
    plaintext: 'HIDE THE GOLD IN THE TREE STUMP',
    encrypted: 'BM OD ZB XD NA BE KU DM UI XM MO UV IF',
    algorithm: 'Playfair',
    key: 'PLAYFAIREXAMPLE',
    hints: [
      'Create 5x5 matrix with keyword (no duplicates)',
      'Fill with remaining alphabet (I=J)',
      'Encrypt pairs of letters using matrix rules',
      'Same row: shift right, same column: shift down'
    ],
    explanation: 'The Playfair cipher uses a 5x5 matrix and encrypts pairs of letters, making it more secure than simple substitution.',
    interactive: true
  },
  {
    id: 'diffie-hellman',
    title: 'Diffie-Hellman Key Exchange',
    description: 'Learn key exchange protocols',
    difficulty: 'Intermediate',
    category: 'Key Exchange',
    task: 'Calculate the shared secret using Diffie-Hellman parameters.',
    plaintext: 'Key exchange protocol',
    encrypted: 'Shared secret: 8',
    algorithm: 'Diffie-Hellman',
    key: 'p=23, g=5, Alice_private=6, Bob_private=15',
    hints: [
      'Alice computes A = g^a mod p',
      'Bob computes B = g^b mod p',
      'Shared secret = B^a mod p = A^b mod p',
      'Private keys never transmitted'
    ],
    explanation: 'Diffie-Hellman allows two parties to establish a shared secret over an insecure channel without prior secrets.',
    interactive: false
  },
  {
    id: 'des-encryption',
    title: 'DES Encryption',
    description: 'Explore the Data Encryption Standard',
    difficulty: 'Intermediate',
    category: 'Symmetric',
    task: 'Understand DES structure and why it\'s deprecated.',
    plaintext: 'DES is outdated',
    encrypted: 'Not applicable - conceptual',
    algorithm: 'DES',
    key: '56-bit key (insecure)',
    hints: [
      'Uses 56-bit keys (brute forceable)',
      '16 rounds of Feistel network',
      'Replaced by AES in most applications',
      'Still used in legacy systems'
    ],
    explanation: 'DES was the first widely adopted symmetric encryption standard, but its small key size makes it vulnerable to brute force attacks.',
    interactive: false
  },
  {
    id: 'md5-hash',
    title: 'MD5 Hash Function',
    description: 'Analyze the MD5 hashing algorithm',
    difficulty: 'Intermediate',
    category: 'Hashing',
    task: 'Compare MD5 with more secure alternatives.',
    plaintext: 'The quick brown fox jumps over the lazy dog',
    encrypted: 'MD5: 9e107d9d372bb6826bd81d3542a419d6',
    algorithm: 'MD5',
    key: '',
    hints: [
      '128-bit hash output',
      'Vulnerable to collision attacks',
      'Deprecated for security applications',
      'Still used for checksums in some cases'
    ],
    explanation: 'MD5 was widely used but is now cryptographically broken due to collision vulnerabilities.',
    interactive: false
  },
  {
    id: 'certificate-authority',
    title: 'Certificate Authority Concepts',
    description: 'Understand digital certificate infrastructure',
    difficulty: 'Intermediate',
    category: 'PKI',
    task: 'Learn how certificate authorities establish trust.',
    plaintext: 'Certificate validation',
    encrypted: 'Chain of trust verification',
    algorithm: 'X.509',
    key: 'Root CA → Intermediate CA → End Entity',
    hints: [
      'Root CAs are self-signed',
      'Intermediate CAs issue end-entity certificates',
      'Certificate chains build trust',
      'CRL/OCSP check revocation status'
    ],
    explanation: 'Certificate Authorities issue digital certificates that verify the identity of websites and individuals in encrypted communications.',
    interactive: false
  },
  {
    id: 'block-vs-stream',
    title: 'Block vs Stream Ciphers',
    description: 'Compare cipher operating modes',
    difficulty: 'Intermediate',
    category: 'Modes',
    task: 'Understand the differences between block and stream ciphers.',
    plaintext: 'Block ciphers encrypt fixed-size blocks, stream ciphers encrypt bit-by-bit',
    encrypted: 'Conceptual comparison',
    algorithm: 'AES (Block) vs RC4 (Stream)',
    key: 'Block: ECB, CBC, CTR modes',
    hints: [
      'Block ciphers: AES, DES (fixed block sizes)',
      'Stream ciphers: RC4, ChaCha20 (bit/byte at a time)',
      'Block ciphers need modes of operation',
      'Stream ciphers self-synchronizing'
    ],
    explanation: 'Block ciphers process fixed-size blocks of data, while stream ciphers can encrypt data of any size continuously.',
    interactive: false
  },
  {
    id: 'padding-oracle',
    title: 'Padding Oracle Attack',
    description: 'Learn about cryptographic side-channel attacks',
    difficulty: 'Advanced',
    category: 'Attacks',
    task: 'Understand how padding errors can leak information.',
    plaintext: 'Secret message with padding',
    encrypted: 'CBC encrypted with PKCS#7 padding',
    algorithm: 'Padding Oracle',
    key: 'Attacker exploits padding validation errors',
    hints: [
      'Common in CBC mode encryption',
      'Attacker sends modified ciphertext',
      'Server reveals if padding is valid/invalid',
      'Can decrypt without knowing the key'
    ],
    explanation: 'Padding oracle attacks exploit error messages from decryption functions to gradually decrypt ciphertext without the key.',
    interactive: false
  },
  {
    id: 'quantum-cryptography',
    title: 'Quantum Cryptography',
    description: 'Explore post-quantum cryptographic concepts',
    difficulty: 'Advanced',
    category: 'Quantum',
    task: 'Understand quantum threats to classical cryptography.',
    plaintext: 'Quantum computers threaten RSA and ECC',
    encrypted: 'Post-quantum algorithms needed',
    algorithm: 'Shor\'s Algorithm',
    key: 'Quantum threat to factorization',
    hints: [
      'Shor\'s algorithm breaks RSA in polynomial time',
      'Grover\'s algorithm halves symmetric key strength',
      'Post-quantum crypto: lattice-based, hash-based',
      'Quantum key distribution (BB84) is information-theoretically secure'
    ],
    explanation: 'Quantum computers pose significant threats to current cryptographic systems, necessitating the development of quantum-resistant algorithms.',
    interactive: false
  },
  {
    id: 'homomorphic-encryption',
    title: 'Homomorphic Encryption',
    description: 'Learn about computing on encrypted data',
    difficulty: 'Advanced',
    category: 'Advanced',
    task: 'Understand fully homomorphic encryption concepts.',
    plaintext: 'Compute on encrypted data without decryption',
    encrypted: 'FHE allows arbitrary computations',
    algorithm: 'FHE Schemes',
    key: 'BGV, BFV, CKKS schemes',
    hints: [
      'Fully Homomorphic Encryption (FHE)',
      'Allows computation on ciphertext',
      'Result decrypts to correct plaintext computation',
      'Extremely slow but powerful for privacy'
    ],
    explanation: 'Homomorphic encryption enables computations to be performed on encrypted data without decrypting it first.',
    interactive: false
  },
  {
    id: 'zero-knowledge-proofs',
    title: 'Zero-Knowledge Proofs',
    description: 'Master cryptographic proof systems',
    difficulty: 'Advanced',
    category: 'Proofs',
    task: 'Understand how to prove knowledge without revealing information.',
    plaintext: 'I know the password without revealing it',
    encrypted: 'Zero-knowledge proof of knowledge',
    algorithm: 'ZKP Protocols',
    key: 'Schnorr, Fiat-Shamir signatures',
    hints: [
      'Prover convinces verifier of statement truth',
      'No information about the statement revealed',
      'Used in authentication and blockchain',
      'Properties: completeness, soundness, zero-knowledge'
    ],
    explanation: 'Zero-knowledge proofs allow one party to prove they know a secret to another party without revealing the secret itself.',
    interactive: false
  }
]

export default function CryptographyLab() {
  const [activeTab, setActiveTab] = useState('challenges')
  const [selectedChallenge, setSelectedChallenge] = useState<CryptoChallenge>(cryptoChallenges[0])
  const [userInput, setUserInput] = useState('')
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setUserInput('')
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
  }, [selectedChallenge])

  const processCrypto = async () => {
    setIsProcessing(true)
    setOutput('')

    try {
      // Simulate cryptographic processing
      await new Promise(resolve => setTimeout(resolve, 1500))

      let result = ''

      if (selectedChallenge.id === 'caesar-cipher') {
        if (userInput.toUpperCase() === selectedChallenge.plaintext) {
          result = `Correct! Decrypted: "${selectedChallenge.plaintext}"`
        } else {
          result = 'Incorrect. Try again with the Caesar cipher shift.'
        }
      } else if (selectedChallenge.id === 'vigenere-cipher') {
        if (userInput.toUpperCase() === selectedChallenge.plaintext) {
          result = `Correct! Decrypted: "${selectedChallenge.plaintext}"`
        } else {
          result = 'Incorrect. Check your Vigenère decryption with keyword "KEY".'
        }
      } else if (selectedChallenge.id === 'base64-encoding') {
        if (userInput === selectedChallenge.plaintext) {
          result = `Correct! Decoded: "${selectedChallenge.plaintext}"`
        } else {
          result = 'Incorrect. Try decoding the Base64 string.'
        }
      } else if (selectedChallenge.id === 'rail-fence-cipher') {
        if (userInput.toUpperCase().replace(/\s/g, '') === selectedChallenge.plaintext.replace(/\s/g, '')) {
          result = `Correct! Decrypted: "${selectedChallenge.plaintext}"`
        } else {
          result = 'Incorrect. Try arranging the ciphertext in a 3-rail zigzag pattern.'
        }
      } else if (selectedChallenge.id === 'playfair-cipher') {
        if (userInput.toUpperCase().replace(/\s/g, '') === selectedChallenge.plaintext.replace(/\s/g, '')) {
          result = `Correct! Decrypted: "${selectedChallenge.plaintext}"`
        } else {
          result = 'Incorrect. Check your Playfair matrix construction and digraph rules.'
        }
      } else {
        result = 'This is a conceptual challenge. Review the explanation and key concepts.'
      }

      if (result.includes('Correct!')) {
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      }

      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsProcessing(false)
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
            <div className="p-2 sm:p-3 bg-purple-500 rounded-lg self-start">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Cryptography Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Explore encryption, decryption, and cryptographic concepts</p>
            </div>
          </div>
          <Alert className="mb-6">
            <BookOpen className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Master cryptographic principles through interactive challenges. Learn about encryption algorithms, key management, and security best practices.
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
                    Select a cryptography challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {cryptoChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChallenge.id === challenge.id
                          ? 'bg-purple-50 border-purple-200'
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

              {/* Challenge Details and Crypto Tools */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="w-5 h-5" />
                        <span>{selectedChallenge.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                          {selectedChallenge.difficulty}
                        </Badge>
                        <span className="text-sm text-slate-600">{selectedChallenge.category}</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedChallenge.algorithm}
                        </Badge>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Encrypted/Ciphertext:</h4>
                      <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                        {selectedChallenge.encrypted}
                      </div>
                    </div>
                    {selectedChallenge.key && (
                      <div>
                        <h4 className="font-semibold mb-2">Key/Parameters:</h4>
                        <div className="bg-blue-900 text-blue-100 p-3 rounded-lg font-mono text-sm">
                          {selectedChallenge.key}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedChallenge.interactive && (
                    <div>
                      <h4 className="font-semibold mb-2">Your Answer:</h4>
                      <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your decrypted/plaintext answer..."
                        className="font-mono"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={processCrypto}
                      disabled={isProcessing || (selectedChallenge.interactive && !userInput.trim())}
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>{isProcessing ? 'Processing...' : selectedChallenge.interactive ? 'Check Answer' : 'Learn More'}</span>
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
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Plaintext:</strong> {selectedChallenge.plaintext}</p>
                        <p className="text-sm"><strong>Algorithm:</strong> {selectedChallenge.algorithm}</p>
                        {selectedChallenge.key && (
                          <p className="text-sm"><strong>Key:</strong> {selectedChallenge.key}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Results:</h4>
                    <div className="bg-slate-50 p-3 rounded-lg text-sm min-h-16">
                      {output || 'Process the challenge to see results...'}
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
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {completedChallenges.size}/{cryptoChallenges.length}
                    </div>
                    <p className="text-sm text-slate-600">Challenges Completed</p>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${(completedChallenges.size / cryptoChallenges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="w-5 h-5" />
                    <span>Topics Covered</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Classical Ciphers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Modern Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Hash Functions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Digital Signatures</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Key Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Transposition Ciphers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Key Exchange Protocols</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Public Key Infrastructure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Cryptographic Attacks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Quantum Cryptography</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Concepts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Symmetric vs Asymmetric encryption</p>
                    <p>• Public key infrastructure</p>
                    <p>• Cryptographic attacks</p>
                    <p>• Key exchange protocols</p>
                    <p>• Perfect forward secrecy</p>
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
