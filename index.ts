import express from 'express';
const app = express();

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.get('/', (req: express.Request, res: express.Response) => {
    const message = req.body as String;
    res.send(`Hello, your age is ${message}`);
});