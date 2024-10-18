# Controle Financeiro
## Controle suas entradas e saídas financeiras.

## Funcionalidades

- Cadastro de créditos e débitos categorizados em data, forma de pagamento, crédito ou débito
- Exportação de relatório em pdf, xls, ods, csv, html
- Acesso restrito por usuário

## Tecnologias

Tecnologias utilizadas:

- Php 8.2
- Laravel 11
- Angular 18
- Ionic 8
- Mysql

## Instalação

- Instale o docker, intruções de instalação se encontram em https://www.docker.com/,
- clone o repositório
- copie o arquivo env.example renomeando para .env
- crie um banco de dados no seu servidor mysql local
- preencha as variáveis relativas a esse banco de dados no arquivo .env
- vá a pasta do repositório e entre na subpasta api, execute o comando docker compose up -d que criará o container api
- entre no container api e instale as dependências usando o comando composer install
- execute o comando php artisan key:generate
- execute o comando php artisan migrate para executar as migrations ainda dentro do container
- nesse ponto o primeiro projeto estará funcionando
- volte na pasta principal e entre na subpasta app_web
- execute o comando docker compose up -d que criará o container app_web
- execute o comando npm install dentro do container
- execute o comando ionic build --prod -- --base-href /www/
- acesse a aplicação a partir da url http://localhost:7002/www/
- O login padrão é realizado com o email: admin@gmail.com senha:adm@23