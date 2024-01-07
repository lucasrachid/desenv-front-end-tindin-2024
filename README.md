# PROJETO - CRUD AULAS - DESENVOLVEDOR FRONT-END 2024 - TINDIN
Projeto utilizado para teste de desenvolvedor Front-end
Utilizado as tecnologias: Angular versão 17, Tailwhild, Primefacesng, Angular material.

# API UTILIZADA
- Playground Tindin.

# Angular Material e Primefacesng
Foi utilizado das duas bibliotecas, apenas para agilizar o processo de desenvolvimento, visto
que eu já tinha experiência com Angular Material e também tinha curiosidade de utilizar o Primefacesng para aprendizado.

# Versão Angular
Foi utilizado também a versão mais recente do angular para aprendizado, visto que os projetos que eu atuo hoje, 
utilizam versões mais antigas. 12-13.

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

# LISTA - COMPONENTES ROTEADOS
- Authentication -> Engloba os componentes de Registro e Acesso.
- PageNotFound -> Para qualquer página que o usuário acessar e não existir.
- Classes -> A partir deste componente de rota, será possível carregar uma lista de aulas, criar novas aulas, filtrar 
as aulas ou deslogar da página.


# ITENS que estão OK
- Registro
- Autenticação
- Guardião de rotas, caso o usuário tente acessar alguma rota sem estar autenticado
- Logout
- Acesso a rotas que não existem na aplicação
- Classificação de vídeo
- Busca de vídeo
- Filtragem da lista dos vídeos buscados. 
    (Filtra apenas a lista dos vídeos que já foram carregados, logo, você deverá ter uma lista com 1 ou mais itens)
- Criação de aulas
- Exclusão de vídeos
- Edição - Atualização dos dados da aula.
- Complexidade de senha para realização de cadastro
- Tratamento de erros na busca das aulas
- Armazenamento do token de usuário

# ITENS Faltantes 
- Assistir vídeo
- Controlar performance
- Controle de progresso

# ITENS que devem passar por melhorias
- Algumas telas, foi criado a variável de controle para o loading, mas ainda, não foi aplicado o componente em tela, 
para dar um feedback ao usuário.
- Por algum motivo, mesmo importando e passando os providers, na versão 17 o message do Primefaces estava apresentando 
um problema, então optei por utilizar o ngx toastr para dar feed ao usuário.
- As telas devem passar por melhorias de layout. Particularmente consigo fazer a tela, mas não tenho muita criatividade, 
então tentei seguir o "modelo" apresentado no vídeo, com algumas alterações.
- Também se atentar a responsividade das telas.
- Existem alguns comportamentos em tela que deveria ser corrigido, como ao deletar um vídeo e não ter nem um item em 
lista, não deveria apresentar a tabela. Algo simples, mas que como não tinha muito tempo, acabei passando por cima e 
deixando como um débito técnico.
- Desacoplar componentes, como por exemplo, criar um componente novo, apenas para a lógica dos vídeos e apresentá-lo 
dentro do modal, isso para possibilitar a reutilização e facilitar sua manutenção posteriormente.
- Diversos lugares, onde está colocando comparações com string, ou até mesmo setando dados em variáveis etc, era bom 
realizar a criação de um ENUM para esses dados, isso porque caso seja alterado algum dia, será necessário apenas alterar
onde está utilizando o enum e não alterar o valor da string em todos os locais que utiliza determinado valor.

# DESCRIÇÃO DAS AULAS
- Esse item, não achei nos end-points a propriedade a qual se referia, as vezes por um equívoco, mas de qualquer forma, 
da maneira que está hoje, seria fácil realizar a correção, caso houvesse alterações no end-point.

