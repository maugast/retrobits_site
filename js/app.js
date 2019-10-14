//Variables
const cards = document.getElementById('cards');
const cart = document.getElementById('cart-table');
const cartBtn = document.getElementById('cart-btn');
const cartList = document.getElementById('cart');


//Classes
class Product{
    constructor(imgProduct,nameProduct, priceProduct, qtyProduct){
        this.imgProduct = imgProduct; 
        this.nameProduct = nameProduct;
        this.priceProduct = priceProduct;
        this.qtyProduct = qtyProduct;
    }
}


class UI{
    getProductData(item){
        const addItem = document.createElement('tr');
        
        addItem.innerHTML = `
            <td>
                <img src="${item.imgProduct}" width="100px">
                ${item.nameProduct}
            </td>
            <td>
                ${item.qtyProduct}
            </td>
            <td>
                ${item.priceProduct}
                <i class="fas fa-window-close ml-3 delete"></i>
            </td>
        `;

        cart.appendChild(addItem);
    }
}

//Event Listeners

loadListeners();


function loadListeners(){
    addQuantity();
    btnStatus();

    cards.addEventListener('click', buyItem);
    cartBtn.addEventListener('click', showCart);
    cartList.addEventListener('click', deleteItem);
    cartList.addEventListener('click', clearCart);
};



//Functions
function buyItem(e){

    if(e.target.classList.contains('buy-item')){
        const product = e.target.parentElement.parentElement;
            const productImg = product.querySelector('img').src; 
            const productName = product.querySelector('h5').textContent;
            const productPrice = product.getElementsByTagName('p')[3].textContent;
            const productQty = product.getElementsByTagName('span')[1].textContent;

        const boughtProduct = new Product(productImg, productName, productPrice, productQty);

        const ui = new UI();
        ui.getProductData(boughtProduct);

    }

    if(e.target.type === 'checkbox'){

        checkPaymentOptions(e.target);
    }

}


function btnStatus(){
    let buttons = cards.getElementsByTagName('button');
        buttons = Array.from(buttons);

        buttons.forEach(button => {
            button.disabled = true;
        });
    }

function addQuantity(){
    let selectFields = document.getElementById('cards').getElementsByTagName('select');
    selectFields = Array.from(selectFields);

    selectFields.forEach( select =>{
        for(let i = 1; i <= 10; i++){
            const option = document.createElement('option');
            option.innerHTML = i;
            option.setAttribute('value',i);
            select.appendChild(option);    
        }
        
    });
}


function checkPaymentOptions(e){

    
    const paymentOptions = e.parentElement.parentElement;

    const buyBtn = paymentOptions.parentElement.parentElement.getElementsByTagName('button')[0];

    let productPrice = paymentOptions.parentElement.querySelector('p.price');
    
    const productPriceFix = Number(productPrice.textContent);

    let checkboxes = paymentOptions.getElementsByTagName('input');

    const quantity = paymentOptions.parentElement.getElementsByTagName('span')[1];

        if(checkboxes[0].checked || checkboxes[1].checked){
            buyBtn.disabled = false;

        }else if(checkboxes[0].checked === false && checkboxes[1].checked === false){
            buyBtn.disabled = true;
            
        }
            
            if(checkboxes[0].checked){
                checkboxes[1].setAttribute('disabled','');
                let selectQty = paymentOptions.getElementsByTagName('select')[0];
                selectQty.setAttribute('disabled','');

                let optionValues = selectQty.options[selectQty.selectedIndex].value;

                productPrice.textContent = productPriceFix/optionValues;

                quantity.textContent = 1;
            }
            else {
                checkboxes[1].removeAttribute('disabled');
            }

            if(checkboxes[1].checked){
                let selectQty = paymentOptions.getElementsByTagName('select')[0];
                checkboxes[0].setAttribute('disabled','');
                selectQty.removeAttribute('disabled');

                selectQty.addEventListener('input', function(){
                    
                    let optionValues = selectQty.options[selectQty.selectedIndex].value;
                    let optionValuesNum = Number(optionValues);

                    productPrice.textContent = productPriceFix * optionValuesNum;

                    quantity.textContent = optionValuesNum;

                });
            }
            else{
                checkboxes[0].removeAttribute('disabled');
                let selectQty = paymentOptions.getElementsByTagName('select')[0];
                selectQty.setAttribute('disabled','');

            }

           
}

function showCart(){

    if(cartList.classList.contains('d-none')){
        cartList.classList.remove('d-none');
        cartList.classList.add('d-block');

    }else if(cartList.classList.contains('d-block')){
        cartList.classList.remove('d-block');
        cartList.classList.add('d-none');
    }
}

function deleteItem(e){

    if(e.target.classList.contains('delete')){

        e.target.parentElement.parentElement.remove();
    };
    
}

function clearCart(e){
    if(e.target.classList.contains('clear-all')){

        let arrayTr = e.target.parentElement.getElementsByTagName('tr');
        arrayTr = Array.from(arrayTr);

        arrayTr.forEach(function(tr,index){
            if(index >0){
                tr.remove();
            }
        });
    };
    
}