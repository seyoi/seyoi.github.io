
const express = require('express');
const app = express();


app.listen(8080, ()=>{
    console.log('fuckoff!')
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/app.html')
})

app.get('/animals/:name',(req,res)=>{

    const {name} = req.params;
    if(name === 'dog'){
        res.json({'sound':'bark'});
    }
    else if( name == 'cat'){
        res.json ({'sound':'miyo'});
    }
    }

)
