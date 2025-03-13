import { app } from './app';
import "./types/request";
import "./types/express";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});