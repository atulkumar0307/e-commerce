import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 4000;0
const app = express();

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_URI)

// API creation
app.get('/', (req, res)=>{
    res.send("Express app is running");
})

// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb)=>{    // renaming
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

// Creating upload endpoint for image
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${PORT}/images/${req.file.filename}`
    })
})

// schema for creating products
const Product = mongoose.model("Product", {
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
})

app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating API for deleting products
app.post('/removeproduct', async (req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Product Removed!");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating API for getting all products
app.get('/allproducts', async (req, res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched!");
    res.send(products);
})

// User Model Schema
const Users = mongoose.model("Users", {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    cart:{
        type:Object,
        default:{}
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// Creating endpoint for registering the user
app.post('/signup', async (req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"existing user found having same email address"})
    }
    let cart = {};
    for(let i=0; i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cart:cart
    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true, token})  
})

// creating endpoint for user login
app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = (req.body.password === user.password);
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false, errors:"Wrong Email Id"});
    }
})

//creating endpoint for new-collection data
app.get('/newcollection', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log('NewCollection Fetched');
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/populariwomen', async(req, res)=>{
    let products =await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fethced");
    res.send(popular_in_women);
})

// creating middleware to fetch user
const fetchUser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token!"});
    }
    else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Authenticate using a vaild token!"})
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async(req, res)=>{
    console.log("Added", req.body, req.user);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cart[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cart:userData.cart});
    res.send("Added");
})  

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log("Removed", req.body, req.user);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cart[req.body.itemId]>0)
    userData.cart[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cart:userData.cart});
    res.send("Removed");
})

// creating endpoint to get cart data
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log('GetCart');
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cart);
})

app.listen(PORT,(req, res)=>{
    console.log("Server is running on port: "+ PORT);
})
