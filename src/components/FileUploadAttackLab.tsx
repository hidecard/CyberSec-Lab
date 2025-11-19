'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Code } from '@/components/ui/code'
import { Package, Shield, AlertTriangle, Upload, FileText, Image } from 'lucide-react'

export default function FileUploadAttackLab() {
  const [activeTab, setActiveTab] = useState('demo')
  const [validationMode, setValidationMode] = useState<'none' | 'basic' | 'strict'>('none')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadResult, setUploadResult] = useState('')
  const [filePreview, setFilePreview] = useState<string>('')
  const [maliciousAttempts, setMaliciousAttempts] = useState<Array<{file: string, result: string}>>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadResult('')
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => setFilePreview(e.target?.result as string)
        reader.readAsDataURL(file)
      } else {
        setFilePreview('')
      }
    }
  }

  const simulateUpload = () => {
    if (!selectedFile) {
      setUploadResult('❌ No file selected')
      return
    }

    const fileName = selectedFile.name.toLowerCase()
    const fileType = selectedFile.type
    const fileSize = selectedFile.size

    let result = ''
    let isBlocked = false

    switch (validationMode) {
      case 'none':
        // No validation - everything passes
        result = `🚨 UPLOADED: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)`
        if (fileName.includes('.php') || fileName.includes('.exe') || fileName.includes('.js')) {
          result += ' - ⚠️ Malicious file uploaded!'
        }
        break

      case 'basic':
        // Basic extension check
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
        const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext))
        
        if (!hasAllowedExtension) {
          result = `❌ BLOCKED: ${fileName} - File type not allowed`
          isBlocked = true
        } else if (fileSize > 5 * 1024 * 1024) { // 5MB limit
          result = `❌ BLOCKED: ${fileName} - File too large`
          isBlocked = true
        } else {
          result = `✅ UPLOADED: ${fileName} - Basic validation passed`
          // Check for double extension bypass
          if (fileName.includes('.php.jpg') || fileName.includes('.exe.png')) {
            result += ' - ⚠️ Possible bypass attempt!'
          }
        }
        break

      case 'strict':
        // Strict validation with MIME type check
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
        const strictAllowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
        
        const hasValidExtension = strictAllowedExtensions.some(ext => fileName.endsWith(ext))
        const hasValidType = allowedTypes.includes(fileType)
        const hasValidSize = fileSize <= 5 * 1024 * 1024
        
        if (!hasValidExtension || !hasValidType || !hasValidSize) {
          result = `❌ BLOCKED: ${fileName} - Strict validation failed`
          isBlocked = true
          
          if (!hasValidType) {
            result += ` (MIME type: ${fileType})`
          }
        } else {
          result = `✅ UPLOADED: ${fileName} - All validations passed`
        }
        break
    }

    setUploadResult(result)
    setMaliciousAttempts(prev => [{file: fileName, result}, ...prev.slice(0, 4)])
  }

  const maliciousFiles = [
    { name: 'malware.php', type: 'application/x-php', description: 'PHP web shell' },
    { name: 'virus.exe', type: 'application/x-executable', description: 'Windows executable' },
    { name: 'script.js', type: 'application/javascript', description: 'JavaScript malware' },
    { name: 'backdoor.php.jpg', type: 'image/jpeg', description: 'Double extension bypass' },
    { name: 'shell.png', type: 'image/png', description: 'PNG with embedded PHP' }
  ]

  const bypassTechniques = [
    {
      name: 'Double Extension',
      description: 'file.php.jpg',
      code: 'shell.php.jpg - Basic extension check sees .jpg',
      risk: 'High'
    },
    {
      name: 'Null Byte Injection',
      description: 'file.php%00.jpg',
      code: 'malware.php%00.jpg - Null byte truncates path',
      risk: 'High'
    },
    {
      name: 'MIME Type Spoofing',
      description: 'Fake content type',
      code: 'Content-Type: image/jpeg (actually PHP)',
      risk: 'Medium'
    },
    {
      name: 'Case Manipulation',
      description: 'Uppercase extensions',
      code: 'malware.PHP - Bypass case-sensitive checks',
      risk: 'Medium'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-amber-500 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">File Upload Attack Lab</h1>
              <p className="text-slate-600">Learn how attackers bypass file upload restrictions and upload malicious executables</p>
            </div>
          </div>
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              File upload vulnerabilities can lead to remote code execution, data theft, and complete system compromise.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 h-auto">
            <TabsTrigger value="demo" className="text-xs sm:text-sm">Upload Simulator</TabsTrigger>
            <TabsTrigger value="bypass" className="text-xs sm:text-sm">Bypass Techniques</TabsTrigger>
            <TabsTrigger value="defenses" className="text-xs sm:text-sm">Defense Strategies</TabsTrigger>
          </TabsList>

          {/* Upload Simulator Tab */}
          <TabsContent value="demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>File Upload Interface</span>
                  </CardTitle>
                  <CardDescription>
                    Simulate file upload with different validation levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Validation Mode */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Validation Mode:</label>
                    <div className="space-y-1">
                      {[
                        { mode: 'none', name: 'No Validation', color: 'destructive' },
                        { mode: 'basic', name: 'Basic Validation', color: 'default' },
                        { mode: 'strict', name: 'Strict Validation', color: 'default' }
                      ].map(({ mode, name, color }) => (
                        <Button
                          key={mode}
                          variant={validationMode === mode ? color as any : "outline"}
                          size="sm"
                          onClick={() => setValidationMode(mode as any)}
                          className="w-full justify-start"
                        >
                          {validationMode === mode && <Shield className="w-4 h-4 mr-2" />}
                          {name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select File:</label>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="w-full p-2 border border-slate-300 rounded text-sm"
                    />
                  </div>

                  {/* File Info */}
                  {selectedFile && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-300">
                      <h4 className="font-semibold text-sm mb-2">File Information:</h4>
                      <div className="text-xs space-y-1">
                        <p><strong>Name:</strong> {selectedFile.name}</p>
                        <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                        <p><strong>Type:</strong> {selectedFile.type}</p>
                        <p><strong>Last Modified:</strong> {new Date(selectedFile.lastModified).toLocaleString()}</p>
                      </div>
                    </div>
                  )}

                  {/* File Preview */}
                  {filePreview && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preview:</label>
                      <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <img src={filePreview} alt="Preview" className="w-full h-32 object-cover" />
                      </div>
                    </div>
                  )}

                  <Button onClick={simulateUpload} className="w-full">
                    📤 Upload File
                  </Button>

                  {/* Upload Result */}
                  {uploadResult && (
                    <Alert className={uploadResult.includes('🚨') ? 'border-red-200 bg-red-50' : 
                                     uploadResult.includes('❌') ? 'border-amber-200 bg-amber-50' : 
                                     'border-green-200 bg-green-50'}>
                      <AlertDescription className={uploadResult.includes('🚨') ? 'text-red-800' : 
                                                     uploadResult.includes('❌') ? 'text-amber-800' : 
                                                     'text-green-800'}>
                        {uploadResult}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Malicious Files Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Test Malicious Files</span>
                  </CardTitle>
                  <CardDescription>
                    Common malicious files used in attacks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {maliciousFiles.map((file, index) => (
                      <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-sm text-red-900">{file.name}</h4>
                            <p className="text-xs text-red-700">{file.description}</p>
                            <p className="text-xs text-red-600">Type: {file.type}</p>
                          </div>
                          <Badge variant="destructive" className="text-xs">
                            Malicious
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Upload History */}
                  {maliciousAttempts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Upload Attempts:</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {maliciousAttempts.map((attempt, index) => (
                          <div key={index} className="text-xs p-2 bg-slate-50 rounded border border-slate-200">
                            <div className="font-medium">{attempt.file}</div>
                            <div className={attempt.result.includes('🚨') ? 'text-red-600' : 
                                          attempt.result.includes('❌') ? 'text-amber-600' : 
                                          'text-green-600'}>
                              {attempt.result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Attack Flow */}
            <Card>
              <CardHeader>
                <CardTitle>🔄 File Upload Attack Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">1. File Selection</h4>
                    <p className="text-sm text-slate-700">
                      Attacker chooses malicious file
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold">2. Bypass Validation</h4>
                    <p className="text-sm text-slate-700">
                      Uses techniques to bypass checks
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-red-600" />
                    </div>
                    <h4 className="font-semibold">3. Upload Success</h4>
                    <p className="text-sm text-slate-700">
                      Malicious file stored on server
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">4. Access File</h4>
                    <p className="text-sm text-slate-700">
                      Attacker accesses uploaded file
                    </p>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">5. Execute</h4>
                    <p className="text-sm text-slate-700">
                      Remote code execution achieved
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bypass Techniques Tab */}
          <TabsContent value="bypass" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bypassTechniques.map((technique, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{technique.name}</span>
                      <Badge variant={technique.risk === 'High' ? 'destructive' : 'default'}>
                        {technique.risk}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{technique.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Example:</h4>
                        <Code className="block p-2 bg-slate-50 rounded text-xs">
                          {technique.code}
                        </Code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">How it works:</h4>
                        <p className="text-sm text-slate-700">
                          {technique.name === 'Double Extension' && 
                            'Basic validation only checks the last extension, allowing malicious code to execute.'}
                          {technique.name === 'Null Byte Injection' && 
                            'Null bytes (%00) terminate string processing in some languages, hiding the real extension.'}
                          {technique.name === 'MIME Type Spoofing' && 
                            'Attackers set fake Content-Type headers to bypass MIME validation.'}
                          {technique.name === 'Case Manipulation' && 
                            'Case-sensitive validation can be bypassed by changing extension case.'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Advanced Bypass Examples */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Advanced Bypass Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Polyglot Files</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// File that's valid as both image and script
GIF89a<?php
  system($_GET['cmd']);
?>`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Files that are valid in multiple formats to bypass validation
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Race Conditions</h4>
                    <Code className="block p-2 bg-slate-50 rounded text-xs">
{`// Upload and execute before validation completes
1. Upload shell.php
2. Access shell.php before server scans it
3. Server deletes file after scan, but too late`}
                    </Code>
                    <p className="text-sm text-slate-700">
                      Exploit timing gaps between upload and validation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense Strategies Tab */}
          <TabsContent value="defenses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Server-Side Validation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Node.js with multer
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const filterAllowedExtensions = ['.jpg', '.jpeg', '.png'];
  
  const ext = path.extname(file.name).toLowerCase();
  const hasValidType = allowedTypes.includes(file.mimetype);
  const hasValidExt = filterAllowedExtensions.includes(ext);
  
  cb(null, hasValidType && hasValidExt);
};

const upload = multer({
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});`}
                  </Code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>File Content Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Code className="block p-3 bg-green-50 border border-green-200 rounded text-sm">
{`// Verify actual file content
const fileSignature = require('file-signature');

function validateImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const signature = fileSignature(buffer);
  
  const imageSignatures = {
    'image/jpeg': ['FF D8 FF'],
    'image/png': ['89 50 4E 47'],
    'image/gif': ['47 49 46 38']
  };
  
  return imageSignatures[signature.mime]?.includes(
    signature.hex
  );
}`}
                  </Code>
                </CardContent>
              </Card>
            </div>

            {/* Complete Defense Strategy */}
            <Card>
              <CardHeader>
                <CardTitle>🛡️ Complete Defense Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">1. Multi-Layer Validation</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• File extension allowlist</li>
                      <li>• MIME type verification</li>
                      <li>• File signature/magic number validation</li>
                      <li>• File size limits</li>
                      <li>• Filename sanitization</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">2. Secure Storage</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Store uploads outside web root</li>
                      <li>• Generate random filenames</li>
                      <li>• Set proper file permissions</li>
                      <li>• Use content delivery networks</li>
                      <li>• Implement virus scanning</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">3. Access Control</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Authentication for uploads</li>
                      <li>• Rate limiting</li>
                      <li>• User quota limits</li>
                      <li>• Temporary file cleanup</li>
                      <li>• Audit logging</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>✅ Security Testing Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Test Cases</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Upload executable files</li>
                      <li>□ Test double extensions</li>
                      <li>□ Try null byte injection</li>
                      <li>□ Test MIME type spoofing</li>
                      <li>□ Attempt oversized files</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Verification</h4>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>□ Check file content matches type</li>
                      <li>□ Verify files stored securely</li>
                      <li>□ Test access controls</li>
                      <li>□ Monitor upload logs</li>
                      <li>□ Test cleanup processes</li>
                    </ul>
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