const character = document.getElementsByClassName("character")[0]; // procura no arquivo html o arquivo com classe "character" e o salva numa constante
const containerCharacter = document.getElementsByClassName("container-character")[0];  // faz o mesmo da linha acima, mas com a classe "container-character"

const characterHeight = 100 // salva a altura do personagem (container: 100px)
const characterWidth = 100 // salva a largura do personagem (container: 100px)


const windowWidth = screen.availWidth // capta a largura disponível da tela (desconsidera interfaces e etc)
const windowHeight = screen.availHeight // capta a altura disponível da tela

const VELOCITY = 10; // cria uma constante de velocidade que será usada à frente

const SCREEN_WIDTH = screen.width; // capta a largura da tela do dispositivo do usuário
const SCREEN_HEIGHT = screen.height; // capta a altura da tela do dispositivo do usuário

let xPosition = 500; // define uma variável para a posição horizontal (provavelmente inicial) do personagem jogável
let yPosition = 300; // variável para a posição vertical do personagem jogável

const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] // cria um vetor com nomes para as teclas que terão funções no jogo
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"]; // cria um vetor com nomes para as direções que serão utilizadas durante o jogo

window.addEventListener("keydown", (event) => { // adiciona um event listener que dispara quando uma tecla é pressionada na janela
    const key  = event.key; // capta qual foi a tecla apertada

    const keyPressedAvaiable =  keysAvaiable.some((currentKey) => { // verifica se a tecla está no vetor de teclas com funções, citado acima
        return currentKey === key; // retorno da função (a tecla apertada é equivalente a alguma tecla do vetor?)
    })

    if(!keyPressedAvaiable) return; // encerra a função caso a tecla não tenha função

    directions.forEach((direction) => { // inicia uma função para cada valor no vetor de direções
        if(character.classList.contains(direction)) character.classList.remove(direction); // caso o personagem tenha alguma direção em suas propriedades, remove essa direção
    })


    let canWalkUp = yPosition - VELOCITY >= 0 // verifica se o movimento para cima faria o personagem sair da tela
    let canWalkDown = yPosition + VELOCITY + 1.5 * characterHeight < windowHeight // verifica se o movimento para baixo faria o personagem sair da tela (1.5 pq tava saindo parcialmente pra mim)
    let canWalkLeft = xPosition - VELOCITY >= 0 // verifica se o movimento para a esquerda faria o personagem sair da tela
    let canWalkRight = xPosition + VELOCITY +  characterWidth < windowWidth // verifica se o movimento para a direita faria o personagem sair da tela


    if(key === "ArrowUp" && canWalkUp){ // verifica se a tecla apertada é a seta para cima (e se pode se mover sem sair da tela)
        character.classList.add("turnUp"); // se sim, adiciona a direção "virar para cima" e
        yPosition -= VELOCITY; // subtrai o valor da constante de velocidade do vetor vertical, fazendo o personagem se mover para cima
    }

    if(key === "ArrowDown" && canWalkDown){ // verifica se a tecla apertada é a seta para baixo (e se pode se mover sem sair da tela)
        character.classList.add("turnDown"); // se sim, adiciona a direção "virar para baixo" e
        yPosition += VELOCITY; // adiciona o valor da constante de velocidade ao vetor vertical, fazendo o personagem se mover para baixo
    }

    if(key === "ArrowLeft" && canWalkLeft){ // verifica se a tecla apertada é a seta para esquerda (e se pode se mover sem sair da tela)
        character.classList.add("turnLeft"); // se sim, adiciona a direção "virar para a esquerda" e
        xPosition -= VELOCITY; // subtrai o valor da constante de velocidade do vetor horizontal, fazendo o personagem se mover para a esquerda
    }

    if(key === "ArrowRight" && canWalkRight){ // verifica se a tecla apertada é a seta para direita (e se pode se mover sem sair da tela)
        character.classList.add("turnRight"); // se sim, adiciona a direção "virar para a direita", e
        xPosition += VELOCITY; // adiciona o valor da constante de velocidade do vetor horizontal, fazendo o personagem se mover para a direita
    }

    containerCharacter.style.top = `${yPosition}px`; // atualiza verticalmente a posição do personagem
    containerCharacter.style.left = `${xPosition}px` // atualiza horizontalmente a posição do personagem
});
