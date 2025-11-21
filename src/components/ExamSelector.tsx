'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Target, Award } from 'lucide-react'
import ExamLab from './ExamLab'
import { examQuestions, getExamConfig } from '@/data/examQuestions'

export default function ExamSelector({ onExamComplete }: { onExamComplete?: () => void }) {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [examResults, setExamResults] = useState<Record<string, { score: number; passed: boolean; timeSpent: number }>>({})

  const examCategories = [
    { id: 'programming', name: 'Programming Basics', icon: '💻' },
    { id: 'linux', name: 'Linux Basics', icon: '🐧' },
    { id: 'networking', name: 'Networking Basics', icon: '🌐' },
    { id: 'cryptography', name: 'Cryptography', icon: '🔐' },
    { id: 'websecurity', name: 'Web Security', icon: '🛡️' }
  ]

  const handleStartExam = (categoryId: string) => {
    setSelectedExam(categoryId)
  }

  // Load existing exam results on component mount
  useEffect(() => {
    const examData = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
    setExamResults(examData)
  }, [])

  const handleExamComplete = (score: number, passed: boolean) => {
    // Handle exam completion
    const examData = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
    const timeSpent = examData[selectedExam!]?.timeSpent || 0

    setExamResults(prev => ({
      ...prev,
      [selectedExam!]: { score, passed, timeSpent }
    }))

    console.log(`Exam completed: ${score}% - ${passed ? 'Passed' : 'Failed'}`)
    setSelectedExam(null)

    // Notify parent component to refresh progress
    if (onExamComplete) {
      onExamComplete()
    }
  }

  if (selectedExam) {
    const config = getExamConfig(selectedExam)
    const questions = examQuestions[selectedExam] || []

    return (
      <ExamLab
        category={selectedExam}
        title={config.title}
        description={config.description}
        questions={questions}
        timeLimit={config.timeLimit}
        passingScore={config.passingScore}
        onComplete={handleExamComplete}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="p-2 sm:p-3 bg-blue-500 rounded-lg self-start">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Exam Center</h1>
              <p className="text-sm sm:text-base text-slate-600">Test your cybersecurity knowledge with certification exams</p>
            </div>
          </div>
        </div>

        {/* Exam Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examCategories.map((category) => {
            const config = getExamConfig(category.id)
            const questions = examQuestions[category.id] || []

            return (
              <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 hover:border-blue-200/50 bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{category.icon}</div>
                    <Badge variant="outline" className="text-xs">
                      {questions.length} Questions
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-slate-600">
                    {config.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span>{config.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-slate-500" />
                        <span>{config.passingScore}% to pass</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      {examResults[category.id] ? (
                        <span className={examResults[category.id].passed ? 'text-green-600' : 'text-red-600'}>
                          {examResults[category.id].passed ? 'Passed' : 'Failed'} - Score: {examResults[category.id].score}%
                        </span>
                      ) : (
                        <span className="text-slate-500">Not Taken</span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleStartExam(category.id)}
                    className="w-full group-hover:shadow-md transition-all duration-300"
                    size="sm"
                  >
                    <span className="flex items-center justify-center">
                      <Award className="w-4 h-4 mr-2" />
                      Start Exam
                    </span>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>



        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Exam Instructions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Before Starting:</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Find a quiet environment free from distractions</li>
                  <li>• Have a pen and paper ready for notes if needed</li>
                  <li>• Close unnecessary browser tabs and applications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">During the Exam:</h4>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• You cannot go back to previous questions</li>
                  <li>• The timer cannot be paused once started</li>
                  <li>• Results are saved automatically upon completion</li>
                  <li>• You can retake exams as many times as needed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
