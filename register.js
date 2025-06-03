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
        const addres = await dados.json();

        //hasOwnProperty verifica se o objeto tem a propriedade especificada e retorna true ou false
        if (addres.hasOwnProperty('erro')) {
            alert('CEP não encontrado!');
        } else {
            preencherFormulario(addres);
        }
    }
}

//Função para preencher o formulario
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

//Função para limpar o formulario
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('complemento').value = '';
}

document.getElementById("cep").addEventListener("focusout", pesquisarCep);