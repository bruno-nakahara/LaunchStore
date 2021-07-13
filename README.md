<h1>LaunchStore - Bootcamp Rocketseat</h1>

<h2>O que é Launchstore?</h2>

<p>Launchstore é um e-commerce criado durante o bootcamp da rocketseat.</p>

<h2>Funcionalidades</h2>

<ul>
  <li>Cadastro de usuários.</li>
  <li>Criação de anúncios.</li>
  <li>Realização de pedidos.</li>
  <li>Carrinho de compras.</li>
  <li>Buscar produtos.</li>
  <li>Upload de imagems com Multer.</li>
  <li>Páginas dinâmicas com Nunjucks.</li>
  <li>Banco de dados PostgreSQL.</li>
  <li>Sistema de login e recuperação de senha.</li>
  <li>Animações com Lottie.</li>
</ul>

<h2>Tecnologias e ferramentas</h2>

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Javascript</li>
  <li>Nunjacks</li>
  <li>NodeJS</li>
  <li>Nodemailer</li>
  <li>Express</li>
  <li>Express Session</li>
  <li>Multer</li
  <li>PostgreSQL</li>
  <li>BcryptJS</li>
  <li>Faker.JS</li>
  <li>Lottie</li>
</ul>

<h2>Instalação e uso</h2>

<p>No seu computador tem que ter o <a href="https://nodejs.org/en/">Node</a> e o <a href="https://www.postgresql.org/download/">Postgres</a> instalados.</p>

<p>Após a instalação do Node e Postgres, siga os passos abaixo:</p>

```
# No terminal copie o repositório com o seguinte comando
$ git clone https://github.com/bruno-nakahara/LaunchStore.git

# Se preferir, tem a opção de download também.

# Após clonar o repositório, pelo terminal, entra na pasta usando o comando
$ cd Launchstore

# Instalar as dependências
$ npm install

# Para criação de banco de dados e tabelas utilize o arquivo "database.sql"

#Para conectar com o seu banco de dados será necessário editar o arquivo "db.js" dentro da pasta "src/config" com a senha e o nome do banco que você criou

# Agora você precisa popular o banco de dados, para isso utilize o arquivo "seed.js" com o seguinte comando no terminal
$ node seed.js

# Depois de terminar de popular os dados, rode a aplicação.
$ npm start
```
