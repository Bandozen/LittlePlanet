import { Audio } from 'expo-av';

export const startRecording = async () => {
  const recording = new Audio.Recording();
  try {
    await recording.prepareToRecordAsync();
    await recording.startAsync();
    return recording;
  } catch (error) {
    console.error("Error starting recording", error);
  }
};

export const stopRecording = async (recording: Audio.Recording) => {
  try {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    return uri;
  } catch (error) {
    console.error("Error stopping recording", error);
  }
};
