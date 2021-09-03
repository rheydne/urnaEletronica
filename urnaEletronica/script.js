let seuVotoPara = document.querySelector('.d1Left1 span');
let cargo = document.querySelector('.d1Left2 span');
let numeros = document.querySelector('.d1Left3');
let descricao = document.querySelector('.d1Left4');
let aviso = document.querySelector('.d2');
let right = document.querySelector('.d1Right');

let etapaAtual = 0;
let numero = '';
let votoBranco = true;
let votos = [];

function comecarEtapa() {

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="number flashes"></div>';
        }
        else{
            numeroHtml += '<div class="number"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    right.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1Image Small"> <img src="img/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda} </div>`;
            } else {
                fotosHtml += `<div class="d1Image"> <img src="img/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda} </div>`;
            }
            
        }
        right.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class = "avisoGrande flashes">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector('.number.flashes');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('flashes');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('flashes');
        }else{
            atualizaInterface();
        }
    }
}

function branco(){
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class = "avisoGrande flashes">VOTO EM BRANCO</div>';
    right.innerHTML = '';
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class = "avisoGigante flashes">FIM!</div>';
        }
    }
}

comecarEtapa();