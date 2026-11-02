const perguntas = [

    { pergunta: "Qual é o apelido carinhoso que eu gosto de usar para você?",
        respostas: [
            "Baixinha ",
            "Princesa",
            "Meu bem",
            "Vida "
        ],
        correta: 0
    },

    {
        pergunta: "Qual é uma coisa que eu sempre digo que quero fazer com você?",
        respostas: [
            " dormir juntos",
            " ir para a praia juntos",
            " casar com você",
            "ter filhos com você"
        ],
        correta: 2
    },

    {
        pergunta: "Qual minha banda favorita?",
        respostas: [
            " Skillet ",
            " Starset ",
            " Engenheiros do hawaii ",
            " Linkin Park "
        ],
        correta: 0
    },

    {
        pergunta: "Qual é minha cor favorita?",
        respostas: [
            " Vermelho ",
            " Azul ",
            " Preto ",
            " Branco "
        ],
        correta: 0
    },

    {
        pergunta: "Quais são meus animes favoritos?",
        respostas: [
            " Naruto, Fire force, Jujutsu kaisen ",
            " Fire force, Jujutsu kaisen, Kaiju no 8 ",
            " Naruto, Black clover, Nanatsu no taizai ",
            " Kaiju no 8, Black clover, Jujutsu kaisen "
        ],
        correta: 2
    },

    {
        pergunta: "Qual meu maior sonho?",
        respostas: [
            "Viajar pelo mundo",
            "Ter minha própria casa",
            "Ter minha própria família ",
            "Ter minha própria empresa "
        ],
        correta: 2
    },

    {
        pergunta: "Quais meus cantores favoritos?",
        respostas: [
            "Mano Walter, Hungria, Japãozinho",
            "Japãozinho, Felipe Amorim, Hungria",
            "Gusttavo Lima, Hungria, Luan Santana",
            "Hungria, Felipe Amorim, Mano Walter"
        ],
        correta: 0
    },

    {
        pergunta: "Qual meu jogo favorito?",
        respostas: [
            "Rocket League",
            "Honor of Kings",
            "Minecraft",
            "Free Fire"
        ],
        correta: 2
    },

    {
        pergunta: "Qual é o lugar que eu mais quero visitar?",
        respostas: [
            "Japão",
            "Rota 66",
            "França",
            "Itália"
        ],
        correta: 1
    },

    {
        pergunta: "Depois de responder tudo, o que vc acha que é a sua recompensa?",
        respostas: [
            "Um chocolate 🍫",
            "Uma surpresa ❤️",
            "Um abraço 🤗",
            "Nada 😂"
        ],
        correta: 1
    }

];
let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;

const elemento = (id) => document.getElementById(id);
const inicio = elemento("inicio");
const jogo = elemento("jogo");
const premio = elemento("premio");
const pergunta = elemento("pergunta");
const respostas = elemento("respostas");
const resultado = elemento("resultado");
const proxima = elemento("proxima");

function carregarPergunta() {
    const atual = perguntas[perguntaAtual];
    respondeu = false;
    pergunta.textContent = atual.pergunta;
    elemento("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    elemento("barra-progresso").max = perguntas.length;
    elemento("barra-progresso").value = perguntaAtual;
    respostas.replaceChildren();
    resultado.textContent = "";
    proxima.hidden = true;
    proxima.textContent = perguntaAtual === perguntas.length - 1 ? "Ver resultado 💕" : "Próxima 💕";
    atual.respostas.forEach((resposta, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = resposta.trim();
        botao.addEventListener("click", () => verificarResposta(indice));
        respostas.appendChild(botao);
    });
    pergunta.focus();
}

function verificarResposta(indice) {
    if (respondeu) return;
    respondeu = true;
    const atual = perguntas[perguntaAtual];
    respostas.querySelectorAll("button").forEach((botao, posicao) => {
        botao.disabled = true;
        if (posicao === atual.correta) botao.classList.add("correta");
        else if (posicao === indice) botao.classList.add("incorreta");
    });
    if (indice === atual.correta) {
        pontos++;
        resultado.textContent = "Acertou! 🥰";
    } else {
        resultado.textContent = `Não foi dessa vez! A resposta é: ${atual.respostas[atual.correta].trim()}. ❤️`;
    }
    elemento("barra-progresso").value = perguntaAtual + 1;
    proxima.hidden = false;
}

function proximaPergunta() {
    if (!respondeu) return;
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) carregarPergunta();
    else finalizarQuiz();
}

function finalizarQuiz() {
    jogo.hidden = true;
    premio.hidden = false;
    const ganhou = pontos === perguntas.length;
    elemento("titulo-final").textContent = ganhou ? "Você conseguiu! 🎉" : "Quase! ❤️";
    elemento("pontuacao").textContent = `Você acertou ${pontos} de ${perguntas.length}.`;
    elemento("mensagem-final").textContent = ganhou ? "Sua surpresa está esperando por você! 🥰" : "Tente novamente para desbloquear sua surpresa! 😘";
    elemento("abrir-surpresa").hidden = !ganhou;
    elemento("surpresa").hidden = true;
    elemento("reiniciar").textContent = ganhou ? "Jogar novamente ❤️" : "Tentar novamente ❤️";
    elemento("titulo-final").focus();
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    inicio.hidden = true;
    premio.hidden = true;
    jogo.hidden = false;
    carregarPergunta();
}

elemento("comecar").addEventListener("click", reiniciarQuiz);
elemento("reiniciar").addEventListener("click", reiniciarQuiz);
proxima.addEventListener("click", proximaPergunta);
elemento("abrir-surpresa").addEventListener("click", () => {
    elemento("surpresa").hidden = false;
    elemento("abrir-surpresa").hidden = true;
});
