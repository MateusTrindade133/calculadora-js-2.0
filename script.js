const result = document.querySelector(".result");
/* const declara uma constante, guarda o elemento da classe result dentro da variavel
document representa toda pagina html carregada
querySelector(".result") procura o primeiro elemento que tenha a classe result*/

const buttons = document.querySelectorAll(".buttons button"); 
/* ALL puxa todos os que possuem o elemento selecionado */

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

/* let é variavel */

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}
/* função que atualiza o que aparece na tela
    se mandar limpar (originClear=true) vai mostrar um 0
    se não mandar, mostra o numero atual (currentNumber), 
    trocando . por , para representar o decimal
*/
