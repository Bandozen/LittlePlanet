import axios from 'axios';

export const convertSpeechToText = async (audioUri: string) => {
  const url = `YOUR_GOOGLE_CLOUD_API_ENDPOINT`;
  const data = {
    audio: {
      uri: audioUri,
    },
    config: {
      encoding: 'MP3',
      sampleRateHertz: 16000,
      languageCode: 'ko-KR',
    },
  };
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer YOUR_GOOGLE_CLOUD_API_KEY`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error converting speech to text", error);
  }
};
