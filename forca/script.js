//ARQUIVOS DE IMAGEM E DE AUDIO NAO INCLUIDOS

//Sons de interação
var audio = [new Audio('songs/Tons.ogg'), new Audio('songs/Tênis.ogg'), new Audio('songs/Apito.ogg'), new Audio('songs/Xilofone.ogg'), new Audio('songs/Tesouro.ogg'), new Audio('songs/Calmaria.ogg')];

document.querySelectorAll('button')[1].addEventListener('click', function ok() {


    var chance = 6; //número de vidas do jogador
    var s = 0; //contador bloco de vidas/conta erros
    audio[3].play(); //Som do click do botão

    //Verificação de valor do input se é vazio
    if (document.querySelectorAll('input')[0].value.trim() != '' && document.querySelectorAll('input')[1].value.trim() != '') {

        //Inicializando blocos do game
        document.querySelector('#mosradores').style.display = 'flex'; //bloco de de armazenamento das vidas no campo superior direito
        document.querySelector('.chances').style.display = 'flex'; //Bloco que armazena icones de corações
        document.querySelector('.Game').style.height = '30%'; //Diminuindo escala do bloco game para incerir opções de jogada
        document.querySelector('.dica h2').innerHTML = document.querySelectorAll('input')[1].value.toUpperCase(); //Atribuindo ao h2 a dica

        //Variaveis da palavra/Verificação/globais
        var palavra = ' ' + document.querySelectorAll('input')[0].value.toUpperCase();
        var sep = palavra.split(''); //Separando a palavra digitada em blocos para comparação
        var i = 1; //contador de criação de blocos
        var aux; //guarda o valor de blocos anteriores para adicionar mais outros sem perder o valor anterior
        var guardarValor = ''; //faz comparação com valore do blocos do jogo


        //========================================VERIFICAR VENCEDOR===================================================>>
        //Função de verificação de caixas de palavras
        function Win() {

            var contador = 0; //contador de blocos, verifica valor de blocos <.bl>
            var palavraVerificacao = ''; //recebe o valor dos blocos <.bl>
            var auxVerificacao = ''; //recebe o valor anterior da variavel palavraVerificacao

            //Mostrar tela de vencedor caso o jogo termine
            var time = setInterval(() => {
                auxVerificacao = palavraVerificacao; //Atribuindo valor anterior
                palavraVerificacao = palavraVerificacao + document.querySelectorAll('.bl')[contador].innerHTML //Pegando proximo valor

                if (document.querySelectorAll('.bl')[contador].innerHTML != '') {

                    //Verificação de valores, para não se repetir
                    if (guardarValor != auxVerificacao) {

                        var guardarValor = palavraVerificacao //Guardar valor palavraVerificacao

                        if (guardarValor == document.querySelectorAll('input')[0].value.toUpperCase()) {

                            audio[4].play() //Audio campeão
                            document.querySelector('#WinTela').style.display = 'flex'; //Abrindo tela do campeão
                            document.querySelector('h1').innerHTML = 'Parabéns'; //Imprimindo mensagem na tela
                            document.querySelector('h1').style.color = 'orange'; //Cor da letra da mensagem
                            document.querySelector('img').src = 'assets/moedagold.gif'; //Imagem moeda ouro

                            document.querySelector('#content').style.display = 'none'; //Fechando bloco de jogo
                            document.querySelector('.dica').style.display = 'none'; //fechando a dica
                            clearInterval(time) //Encerrer intervalo(loop)
                        }
                    }
                }

                contador++ //Adicionando +1 no contador
                (contador >= document.querySelectorAll('input')[0].value.length ? contador = 0 : contador = contador) //Zera o contador quando ele é menor ou igual a palavra que foi digitada


            }, 10)
        }
        //========================================VERIFICAR VENCEDOR===================================================>>

        //========================================VERIFICAR VENCEDOR===================================================>>

        function gameOver() {

            audio[5].play() //Som tela Game over
            document.querySelector('#WinTela').style.display = 'flex'; //Abrindo tela do perdedor
            document.querySelector('h1').innerHTML = 'GAME OVER'; //Imprimindo mensagem na tela
            document.querySelector('h1').style.color = 'red' //Cor da letra da mensagem
            document.querySelector('img').src = 'assets/MoedaBron.webp'; //Imagem moeda bronze

            document.querySelector('#content').style.display = 'none'; //Fechando bloco de jogo
            document.querySelector('.dica').style.display = 'none'; //fechando a dica
        }

        //========================================JOGADA===================================================>>

        var bl = 'bl'; //Variavel class= 'bl'
        aux = '' //auxiliar vazia

        do {
            document.querySelector('.worlks').innerHTML = aux = aux + `<div class='${bl}'></div>`; //Criando blocos de palavra
            i++ //Adicionando +1 no i
        } while (i <= palavra.length - 1);

        document.querySelector('.telaInicial').style.display = 'none'; //Fechando Tela de preenchimento;
        document.querySelector('.dica').style.display = 'flex'; //Abrindo dica
        document.body.style.display = 'block'; //removendo o display flex do corpo
        document.querySelector('.opc').style.display = 'block'; //abrindo opções de jogo 


        //Verificador de palavra que foi clicada/ jogada do player
        document.addEventListener('click', (event) => {
            if (event.target.matches('.alfaB')) {
                palavraPlayer(event.target.id) //retorna o objeto que foi clicado dentro do bloco .alfaB
            };
        });

        function palavraPlayer(id) {

            var jogada = document.getElementById(id).innerHTML; //bloco que foi clicado
            var cont = 0; //contador recebe 0 
            i = 1 //contador i reebe 1

            while (i <= palavra.length - 1) {

                if (jogada == sep[i].toUpperCase()) {
                    audio[3].play(); //Audio/ adicionar letra na caixa
                    document.querySelectorAll('.bl')[cont].innerHTML = jogada; //Adicionando a jogada no bloco <.bl>
                    document.getElementById(id).style.fontWeight = '800'; //Almentando o contraste para marcação
                    document.getElementById(id).style.fontSize = '1.2rem'; //Almentando a fonte
                    //CHAMA FUNÇÃO WIN PARA VERIFICAÇÃO
                    Win(); //Chamando tela do campeão para verificação
                }
                i++ //i recebe i+1
                cont++ //cont recebe cont + 1
            }

            //Verificar palavra de erro
            var x = ''; //Variavel auxiliar recebe vazio
            var a = 1; //contador a recebe 1

            while (a <= palavra.length - 1) {
                if (jogada.toUpperCase() == sep[a].toUpperCase()) {
                    x = 'letra encontrada'; //retorna valor caso aja a letra digitada
                }

                if (x == 'letra encontrada') {
                    return; //se letra foi encontrada ele retorna
                }
                a++; //a recebe a+1
            }

            if (x != 'letra encontrada') {
                audio[2].play(); //Audio de erro se a letra não for encontrada
                chance = chance - 1; //se a letra não for encontrada o player perde 1 chance/vida
                document.querySelectorAll('span')[s].style.color = 'gray'; //coração fica cinza
                document.getElementById(id).style.color = 'red'; //letra errada fica vermelha
                document.getElementById(id).style.fontWeight = '800'; //Almenta conraste da letra errada
                document.getElementById(id).style.fontSize = '1.2rem'; //Almenta a fonte da letra errada
                s++; //s recebe +1

                (chance <= 0 ? gameOver() : chance = chance); //verificando número de vidas
            }
        }
    } else {
        audio[2].play(); //Audio de alerta
        document.querySelectorAll('p')[0].innerHTML = 'O campo está vazio'; //Alertando o usuário que um campo está em branco
    }
    //========================================JOGADA===================================================>
});

function loanding() {
    document.querySelector('#content').style.display = 'block'; //quando tudo carregar mudar display do content para block
    document.querySelector('#loanding').style.display = 'none'; //quando tudo carregar mudar display do loanding para none
}

document.querySelectorAll('button')[0].addEventListener('click', () => {
    location.reload(); //Quando o jogo terminar e o usuário clicar em ok recarregar páginas
})

document.querySelector('.InputTogle span').addEventListener('click', () => {

    (document.querySelectorAll('input')[0].type == 'password' ? document.querySelectorAll('input')[0].type = 'text' : document.querySelectorAll('input')[0].type = 'password')

    (document.querySelector('.InputTogle span').innerHTML == 'visibility_off' ? document.querySelector('.InputTogle span').innerHTML = 'visibility' : document.querySelector('.InputTogle span').innerHTML = 'visibility_off')


})
