
const containerCards = document.getElementById('containerCards')
const botoes= document.getElementById('botoes')
const textoFooter1= document.getElementById("texto-footer1")
const textoFooter2= document.getElementById("texto-footer2")
const textoFooter3= document.getElementById("texto-footer3")

const modalDetalhe = new bootstrap.Modal("#modalDetalhe");
const botaoFecharModal= document.getElementById("botaoFecharModal")

let pagina = 1
let quantidadeDePaginas;

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

function selecionarPagina(novaPagina) {
  pagina = novaPagina
  carregarPagina()
}


function aumentarPagina() {
  if (pagina !== quantidadeDePaginas) {
    pagina++
    carregarPagina()
  }
}

function diminuirPagina() {
  if (pagina > 1) {
    pagina--
    carregarPagina()
  }
}
  
  async function carregarPagina() {
    try {
      const response = await instance.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)

        const results = response.data.results
        quantidadeDePaginas= response.data.info.pages
        containerCards.innerHTML= ""

        for (let index = 0; index < results.length; index++) {
          const personagem = results[index];

          console.log(personagem)

          const card = document.createElement("div");
          card.className= "card";

          const divImage = document.createElement("div");
          divImage.className= "divImage";

          const imageCard = document.createElement("img")
          imageCard.src= results[index].image
          imageCard.className= "imageCard"
          imageCard.innerHTML

          const infoCard = document.createElement("div")
          infoCard.className= "infoCard"

          const nameCard = document.createElement("h5");
          nameCard.innerHTML= results[index].name
          nameCard.className= "nameCard"

          let statusCor= ""

          if (results[index].status == "Alive") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }

          if (results[index].status == "Dead") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }

          if (results[index].status == "unknown") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="grey" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }
          
          const status = document.createElement("h6")
          status.innerHTML=` ${statusCor} ${results[index].status}`
          

          const species = document.createElement("h6");
          species.innerHTML=`${results[index].species}`

          const botaoDetalhe = document.createElement("button");
          botaoDetalhe.className= "botaoDetalhe";
          botaoDetalhe.innerHTML=`<a href="#" class="text-decoration-none" data-bs-toggle="modal"
          data-bs-target="#modalDetalhe">Detalhes do personagem</a>`
  
          divImage.appendChild(imageCard)

          infoCard.appendChild(nameCard)
          infoCard.appendChild(status)
          infoCard.appendChild(species)
          infoCard.appendChild(botaoDetalhe)

          card.appendChild(divImage)
          card.appendChild(infoCard)

          containerCards.appendChild(card)


          // MODAL ao click do botão detalhes

          botaoDetalhe.addEventListener('click', () => {

          const cardDetalhe= document.createElement("div");
          cardDetalhe.className= "cardDetalhe";

          const divImage = document.createElement("div");
          divImage.className= "divImage";

          const imageCard = document.createElement("img")
          imageCard.src= results[index].image
          imageCard.className= "imageCard"
          imageCard.innerHTML

          const infoCard = document.createElement("div")
          infoCard.className= "infoCard"

          const nameCard = document.createElement("h5");
          nameCard.innerHTML= results[index].name
          nameCard.className= "nameCard"

          let statusCor= ""

          if (results[index].status == "Alive") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }

          if (results[index].status == "Dead") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }

          if (results[index].status == "unknown") {
            statusCor= `<span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" fill="grey" class="bi bi-circle-fill" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="8"/> </svg></span>`
          }
          
          const status = document.createElement("h6")
          status.innerHTML=` ${statusCor} ${results[index].status}`
          
          const species = document.createElement("h6");
          species.innerHTML=`${results[index].species}`
  
          const ultimaLocalizacao = document.createElement("p");
          ultimaLocalizacao.innerHTML=`Última localização conhecida: ${results[index].location.name}`

          const ultimoEpisodio = document.createElement("p");
          ultimoEpisodio.innerHTML=`Visto pela primeira vez em: ${results[index].origin.name}`


          divImage.appendChild(imageCard)

          infoCard.appendChild(nameCard)
          infoCard.appendChild(status)
          infoCard.appendChild(species)
          infoCard.appendChild(ultimaLocalizacao)
          infoCard.appendChild(ultimoEpisodio)

          cardDetalhe.appendChild(divImage)
          cardDetalhe.appendChild(infoCard)

          containerDetalhe.appendChild(cardDetalhe)
            
          });
      
        }

        const personagens= response.data.info.count
        textoFooter1.innerHTML= `PERSONAGENS:<span style="color: white"> ${personagens}</span>`

    } catch (error) {
      console.log(error)
    }
  }

  // Fechar e resetar conteudo modalDetalhe

  botaoFecharModal.addEventListener("click", ()=> {
            
    containerDetalhe.innerHTML= " "

    modalDetalhe.hide()

  });

async function carregarLocalizacoes() {
    await carregarPagina()
  
    try {
      const response = await instance.get(`https://rickandmortyapi.com/api/location`)

      const localizacoes= response.data.info.count
      textoFooter2.innerHTML= `LOCALIZAÇÕES: <span style="color: white"> ${localizacoes}</span>`
    } catch (error) {
      console.log(error)
    }
}
carregarLocalizacoes()

async function carregarEpisodios() {
  await carregarPagina()

  try {
    const response = await instance.get(`https://rickandmortyapi.com/api/episode`)

    const episodios= response.data.info.count
    textoFooter3.innerHTML= `EPISÓDIOS: <span style="color: white"> ${episodios}</span>`
  } catch (error) {
    console.log(error)
  }
}
carregarEpisodios()

carregamentoInicialPagina()