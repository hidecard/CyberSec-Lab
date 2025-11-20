'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Award, Trophy, CheckCircle, Clock, User, BookOpen } from 'lucide-react'
import ExamSelector from './ExamSelector'

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
                      <ExamSelector />
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
