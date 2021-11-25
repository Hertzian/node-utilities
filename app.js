const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

const mailsRoutes = require('./routes/mailRoutes')
const imagesRoutes = require('./routes/imagesRoutes')

app.use('/mail', mailsRoutes)
app.use('/image', imagesRoutes)
app.use('/', (req, res) => res.render('home'))

app.listen(
  process.env.PORT,
  console.log(`Server running on http://localhost:${process.env.PORT}`)
)
