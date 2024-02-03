import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import mongoose from 'mongoose';
import Image from './models/model.js';
import multer from "multer";
dotenv.config();
const app=express();
app.use(cors());

const PORT= process.env.PORT||6001;


const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
  // API endpoint for image upload
  app.post('/upload', upload.single('image'), (req, res) => {
    const { selectedOption } = req.body;
    const imagePath = req.file.path;
  
    const newImage = new Image({ imagePath, selectedOption });
  
    newImage.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send('Image uploaded and data saved to MongoDB');
    });
  });
  


// // Configure Multer for image upload
// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
  
// const upload=multer({storage});

// app.post('/upload', upload.single('image'), (req, res) => {
//     const { selectedOption } = req.body;
//     const imagePath = req.file.path;
  
//     const newImage = new Image({ imagePath, selectedOption });
  
//     newImage.save((err) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       return res.status(200).send('Image uploaded and data saved to MongoDB');
//     });
//   });
  

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('welcome to parksync');

})



mongoose.connect(process.env.MONGO_URL)

.then(()=>{
console.log('app is connected to database');

app.listen(3000,()=>{
    console.log(`app is listening to port :${PORT}`);
});  

})
.catch((error)=>{
console.log(error);
});
