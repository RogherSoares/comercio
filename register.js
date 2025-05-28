'use strict'; //modo restrito

// Verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// Verifica se o CEP tem 8 dígitos
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if (cepValido(cep.value)) {
        const dados = await fetch(url);
        const address = await dados.json();

        //hasOwnProperty verifica se o objeto tem a propriedade especificada e retorna true ou false
        if (address.hasOwnProperty('erro')) {
            alert('CEP não encontrado!');
        } else {
            preencherFormulario(address);
        }
    }
}

//Função para limpar o formulario
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

//Função para preencher o formulario
const preencherFormulario = (address) => {
    document.getElementById('rua').value = address.logradouro;
    document.getElementById('bairro').value = address.bairro;
    document.getElementById('cidade').value = address.localidade;
    document.getElementById('estado').value = address.uf;
}