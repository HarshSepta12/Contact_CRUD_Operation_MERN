import express from "express";
import ConnectorDatabse from "./db/connectorDatabase.js";
import router from "./router/ContactRouter.js";
import cors from 'cors';
const app = express()
const port = process.env.PORT || 1000;
app.use(cors({
     origin:true,
     methods:["GET", "POST", "PUT", "DELETE"],
     credentials: true
}))

app.use(express.json());
app.use('/', router)
ConnectorDatabse("mongodb://localhost:27017/")
app.listen(port, () => {
     console.log(`Server is running at port ${port}`);
     
})