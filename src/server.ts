import { config } from './config/config.js';
import { connectDb } from './config/db.js';

import app from './index.js'

const PORT = config.PORT;

connectDb()

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})