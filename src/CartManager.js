import * as fileSystem from 'fs';

const fs = fileSystem.promises

const path = 'src/Cart.json'

class CartManager {
    #carts;

    constructor() {
        this.path = path;        
        this.#carts = [];
    }

async addCart() {    
    try {
        const newCart = {
            id: this.#getNextId(),
            products: []
        }  
                
        this.#carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(this.#carts, null, '\t'), 'utf-8');
            
        console.log('Se guardó correctamente el Carrito');        

    } catch (error) {
        console.error('error: ' + error);
    }   
}

async addProdToCart(cId, pId) {
    const newProd = {
        product: pId,
        quantity: 1
    }

    try {
        this.#carts = await this.readFile();

        const cart = this.#carts.find(c => c.id === parseInt(cId));
        
        if(cart.length === 0) {            
            console.error("No existe un Carrito con el Id: " + cId);
        }else {
            const cartIdx = this.#carts.findIndex(c => c.id === parseInt(cId));            
            const prodIdx = cart.products.findIndex(p => p.product === parseInt(pId));
            
            if (prodIdx === -1) {
                
                this.#carts[cartIdx].products.push(newProd);

                await fs.writeFile(this.path, JSON.stringify(this.#carts, null, '\t'), 'utf-8');

            } else {
                const prod = cart.products.find(p => p.product === parseInt(pId));
                
                prod.quantity = prod.quantity + 1;
                
                this.#carts[cartIdx].products.splice(prodIdx, 1, prod);                
                            
                await this.writeFile();
                }                
            }
            console.log('Se agregó correctamente el Producto al Carrito');
        } catch (error) {
        console.error('error: ' + error);
    }   
}

async getCartById(id) {
    
    this.#carts = await this.readFile();

    const cart = this.#carts.find((cart) => cart.id === id);

    if(!cart) {
        console.error('No se encontró el Carrito con el Id: ' + id)
    }
    return cart;
}

async readFile() {
    try {
        
        const cartsJson = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(cartsJson);
        
    } catch (error) {
        return [];
    }    
}

async writeFile() {
    try {
        await fs.writeFile(this.path, JSON.stringify(this.#carts, null, '\t'), 'utf-8');        
    } catch (error) {
        return [];
    }    
}

#getNextId() {
    if(this.#carts.length === 0){
        return 1
    }
    return this.#carts.at(-1).id + 1
}

}

export default CartManager;