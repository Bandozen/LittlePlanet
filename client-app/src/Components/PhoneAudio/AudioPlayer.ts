import { Audio } from 'expo-av';

export const playAudio = async (uri: string) => {
  const sound = new Audio.Sound();
  try {
    await sound.loadAsync({ uri });
    await sound.playAsync();
    return sound;
  } catch (error) {
    console.error("Error playing audio", error);
  }
};
