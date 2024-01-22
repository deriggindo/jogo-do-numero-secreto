let listaDeNumerosSorteados = [];
let maiorNumeroDaLista = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

responsiveVoice.speak('Boas vindas ao Jogo do Número Secreto', 'Brazilian Portuguese Female', {rate: 1.2});

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e ${maiorNumeroDaLista}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto "${numeroSecreto}" com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled',true);
        document.getElementById('chuteusuario').setAttribute('disabled',true);
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * maiorNumeroDaLista + 1);
    // console.log(`Numero Sorteado: ${numeroSorteado}`);

    if (listaDeNumerosSorteados.length == maiorNumeroDaLista) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    // console.log(listaDeNumerosSorteados);
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('chuteusuario').removeAttribute('disabled');
}

console.log(numeroSecreto);