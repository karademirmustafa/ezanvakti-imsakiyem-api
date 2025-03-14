import { app } from './app';
import "./types/request";
import "./types/express";

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
