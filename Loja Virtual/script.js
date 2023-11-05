document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ftel").addEventListener("input", handlePhone);
});

function validateForm() {
    let fname = document.getElementById("fname").value;
    let femail = document.getElementById("femail").value;
    let ftel = document.getElementById("ftel").value;
    let subject = document.getElementById("subject").value;

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (fname === "" || femail === "" || ftel === "" || subject === "") {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    if (!emailPattern.test(femail)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }
}

function handlePhone(event) {
    const input = event.target;
    input.value = phoneMask(input.value);
}

const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('carrinho')) {
        carregarCarrinho();
    }
});

function carregarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinhoElement.innerHTML = '';

    let totalCarrinho = 0;

    for (let i = 0; i < carrinho.length; i++) {
        const produto = carrinho[i];
        const listItem = criarItemCarrinho(produto, i);
        carrinhoElement.appendChild(listItem);
        totalCarrinho += produto.valor * produto.quantidade;
    }

    const valorTotalCompra = document.querySelector('.valorTotal');
    valorTotalCompra.textContent = `R$ ${totalCarrinho.toFixed(2)}`;

    const subTotalElement = document.querySelector('.subTotal');
    let subTotalCarrinho = 0;

    for (let i = 0; i < carrinho.length; i++) {
        const produto = carrinho[i];
        subTotalCarrinho += produto.valor * produto.quantidade;
    }

    subTotalElement.textContent = `R$ ${subTotalCarrinho.toFixed(2)}`;
}

function criarItemCarrinho(produto, index) {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <div class="div_carrinho">
            <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-carrinho">
            <span>${produto.nome}</span>
            <div><input class="input_quant" type="number" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)"></div>
            <span>R$ ${produto.valor.toFixed(2)}</span>
            <button class="botao_excluir_prod" onclick="excluirDoCarrinho(${index})"><img class="excluir_prod" src="Image/excluir.png" alt="Remover do Carrinho">
            </button>
        </div>
    `;

    listItem.style.listStyleType = "none";

    return listItem;
}

function adicionarAoCarrinho(nome, imagem, valor, quantidade) {
    const produto = {
        nome: nome,
        imagem: imagem,
        valor: valor,
        quantidade: parseInt(quantidade, 10) || 1
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const indexProdutoExistente = carrinho.findIndex(item => item.nome === produto.nome);

    if (indexProdutoExistente !== -1) {
        carrinho[indexProdutoExistente].quantidade += produto.quantidade;
    } else {
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    carregarCarrinho();
}

function excluirDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function atualizarQuantidade(index, novaQuantidade) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produto = carrinho[index];

    const novaQuantidadeInt = parseInt(novaQuantidade, 10);
    if (!isNaN(novaQuantidadeInt) && novaQuantidadeInt >= 0) {
        produto.quantidade = novaQuantidadeInt;
    } else {
        produto.quantidade = 1;
    }

    let totalCarrinho = 0;
    for (let i = 0; i < carrinho.length; i++) {
        totalCarrinho += carrinho[i].valor * carrinho[i].quantidade;
    }

    const valorTotalCompra = document.querySelector('.valorTotal');
    valorTotalCompra.textContent = `R$ ${totalCarrinho.toFixed(2)}`;

    const subTotalElement = document.querySelector('.subTotal');
    const subTotalProduto = produto.valor * produto.quantidade;
    subTotalElement.textContent = `R$ ${subTotalProduto.toFixed(2)}`;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}



let slideIndex = 1;
    showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide_produto");
    let dots = document.getElementsByClassName("");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}
function consultarFrete() {
    var cep = document.getElementById("cep").value;

    cep = cep.replace(/\D/g, '');

    if (cep.length === 8) {
        alert("Consulta de frete para o CEP: " + cep + "\n\nPAC: R$ 20,00\nSedex: R$ 40,00");
    } else {
        alert("Por favor, digite um CEP válido.");
    }
}
