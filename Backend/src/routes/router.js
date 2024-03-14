import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import register from '../models/Schema.js';

const app = express()
const router = express.Router()

// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: false
// }));

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())
// app.use(express.static(path.join(__dirname, '../../../Frontend/images')))

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/Login.html'))                    //Login
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Frontend/Signup.html'))                  //Signup page
})

router.get('/app', (req,res)=>{                                                          //App page
    res.sendFile(path.join(__dirname,'../../../Frontend/index.html'))
})

router.post('/register_user', async (req, res) => {                                   //fetch of signup page
    const userData = req.body
    console.log(userData)
    const verifyemail = userData.email

    const existing_user = await register.findOne({ email: verifyemail })

    if (existing_user) {
        console.log('email already exists')
        res.status(400).send("Email already exists, Signin")
        return
    }

    const newuserdata = new register({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    await newuserdata.save().then(() => console.log('User registered')).catch(() => console.log("error registering"))

    res.status(200).send('Data received and user registered')
})

router.post('/confirm_login', async(req,res) =>{                                      //fetch of signin page
    const authenticate=req.body
    console.log(authenticate)
    
    const check_email=authenticate.email
    const verify_password=authenticate.password
    
    const verify_email = await register.findOne({email:check_email})

    if(!verify_email){
        console.log("Not found email")
        res.status(400).json("Wrong E-mail or Password")
        return
    }
    else{

    // const check_password=await bcrypt.compare(verify_password, verify_email.password)

    // console.log(check_password)

   if(verify_password === verify_email.password){

    res.status(200).send('Successful Seller')
    return 
   }
   else{
    console.log("Wrong e-mail or password")
    res.status(400).send("Wrong e-mail or password")
    return
   }
}
})



export default router;
