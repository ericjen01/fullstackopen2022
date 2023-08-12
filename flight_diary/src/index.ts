import express from 'express';
import diaryRouter from './routes/diaries'
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/test', (_req, res) => {
  console.log('logging the testing route');
  res.send('testing page');
});

app.use("/api/diaries", diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});