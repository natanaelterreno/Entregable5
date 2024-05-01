import { Router } from 'express'
import ProductManager from '../ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/home', async (req, res) => {

    const products = await productManager.getProducts();    

    res.render('home', {        
        title: 'E-commerce',
        styles: 'home.css',
        products: products
    })
})

router.get('/realtimeproducts', async (req, res) => {

    const {io} = req

    const products = await productManager.getProducts();    

    res.render('realtimeproducts', {
        styles: 'realTimeProducts.css',
        products
    })

    io.on('connection', socket => {

        socket.emit("getProducts", JSON.stringify(products))

        socket.on("addProduct", async product => {            
            let resp = await productManager.addProduct(product)            
            const products = await productManager.getProducts()                                    
        })

        socket.on("deleteProduct", async id => {                            
            const resp = await productManager.deleteProduct(parseInt(id))
            const products = await productManager.getProducts()                                    
        })
    })
})

export default router