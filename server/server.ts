import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import * as openai from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

type queryGeneratorParams = {
  age: string;
  gender: string;
  occasion: string;
  description: string;
}

export const queryGenerator = (params: queryGeneratorParams) => {
  const queryBase = `Please generate a full-body fashion snapshot image that matches the following criteria:\n\nDescription: ${params.description}\nOccasion: ${params.occasion}\nAge: ${params.age}\nGender: ${params.gender}\nEthnicity: Asian\n`;
  return queryBase;
}

const openaiConfig = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express()
app.use(cors());
const port = 5000;

app.get('/generate-image', async (req: Request, res: Response) => {
  const query = queryGenerator({
    age: req.query.age as string,
    gender: req.query.gender as string,
    occasion: req.query.occasion as string,
    description: req.query.description as string,
  });
  console.log(query);

  const openaiClient = new openai.OpenAIApi(openaiConfig);

  try {
    const response = await openaiClient.createImage({
      prompt: query,
      n: 1,
      size: '512x512',
      response_format: 'url',
    });

    const imageUrl = response.data.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
