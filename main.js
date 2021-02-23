window.addEventListener('load', () => {
    const products = [
        {
            id: "id-1",
            name: 'Title 1',
            price: '100',
            image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg'
        },
        {
            id: "id-2",
            name: 'Title 2',
            price: '200',
            image: 'https://images-na.ssl-images-amazon.com/images/I/616MVaXD29L._AC_SX679_.jpg'
        },
    ];

    let backet = [
    ];

    const productsContainer =  document.querySelector('.products');

    productsContainer.innerHTML = `${products.map(item => {
        let name = item.name;
        if(!name) {
            name = 'Default name';
        }
        return `
        <div class="product solid">   
            <div class="product__title ${item.name ? '' : 'grey'}">${name}</div>
            <img class="product__image" src="${item.image}">
            <div class="product__price">
                <button class="product__action" data-product-id="${item.id}">Add</button>
                <span>${item.price}</span>
            </div>  
        </div>
    `;
    }).join('')}`;

    const buttons = productsContainer.querySelectorAll('button.product__action');
    const totalContainer = document.querySelector('#total')
    const select = document.querySelector('#select')
    const selected = document.querySelector('#selectedMoney')
    const deleted = document.querySelector('#deleted')

    buttons.forEach(btn => {
        btn.addEventListener('click', onButtonAddClick)
    });
    
    deleted.addEventListener('click', (e) => {
        totalPrice = 0;
        totalContainer.innerHTML = 0;
        select.innerHTML = `-`
        backet = [];

    });
 
    function onButtonAddClick(event) {
        const productId = event.target.dataset.productId;
        const currentProduct = products.find(item => item.id == productId);
        const productInBacket = backet.find(item => item.id == productId);

        if (productInBacket) {
            productInBacket.quantity++;
        } else { 
            backet.push({...currentProduct, quantity: 1});
        }

        updateBacket()
    };

    function onButtonRemoveClick(event) {
        const productId = event.target.dataset.productId;
        const productInBacket = backet.find(item => item.id == productId)
        
        productInBacket.quantity--;
        
        updateBacket()
    };

    function updateBacket() {
        select.innerHTML = ``
        backet.forEach(currentIteratetProduct => {
            let node = document.createElement('div');
            const plusBtn = document.createElement('button');
            const minusBtn = document.createElement('button');
            minusBtn.innerText = '-';
            plusBtn.innerText = '+';
            plusBtn.dataset.productId = currentIteratetProduct.id;
            minusBtn.dataset.productId = currentIteratetProduct.id;
            plusBtn.addEventListener('click', onButtonAddClick);
            minusBtn.addEventListener('click', onButtonRemoveClick);
            if(currentIteratetProduct.quantity <= 0){
                currentIteratetProduct.quantity = 0;
            }
            node.innerHTML = `${currentIteratetProduct.name}<span>      Quantity         </span>${currentIteratetProduct.quantity}`;
            select.appendChild(node)
            node.appendChild(plusBtn)
            node.appendChild(minusBtn)
        });

        const totalPrice = backet.reduce((acc, val) => {
            if(val.quantity >= 0){
                return acc + val.quantity * val.price
            } else {
                return 0;
            }
            
        }, 0);

        totalContainer.innerHTML = totalPrice;

        selected.addEventListener('click', () => {
            const money = moneyForm.moneySelect;
            const selectedMoney = money.options[money.selectedIndex];
            if(money.selectedIndex == 1) {
                totalContainer.innerHTML = Math.floor(totalPrice/33.60)
            } else if (money.selectedIndex == 2) {
                totalContainer.innerHTML = Math.floor(totalPrice/27.90)
            } else if (money.selectedIndex == 0) {
                totalContainer.innerHTML = totalPrice
            };
        });
    };

});

