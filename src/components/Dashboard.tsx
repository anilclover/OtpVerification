import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AnswerObject } from '../screen/Quiz';

type Props = {
  score: number;
  userAnswers: AnswerObject[];
  restartQuiz: () => void;
};

const Dashboard: React.FC<Props> = ({ score, userAnswers, restartQuiz }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.scoreText}>Your Score: {score}</Text>

      <Text style={styles.summaryTitle}>Answer Summary</Text>
      {userAnswers.map((answer, index) => (
        <View key={index} style={styles.answerContainer}>
          <Text style={styles.questionText}>{index + 1}. {answer.question}</Text>
          <Text style={answer.correct ? styles.correctAnswer : styles.incorrectAnswer}>
            Your answer: {answer.answer}
          </Text>
          {!answer.correct && (
            <Text style={styles.correctAnswer}>Correct answer: {answer.correctanswer}</Text>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={restartQuiz}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  answerContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  correctAnswer: {
    color: 'green',
  },
  incorrectAnswer: {
    color: 'red',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
