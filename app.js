const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const curd  = require('./models/curd');  


const app =express();

mongoose.connect('mongodb://localhost:27017/curdDemo')
.then(()=>console.log('connected')).catch(err=>console.log(err))

//setting template engine //
// this will tell express which view engine we  using //
app.set('view engine','ejs');

//for fetching FORMDATA from coming request //
app.use(bodyParser.urlencoded({extended:false}))

//READ DATA 
app.get('/',(req,res)=>{
  curd.find((err,data)=>{
      if(err){
          console.log(err)
      }
    else if(!data){
        res.render('home',{data:{}})
    }
    else{
       res.render('home',{data:data})   
    }
  })
})

//ADD DATA //
app.post('/add',(req,res)=>{
    const curds =  new curd({
        name: req.body.uname
    })
    curds.save((err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})


//EDIT DATA //
app.get('/edit/:id',(req,res)=>{
    curd.find({_id:req.params.id},(err,data)=>{
             if(err){
                 console.log(err)
             }
             console.log('edit data',data)
             res.render('edit',{edata:data})
    })
})

//UPDATE DATA //
app.post('/update',(req,res)=>{
    const upCURD = {
        name : req.body.uname
    }
    curd.update({_id:req.body.id},{$set:upCURD},(err,data)=>{
        if(err){
            console.log('update error',err)
        }
        console.log(data)
        res.redirect('/')
    })
})

//DELETE DATA //
app.get('/delete/:id',(req,res)=>{
    curd.deleteOne({_id:req.params.id},(err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})



const port = process.env.PORT || 3000 ;
app.listen(port,()=>console.log(`server running at ${port}`))

module.exports=app;