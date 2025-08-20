import axios from 'axios';

export const shuffleArray = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export type Question = {
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  question: string;
  type: string;
  answers: string[]; // now required
};

export const getQuestions = async (): Promise<Question[]> => {
  const endpoint = 'https://opentdb.com/api.php?amount=10&category=9';
  const response = await axios.get(endpoint);

  return response.data.results.map((q: Omit<Question, 'answers'>) => ({
    ...q,
    answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
  }));
};

// import axios from 'axios';

// export const _ = (array: any[]) => [...array].sort(() => Math.random() - 0.7);

// export type Question = {
//   category: string;
//   incorrect_answers: string[];
//   correct_answer: string;
//   difficulty: string;
//   question: string;
//   type: string;
// };
// export const getquestiojns = async () => {
//   const endpoint = 'https://opentdb.com/api.php?amount=10&category=9';
//   const promise = await axios.get(endpoint);
//   return promise.data.results.map((question: Question) => ({
//     ...question,
//     answers: _([...question.incorrect_answers, question.correct_answer]),
//   }));
// };
