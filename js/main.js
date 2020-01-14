(function() {

    function DOMLoaded()
    {
        buildPage()
    }

    async function buildPage()
    {
        if (!fetch) return

        try
        {
            let card

            //const response = await fetch('/backend/movies/index.json')
            const response = await fetch('https://sky-frontend.herokuapp.com/movies', {mode: 'no-cors'})
            const data = await response.json()
            console.log(data)

            const template = document.querySelector('#movie-card-template').content

            const container = document.getElementById('container')
            for(let movie of data[2].movies)
            {
                let titleNode

                card = document.importNode(template, true)
                titleNode = card.querySelector('.movie-title')
                if (titleNode)
                {
                    titleNode.textContent = movie.title
                }

                imageNode = card.querySelector('.movie-header')
                if (imageNode)
                {
                    imageNode.setAttribute('style', 'background-size:cover;background-position: 100% 100%;background-image:url(\'' + movie.images[0].url + '\')') 
                }
                
                container.appendChild(card)
            }
        }
        catch (e)
        {
            alert(e.message)
        }
    }

    document.addEventListener('DOMContentLoaded', DOMLoaded)
})()