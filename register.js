'use strict'; //modo restrito

// Verifica se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// Verifica se o CEP tem 8 dígitos
const cepValido = (cep) => cep.length === 8 && eNumero(cep);