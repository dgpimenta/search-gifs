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

  insertGIFIntoDOM(inputValue)
})

cleanGIFSContainer.addEventListener('click', () => {
  console.log('Limpando a tela!')
  GIFSContainer.textContent = ''
})
