import {Alert, StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';

import InstructionText from '../components/ui/InstructionText';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(
    1, 
    100, 
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if(
      (direction == 'lower' && currentGuess <userNumber) || 
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        {text: 'Sorry', style: 'cancel'},
      ])
      return;
    }
    if(direction == 'lower') {
      maxBoundary = currentGuess -1;
    } else {
      minBoundary = currentGuess + 1;    
    }
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber);
  }

  console.log('Game Screen');
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGuess }</NumberContainer>
      <View>
        <InstructionText>Higher or lower?</InstructionText>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
        </View>
          
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );

}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },   
})