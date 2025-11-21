'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { Clock, Trophy, CheckCircle, XCircle, BookOpen, Target, AlertTriangle, Award } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface ExamProps {
  category: string
  title: string
  description: string
  questions: Question[]
  timeLimit: number // in minutes
  passingScore: number // percentage
  onComplete: (score: number, passed: boolean) => void
}

export default function ExamLab({ category, title, description, questions, timeLimit, passingScore, onComplete }: ExamProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60) // convert to seconds
  const [examStarted, setExamStarted] = useState(false)
  const [examCompleted, setExamCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const questionsPerPage = 5

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (examStarted && !examCompleted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && examStarted && !examCompleted) {
      handleSubmitExam()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, examStarted, examCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartExam = () => {
    setExamStarted(true)
    setTimeLeft(timeLimit * 60)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[questionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }



  const handleSubmitExam = () => {
    // Calculate score
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    const examPassed = finalScore >= passingScore

    setScore(finalScore)
    setPassed(examPassed)
    setExamCompleted(true)
    setShowResults(true)

    // Save to localStorage
    const examResult = {
      category,
      score: finalScore,
      passed: examPassed,
      completedAt: new Date().toISOString(),
      timeSpent: timeLimit * 60 - timeLeft
    }

    const savedExams = JSON.parse(localStorage.getItem('cybersecurity_exams') || '{}')
    savedExams[category] = examResult
    localStorage.setItem('cybersecurity_exams', JSON.stringify(savedExams))

    onComplete(finalScore, examPassed)
  }

  const handleRetakeExam = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(questions.length).fill(-1))
    setTimeLeft(timeLimit * 60)
    setExamStarted(false)
    setExamCompleted(false)
    setShowResults(false)
    setScore(0)
    setPassed(false)
    setCurrentPage(1)
  }

  if (!examStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">{title} Exam</CardTitle>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Target className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
              <div className="text-sm text-slate-600">Questions</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-green-600">{timeLimit}</div>
              <div className="text-sm text-slate-600">Minutes</div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Exam Rules:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• You have {timeLimit} minutes to complete the exam</li>
                <li>• Passing score: {passingScore}% or higher</li>
                <li>• You can navigate between questions</li>
                <li>• Submit when ready or when time expires</li>
                <li>• Results will be saved to your certificate</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button onClick={handleStartExam} className="w-full text-lg py-3">
            Start Exam
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="p-3 bg-green-500 rounded-full">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="p-3 bg-red-500 rounded-full">
                <XCircle className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl">
            {passed ? 'Exam Passed!' : 'Exam Failed'}
          </CardTitle>
          <CardDescription className="text-lg">
            {title} Certification Exam Results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2" style={{ color: passed ? '#10b981' : '#ef4444' }}>
              {score}%
            </div>
            <div className="text-sm text-slate-600">
              {score >= passingScore ? 'Passing Score' : 'Below Passing Score'}
            </div>
            <Progress value={score} className="mt-4" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-xl font-bold text-green-600">
                {questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length}
              </div>
              <div className="text-sm text-slate-600">Correct</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <div className="text-xl font-bold text-red-600">
                {questions.filter((q, i) => selectedAnswers[i] !== q.correctAnswer).length}
              </div>
              <div className="text-sm text-slate-600">Incorrect</div>
            </div>
          </div>

          {passed && (
            <Alert className="border-green-200 bg-green-50">
              <Award className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Congratulations! You have successfully passed the {title} exam and earned certification in this area.
              </AlertDescription>
            </Alert>
          )}



          <div className="flex gap-3">
            <Button onClick={handleRetakeExam} variant="outline" className="flex-1">
              Retake Exam
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1">
              Back to Lab
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with timer */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{title} Exam</h2>
              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages} ({questions.length} questions total)
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-lg font-mono">
                <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500' : 'text-slate-500'}`} />
                <span className={timeLeft < 300 ? 'text-red-600 font-bold' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <p className="text-xs text-slate-600">Time Remaining</p>
            </div>
          </div>
          <Progress value={(currentQuestion + 1) / questions.length * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Questions for Current Page */}
      <div className="space-y-6">
        {currentQuestions.map((question, index) => {
          const globalIndex = startIndex + index
          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {globalIndex + 1}
                </CardTitle>
                <Badge className="w-fit">{question.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base font-medium">{question.question}</p>

                <RadioGroup
                  value={selectedAnswers[globalIndex]?.toString() || ""}
                  onValueChange={(value) => handleAnswerSelect(globalIndex, parseInt(value))}
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={optionIndex.toString()} id={`option-${globalIndex}-${optionIndex}`} />
                      <Label htmlFor={`option-${globalIndex}-${optionIndex}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination Navigation */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous Page
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-full text-xs font-medium ${
                      page === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            {currentPage === totalPages ? (
              <Button
                onClick={handleSubmitExam}
                disabled={selectedAnswers.some(answer => answer === -1)}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Exam
              </Button>
            ) : (
              <Button onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
