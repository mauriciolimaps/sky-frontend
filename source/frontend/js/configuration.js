(
    window.configurationLoaded = ( async () => {

        function parameters(name)
        {
            if (!window.location.parameters)
            {
                window.location.parameters = {};
                window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
                    (m, key, value) => { 
                        window.location.parameters[key] = value
                })
            }
            return window.location.parameters[name]
        }

        async function requestContent(url)
        {
            return new Promise( (resolve, reject) =>{
                const http = new XMLHttpRequest()
                http.addEventListener('readystatechange', () => {
                    if (http.readyState == 4)
                    {
                        if (http.status != 200) reject( new Error(http.status) )

                        const response = {
                            type : http.getResponseHeader('Content-type'),
                            data : http.responseText
                        }
                        if ( response.type.includes('application/json') )
                        {
                            response.data = JSON.parse(response.data)
                        }
                
                        resolve(response)
                    }            
                })

                http.open("GET", url, true)
                http.send()
            })
        }

    
        async function setup()
        {
            console.log('Load time :', (new Date()).toLocaleTimeString())

            configurationFile = parameters('config') || parameters('configuration') || 'config.json'
            if (!configurationFile)
                return

            try
            {
                const configuration = await (async (request) => { 
                    const result = await request
                    return result.data ? result.data : undefined
                })(requestContent(configurationFile))

                window.application = {
                    ...window.application,
                    configuration : configuration 
                }
            }
            catch (error)
            {
                console.error(error.message)
            }
        }

        await setup()
    })()
)
