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

function addDigit(digit) {
    if (digit == "," && (currentNumber.includes(",") || !currentNumber))
        return; /*se foi clicado a , e ja tem , então o sistema da um return*/
    
    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    } /*evita que restarte os numeros ja clicados da tela de resultados
    fazendo os numeros aparecerem em sequencia sem sumirem*/

    updateResult();
}

    function setOperator(newOperator) {
        if (currentNumber) {
            firstOperand = parseFloat(currentNumber.replace(",", "."));
            currentNumber = "";
        } /*verifica se existe numero atual, se sim, converte ele em
        numero decimal mudando a , por . na casa decimal, salvando em
        'firstOperand' e zerando o currentNumber para que possa ter o
        botão seguinte digitado*/

        operator = newOperator /*armazenar o operador na variavel operator*/
    }

    function calculate () {
        if (operator == null || firstOperand == null) return; /*verifica se existe numero digitado e operador
        para realizar um calculo, caso não, não faz nada*/
        let secondOperand = parseFloat(currentNumber.replace(",", "."));
        let resultValue; 

        switch (operator) {
            case "+":
                resultValue = firstOperand + secondOperand;
                break;
            case "-":
                resultValue = firstOperand - secondOperand;
                break;
             case "x":
                resultValue = firstOperand * secondOperand;
                break;
             case ":":
                resultValue = firstOperand / secondOperand;
                break;
                default:
                return;         

        }
    }



buttons.forEach((button) => {
    button.addEeventListener("click", () =>{
        const buttonText = button.innerText; /*variavel que pega o texto do botão clicado*/
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText); 
            /*se o botão tem um texto de 0 a 9 ou tem , ele passa
            no teste e é chamada a função addDigit que add o digito
            no resultado*/
        } else if (["+", "-", "x", ":"].includes(buttonText)) {
            setOperator(buttonText); /*verificação se o botão clicado
            é um operador, se sim, chama a função setOperator*/
        }
    });
});

/*Adicionado evento de click*/


