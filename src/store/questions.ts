import { create } from 'zustand';
import { type Question } from 'types';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware';

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void,
    goPreviouwsQuestion: () => void,
    reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()
            // Shuffle the questions and get the first `limit` questions
            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({ questions })
        },
        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex(question => question.id === questionId);
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
            if (isCorrectUserAnswer) confetti();
            newQuestions[questionIndex] = {
                ...questionInfo,
                userSelectedAnswer: answerIndex,
                isCorrectUserAnswer: isCorrectUserAnswer
            }

            set({ questions: newQuestions });
        },
        goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            if (currentQuestion === questions.length - 1) return;
            set({ currentQuestion: currentQuestion + 1 });
        },
        goPreviouwsQuestion: () => {
            const { currentQuestion } = get();
            if (currentQuestion === 0) return;
            set({ currentQuestion: currentQuestion - 1 });
        },
        reset: () => {
            set({
                questions: [],
                currentQuestion: 0
            });
        },

    }
}, { name: 'questions-storage' }))
