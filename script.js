const modulos = [
    {
        titulo: "Política de Segurança da Informação",
        conteudo: "Política de Segurança da Informação (PSI) é um conjunto de regras, diretrizes e práticas que uma organização define para proteger seus dados e sistemas, baseada nos pilares de Confidencialidade, Integridade e Disponibilidade (CID), assegurando conformidade legal (como a LGPD) e a continuidade dos negócios, envolvendo conscientização de todos os colaboradores e atualização constante. Define regras, responsabilidades e diretrizes para uso seguro das informações."
    },
    {
        titulo: "Plano de Contingência",
        conteudo: "Um Plano de Contingência é um documento estratégico que detalha como uma organização (empresa, governo, etc.) deve reagir a situações de emergência, crise ou desastre, definindo ações, responsabilidades e recursos para garantir a continuidade das operações e minimizar perdas, como falhas de sistemas, desastres naturais ou crises de saúde pública, com o objetivo de restaurar a normalidade o mais rápido possível. Define ações para manter operações críticas durante incidentes."
    },
    {
        titulo: "LGPD e Proteção de Dados",
        conteudo: "A LGPD (Lei Geral de Proteção de Dados) é a lei brasileira que protege a privacidade e os dados pessoais dos indivíduos, garantindo controle sobre como empresas e órgãos públicos coletam, usam, armazenam e compartilham informações, estabelecendo regras de transparência, segurança, finalidade e consentimento, com fiscalização da ANPD (Autoridade Nacional de Proteção de Dados) e multas para descumprimento, visando segurança jurídica e direitos fundamentais. Regulamenta o tratamento de dados pessoais no Brasil."
    }
];

let moduloAtual = 0;

const questoes = [
    {
        pergunta: "Qual é o principal objetivo da Segurança da Informação?",
        alternativas: [
            "Garantir confidencialidade, integridade e disponibilidade das informações.",
            "Criar senhas difíceis para usuários.",
            "Instalar antivírus em todos os computadores.",
            "Usar redes Wi-Fi públicas com segurança."
        ],
        correta: 0
    },
    {
        pergunta: "O que é phishing?",
        alternativas: [
            "Tentativa de enganar usuários para obter informações sensíveis.",
            "Um tipo de firewall avançado.",
            "Um método de criptografia moderna.",
            "Um backup automático na nuvem."
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a finalidade da LGPD?",
        alternativas: [
            "Proteger dados pessoais e garantir direitos aos titulares.",
            "Criar senhas seguras para empresas.",
            "Monitorar redes sociais.",
            "Controlar o uso de dispositivos móveis."
        ],
        correta: 0
    },
    {
        pergunta: "O que é autenticação de dois fatores (2FA)?",
        alternativas: [
            "Um método que requer duas formas de verificação.",
            "Um antivírus mais completo.",
            "Um tipo de ataque hacker.",
            "Uma configuração de hardware."
        ],
        correta: 0
    },
    {
        pergunta: "O que é ransomware?",
        alternativas: [
            "Um malware que sequestra dados e exige pagamento.",
            "Um programa de backup.",
            "Uma ferramenta de testes de rede.",
            "Um método de autenticação."
        ],
        correta: 0
    },
    {
        pergunta: "O que é engenharia social?",
        alternativas: [
            "Manipular pessoas para obter informações.",
            "Criar sistemas inteligentes.",
            "Apenas ataques físicos a servidores.",
            "Treinar usuários para se defenderem."
        ],
        correta: 0
    },
    {
        pergunta: "O que significa integridade da informação?",
        alternativas: [
            "Garantir que a informação não seja alterada sem autorização.",
            "Manter todos os dados criptografados.",
            "Permitir que usuários modifiquem registros.",
            "Aumentar o armazenamento do servidor."
        ],
        correta: 0
    },
    {
        pergunta: "O que é firewall?",
        alternativas: [
            "Um sistema que controla o tráfego de rede permitindo ou bloqueando acessos.",
            "Um vírus avançado.",
            "Um tipo de senha segura.",
            "Um protocolo de e-mail."
        ],
        correta: 0
    },
    {
        pergunta: "O que deve fazer ao receber um e-mail suspeito?",
        alternativas: [
            "Não clicar em links e não baixar anexos.",
            "Responder imediatamente.",
            "Inserir seus dados pessoais.",
            "Abrir o arquivo para verificar o conteúdo."
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a melhor prática ao criar uma senha segura?",
        alternativas: [
            "Usar combinação de letras maiúsculas, minúsculas, números e símbolos.",
            "Utilizar apenas o nome da empresa.",
            "Repetir a mesma senha em todos os sites.",
            "Usar somente números para facilitar."
        ],
        correta: 0
    }
];

function iniciarTreinamento() {
    document.getElementById("inicio").classList.add("hidden");
    carregarModulo();
}

function carregarModulo() {
    const modulo = modulos[moduloAtual];
    document.getElementById("modulo").classList.remove("hidden");
    document.getElementById("tituloModulo").innerText = modulo.titulo;
    document.getElementById("conteudoModulo").innerText = modulo.conteudo;
}

function proximoModulo() {
    moduloAtual++;
    if (moduloAtual >= modulos.length) {
        document.getElementById("modulo").classList.add("hidden");
        gerarProva();
    } else {
        carregarModulo();
    }
}

let perguntasAplicadas = [];
let respostasUsuario = {};

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function gerarProva() {
    document.getElementById("avaliacao").classList.remove("hidden");

    let form = document.getElementById("formAvaliacao");
    form.innerHTML = "";

    respostasUsuario = {};

    let perguntasMisturadas = embaralhar([...questoes]);

    perguntasAplicadas = perguntasMisturadas.slice(0, 10);

    perguntasAplicadas.forEach(q => {
        q.alternativasEmbaralhadas = embaralhar(
            q.alternativas.map((texto, idx) => ({
                texto,
                indexOriginal: idx
            }))
        );
    });

    perguntasAplicadas.forEach((q, i) => {
        form.innerHTML += `
            <div class="pergunta-box" id="pergunta${i}">
                <p><strong>${i + 1}. ${q.pergunta}</strong></p>
                ${q.alternativasEmbaralhadas.map(alt => `
                    <div class="alternativa"
                        onclick="selecionarAlternativa(${i}, ${alt.indexOriginal}, ${q.correta}, this)">
                        ${alt.texto}
                    </div>
                `).join("")}
            </div>
        `;
    });
}

function selecionarAlternativa(num, alternativaEscolhida, correta, elemento) {
    const box = document.getElementById("pergunta" + num);

    if (box.classList.contains("respondida")) return;
    box.classList.add("respondida");

    if (alternativaEscolhida === correta) {
        elemento.style.background = "#4CAF50";
        elemento.style.color = "white";
    } else {
        elemento.style.background = "#E53935";
        elemento.style.color = "white";
    }

    respostasUsuario[num] = alternativaEscolhida;
}

function finalizarAvaliacao() {
    if (Object.keys(respostasUsuario).length < 10) {
        alert("Responda todas as questões!");
        return;
    }

    let acertos = 0;

    perguntasAplicadas.forEach((q, i) => {
        if (respostasUsuario[i] === q.correta) acertos++;
    });

    const nota = (acertos / 10) * 100;

    document.getElementById("avaliacao").classList.add("hidden");

    if (nota >= 70) {
        document.getElementById("mensagemFinal").classList.remove("hidden");
    } else {
        alert("Você tirou " + nota + "%. Tente novamente.");
        location.reload();
    }
}

function mostrarCertificado() {
    document.getElementById("mensagemFinal").classList.add("hidden");
    document.getElementById("certificado").classList.remove("hidden");
}

function gerarCertificadoPDF() {
    const nome = document.getElementById("nomeCompleto").value;
    const email = document.getElementById("email").value;

    if (!nome || !email) {
        alert("Preencha todos os dados!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const logo = new Image();
    logo.src = "proz-logo.png";

    logo.onload = function () {
        pdf.addImage(logo, "PNG", 75, 10, 60, 30);

        pdf.setFontSize(22);
        pdf.text("Certificado de Conclusão", 60, 60);

        pdf.setFontSize(14);
        pdf.text(`Certificamos que ${nome}`, 20, 90);
        pdf.text("Concluiu o Treinamento de Segurança da Informação.", 20, 105);
        pdf.text(`E-mail: ${email}`, 20, 120);
        pdf.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 20, 135);

        pdf.save(`certificado-${nome}.pdf`);
    };
}
