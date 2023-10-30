import { S3 } from 'aws-sdk';
const s3 = new S3({ region: 'your-region', credentials: { accessKeyId: 'YOUR_ACCESS_KEY', secretAccessKey: 'YOUR_SECRET' }});

export const uploadToS3 = async (fileUri: string) => {
  const file = await fetch(fileUri);
  const blob = await file.blob();
  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: `recordings/${Date.now()}.mp3`,
    Body: blob,
    ACL: 'public-read',  // If you want the file to be publicly accessible
  };
  try {
    const response = await s3.upload(params).promise();
    return response.Location;
  } catch (error) {
    console.error("Error uploading to S3", error);
  }
};
