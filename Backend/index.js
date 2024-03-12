import express from 'express'
import session from 'express-session'
import router from './router.js'
import {fileURLToPath} from 'url'
import path from 'path'

const app=express()

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',router)
app.use(express.static(path.join(__dirname,'../Frontend')))

app.listen(5000,()=>{
    console.log('Server running at 5000')
})