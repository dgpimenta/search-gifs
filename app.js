/*
  Neste exercício, vamos praticar um pouco do que vimos até aqui, através da 
  API do GIPHY, que é um website de GIFs (https://giphy.com/).

  - Seu desafio é implementar uma funcionalidade de busca dos GIFs. Quando o 
    usuário digitar o termo de busca no input e pressionar enter, um GIF deve 
    ser exibido na tela. Como neste exemplo: https://youtu.be/RHe-uCJGCeA
  - Observe que o GIF mais recente é inserido acima dos GIFs anteriores;
  - Para fazer requests para a API do GIPHY, você precisará de uma API key. 
    Para obtê-la, siga os seguintes passos:
    - Acesse https://developers.giphy.com/dashboard/ e faça o login;
    - No Dashboard, clique em "Create an App", clique em "API Selected" e em 
      "Next Step";
    - Dê um nome e descrição para o app e crie-o;
    - Clique no código da API key para copiá-la;
  - O submit do form deve ser feito para o endpoint abaixo. Atente-se para os 2
    [PLACEHOLDERS] que devem ser substituídos:
    - https://api.giphy.com/v1/gifs/search?api_key=[SUA_CHAVE_DA_API_AQUI]&limit=1&q=[VALOR_INSERIDO_NO_INPUT]
    - Se quiser testar outras possibilidades, os endpoints da API estão 
      listados na documentação: https://developers.giphy.com/docs/api/endpoint#search
  - Ignore os avisos no console. Para limpá-lo, pressione "ctrl + L".
*/

/*******************ESTUDO DE SETEMBRO!!!******************/

const form = document.querySelector('form')
const GIFSContainer = document.querySelector('#image')
const cleanGIFSContainer = document.querySelector('#eraser')

const APIKey = '6Zr5pkcHtrxcVI9E9wNHtQgQFv6wxA28'

const getGIPHYApiUrl = GIFName =>
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`

const generateGIFImage = (downsizedGIFUrl, GIFData) => {
  const img = document.createElement('img')

  img.setAttribute('src', downsizedGIFUrl)
  img.setAttribute('alt', GIFData.data[0].title)

  return img
}

const fetchGIF = async inputValue => {
  try {
    const GIPHYApiUrl = getGIPHYApiUrl(inputValue)
    const response = await fetch(GIPHYApiUrl)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados!')
    }
    return response.json()
  } catch (error) {
    alert(`Erro: ${error.message}`)
  }
}

const insertGIFIntoDOM = async inputValue => {
  const GIFData = await fetchGIF(inputValue)

  if (GIFData) {
    const downsizedGIFUrl = GIFData.data[0].images.downsized.url

    const img = generateGIFImage(downsizedGIFUrl, GIFData)

    GIFSContainer.insertAdjacentElement('afterbegin', img)
    form.reset()
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value
  console.log(inputValue)

  insertGIFIntoDOM(inputValue)
})

cleanGIFSContainer.addEventListener('click', () => {
  console.log('Limpando a tela!')
  GIFSContainer.textContent = ''
})

/* 1ª análise*/
// const form = document.querySelector('form')
// const GIFSContainer = document.querySelector('div')

// form.addEventListener('submit', async event => {
//   event.preventDefault()

//   const inputValue = event.target.search.value
//   const APIKey = '0fSqvAfWX5nCOY5ZIxA9KhGIsB7L5zkL'
//   const url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${inputValue}`

//   try {
//     const response = await fetch(url)

//     if (!response.ok) {
//       throw new Error('Não foi possível obter os dados')
//     }

//     const GIFData = await response.json()
//     const downsizedGIFUrl = GIFData.data[0].images.downsized.url
//     const img = document.createElement('img')

//     img.setAttribute('src', downsizedGIFUrl)
//     img.setAttribute('alt', GIFData.data[0].title)

//     GIFSContainer.insertAdjacentElement('afterbegin', img)

//     event.target.reset()
//   } catch (error) {
//     alert(`Erro: ${error.message}`)
//   }
// })

/* 2ª análise*/
// //Referente à elementos do DOM
// const form = document.querySelector('form')
// const GIFSContainer = document.querySelector('div')

// //Referentes a strings
// const APIKey = '0fSqvAfWX5nCOY5ZIxA9KhGIsB7L5zkL'

// const getGIPHYApiUrl = GIFName =>
//   `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`

// const insertGIFIntoDOM = async inputValue => {
//   try {
//     const GIPHYApiUrl = getGIPHYApiUrl(inputValue)
//     const response = await fetch(GIPHYApiUrl)

//     if (!response.ok) {
//       throw new Error('Não foi possível obter os dados')
//     }

//     const GIFData = await response.json()
//     const downsizedGIFUrl = GIFData.data[0].images.downsized.url
//     const img = document.createElement('img')

//     img.setAttribute('src', downsizedGIFUrl)
//     img.setAttribute('alt', GIFData.data[0].title)

//     GIFSContainer.insertAdjacentElement('afterbegin', img)

//     form.reset()
//   } catch (error) {
//     alert(`Erro: ${error.message}`)
//   }
// }

// form.addEventListener('submit', event => {
//   event.preventDefault()

//   const inputValue = event.target.search.value

//   insertGIFIntoDOM(inputValue)
// })

/* 3ª análise*/
// //Referente à elementos do DOM
// const form = document.querySelector('form')
// const GIFSContainer = document.querySelector('div#image')
// const eraser = document.querySelector('#eraser')

// //Referentes a strings
// const APIKey = '0fSqvAfWX5nCOY5ZIxA9KhGIsB7L5zkL'

// const getGIPHYApiUrl = GIFName =>
//   `https://api.giphy.com/v1/gifs/earch?api_key=${APIKey}&limit=1&q=${GIFName}`

// const generateGIFImg = (downsizedGIFUrl, GIFData) => {
//   const img = document.createElement('img')

//   img.setAttribute('src', downsizedGIFUrl)
//   img.setAttribute('alt', GIFData.data[0].title)

//   return img
// }

// const fetchGIF = async inputValue => {
//   try {
//     const GIPHYApiUrl = getGIPHYApiUrl(inputValue)
//     const response = await fetch(GIPHYApiUrl)

//     if (!response.ok) {
//       throw new Error('Não foi possível obter os dados')
//     }
//     return response.json()
//   } catch (error) {
//     alert(`Erro: ${error.message}`)
//   }
// }

// const insertGIFIntoDOM = async inputValue => {
//   const GIFData = await fetchGIF(inputValue)

//   if (GIFData) {
//     const downsizedGIFUrl = GIFData.data[0].images.downsized.url
//     const img = generateGIFImg(downsizedGIFUrl, GIFData)

//     GIFSContainer.insertAdjacentElement('afterbegin', img)

//     form.reset()
//   }
// }

// form.addEventListener('submit', event => {
//   event.preventDefault()

//   const inputValue = event.target.search.value

//   insertGIFIntoDOM(inputValue)
// })

// eraser.addEventListener('click', () => {
//   console.log('Limpando a tela')
//   GIFSContainer.textContent = ''
// })
