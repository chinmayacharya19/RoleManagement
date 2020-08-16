import express from 'express';
import bodyParser from 'body-parser';
import init from './Init'
import MainController from './routes/MainController';
const app = express();
const PORT = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

async function main() {
    let ctx = await init.Init();
    await MainController.registerRoutes(app, ctx)
}

main()

// start the Express server
app.listen(PORT, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});