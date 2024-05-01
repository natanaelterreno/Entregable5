import Router from 'express'
import CartManager from '../CartManager.js'

const router = new Router()
const cartManager = new CartManager()

router.post('/:cid/product/:pid', async (req, res) => {    
    const cId = parseInt(req.params.cid);
    const pId = parseInt(req.params.pid);    
        
    try {
        let resp = await cartManager.addProdToCart(cId, pId);        
        res.send(resp);
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

router.post('/', async (req, res) => {    
    try {        
        let resp = await cartManager.addCart();        
        res.send(resp);
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

router.get('/:cid', async (req, res) => {    
    try {
        const cId = req.params.cid;        
        const cart = await cartManager.getCartById(parseInt(cId))
        res.send(cart);
    } catch (error) {
        res.send('Response: ' + res +' - Error: '+ error)
    }
});

export default router