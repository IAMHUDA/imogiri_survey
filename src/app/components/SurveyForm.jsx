import React, { useState } from 'react';
import { useSurvey } from '../../hooks/useSurveys';
import { useSubmitJawaban } from '../../hooks/useResults';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

/**
 * SurveyForm Component
 * Displays survey questions and handles submission
 */
export default function SurveyForm({ surveyId, onClose }) {
  const [answers, setAnswers] = useState({});

  // Fetch survey with questions using survey detail endpoint
  const { data: survey, isLoading: loadingQuestions } = useSurvey(surveyId);
  const submitMutation = useSubmitJawaban();
  
  // Get questions from survey data
  const questions = survey?.pertanyaan || [];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all questions answered
    const unansweredQuestions = questions?.filter(q => !answers[q.id]);
    if (unansweredQuestions && unansweredQuestions.length > 0) {
      alert('Mohon jawab semua pertanyaan');
      return;
    }

    // Prepare submission data with pertanyaanId format
    const submissionData = {
      surveyId: surveyId,
      jawaban: Object.entries(answers).map(([pertanyaanId, jawaban]) => ({
        pertanyaanId: parseInt(pertanyaanId),
        jawaban: jawaban
      }))
    };

    try {
      await submitMutation.mutateAsync(submissionData);
      // Success handled by mutation
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  if (loadingQuestions) {
    return (
      <div className="text-center py-12">
        <Loader className="w-12 h-12 text-[#17307a] animate-spin mx-auto" />
        <p className="mt-4 text-gray-600">Memuat pertanyaan survey...</p>
      </div>
    );
  }

  if (submitMutation.isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#17307a] mb-2">Terima Kasih!</h3>
        <p className="text-gray-600 mb-6">Jawaban Anda telah berhasil dikirim.</p>
        <button
          onClick={onClose}
          className="bg-[#17307a] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1f2a78] transition"
        >
          Tutup
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Survey Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#17307a] mb-2">
          {survey?.namaSurvey || 'Survey UMKM'}
        </h2>
        <p className="text-gray-600">
          {survey?.deskripsi || 'Mohon isi survey berikut dengan jujur dan lengkap.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Questions */}
        <div className="space-y-6">
          {questions?.map((question, index) => (
            <div key={question.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="mb-4">
                <span className="inline-block bg-[#17307a] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  Pertanyaan {index + 1}
                </span>
                <h4 className="text-lg font-bold text-gray-800">
                  {question.teks} <span className="text-red-500">*</span>
                </h4>
              </div>

              {/* Text Input */}
              {question.tipe === 'text' && (
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#17307a] focus:ring-2 focus:ring-[#17307a]/20 outline-none transition"
                  placeholder="Ketik jawaban Anda..."
                />
              )}

              {/* Textarea */}
              {question.tipe === 'textarea' && (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#17307a] focus:ring-2 focus:ring-[#17307a]/20 outline-none transition resize-none"
                  placeholder="Ketik jawaban Anda..."
                />
              )}

              {/* Multiple Choice */}
              {question.tipe === 'multiple-choice' && question.opsi && (
                <div className="space-y-3">
                  {question.opsi.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-[#f6f9ff] cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        required
                        className="w-5 h-5 text-[#17307a] focus:ring-[#17307a]"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Rating */}
              {question.tipe === 'rating' && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleAnswerChange(question.id, rating.toString())}
                      className={`
                        w-12 h-12 rounded-full font-bold transition-all
                        ${answers[question.id] === rating.toString()
                          ? 'bg-[#17307a] text-white scale-110'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }
                      `}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {submitMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold">Gagal mengirim jawaban</p>
              <p className="text-red-600 text-sm mt-1">
                {submitMutation.error?.message || 'Terjadi kesalahan, silakan coba lagi'}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full font-bold text-gray-600 hover:bg-gray-100 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="
              bg-gradient-to-r from-[#3b4bc6] to-[#1f2a78]
              text-white
              px-8 py-3
              rounded-full
              font-bold
              hover:shadow-lg
              transition-all
              transform hover:scale-105
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:transform-none
              flex items-center gap-2
            "
          >
            {submitMutation.isPending ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Mengirim...
              </>
            ) : (
              'Kirim Jawaban'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
