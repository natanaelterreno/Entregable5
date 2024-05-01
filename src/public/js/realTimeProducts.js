const socket = io()

document.getElementById("productForm").addEventListener('submit', event => {   
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;
    const thumbnails = document.getElementById('thumbnails').value;
    const newProduct = {
        title, description, code, price, status, stock, category, thumbnails
    };
    
    socket.emit('addProduct', newProduct);
});

function deleteProduct(id){
    console.log('id: ' + id)
    socket.emit('deleteProduct', id)
    location.reload()
}