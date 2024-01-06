# PROJETO - CRUD AULAS

Projeto utilizado para teste de desenvolvedor Front-end
Utilizado as tecnologias: Angular versão 17, Tailwhild, Primefacesng, Angular material.

# Angular Material x Primefacesng
Foi utilizado das duas bibliotecas, apenas para agilizar o processo de desenvolvimento, visto
que eu já tinha experiência com Angular Material e também tive curiosidade de utilizar o Primefacesng.

# RODAR

Para rodar o projeto, basta dar o comando "npm i" e após rodar e baixar as dependências
"npm start".

Por default irá rodar na porta 4200.


# ESTRUTURA
- Componentes que levam efetivamente a rotas, estão em Page.
- Componentes que foram utilizados dentro das páginas, ou que
podem ser reaproveitados no projeto, estão no pacote components.
- Model, seria os modelos que representam o retorno do back.
- Services foi dividido também em pacotes, para separar de acordo
a responsabilidade.

# LISTA - COMPONENTES
- Authentication -> Engloba os componentes de Registro e Acesso.
- PageNotFound -> Para qualquer página que o usuário acessar e não existir.
- Classes -> 


# ITENS que estão OK
- Registro
- Autenticação
- Guardião de rotas, caso o usuário tente acessar alguma rota sem estar autenticado
- Logout
- Acesso a rotas que não existem na aplicação
- Classificação de vídeo
- Busca de vídeo
- Filtragem da lista dos vídeos buscados. (Filtra apenas a lista dos vídeos que já foram carregados)
- Exclusão de vídeos

# ITENS Faltantes 
- Inserção
- Edição
- Assistir vídeo
- Controle de progresso
