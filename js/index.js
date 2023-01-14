const ul_cards = document.querySelector(".cards");
const vazio = document.querySelector(".vazio");

let itensCarrinhos = []
let total = 0;
function montarProdutos(indice) {
    const li_card = document.createElement("li");
    li_card.className = "card";
    li_card.id = `${data[indice].id}`;
    ul_cards.appendChild(li_card);

    const figure_Produto = document.createElement("figure");
    figure_Produto.className = "img_Produto";
    figure_Produto.innerHTML = `<img src="${data[indice].img}" alt="${data[indice].nameItem}">`
    li_card.appendChild(figure_Produto);

    const article = document.createElement("article");
    article.innerHTML =
        `
    <p class="categoria_Produto">${data[indice].tag}</p>
    <p class="nome_Produto">${data[indice].nameItem}</p>
    <span class="descricao_Produto">${data[indice].description}</span>
    <span class="valor_produto">R$ ${data[indice].value},00</span>
    `
    const btn_AdicionarAoCarrinho = document.createElement('span');
    btn_AdicionarAoCarrinho.className = "btn_AdicionarAoCarrinho";
    btn_AdicionarAoCarrinho.id = `${data[indice].id}`;
    btn_AdicionarAoCarrinho.innerText = `${data[indice].addCart}`;
    article.appendChild(btn_AdicionarAoCarrinho);
    li_card.appendChild(article);

    btn_AdicionarAoCarrinho.addEventListener("click", function () {
        addCarrinho(indice);
        quantValor();
        finalizar_Compra();
    })
}

function exibirProduto() {
    for (let i = 0; i < data.length; i++) {
        montarProdutos(i);
    }
}
exibirProduto();

function addCarrinho(indice) {

    vazio.classList.add("invisivel");
    itensCarrinhos.push(data[indice].id);
    total += data[indice].value;

    const ul_Carrinho = document.querySelector('.lista_carrinho');

    if (ul_Carrinho.classList.contains("invisivel")) {
        ul_Carrinho.classList.remove("invisivel");
    }

    const li_Carrinho = document.createElement('li');
    li_Carrinho.className = "card_carrinho";

    const figure_Carrinho = document.createElement("figure");
    figure_Carrinho.className = 'img_Produto_carrinho';
    figure_Carrinho.innerHTML = `<img src="${data[indice].img}" alt="${data[indice].nameItem}"></img>`;
    li_Carrinho.appendChild(figure_Carrinho);

    const article_Carrinho = document.createElement('article');
    article_Carrinho.className = "nome_ProdutoCarrinho";
    article_Carrinho.innerHTML =
        `
            <p class="nome_ProdutoCarrinho" id="${data[indice].id}">${data[indice].nameItem}</p>
            <span class="valor_produtoCarrinho">R$ ${data[indice].value},00</span>
            `;
    li_Carrinho.appendChild(article_Carrinho);

    const btn_RemoverProduto = document.createElement('span');
    btn_RemoverProduto.className = "btn_RemoverProduto";
    btn_RemoverProduto.innerText = 'Remover produto'

    btn_RemoverProduto.addEventListener("click", function (event) {
        let ind = 0;

        for (let i = 0; i < itensCarrinhos.length; i++) {
            if (itensCarrinhos[i] == (event.path[1].childNodes[1].attributes[1].value)) {
                ind = i;
                for (let j = 0; j < data.length; j++) {
                    if (itensCarrinhos[i] == data[j].id) {
                        total -= data[j].value;
                    }
                }
            }
        }

        let li = event.path[2];
        li.remove();
        itensCarrinhos = itensCarrinhos.filter((_, index) => index !== Number(ind));
        quantValor()
    })

    article_Carrinho.appendChild(btn_RemoverProduto);
    ul_Carrinho.appendChild(li_Carrinho)
}

function quantValor() {
    const quant_valor = document.querySelector(".quant_valor")
    const ul_Carrinho = document.querySelector('.lista_carrinho');


    if (itensCarrinhos.length == 0) {
        quant_valor.classList.add('invisivel')
        vazio.classList.remove("invisivel");
        ul_Carrinho.classList.add("invisivel")
        total = 0;
    } else {
        quant_valor.classList.remove('invisivel')
    }

    quant_valor.innerHTML =
        `<div class="itens" >
            <div class="quantidade_itens">
                <span>Quantidade:</span>
                <span>${itensCarrinhos.length}</span>
            </div>
            <div class="total_itens">
                <span>Total:</span>
                <span>R$ ${total},00</span>
            </div>
        <div>`
}


const input_Pesquisa = document.querySelector(".input_Pesquisa");
const btn_Pesquisar = document.querySelector(".button_Pesquisa");

btn_Pesquisar.addEventListener("click", function () {
    let palavra = input_Pesquisa.value;
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {

        if ((data[i].nameItem).toLowerCase().includes(palavra) || (data[i].tag[0]).toLowerCase().includes(palavra)) {

            montarProdutos(i);
        }
    }
    input_Pesquisa.value = "";
})

const aba_Todos = document.querySelector(".todos");
const aba_Acessorios = document.querySelector(".acessorios");
const aba_calcados = document.querySelector(".calcados");
const aba_camisetas = document.querySelector(".camisetas");
const logo = document.querySelector(".logo");

logo.addEventListener("click", function(){
    aba_Acessorios.classList.remove('selecionado');
    aba_calcados.classList.remove('selecionado');
    aba_camisetas.classList.remove('selecionado');
    aba_Todos.classList.add('selecionado');
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {

        montarProdutos(i);

    }
})

aba_Todos.addEventListener("click", function () {
    aba_Acessorios.classList.remove('selecionado');
    aba_calcados.classList.remove('selecionado');
    aba_camisetas.classList.remove('selecionado');
    aba_Todos.classList.add('selecionado');
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {

        montarProdutos(i);

    }
})

aba_Acessorios.addEventListener("click", function () {
    aba_Acessorios.classList.add('selecionado');
    aba_calcados.classList.remove('selecionado');
    aba_camisetas.classList.remove('selecionado');
    aba_Todos.classList.remove('selecionado');
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes("Acessórios")) {
            montarProdutos(i);
        }
    }
})


aba_calcados.addEventListener("click", function () {
    aba_Acessorios.classList.remove('selecionado');
    aba_calcados.classList.add('selecionado');
    aba_camisetas.classList.remove('selecionado');
    aba_Todos.classList.remove('selecionado');
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes("Calçados")) {
            montarProdutos(i);
        }
    }
})

aba_camisetas.addEventListener("click", function () {
    aba_Acessorios.classList.remove('selecionado');
    aba_calcados.classList.remove('selecionado');
    aba_camisetas.classList.add('selecionado');
    aba_Todos.classList.remove('selecionado');
    ul_cards.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes("Camisetas")) {
            montarProdutos(i);

        }
    }
})


