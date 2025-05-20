
let valor = 0;
function updateProducts(newProducts) {
    document.getElementById('box-1').innerHTML = newProducts;
    const imagemDoProduto = document.querySelectorAll('.product img');
    imagemDoProduto.forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = originalSrc.replace('.webp', '-2.webp').replace('.jpg', '-2.jpg');
        
        img.addEventListener('mouseover', () => {
            img.src = hoverSrc;
        });
        
        img.addEventListener('mouseout', () => {
            img.src = originalSrc;
        });
    });
 
    const botaoAd = document.querySelectorAll('.adicionar');
    const total = document.getElementById('total');

    function formataTexto(valor) {
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    function extraiValor(valorTexto) {
        return parseFloat(valorTexto.replace('R$', "").replace(".", "").replace(',', "."));
    }

    
    let valor = 0; // Initialize the valor variable

    botaoAd.forEach(function(botao) {
        botao.addEventListener('click', function() {
            let parent = botao.closest('.product');
            let imagemProduct = parent.querySelector('img').src;
            let textoProduto = parent.querySelector('h3').textContent;
            let valorTexto = parent.querySelector('.preco').textContent;
            let carrinho = document.getElementById('produtos-carrinho');
            let preco = extraiValor(valorTexto);
            
            if (!isNaN(preco)) {
                let qtd = 1;
                let exists = false;
                let carrinhoProdutos = carrinho.querySelectorAll('.linha-produto');
                
                carrinhoProdutos.forEach(function(produto) {
                    if (produto.textContent.includes(textoProduto)) {
                        // If product exists, update the quantity
                        let span = produto.querySelector('span');
                        let currentQty = parseInt(span.textContent.match(/x(\d+)/)[1]);
                        currentQty++;
                        span.textContent = `${formataTexto(preco)} x${currentQty}`;
                        exists = true;
                    }
                });
    
                if (!exists) {
                    // Add new product to the cart
                    carrinho.innerHTML += `
                        <div class="linha-produto">
                            <img src="${imagemProduct}" alt="${textoProduto}">
                            ${textoProduto} <span>${formataTexto(preco)} x${qtd}</span>
                        </div>`;
                }
                
                // Update total value
                valor += preco;
                total.value = formataTexto(valor);
            } else {
                console.log('Preço inválido');
            }
          
            
        });
    });
    let carrinho = document.getElementById('carrinho');
    let carrinhoOpen = false;
    
    document.getElementById('meuCarrinho').addEventListener('mouseover', function () {
        carrinho.style.display = 'flex';
        setTimeout(() => carrinho.classList.add('show'), 10);
        carrinhoOpen = true;
    });
    
    carrinho.addEventListener('mouseleave', function () {
        if (carrinhoOpen) {
            carrinho.classList.remove('show');
            setTimeout(() => {
                carrinho.style.display = 'none';
                document.body.style = ``;
            }, 300);
            carrinhoOpen = false;
        }
    });
    
   
        document.getElementById('limpar').addEventListener('click',function(){
            valor = 0;
            total.value = formataTexto(valor)
        });
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupOkButton = document.getElementById('popup-ok');
    const mostraTotalFinal = document.querySelector('.mostraTotal');
   
    
   
    function showPopup() {
        popup.style.display = 'block';
        if(valor <= 0.00){
            mostraTotalFinal.innerHTML = ` <h2>Não há nenhum item no seu carrinho.</h2>`
            overlay.style.display = 'block';
        }
        else{
            overlay.style.display = 'block';
        mostraTotalFinal.innerHTML = ` <h2>Compra realizada com sucesso! </h2>
        <span>Total</span><p>${total.value}</p>
        <p>Prazo de entrega em <strong>7<strong> dias <strong>úteis<strong>`

        }

            
        
        
    }
    
    
    
    function hidePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        valor = 0;
        total.value = formataTexto(valor);
    }
    //menu-mobile
    let box = document.getElementById('box-1');
    let divMenu = document.createElement('div');
    box.appendChild(divMenu);
    divMenu.classList.add('menu-mobile-items');
    divMenu.innerHTML = `
        <span class="material-symbols-outlined" id="menu-close">close</span>
        <li id="camisetas-mobile" class="menu-item">Camisetas</li>
        <li id="blusas-jaquetas-mobile" class="menu-item">Blusas & Jaquetas</li>
        <li id="headwear-mobile" class="menu-item">Headwear</li>
        <li id="calcas-shorts-mobile" class="menu-item">Calças & Shorts</li>
        <li id="camisas-mobile" class="menu-item">Camisas</li>
        <li id="suporte-mobile" class="menu-item">Suporte</li>
        <li style="border: none; color: crimson;"></li>
    `;
    
    divMenu.style.display = 'none';

document.getElementById('menu-mobile').addEventListener('click', function() {
    divMenu.style.display = 'flex';
    document.body.style = `overflow: hidden;`;
    setTimeout(() => divMenu.classList.add('show'), 10);
    
    document.getElementById('menu-close').addEventListener("click", function() {
        divMenu.classList.remove('show');
        setTimeout(() => {
            divMenu.style.display = 'none';
            document.body.style = ``;
        }, 300);
    });

    document.getElementById('camisetas-mobile').addEventListener('click', function() {
        updateProducts(products['camisetas']);
    });

    document.getElementById('blusas-jaquetas-mobile').addEventListener('click', function() {
        updateProducts(products['blusas-jaquetas']);
    });

    document.getElementById('headwear-mobile').addEventListener('click', function() {
        updateProducts(products['headwear']);
    });

    document.getElementById('calcas-shorts-mobile').addEventListener('click', function() {
        updateProducts(products['calcas-shorts']);
    });

    document.getElementById('camisas-mobile').addEventListener('click', function() {
        updateProducts(products['camisas']);
    });

    document.getElementById('suporte-mobile').addEventListener('click', function() {
        updateProducts(products['suporte']);
    });
});


    
    
    document.getElementById('finalizar-compra').addEventListener('click', showPopup);
    
    
    popupOkButton.addEventListener('click', hidePopup);
    
    

  
    
    
    


    
    
}

const products = {
    'camisetas': `
        <div class="product">
            <img src="./assets/camisetas/camiseta1.webp" alt="">
            <h3>Metal XXXting — Mininal</h3>
            <div class="btn">
                <span class="preco">R$79,90</span>
                <button class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/camisetas/camiseta2.webp" alt="">
            <h3>XXXcorpion Zoom — Noir</h3>
            <div class="btn">
                <span  class="preco">R$99,00</span>
                <button  class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/camisetas/camiseta3.webp" alt="" srcset="">
            <h3>6ute 6ute 6ats — Cute</h3>
            <div class="btn">
                <span class='preco'>
                    R$ 89,00
                </span>
                <button class="adicionar">
                    Comprar
                </button>
                <span class="material-symbols-outlined" id="like">favorite</span>
             </div>
            </div>
        <div class="product">
            <img src="./assets/camisetas/camiseta4.webp" alt="" srcset="">
            <h3>Mega XXXcorpion — Funghi</h3>
            <div class="btn">
                <span class='preco'>
                    R$99,90
                </span>
                <button class="adicionar">
                    Comprar
                </button>
                <span class="material-symbols-outlined" id="like">favorite</span>
             </div>
            </div>
        <div class="product">
            <img src="./assets/camisetas/camiseta5.webp" alt="" srcset="">
            <h3>Hell Kids — Tribal</h3>
            <div class="btn">
                <span class='preco'>
                    R$129,90
                </span>
                <button class="adicionar">
                    Comprar
                </button>
                <span class="material-symbols-outlined" id="like">favorite</span>
             </div>
            </div>
        <div class="product">
            <img src="./assets/camisetas/camiseta6.webp" alt="" srcset="">
            <h3>Trip — Drugs</h3>
            <div class="btn">
                <span class='preco'>
                    R$119,90
                </span>
                <button class="adicionar">
                    Comprar
                </button>
                <span class="material-symbols-outlined" id="like">favorite</span>
             </div>
            </div>
       
    </div>
    `,
    'blusas-jaquetas': `
        <div class="product">
            <img src="./assets/blusas-jaquetas/jaqueta1.webp" alt="">
            <h3>N3RO — Pyros</h3>
            <div class="btn">
                <span class='preco' >R$199,90</span>
                <button class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/blusas-jaquetas/jaqueta2.webp" alt="">
            <h3>Da3emon 77 — Demons</h3>
            <div class="btn">
                <span class="preco">R$299,90</span>
                <button  class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/blusas-jaquetas/blusa1.webp" alt="">
            <h3>R4VER4VE — #1</h3>
            <div class="btn">
                <span class='preco'>R$99,90</span>
                <button  class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/blusas-jaquetas/blusa2.webp" alt="">
            <h3>R4VER4VE — #2</h3>
            <div class="btn">
                <span  class='preco' >R$99,90</span>
                <button
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/blusas-jaquetas/jaqueta3.webp" alt="">
            <h3>JACKXXET — White</h3>
            <div class="btn">
                <span  class='preco'>R$179,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/blusas-jaquetas/jaqueta4.webp" alt="">
            <h3>THE G0D — PYROS</h3>
            <div class="btn">
                <span class='preco' >R$399,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <!-- Dá pra adicionar mais aqui. -->
    `,
    'headwear': `
        <div class="product">
            <img src="./assets/headwear/headwear1.webp" alt="">
            <h3>ANDR0M3D4 — Black</h3>
            <div class="btn">
                <span  class='preco' >R$99,90</span>
                <button class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/headwear/headwear2.webp" alt="">
            <h3>ECHOS — R4V3</h3>
            <div class="btn">
                <span class='preco' >R$149,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/headwear/headwear3.webp" alt="">
            <h3>B1G B0Y — BAD</h3>
            <div class="btn">
                <span  class='preco'>R$129,90</span>
                <button
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/headwear/headwear4.webp" alt="">
            <h3>SHUT UP — BAD</h3>
            <div class="btn">
                <span class='preco'>R$129,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/headwear/headwear5.webp" alt="">
            <h3>S1CK — BAD</h3>
            <div class="btn">
                <span  class='preco'>R$129,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/headwear/headwear6.webp" alt="">
            <h3>SEA — R4V3</h3>
            <div class="btn">
                <span class='preco'>R$149,90</span>
                <button
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <!-- Da pra adicionar aqui -->
    `,
    'calcas-shorts': `
        <div class="product">
            <img src="./assets/calcas-shorts/calca1.webp" alt="">
            <h3>NIH1L — Black</h3>
            <div class="btn">
                <span  class='preco' >R$299,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/calcas-shorts/calca2.webp" alt="">
            <h3>Sku11 — Blue</h3>
            <div class="btn">
                <span  class='preco' >R$189,90</span>
                <button 
                class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/calcas-shorts/calca3.webp" alt="">
            <h3>PLAYB0Y — CASUAL</h3>
            <div class="btn">
                <span  class='preco' >R$789,90</span>
                <button
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/calcas-shorts/calca4.webp" alt="">
            <h3>CHAINS — R4V3</h3>
            <div class="btn">
                <span  class='preco' >R$189,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/calcas-shorts/calca5.webp" alt="">
            <h3>SH0RTS — SEA</h3>
            <div class="btn">
                <span  class='preco' >R$99,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/calcas-shorts/calca6.webp" alt="">
            <h3> BLACK — BLACK</h3>
            <div class="btn">
                <span  class='preco' >R$99,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <!-- Da pra adicionar aqui -->
    `,
    'camisas': `
        <div class="product">
            <img src="./assets/camisas/camisa1.webp" alt="">
            <h3>D00MED — ETERNAL</h3>
            <div class="btn">
                <span  class='preco'>R$149,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <div class="product">
            <img src="./assets/camisas/camisa2.webp" alt="">
            <h3>PAPARAZZI — PLAY</h3>
            <div class="btn">
                <span  class='preco'>R$149,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/camisas/camisa3.webp" alt="">
            <h3>AM3M — GOD</h3>
            <div class="btn">
                <span  class='preco'>R$777,77</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/camisas/camisa4.webp" alt="">
            <h3>WOW — R4V3</h3>
            <div class="btn">
                <span  class='preco'>R$249,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/camisas/camisa5.webp" alt="">
            <h3> KABAL — R4V3</h3>
            <div class="btn">
                <span  class='preco' >R$249,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
         <div class="product">
            <img src="./assets/camisas/camisa6.webp" alt="">
            <h3>SUN??? — ???</h3>
            <div class="btn">
                <span  class='preco' >R$229,90</span>
                <button 
                 class="adicionar">Comprar</button>
                <span class="material-symbols-outlined" id="like">favorite</span>
            </div>
        </div>
        <!-- Caso queira adicionar mais -->
    `,
    'suporte': `  
     <div class="support">
            <img src="./assets/others/suporte.png" id="suporte-img" alt="" srcset="">
            <div id="divEmail">
            <h1>Tem alguma dúvida ou precisa de assistência?</h1>
            <h3>Não se preocupe</h3>
            <p>Estamos aqui para ajudar! Caso tenha qualquer dúvida ou necessite de assistência, entre em contato conosco.</p>
            <br>
            <p>Por favor, insira seu e-mail abaixo para que possamos entrar em contato com você o mais breve possível.</p>
            <div class="email">
    
            <input class="email-input" type="text" placeholder="Insira seu email...">
            <button class="btnEmail">Enviar</button>

            </div>
            
        </div> 
      
    `
};


document.getElementById('camisetas').addEventListener('click', function() {
    updateProducts(products['camisetas']);
     
});

document.getElementById('blusas-jaquetas').addEventListener('click', function() {
    updateProducts(products['blusas-jaquetas']);
      
});

document.getElementById('headwear').addEventListener('click', function() {
    updateProducts(products['headwear']);
      
});

document.getElementById('calcas-shorts').addEventListener('click', function() {
    updateProducts(products['calcas-shorts']);
     
});

document.getElementById('camisas').addEventListener('click', function() {
    updateProducts(products['camisas']);
     
});

document.getElementById('suporte').addEventListener('click', function() {
    updateProducts(products['suporte']);
     
     
});

document.addEventListener('DOMContentLoaded',function(){
    
    
    updateProducts(products['suporte']);
    updateProducts(products['camisas']);
    updateProducts(products['calcas-shorts']);
    updateProducts(products['headwear']);
    updateProducts(products['blusas-jaquetas']);
    updateProducts(products['camisetas']);
    
});
