import Router from 'express'
import ProductManager from '../ProductManager.js'

const router = new Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
    
        if(limit){
            res.send(products.slice(0, parseInt(limit)));
        }
        else {
            res.send(products);
        }        
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const pId = req.params.pid;
        const prod = await productManager.getProductById(parseInt(pId))
        res.send(prod);
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }    
});

router.post("/", async (req, res) => {    
    try {
        let resp = await productManager.addProduct(req.body);        
        res.send(resp);
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

router.put("/:pId", async (req, res) => {
    const id = parseInt(req.params.pId)
    const product = {
        id,
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status || true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails
    };
    try {        
        let resp = await productManager.updateProduct(product);
        res.send(resp)
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)        
    }    
})

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await productManager.deleteProduct(parseInt(pid))
        res.send(prod);        
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

export default router