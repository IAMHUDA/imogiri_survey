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
  const rawQuestions = survey?.pertanyaan || [];
  
  // Sort questions to prioritize Profile section
  const questions = React.useMemo(() => {
    const profileKeywords = ['jenis kelamin', 'usia', 'pendidikan', 'pekerjaan', 'jenis layanan'];
    
    return [...rawQuestions].sort((a, b) => {
      const textA = (a.teks || a.text || '').toLowerCase();
      const textB = (b.teks || b.text || '').toLowerCase();
      
      const indexA = profileKeywords.findIndex(k => textA.includes(k));
      const indexB = profileKeywords.findIndex(k => textB.includes(k));
      
      // If both are profile questions, sort by predefined order
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      
      // If A is profile and B is not, A comes first
      if (indexA !== -1) return -1;
      
      // If B is profile and A is not, B comes first
      if (indexB !== -1) return 1;
      
      // Otherwise keep original order (or sort by ID/Sequence if needed)
      return (a.id || 0) - (b.id || 0);
    });
  }, [rawQuestions]);

  const isProfileQuestion = (text) => {
    const t = (text || '').toLowerCase();
    return ['jenis kelamin', 'usia', 'pendidikan', 'pekerjaan', 'jenis layanan'].some(k => t.includes(k));
  };

  // Check if we have any profile questions to show the header
  const hasProfileQuestions = questions.some(q => isProfileQuestion(q.teks || q.text));

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
    <div className="max-w-4xl mx-auto">
      {/* Survey Header */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-[#17307a] mb-2">
          {survey?.namaSurvey || 'Survey UMKM'}
        </h2>
        <p className="text-gray-600">
          {survey?.deskripsi || 'Mohon isi survey berikut dengan jujur dan lengkap.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Questions */}
        <div className="space-y-6">
          {hasProfileQuestions && (
            <div className="pb-2 border-b-2 border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider text-center underline decoration-2 decoration-[#17307a] underline-offset-4">
                PROFIL
              </h3>
            </div>
          )}

          {questions?.map((question, index) => {
            // Helper to determine question type
            const getQuestionType = (q) => {
              const val = (q.tipe || q.type || q.jenis || '').toString().toLowerCase();
              if (['text', 'string', 'short_text', 'isian', 'jawaban_singkat'].includes(val)) return 'text';
              if (['textarea', 'long_text', 'paragraph', 'uraian', 'jawaban_panjang'].includes(val)) return 'textarea';
              if (['multiple-choice', 'multiple_choice', 'radio', 'choice', 'pilihan_ganda', 'pilgan'].includes(val)) return 'multiple-choice';
              if (['rating', 'scale', 'skala'].includes(val)) return 'rating';
              return val;
            };

            const qType = getQuestionType(question);
            const options = question.opsi || question.options || [];
            const isProfile = isProfileQuestion(question.teks || question.text);
            const questionText = (question.teks || question.text || question.question).toLowerCase();

            // Determine if we should split sections (e.g., after the last profile question)
            // Ideally we just render plainly, but if you wanted a separator:
            const isFirstNonProfile = !isProfile && index > 0 && isProfileQuestion(questions[index-1].teks || questions[index-1].text);

            return (
              <React.Fragment key={question.id || index}>
                {isFirstNonProfile && (
                   <div className="pt-8 pb-2 border-b-2 border-gray-200 mb-6 mt-8">
                    <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wider text-center underline decoration-2 decoration-[#17307a] underline-offset-4">
                      PERTANYAAN SURVEY
                    </h3>
                  </div>
                )}

                <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${isProfile ? 'border-l-4 border-l-[#17307a]' : ''}`}>
                  <div className={`mb-4 ${isProfile ? 'flex flex-col md:flex-row md:items-center md:gap-4' : ''}`}>
                    {!isProfile && (
                      <span className="inline-block bg-[#17307a] text-white text-xs font-bold px-3 py-1 rounded-full mb-2 w-fit">
                        Pertanyaan {index + 1}
                      </span>
                    )}
                    <h4 className="text-lg font-bold text-gray-800 flex-1">
                      {question.teks || question.text || question.question} <span className="text-red-500">*</span>
                       {/* Special Age Handling UI hint */}
                       {questionText.includes('usia') && <span className="text-sm font-normal text-gray-500 ml-2">(Tahun)</span>}
                    </h4>
                  </div>

                  {/* Text Input */}
                  {qType === 'text' && (
                    <input
                      type="text"
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      required
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#17307a] focus:ring-2 focus:ring-[#17307a]/20 outline-none transition ${questionText.includes('usia') ? 'w-full md:w-32' : ''}`}
                      placeholder={questionText.includes('usia') ? 'Contoh: 25' : 'Ketik jawaban Anda...'}
                    />
                  )}

                  {/* Textarea */}
                  {qType === 'textarea' && (
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
                  {qType === 'multiple-choice' && options.length > 0 && (
                    <div className={`
                      gap-3
                      ${isProfile && (questionText.includes('jenis kelamin') || questionText.includes('pendidikan') || questionText.includes('pekerjaan') || options.length <= 5)
                        ? 'flex flex-wrap flex-row' 
                        : 'space-y-3 flex flex-col'}
                    `}>
                      {options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className={`
                            flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-[#f6f9ff] cursor-pointer transition
                            ${isProfile ? 'bg-gray-50' : ''}
                          `}
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
                          <span className="text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {qType === 'multiple-choice' && options.length === 0 && (
                     <div className="text-orange-500 text-sm italic">
                       Error: Tipe pilihan ganda tetapi tidak ada opsi yang tersedia. (Check `opsi` or `options`)
                     </div>
                  )}

                  {/* Rating */}
                  {qType === 'rating' && (
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleAnswerChange(question.id, rating.toString())}
                          className={`
                            w-12 h-12 rounded-full font-bold transition-all shadow-sm
                            ${answers[question.id] === rating.toString()
                              ? 'bg-[#17307a] text-white scale-110 ring-4 ring-[#17307a]/20'
                              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }
                          `}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fallback for unknown types */}
                  {!['text', 'textarea', 'multiple-choice', 'rating'].includes(qType) && (
                    <div className="bg-red-50 text-red-600 p-3 rounded border border-red-200">
                      <p className="font-bold">Error Rendering Input</p>
                      <p className="text-sm">Unknown question type: <code>{qType || 'undefined'}</code></p>
                      <p className="text-xs text-gray-500 mt-1">Raw object: {JSON.stringify(question)}</p>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
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
