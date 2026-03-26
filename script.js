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
            calculate();
            
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

        if (resultValue.toString().split(".")[1]?.length > 5) {
            currentNumber = parseFloat(resultValue.toFixed(5)).toString();
        } else {
            currentNumber = resultValue.toString();
        } /*resultValue.toString converte numero para string*/
        /*.split(".") divide em 2 partes, o numero inteiro dos decimais*/
        /*[1] pega a parte decimal */
        /*?.length mede o tamanho se ele existir e o ? evita erro se não
        houver decimal*/

        operator = null;
        firstOperand = null;
        restart = true;
        percentageValue = null;
        updateResult(); /*depois de feito o calculo, operator, firstOperator
        e percentageValue serão nulos e o restart apos clicar no = fará que
        o proximo digito clicado restarte o display*/
    }

    function clearCalculator() {
        currentNumber = "";
        firstOperand = null;
        operator = null;
        updateResult(true);

        /*função que fará o currentNumber ficar vazio, primeiro operador e
        operador nulos e chamará a função de atualizar o resultado
        updateResult' */
    }

    function setPercentage() {
        let result = parseFloat(currentNumber) / 100;

        if (["+", "-"].includes(operator)) {
            result = result * (firstOperand || 1);
            /*no caso do operador ser = OU - como no calculo: 1 +1,
            o botão % transformará o currentNumber em currentNumber/100 * firstOperand
            ou numero 1, caso não exista firstOperand. seria algo como
            10 + 10'%' = '10' + 10/100 *  '10' = 11
            10 - 10'%' = '10' - 10/100 *  '10' = 9
            10 '%' = 0,1 */
        }
         if (result.toString().split(".")[1]?.length > 5) {
            result = result.toFixed(5).toString();
         }

         currentNumber = result.toString();
         updateResult();
    }

buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        const buttonText = button.innerText; /*variavel que pega o texto do botão clicado*/
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText); 
            /*se o botão tem um texto de 0 a 9 ou tem , ele passa
            no teste e é chamada a função addDigit que add o digito
            no resultado*/
        } else if (["+", "-", "x", ":"].includes(buttonText)) {
            setOperator(buttonText); /*verificação se o botão clicado
            é um operador, se sim, chama a função setOperator*/
        } else if (buttonText == "=") {
            calculate();
        } else if (buttonText == "C") {
            clearCalculator();
        } else if (buttonText == "+-") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ) .toString();
            updateResult();
        } else if (buttonText == "%") {
            setPercentage();
        }
    });
});

/*Adicionado evento de click*/


