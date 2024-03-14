import express from 'express'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'
import register from '../models/Schema.js';

const app = express()
const router = express.Router()

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.json())

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/Login.html'))                    //Login
})

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/Signup.html'))                  //Signup page
})

router.post('/register_user', async (req, res) => {                                   //fetch of signup page
    const userData = req.body
    console.log(userData)
    const verifyemail = userData.email

    const existing_user = await register.findOne({ email: verifyemail })

    if (existing_user) {
        console.log('email already exists')
        res.send("Email already exists, Signin")
        return
    }

    const newuserdata = new register({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    await newuserdata.save().then(() => console.log('User registered')).catch(() => console.log("error registering"))

    res.send('Data received and user registered')
})

router.post('/confirm_login', async (req, res) => {                                    //fetch of signin page
    const authenticate = req.body

    const check_email = authenticate.email
    const verify_password = authenticate.password

    const verify_email = await register.findOne({ email: check_email })


    if (!verify_email) {
        console.log("E-mail does not exist")
        res.status(400).send("Wrong E-mail or Password")
        return
    }
    else {

        if (verify_password === verify_email.password) {
            req.session.email = verify_email

            res.status(200).send('Successful Login')
            return
        }
        else {
            console.log("Wrong E-mail or password")
            res.status(400).send("Wrong e-mail or password")
            return
        }
    }
})

export default router;
