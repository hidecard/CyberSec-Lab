'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Award, Trophy, CheckCircle, Clock, User, BookOpen, Download } from 'lucide-react'
import ExamSelector from './ExamSelector'
import { getExamConfig } from '@/data/examQuestions'

interface LabProgress {
  labName: string
  completed: number
  total: number
  timeSpent: number // in minutes
}

const labs = [
  { name: 'ProgrammingBasicsLab', total: 10 },
  { name: 'LinuxBasicsLab', total: 15 },
  { name: 'NetworkingBasicsLab', total: 28 },
  { name: 'CryptographyLab', total: 20 },
  { name: 'XSSLab', total: 12 },
  { name: 'SQLInjectionLab', total: 8 },
  { name: 'APIRateLimitingBypassLab', total: 6 },
  { name: 'BrowserFingerprintingLab', total: 5 },
  { name: 'WebCachePoisoningLab', total: 7 },
  { name: 'FileUploadAttackLab', total: 9 },
  { name: 'JWTTokenTamperingLab', total: 8 },
  { name: 'CORSAttackLab', total: 6 },
  { name: 'CSRFAttackLab', total: 7 },
  { name: 'ClickjackingSimulator', total: 4 },
  { name: 'DOMAttackPlayground', total: 10 },
  { name: 'HTMLInjectionLab', total: 6 },
  { name: 'PhishingSimulation', total: 5 },
  { name: 'programming_exam', total: 1 },
  { name: 'linux_exam', total: 1 },
  { name: 'networking_exam', total: 1 },
  { name: 'cryptography_exam', total: 1 },
  { name: 'websecurity_exam', total: 1 },
]

export default function CertificateLab() {
  const [userName, setUserName] = useState('')
  const [labProgress, setLabProgress] = useState<LabProgress[]>([])
  const [totalProgress, setTotalProgress] = useState(0)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [certificateData, setCertificateData] = useState<any>(null)
  const [showExamCenter, setShowExamCenter] = useState(false)
  const [individualCertificates, setIndividualCertificates] = useState<Record<string, any>>({})

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = () => {
    const progress: LabProgress[] = labs.map(lab => {
      let completed = 0
      let timeSpent = 0

      if (lab.name.endsWith('_exam')) {
        // Handle exam progress
        const examCategory = lab.name.replace('_exam', '')
        const examData = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
        if (examData[examCategory] && examData[examCategory].passed) {
          completed = 1
          timeSpent = examData[examCategory].timeSpent || 0
        }
      } else {
        // Handle regular lab progress
        completed = parseInt(localStorage.getItem(`${lab.name}_completed`) || '0')
        timeSpent = parseInt(localStorage.getItem(`${lab.name}_timeSpent`) || '0')
      }

      return {
        labName: lab.name,
        completed,
        total: lab.total,
        timeSpent
      }
    })
    setLabProgress(progress)

    // Calculate progress excluding exams
    const labsOnly = progress.filter(lab => !lab.labName.endsWith('_exam'))
    const totalCompleted = labsOnly.reduce((sum, lab) => sum + lab.completed, 0)
    const totalChallenges = labsOnly.reduce((sum, lab) => sum + lab.total, 0)
    const progressPercent = totalChallenges > 0 ? (totalCompleted / totalChallenges) * 100 : 0
    setTotalProgress(progressPercent)

    // Load individual certificates
    const savedCertificates = JSON.parse(localStorage.getItem('individual_certificates') || '{}')
    setIndividualCertificates(savedCertificates)
  }

  const generateIndividualCertificate = (examCategory: string) => {
    // Prompt for name when generating certificate
    const name = prompt('Enter your full name for the certificate:')
    if (!name || !name.trim()) {
      alert('Name is required to generate certificate')
      return
    }

    const examData = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
    if (!examData[examCategory] || !examData[examCategory].passed) {
      alert('You need to pass this exam first to earn a certificate.')
      return
    }

    const config = getExamConfig(examCategory)
    const certificate = {
      name: name.trim(),
      examCategory,
      title: config.title,
      score: examData[examCategory].score,
      dateEarned: examData[examCategory].completedAt ? new Date(examData[examCategory].completedAt).toLocaleDateString() : new Date().toLocaleDateString(),
      timeSpent: examData[examCategory].timeSpent || 0
    }

    const updatedCertificates = { ...individualCertificates, [examCategory]: certificate }
    setIndividualCertificates(updatedCertificates)

    // Save individual certificates to localStorage
    localStorage.setItem('individual_certificates', JSON.stringify(updatedCertificates))
  }

  const generateCertificate = () => {
    if (!userName.trim()) {
      alert('Please enter your name')
      return
    }

    const examsPassedCount = labProgress.filter(lab => lab.labName.endsWith('_exam') && lab.completed > 0).length
    if (examsPassedCount < 5) {
      alert(`You need to pass all 5 certification exams to earn a certificate. You have passed ${examsPassedCount} exam${examsPassedCount === 1 ? '' : 's'}.`)
      return
    }

    const totalTime = labProgress.reduce((sum, lab) => sum + lab.timeSpent, 0)
    const certificate = {
      name: userName,
      completionPercentage: Math.round(totalProgress),
      totalChallenges: labProgress.reduce((sum, lab) => sum + lab.total, 0),
      completedChallenges: labProgress.reduce((sum, lab) => sum + lab.completed, 0),
      totalTimeSpent: totalTime,
      dateEarned: new Date().toLocaleDateString(),
      labsCompleted: labProgress.filter(lab => lab.completed > 0 && !lab.labName.endsWith('_exam')).length,
      examsPassed: examsPassedCount
    }

    setCertificateData(certificate)
    setCertificateGenerated(true)

    // Save certificate to localStorage
    localStorage.setItem('cybersecurity_certificate', JSON.stringify(certificate))
  }

  const loadExistingCertificate = () => {
    const saved = localStorage.getItem('cybersecurity_certificate')
    if (saved) {
      setCertificateData(JSON.parse(saved))
      setCertificateGenerated(true)
    }
  }

  useEffect(() => {
    loadExistingCertificate()
  }, [])

  const downloadCertificateImage = async (certificate: any, isIndividual: boolean) => {
    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 1000
    canvas.height = 700

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 1000, 700)

    // Add decorative border
    ctx.strokeStyle = '#1f2937' // gray-800
    ctx.lineWidth = 6
    ctx.strokeRect(30, 30, 940, 640)

    // Inner gold border
    ctx.strokeStyle = '#d4af37' // gold
    ctx.lineWidth = 3
    ctx.strokeRect(40, 40, 920, 620)

    // Corner decorations
    ctx.fillStyle = '#d4af37'
    // Top-left corner
    ctx.beginPath()
    ctx.arc(50, 50, 15, 0, Math.PI * 2)
    ctx.fill()
    // Top-right corner
    ctx.beginPath()
    ctx.arc(950, 50, 15, 0, Math.PI * 2)
    ctx.fill()
    // Bottom-left corner
    ctx.beginPath()
    ctx.arc(50, 650, 15, 0, Math.PI * 2)
    ctx.fill()
    // Bottom-right corner
    ctx.beginPath()
    ctx.arc(950, 650, 15, 0, Math.PI * 2)
    ctx.fill()

    // Add watermark
    ctx.fillStyle = 'rgba(212, 175, 55, 0.08)' // very light gold
    ctx.font = 'bold 100px serif'
    ctx.textAlign = 'center'
    ctx.save()
    ctx.translate(500, 350)
    ctx.rotate(-Math.PI / 8)
    ctx.fillText('CyberSec Lab', 0, 0)
    ctx.restore()

    // Add title
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 48px serif'
    ctx.textAlign = 'center'
    ctx.fillText('Certificate of Completion', 500, 120)

    ctx.font = '28px serif'
    ctx.fillText('Cybersecurity Training Program', 500, 160)

    // Add certificate content
    ctx.font = '24px serif'
    ctx.fillText('This certifies that', 500, 240)

    ctx.fillStyle = '#d4af37'
    ctx.font = 'bold 40px serif'
    ctx.fillText(certificate.name, 500, 290)

    ctx.fillStyle = '#1f2937'
    ctx.font = '24px serif'
    ctx.fillText('has successfully completed', 500, 340)

    if (isIndividual) {
      ctx.font = 'bold 32px serif'
      ctx.fillText(certificate.title, 500, 400)
      ctx.font = '22px serif'
      ctx.fillText(`Score: ${certificate.score}%`, 500, 450)
    } else {
      ctx.font = 'bold 32px serif'
      ctx.fillText('Certified Cybersecurity Professional', 500, 400)
      ctx.font = '20px serif'
      ctx.fillText(`${certificate.completedChallenges} out of ${certificate.totalChallenges} challenges completed`, 500, 450)
      ctx.fillText(`${certificate.labsCompleted} labs completed • ${certificate.examsPassed} exams passed`, 500, 480)
      ctx.fillText(`${certificate.totalTimeSpent} minutes total time`, 500, 510)
    }

    // Add signature lines
    ctx.strokeStyle = '#6b7280' // gray-500
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(200, 580)
    ctx.lineTo(400, 580)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(600, 580)
    ctx.lineTo(800, 580)
    ctx.stroke()

    // Signature labels - positioned over the lines
    ctx.fillStyle = '#1f2937' // dark gray
    ctx.font = 'italic 20px serif'
    ctx.textAlign = 'center'
    ctx.fillText('Arkar Yan', 300, 575)
    ctx.font = '16px serif'
    ctx.fillText('Director', 300, 595)

    ctx.fillText(certificate.dateEarned, 700, 575)
    ctx.fillText('Date', 700, 595)



    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = isIndividual ? `${certificate.title.replace(/\s+/g, '_')}_Certificate.png` : 'Cybersecurity_Certificate.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    }, 'image/png')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-yellow-500 rounded-lg self-start">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Certificate Lab</h1>
              <p className="text-sm sm:text-base text-slate-600">Earn certificates by completing cybersecurity challenges</p>
            </div>
          </div>
          <Alert className="mb-6">
            <Trophy className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Pass all 5 certification exams to earn your cybersecurity certificate. Track your exam progress and time spent.
            </AlertDescription>
          </Alert>
        </div>

        {!certificateGenerated ? (
          <div className="space-y-6">
            {/* Certificate Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Earn Your Certificate</span>
                </CardTitle>
                <CardDescription>
                  Enter your name to generate your certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={generateCertificate}
                    disabled={labProgress.filter(lab => lab.labName.endsWith('_exam') && lab.completed > 0).length < 5}
                    className="w-full"
                  >
                    Generate Certificate
                  </Button>
                  {labProgress.filter(lab => lab.labName.endsWith('_exam') && lab.completed > 0).length < 5 && (
                    <p className="text-sm text-slate-600 text-center">
                      Pass all 5 certification exams to unlock your certificate
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Individual Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Individual Certificates</span>
                </CardTitle>
                <CardDescription>
                  Earn certificates for each exam you pass
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['programming', 'linux', 'networking', 'cryptography', 'websecurity'].map((category) => {
                      const config = getExamConfig(category)
                      const examData = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
                      const passed = examData[category]?.passed
                      const hasCertificate = individualCertificates[category]

                      return (
                        <Card key={category} className="border-2 border-dashed">
                          <CardContent className="p-4">
                            <div className="text-center space-y-2">
                              <h4 className="font-semibold text-sm">{config.title}</h4>
                              {passed ? (
                                <div className="space-y-2">
                                  <Badge className="bg-green-500">Passed - {examData[category].score}%</Badge>
                                  {hasCertificate ? (
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline" onClick={() => {
                                        const cert = individualCertificates[category]
                                        alert(`Certificate for ${cert.title}\nName: ${cert.name}\nScore: ${cert.score}%\nDate: ${cert.dateEarned}`)
                                      }}>
                                        View Certificate
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => downloadCertificateImage(individualCertificates[category], true)}>
                                        <Download className="w-4 h-4 mr-1" />
                                        Download
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button size="sm" onClick={() => generateIndividualCertificate(category)}>
                                      Get Certificate
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                <Badge variant="outline">Not Passed</Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam Center */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Exam Center</span>
                </CardTitle>
                <CardDescription>
                  Take certification exams to test your cybersecurity knowledge
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Test your knowledge with our comprehensive cybersecurity certification exams.
                    Exams cover various topics including networking, cryptography, web security, and more.
                  </p>
                  <Button
                    onClick={() => setShowExamCenter(!showExamCenter)}
                    variant="outline"
                    className="w-full"
                  >
                    {showExamCenter ? 'Hide Exam Center' : 'Access Exam Center'}
                  </Button>
                  {showExamCenter && (
                    <div className="mt-4">
                      <ExamSelector onExamComplete={loadProgress} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Certificate Display */
          <Card className="border-4 border-yellow-400">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Award className="w-16 h-16 text-yellow-500" />
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Certificate of Completion</h2>
                  <p className="text-lg text-slate-600">Cybersecurity Training Program</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <p className="text-xl mb-4">This certifies that</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{certificateData.name}</p>
                  <p className="text-lg mb-4">has successfully completed</p>
                  <p className="text-xl font-semibold">Certified Cybersecurity Professional</p>
                  <p className="text-sm text-slate-600 mt-2">
                    {certificateData.completedChallenges} out of {certificateData.totalChallenges} challenges completed
                  </p>
                  <p className="text-sm text-slate-600">
                    {certificateData.labsCompleted} labs completed • {certificateData.examsPassed} exams passed • {certificateData.totalTimeSpent} minutes total time
                  </p>
                </div>

                <div className="flex justify-between items-center text-sm text-slate-500">
                  <div>
                    <p>Issued on: {certificateData.dateEarned}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verified Completion</span>
                  </div>
                </div>

                <Button onClick={() => window.print()} variant="outline">
                  Print Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
