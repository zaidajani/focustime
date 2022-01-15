import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillies = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const countdown = () => {
    setMillies((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft / minutesToMillies(minutes))
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillies(minutesToMillies(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if(interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [
    isPaused
  ]);


  const [millies, setMillies] = useState(null);
  const minute = Math.floor(millies / 1000 / 60) % 60;
  const seconds = Math.floor(millies / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    color: colors.white,
    padding: spacing.lg,
    fontWeight: 'bold',
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
