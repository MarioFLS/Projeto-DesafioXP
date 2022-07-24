# Projeto DesafioXP!

## Descrição
Esse Projeto Busca Simular uma API de Investimentos - Feito para o Desafio Tecnico da XP
 
A Aplicação Permite:

-  Ter uma experiência de gerenciar suas ações(ativos), tanto comprando quanto vendendo;
-  E poder usar gerênciar seu usuário como melhor desejar. Fazendo depositos ou saques, vendo os ativos que foi comprado e mais!

## Tecnologias Usadas

> Desenvolvida utilizando: JavaScript, TypeScript, NodeJS, expres, express-async-errors, Docker, Sequelize, Jest, Chai, Sinon, Swagger, Mysql.

# Como Utilizar

## Você pode escolher utilizar Docker ou Não.

<details>
  <summary><strong>🐳 Usando Docker</strong></summary><br />
 
  > Rode os serviços `node` e `mysql` com o comando `docker-compose up -d`.
  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;
  - Esses serviços irão inicializar um container chamado `projeto-xp`;
  - A partir daqui você pode rodar o container `projeto-xp` via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it projeto-xp bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo docker compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`
  <br />
  
  ### :warning: Atenção :warning:
  - É de suma importância que você *desabilite* o MYSQL no seu computador antes de rodar a aplicação. Pois eles usaram a mesma porta.
  No Windows você pode fazer pelos *serviços*, parando o MYSQL por lá
  
  ### :warning: **IMPORTANTE!** :warning:
  - Não mude as portas, isso pode fazer com que você não consiga conectar no banco!
</details>

<details>
  <summary><strong>😀 Sem Docker </strong></summary><br />
 
  > Instale as dependências [**Caso existam**] com `npm install`
  Use variaveis de ambiente para configurar, você achará um arquivo na raiz chamado `.env.exemple`. Retire o 'exemple'. 
  Ele estará configurado para funcionar com o banco

  ✨ **Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.

  <br />
</details>

# Como Conectar ao Banco

<details>
  <summary><strong>🎲 Conexão com o Banco</strong></summary><br />

## Crie o Banco

:warning: **IMPORTANTE!**
**A senha do Banco é password**

```javascript
#Não se esqueça de configurar suas variáveis de ambiente aqui na configuração

    DB_USER=root
    DB_PASSWORD=password
    DB_HOST=localhost
    SECRET_PASSWORD=senhaMuitoSecreta
```

#### Comando para subir o Banco
O Banco é iniciado usando o comando `npm run restore` no terminal!
</details>

## :warning: Atenção :warning:

**VOCÊ PRECISA INICIAR TIRAR O `exemple`, DO `.env.exemple`, SEM ELE A APLICAÇÃO NÃO FUNCIONA, ELA POSSUI A SENHA USANDA PARA FAZER OS TOKENS.**
- Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
  <br />
  
**O CODIGO SÓ FUNCIONA APÓS TRANSPILAR.**
- Usando o comando `npm start`, ele fará a transpilação para você. Caso não funcione rode no proprio terminal `tsc`. Aguarde um momento e ele fará isso para você.

  <br />

## Iniciando a aplicação

#### Utilize o comando abaixo para iniciar a aplicação
`npm start`
Como dito antes, ele irá transpilar o código e iniciar o uso. Não esqueça se for sair dele use `CTRL + C` ou equivalente. Se não a porta ainda será ocupada.
Você pode restart o container e resolverá esse problema.

#### Dentro do Container e com a aplicação iniciada, inicie o banco com o comando:
`npm run restore`
E pronto! O Banco estará pronto para ser usado!

Rodando os testes o banco também será iniciado!
 <br />


## DOCUMENTAÇÂO

### A documentação está no caminho /docs

 - Após iniciado a Aplicação utlize a rota `/docs`:
 #### Exemplo
 
 Sua aplicação estando rodando localmente ele provalvemente irá rodar na `http://localhost:3000`
 Então use o seguinte caminho `http://localhost:3000/docs`

## TESTES

### Testes devem ser rodados dentro do Container!

### :warning: Os testes precisam da aplicação no ar! :warning:
Estando a aplicação no ar, dentro do container rode `npm test`. Espere um pouco, eles podem demorar. E você terá os testes.
Eles sobem a derrubam a aplicação, você perderá o que foi feito!

### PEÇA AJUDA
Havendo algum problema. Entre em contato comigo, poderei auxiliar a resolver os problemas!
Isso também vale para dúvidas de funcionamento!
