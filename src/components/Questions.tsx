
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface QuestionProps {
  QuestionNo: number;
  Question: string;
}

const Questions: FC<QuestionProps> = ({ QuestionNo, Question }) => {
  return (
    <SafeAreaView>
      <View style={styles.questioncontainer}>
        <Text style={styles.textstyle}>{QuestionNo}.</Text>
        <Text style={styles.questionText}>{Question}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  questioncontainer: {
    flexDirection: 'row', 
    alignItems: 'center', 

    marginTop: 10,
    paddingRight: 10,
  },
  textstyle: { padding: 8, fontSize: 15, color: 'blue' },
  questionText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    flex: 1,
    marginRight: 4,
  },
});

export default Questions;



//import React, { FC } from 'react';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// interface Question {
//   QuestionNo: number;
//   Question: string;
// }

// const Questions: FC<Question> = props => {
//   return (
//     <SafeAreaView>
//       <View style={styles.questioncontainer}>
//         <Text style={styles.textstyle}>{props.QuestionNo}</Text>
//         <Text
//           style={{
//             fontSize: 15,
//             color: 'black',
//             textAlign: 'left',
//             marginRight: 7,
//           }}
//         >
//           {props.Question}
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   questioncontainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     marginTop: 10,
//     paddingRight: 16,
//   },

//   textstyle: { padding: 15, fontSize: 15, color: 'blue' },
// });

// export default Questions;
