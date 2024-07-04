import app from './app.js'
import connectDB from './database/db.js';
import dotenv from 'dotenv'

dotenv.config({path:"./.env"})

const port = process.env.PORT||3000;

connectDB().then(()=>
{
    app.listen(port,()=>
    {
      console.log(`server is listening on port ${port}`);
    })
})
.catch((err)=>
{
 console.log("Error: DB is not connected",err)
})
