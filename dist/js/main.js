(function() {

    function DOMLoaded()
    {
        buildPage()
    }

    function setupFetch()
    {
        window.fetch = async (url) => {
            return new Promise( (resolve, reject) => {
                const http = new XMLHttpRequest();
                
                http.open('GET', url)
                http.onerror = reject
                http.onabort = () => reject(new Error('Abort'))
                http.onload = async () => {
                   resolve({
                        json : () => JSON.parse(http.responseText)
                    })
                    
                }
                http.send(); 
            })
        }
    }

    async function buildPage()
    {
        if (!fetch) setupFetch()

        try
        {
            const prefix = location.host.includes('github') ? '' : '../'  
            const response = await fetch(prefix + 'backend/movies/index.json', { mode: 'cors' })
            //const response = await fetch('https://sky-frontend.herokuapp.com/movies', {mode: 'no-cors'})
            const data = await response.json()
            console.log(data)

            const template = document.querySelector('#movie-card-template').content

            const categorized = {}
            for(let movie of data[2].movies)
            {
                movie.categories
                    .trim()
                    .split(/\s*,\s*/)
                    .map( (item) => {
                        categorized[item] = (!categorized[item]) ? [] : categorized[item]
                        categorized[item].push(movie) 
                    })
            }
            console.log(categorized)

            const container = document.getElementById('container')
            for(let category in categorized)
            {
                const title = document.createElement('h4')
                title.textContent = category

                const categoryContainer = document.createElement('div')
                const div = document.createElement('div')
                div.appendChild(title)
                div.appendChild(categoryContainer)

                for(let movie of categorized[category])
                {
                    const card = document.importNode(template, true)
                    const titleNode = card.querySelector('.movie-title')
                    if (titleNode)
                    {
                        titleNode.textContent = movie.title
                    }
    
                    imageNode = card.querySelector('.movie-header')
                    if (imageNode)
                    {
                        imageNode.setAttribute('style', 'background-size:cover;background-position: 100% 100%;background-image:url(\'' + movie.images[0].url + '\')') 
                    }
                    
                    categoryContainer.appendChild(card)
                }
                container.appendChild(div)
            }
        }
        catch (e)
        {
            alert(e.message)
        }
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()