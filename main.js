// procura no arquivo thml os elementos com classes "character" (imagem) e "container-character" (div da imagem) e os salva em constantes
const character = document.getElementsByClassName("character")[0]; 
const containerCharacter = document.getElementsByClassName("container-character")[0];

// salva a altura e a largura do personagem
const characterHeight = 100
const characterWidth = 100 

// capta largura e altura disponíveis da tela (desconsiderando interfaces e etc)
const windowWidth = screen.availWidth 
const windowHeight = screen.availHeight

const VELOCITY = 10; // cria uma constante de velocidade que será usada à frente

// capta largura e altura da tela do dispositivo do usuário
const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height; 

let xPosition = 500; // variável para a posição horizontal do personagem jogável
let yPosition = 300; // variável para a posição vertical do personagem jogável

// arrays com os nomes das teclas que terão funções no jogo e direções (que são classes de estilização para o personagem), respectivamente
const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"]; // dizem para qual lado o personagem ficará virado

// adiciona um event listener (função que espera um evento acontecer) que dispara quando uma tecla é pressionada na janela
window.addEventListener("keydown", (event) => {
    const key  = event.key; // capta qual foi a tecla apertada

    const keyPressedAvaiable =  keysAvaiable.some((currentKey) => { // verifica se a tecla está no array de teclas com funções, citado acima
        return currentKey === key; // retorno da função ("a tecla apertada é equivalente a alguma tecla do vetor?"")
    })

    if(!keyPressedAvaiable) return; // encerra a função do event listener caso a tecla não seja importante à função

    directions.forEach((direction) => { // inicia uma função para cada valor no vetor de direções
        if(character.classList.contains(direction)) character.classList.remove(direction); // remove qualquer classe de estilização existente no personagem, para atribuí-la em seguida
    })


    // variáveis que verificam se algum dos movimentos faria o personagem sair da tela, apontando se o movimento pode ser realizado ou não
    let canWalkUp = yPosition - VELOCITY >= 0 
    let canWalkDown = yPosition + VELOCITY + 1.5 * characterHeight < windowHeight //1.5 pq tava saindo parcialmente pra mim
    let canWalkLeft = xPosition - VELOCITY >= 0 
    let canWalkRight = xPosition + VELOCITY +  characterWidth < windowWidth 

    // verifica qual das teclas foi apertada e se o movimento referente à tecla pode ser realizado sem que o personagem saia da tela
    // ao encontrar a tecla, se o movimento puder acontecer, adiciona a classe de estilização referente à tecla e atualiza a variável de posição
    if(key === "ArrowUp" && canWalkUp){ 
        character.classList.add("turnUp");
        yPosition -= VELOCITY; 
    }

    if(key === "ArrowDown" && canWalkDown){ 
        character.classList.add("turnDown");
        yPosition += VELOCITY; 
    }

    if(key === "ArrowLeft" && canWalkLeft){ 
        character.classList.add("turnLeft"); 
        xPosition -= VELOCITY;
    }

    if(key === "ArrowRight" && canWalkRight){ 
        character.classList.add("turnRight"); 
        xPosition += VELOCITY; 
    }

    containerCharacter.style.top = `${yPosition}px`; // atualiza verticalmente a posição do personagem
    containerCharacter.style.left = `${xPosition}px` // atualiza horizontalmente a posição do personagem
});
