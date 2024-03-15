import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { dbCon } from "./db/dbcon.js";
import router from "./controllers/userController.js";

const app = express();
const port = 3058;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


dbCon();


app.use('/api', router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
