import { Platform } from 'react-native'
import { S3 } from 'aws-sdk';
import {
  EXPO_APP_AWS_ACCESS_KEY_ID,
  EXPO_APP_AWS_SECRET_ACCESS_KEY,
  EXPO_APP_AWS_REGION,
  EXPO_APP_AWS_BUCKET_NAME
} from "@env";


const s3 = new S3({ 
  region: EXPO_APP_AWS_REGION, 
  credentials: { 
    accessKeyId: EXPO_APP_AWS_ACCESS_KEY_ID, 
    secretAccessKey: EXPO_APP_AWS_SECRET_ACCESS_KEY 
  }
});

export const uploadToS3 = async (fileUri: string) => {
  const file = await fetch(fileUri);
  const blob = await file.blob();
  const params = {
    Bucket: EXPO_APP_AWS_BUCKET_NAME,
    Key: `recordings/${Date.now()}.mp3`,
    Body: blob,
    ACL: 'public-read',
  };
  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.error("Error uploading to S3", error);
  }
};
