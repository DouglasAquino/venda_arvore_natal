const tabela_valores = [
    [9.99, 29.99],
    [14.99, 59.99],
    [29.99, 99.99],
]
var card_selecionado = {
    card: null,
    indice: 0,
    valor: 0,
};

var forma_pagamento = null;

function openCard(card){
    let entrada = document.querySelector("#entrada");
    entrada.style.display = "block";
    entrada.value = 1;
    let cards = document.querySelectorAll(".card");
    if(card_selecionado.card){
        card_selecionado.card.querySelector(".card-info").querySelector("h1").textContent = card_selecionado.valor;
    }
    card_selecionado.card = card;
    card.style.width = "700px";
    card.style.height = "350px";    
    cards.forEach(outros => {
        if(outros != card){
            outros.style.width = "350px";
            outros.style.height = "max-content";
        }
    })
}

function mudarPagamento(pagamento){
    let sem = document.querySelector("#semana");
    let mes = document.querySelector("#mes");
    let cards = document.querySelectorAll(".card");
    if(pagamento == "semana"){
        forma_pagamento = pagamento;
        sem.style.fontWeight = "bold";
        mes.style.fontWeight = "initial";
    }else{
        sem.style.fontWeight = "initial";
        mes.style.fontWeight = "bold";
    }
    cards.forEach((card,indice) =>{
        let info = card.querySelector(".card-info");
        if(pagamento == "semana"){
            info.querySelector("h1").textContent = "R$ "+tabela_valores[indice][0];
            info.querySelector("h3").textContent = "POR SEMANA";
        }else{
            info.querySelector("h1").textContent = "R$ "+tabela_valores[indice][1];
            info.querySelector("h3").textContent = "POR MÊS";
        }
        card.addEventListener("click",() => {
            card_selecionado.indice = indice;
            openCard(card);
        });
    });
}

window.onload = () => {
    let botao = document.querySelector("#btn-change");
    mudarPagamento("mes");
    botao.addEventListener("click",()=>{
        if(botao.className == "fas fa-toggle-on"){
            botao.className = "fas fa-toggle-off";
            mudarPagamento("semana");
        }else{
            botao.className = "fas fa-toggle-on";
            mudarPagamento("mes");
        }        
    });
    let entrada = document.querySelector("#entrada");
    entrada.addEventListener("change",()=>{
        let info = card_selecionado.card.querySelector(".card-info");
        if(forma_pagamento == "semana"){
            card_selecionado.valor = tabela_valores[card_selecionado.indice][0];
        }else{
            card_selecionado.valor = tabela_valores[card_selecionado.indice][1];
        }
        info.querySelector("h1").textContent = "R$ "+parseFloat((entrada.value * card_selecionado.valor).toFixed(2));
    })
}