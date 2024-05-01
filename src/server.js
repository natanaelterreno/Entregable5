import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js'

import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express();
const httpServer = app.listen('8080', err => {
    console.log('Escuchando en el puerto 8080');
})
 
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.use(getIo(io))

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


function getIo(io){
    return (req,res,next)=>{
        req.io = io
        next()
    }
}