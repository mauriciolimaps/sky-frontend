# SKY frontend

Em execução em

```
https://mauricio-lima.github.io/sky-frontend
```

## Comentários para o avaliador do projeto

- O endpoint fornecido não estava adequadamente configurado para ser acessado de outra origem (CORS), então foi necessário reproduzir o backend localmente, então alguns arquivos relacionados a isso podem ser observados.

- Inicialmente a questão foi resolvida com essa alocação local, mas posteriormente o projeto foi configurado para acessar apenas a cópia local dos dados do endpoint, posteriormente foi incluído a possibilidade de configurar o projeto através de arquivos, então, para ver o comportamento quando apontado para o endpoint indicado na proposta, pode ser feito com parâmetros na URL, a saber:

    * Acesso com o endpoint no heroku, com a opção CORS ativa:
        ```
        https://mauricio-lima.github.io/sky-frontend/?config=heroku-cors.json
        ```
        <br/>

    * Acesso com o endpoint no heroku, com a opção CORS inativa:
        ```
        https://mauricio-lima.github.io/sky-frontend/?config=heroku-nocors.json 
        ```
        <br/>
    * Para funcionar da mesma forma que sem os parâmetros - É o arquivo de configuração padrão:
       ```    
       https://mauricio-lima.github.io/sky-frontend/?config=config.json 
       ```
       <br/>
       Usado apenas se o projeto for baixado para executar em servidor local com a extensão LiveServer do VSCode, sem essa configuração, não consegui fazer com que se comportasse da mesma forma que a configuração padrão, apenas com as configurações permitidas pelo LiveServer:
         
       ```      
       https://mauricio-lima.github.io/sky-frontend/?config=localhost.json
       ```  
       <br/><br/>


### **Mauricio Lima**
