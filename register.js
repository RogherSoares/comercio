'use strict'; //Modo "Restrito"
//Consumindo API de CEP, do ViaCep
// https://viacep.com.br/

//Verifica se o CEP é válido...
const eNumero = (numero) => /^[0-9]+$/.test(numero); //Expressão Regular
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

//Consumindo API... 2- passo
const pesquisarCep = async() => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url); //await = esperar fetch = promessa
        const addres = await dados.json(); 
        
        // hasOwnProperty  retorna um booleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão
        if(addres.hasOwnProperty('erro')){ 
            // document.getElementById('rua').value = 'CEP não encontrado!';
            alert('CEP não encontrado!');
        }else {
            preencherForumulario(addres);
        }
    }else{
        // document.getElementById('rua').value = 'CEP incorreto!';
        alert('CEP incorreto!');
    } 
}

//Limpa o Form (do CEP pra baixo)...
const limparFormulario = () =>{
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Preenche os campos relacionados ao CEP...
const preencherForumulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//Adicionando um evento DOM, no input CEP... 1- passo
document.getElementById('cep').addEventListener('focusout', pesquisarCep);

//Validando o CPF
const eCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); //Remove tudo que não for dígito
    if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) 
        return false; //Verifica se o CPF tem 11 dígitos e se não é uma sequência de números iguais
    let soma = 0;
    for(let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;
    if(resto !== parseInt(cpf[9])) 
        return false;

    soma = 0;
    for(let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if(resto === 10) resto = 0;
    return resto === parseInt(cpf[10]);
};

// Adiciona evento para validar CPF ao sair do campo
document.getElementById('cpf').addEventListener('focusout', function() {
    const cpf = this.value;
    const erroSpan = document.getElementById('cpf-erro');
    if (!eCpf(cpf)) {
        erroSpan.textContent = 'CPF inválido!';
        erroSpan.style.color = 'red';
    } else {
        erroSpan.textContent = '✔';
        erroSpan.style.color = 'green';
    }
});