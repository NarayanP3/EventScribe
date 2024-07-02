const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

app.listen(9000, (req,res) =>{
    console.log('server listening')
})

const country = 'in';
const year = 2024;
const api_url = 'https://api.api-ninjas.com/v1/holidays?country=IN&year=2024&type=public_holiday';


app.get('/' ,(req,res) => {
    res.json({message: 'msg from node js'})
})