const app = require('./app') // la aplicación Express real
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})