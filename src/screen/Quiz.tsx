import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Answers from '../components/Answers';
import { Icon } from 'react-native-elements';
import Questions from '../components/Questions';
import { Question, getQuestions } from '../utils/api';
import Dashboard from '../components/Dashboard';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctanswer: string;
};

const Quiz: FC = () => {
  const [loader, setloader] = useState(false);
  const [questions, setquestions] = useState<Question[]>([]);
  const [useranswers, setuseranswers] = useState<AnswerObject[]>([]);
  const [score, setscore] = useState(0);
  const [gameover, setgameover] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = async () => {
    setloader(true);
    setgameover(false);
    setQuizCompleted(false);
    const newquestions = await getQuestions();
    setquestions(newquestions);
    setscore(0);
    setuseranswers([]);
    setloader(false);
  };

  const checkanswer = (qIndex: number, answer: string) => {
    if (!gameover && !useranswers[qIndex]) {
      const correct = questions[qIndex].correct_answer === answer;
      if (correct) setscore(prev => prev + 1);

      const answerobject: AnswerObject = {
        question: questions[qIndex].question,
        answer,
        correct,
        correctanswer: questions[qIndex].correct_answer,
      };

      setuseranswers(prev => {
        const updated = [...prev];
        updated[qIndex] = answerobject;
        if (updated.filter(Boolean).length === questions.length) {
          setQuizCompleted(true);
        }
        return updated;
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {quizCompleted ? (
        <Dashboard
          score={score}
          userAnswers={useranswers}
          restartQuiz={startQuiz}
          totalQuestions={questions.length}
        />
      ) : !loader ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.header}>
            <Text style={styles.textstyle}>Total: {questions.length}</Text>
            <Text style={styles.textstyle}>Score: {score}</Text>
            <TouchableOpacity onPress={() => setQuizCompleted(true)}>
              <Text style={styles.textstyle}>Finish</Text>
            </TouchableOpacity>
          </View>

          {questions.map((q, index) => (
            <View key={index} style={styles.questionBlock}>
              <Questions QuestionNo={index + 1} Question={q.question} />
              <Answers
                answers={q.answers || []}
                checkanswer={(answer: string) => checkanswer(index, answer)}
                useranswer={useranswers[index]}
                 
              />
            </View>
          ))}

          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={startQuiz}
          >
            <Icon
              name="controller-play"
              size={40}
              color="black"
              type="entypo"
            />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{ justifyContent: 'center', top: 200 }}
          size={50}
          color="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
  },
  textstyle: {
    fontSize: 16,
    color: 'blue',
  },
  questionBlock: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default Quiz;
