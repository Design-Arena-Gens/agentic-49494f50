"use client";

import { useState } from "react";
import { questions } from "./data/questions";
import { getPersonalityType } from "./utils/scoring";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const personalityResult = getPersonalityType(newAnswers);
      setResult(personalityResult);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              {result.type}
            </h1>
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">
              {result.name}
            </h2>
            <p className="text-gray-600 italic">{result.tagline}</p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Key Traits
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {result.traits.map((trait: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-purple-50 rounded-lg p-3 text-gray-700"
                  >
                    • {trait}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Strengths
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength: string, idx: number) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Growth Areas
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness: string, idx: number) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <span className="text-orange-500 mr-2">→</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <button
                onClick={handleRestart}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
              {questions[currentQuestion].text}
            </h1>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(-1)}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-5 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all duration-200 text-lg"
            >
              Disagree
            </button>
            <button
              onClick={() => handleAnswer(1)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg text-lg"
            >
              Agree
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Takes approximately 2 minutes • {questions.length} questions
        </p>
      </div>
    </div>
  );
}
