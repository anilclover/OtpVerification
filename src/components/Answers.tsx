import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

type Props = {
  answers: string[];
  checkanswer: (answer: string) => void;
  useranswer?: {
    answer: string;
    correct: boolean;
    correctanswer?: string;
  };
};

const Answers: React.FC<Props> = ({ answers, checkanswer, useranswer }) => {
  const optionLabels = ['A', 'B', 'C', 'D'];
  return (
    <View>
      {answers.map((ans, idx) => {
        const isClicked = useranswer?.answer === ans;
        const isCorrectAnswer = useranswer?.correctanswer === ans;

        return (
          <TouchableOpacity
            key={idx}
            style={styles.option}
            onPress={() => checkanswer(ans)}
            disabled={!!useranswer} // disable buttons after click
          >
            <View style={styles.row}>
              <Text style={styles.number}>{optionLabels[idx]}</Text>
              <Text
                style={[
                  styles.optionText,
                  isClicked && !useranswer?.correct && styles.wrongText, // clicked wrong → red
                  isCorrectAnswer && styles.correctText, // correct answer → green
                ]}
              >
                {ans}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f5f5f5', // light background for clarity
  },
  number: {
    marginRight: 8,
    fontSize: 15,
    color: '#000',
  },
  optionText: {
    fontSize: 15,
    color: '#000', // default black
  },
  correctText: {
    color: '#4CAF50', // green for correct
    fontWeight: 'bold',
  },
  wrongText: {
    color: '#F44336', // red for wrong
    fontWeight: 'bold',
  },
});

export default Answers;
