<h1 align="center">Tweteroo em NestJS</h1>

## 📝 Sobre

Tweteroo é um projeto desenvolvido inteiramente em NestJS, uma aplicação que permite que os usuários se cadastrem e publiquem tweets.

## 💻 Como Usar
### Pré-requisitos

- Node.js instalado na máquina.
- Git para versionamento.

### Instalação
```bash
git clone https://github.com/seu-usuario/tweteroo-nest.git
cd tweteroo-nest
npm install
```
### Executando o Projeto
```bash
npm run start
```
### Testando o Projeto
```bash
npm run test:e2e
```
<hr/>
## 📃 Rotas
#### POST /sign-up

Endpoint para cadastrar um novo usuário.

Exemplo de requisição:

```json
{
  "username": "spongebob",
  "avatar": "https://avatars.akamai.steamstatic.com/d322ffa327f56fcebc08ac76b340742b930648c8_full.jpg"
}
```
#### POST /tweets

Endpoint para criar um novo tweet.

Exemplo de requisição:

```json
{
  "username": "spongebob",
  "tweet": "You like krabby patties, don’t you @Squidward?"
}
```
#### GET /tweets

Endpoint para obter os 15 últimos tweets publicados por qualquer usuário.

#### GET /tweets/:username

Endpoint para obter os tweets de um usuário específico.
<br></br>
###### Validacao de dados
Todas as rotas POST validam os dados recebidos. Caso algum dado esteja ausente ou em um formato inválido, o servidor retornará o status code 400 (BAD REQUEST) com a mensagem "All fields are required!".

###### Armazenamento de dados
Os dados de usuários e tweets são armazenados em variáveis globais em memória na camada de serviço.
<hr/>


## 🛠 &nbsp;Tecnologias
<div align="center">
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" width="52" alt="node logo"  />
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="js logo"  />   
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" width="52" alt="js logo"  />      
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" width="52" alt="express logo"  />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" height="40" width="52" alt="npm logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" width="52" alt="github logo" />                                   
</div>
<hr/>

## 💬 &nbsp;Contatos
<img align="left" src="https://avatars.githubusercontent.com/curtyraissa?size=100">

Feito por [Raissa Curty](https://github.com/curtyraissa)!

<a href="https://www.linkedin.com/in/raissa-curty/" target="_blank">
    <img style="border-radius:50%;" src="https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg" width="52" height="40" alt="linkedin logo"  />
</a>&nbsp;
