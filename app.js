let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = ""; // Limpa o campo de entrada
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpa a lista antes de recriá-la

    amigos.forEach((nome, index) => {
        const li = document.createElement("li");
        li.textContent = nome;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    let sorteio = [...amigos]; // Clona a lista original
    let resultado = {};

    for (let i = 0; i < amigos.length; i++) {
        let possiveis = sorteio.filter(nome => nome !== amigos[i]); // Evita que alguém se tire
        if (possiveis.length === 0) { 
            // Se sobrar só o próprio nome, refaz o sorteio
            return sortearAmigo(); 
        }
        let escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
        resultado[amigos[i]] = escolhido;
        sorteio.splice(sorteio.indexOf(escolhido), 1);
    }

    exibirResultado(resultado);
}

function exibirResultado(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = ""; // Limpa o conteúdo

    const nomes = Object.keys(resultado);
    const sorteado = nomes[Math.floor(Math.random() * nomes.length)]; // Sorteia um participante para revelar o amigo

    const mensagem = document.createElement("p");
    mensagem.textContent = `O amigo secreto sorteado é: ${resultado[sorteado]}`;
    
    listaResultado.appendChild(mensagem);
}
