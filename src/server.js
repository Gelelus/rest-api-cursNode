const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const processErrorListener = require('./helpers/processErrorListener');
const connectMongoDB = require('./helpers/mongoDB');

processErrorListener();
connectMongoDB(MONGO_CONNECTION_STRING);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
