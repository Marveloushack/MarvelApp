require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()
const userLocals = require('./configs/user-locals');


// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/preformatter.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

app.use(userLocals);

// Base URLS
app.use('/', require('./routes/index.routes'))
app.use('/', require('./routes/auth.routes'))
app.use('/', require("./routes/data.routes"));
app.use('/', require('./routes/user.routes'))


module.exports = app