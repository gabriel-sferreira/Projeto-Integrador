# Projeto-Integrador
Projeto Integrador - Feito por Gabriel Silva e João Vitor Bonifácio 
..


APRESENTAÇÃO

Este documento apresenta a documentação do Projeto Integrador do 5º Período do curso de Análise e Desenvolvimento de Sistemas da PUC Goiás, desenvolvido pelos alunos Gabriel Silva Ferreira e João Vitor Bonifácio. O objetivo do projeto foi criar uma aplicação web de e-commerce, integrando conhecimentos adquiridos nas disciplinas do 5º módulo, incluindo desenvolvimento frontend em React, gerenciamento de estado, integração de interfaces e boas práticas de usabilidade.


    1. INFORMAÇÕES GERAIS



        1.1. Escopo do Projeto

Descrição Geral: Desenvolver uma loja virtual com funcionalidades de listagem de produtos, detalhamento de produto, carrinho de compras, checkout simulado e autenticação básica de usuário. Público-alvo: usuários interessados em realizar compras online de produtos eletrônicos.
Limites e Restrições: O projeto foca no frontend; o backend e o banco de dados foram simulados com dados estáticos. Não há integração real com pagamento ou envio de pedidos.


        1.2. Requisitos do Projeto Requisitos Funcionais:
            ▪ Exibição de lista de produtos.

            ▪ Filtro e pesquisa de produtos por nome.

            ▪ Página de detalhes do produto.

            ▪ Adição e remoção de itens no carrinho.

            ▪ Simulação de fluxo de checkout.
            ▪ Autenticação de usuário (login/logout) com dados estáticos. Requisitos Não Funcionais:
            ▪ Performance aceitável em navegadores modernos.

            ▪ Usabilidade responsiva para dispositivos desktop e mobile.

            ▪ Segurança básica: campos de entrada validados no frontend.



        1.3. Arquitetura de Software

Descrição da Arquitetura: Aplicação frontend desenvolvida em React usando Vite como bundler, seguindo arquitetura em camadas de componentes.
Diagramas:

            ▪ Diagrama de Componentes: (não incluso graficamente; componente App, páginas, componentes de UI, contextos de estado).
            ▪ Diagrama de Módulos: módulos principais: components/, pages/, contexts/, data/, types/.


        1.4. Criação do Banco de Dados

Embora o projeto não utilize um banco de dados real, a estrutura prevista para um ambiente de produção incluiria as seguintes tabelas:
            ▪ Users (id, nome, email, senha).

            ▪ Products (id, nome, descrição, preço, imagem).

            ▪ Orders (id, user_id, data, status).

            ▪ OrderItems (id, order_id, product_id, quantidade, preço_unitário).

O diagrama ER pode ser implementado posteriormente em MySQL ou outro SGBD.



        1.5. Estrutura Analítica do Projeto (EAP)

    1. Planejamento

        1.1. Levantamento de requisitos
        1.2. Definição de tecnologias

        1.3. Criação do cronograma

    2. Modelagem

        2.1. Modelagem de dados (tabelas previstas)

        2.2. Modelagem de interface (wireframes)

    3. Desenvolvimento Frontend

        3.1. Configuração do ambiente React/Vite

        3.2. Implementação de componentes básicos

        3.3. Implementação de páginas e rotas

        3.4. Implementação de contextos (AuthContext, CartContext)

    4. Testes e Validação

        4.1. Testes de usabilidade

        4.2. Testes de funcionalidades (fluxo de carrinho, login)

    5. Documentação

        5.1. Elaboração do relatório final (este documento)

    5. Entrega e Apresentação

        5.1. Preparação de slides

        5.2. Apresentação ao corpo docente



        1.6. Cronograma de Entregas

            ▪ 17/03/2025 a 21/03/2025: Formação do grupo e definição do tema.

            ▪ 24/03/2025 a 28/03/2025: Planejamento detalhado e levantamento de requisitos.

            ▪ 31/03/2025 a 11/05/2025: Desenvolvimento do frontend (React/Vite).

            ▪ 12/05/2025 a 18/05/2025: Testes e ajustes de usabilidade.

            ▪ 19/05/2025	a	25/05/2025:	Elaboração	da	documentação	e	preparação	para apresentação.
            ▪ 02/06/2025: Entrega final do projeto.
        1.7. Descrição do Software Desenvolvido

Visão Geral: Loja virtual simples de produtos eletrônicos, permitindo ao usuário navegar pelos produtos, visualizar detalhes, adicionar ao carrinho e simular o checkout. As tecnologias utilizadas incluem React, TypeScript, Vite, Context API e Tailwind CSS para estilização.
Principais Funcionalidades:

            ▪ Listagem de produtos: exibe cards com imagem, nome e preço.

            ▪ Detalhamento de produto: exibe descrição completa e botão para adicionar ao carrinho.
            ▪ Carrinho de compras: mostra itens adicionados, possibilita ajuste de quantidade e remoção.
            ▪ Checkout simulado: coleta informações de usuário e finaliza pedido em tela.

            ▪ Autenticação básica: tela de login, validação de usuário usando dados estáticos. Desafios Enfrentados: configuração inicial do ambiente Vite, gerenciamento de estado global com Context API e responsividade da interface.


        1.8. Especificação de Objetivos e Requisitos Casos de Uso Principais:
            ▪ UC1: Navegar pelos produtos (ator: Usuário).

            ▪ UC2: Visualizar detalhes do produto (ator: Usuário).

            ▪ UC3: Adicionar produto ao carrinho (ator: Usuário).

            ▪ UC4: Ajustar quantidade e remover itens do carrinho (ator: Usuário).

            ▪ UC5: Efetuar checkout simulado (ator: Usuário).

            ▪ UC6: Realizar login e logout (ator: Usuário).

Requisitos Funcionais e Não Funcionais foram definidos conforme item 1.2.
        1.9. Design de Software

Padrões de Design: Utilização do padrão Provider (Context API) para gerenciamento de estado de autenticação e carrinho, Component-Based Design do React, separação de preocupações entre components, pages e contexts.
Decisões de Design: Escolha do React/Vite pela performance de build e simplicidade de configuração, uso de TypeScript para tipagem estática, utilização do Tailwind CSS para acelerar estilização responsiva. Componentes reutilizáveis foram criados para cards, botões e formulários para garantir consistência visual.


        1.10. Ciclo de Vida do Software

Metodologia Adotada: Ágil (Scrum), com sprints semanais de acompanhamento e reuniões rápidas de alinhamento.
Etapas do Ciclo:

            ▪ Iniciação: definição do tema e escopo.

            ▪ Planejamento: levantamento de requisitos e organização do cronograma.

            ▪ Execução: desenvolvimento incremental das funcionalidades.

            ▪ Verificação: testes unitários simples no frontend e testes de usabilidade.

            ▪ Encerramento: entrega da documentação e apresentação final.



    2. CRITÉRIOS DE AVALIAÇÃO

    • Completude dos Artefatos: entrega de todos os itens solicitados.

    • Qualidade Técnica: organização do código, uso correto das tecnologias e boas práticas de desenvolvimento.
    • Organização e Clareza: clareza da documentação e facilidade de compreensão.

    • Engajamento e Proatividade: participação ativa dos integrantes e cumprimento dos prazos.




    3. PROJETO INTEGRADOR

O Projeto Integrador teve como objetivo consolidar conhecimentos de frontend em React, expressar habilidades de modelagem de dados, gerenciamento de estado, criação de interfaces responsivas e aplicação de metodologias ágeis. A aplicação desenvolvida atende às necessidades básicas de uma loja virtual, servindo como protótipo para futuras integrações com backend e banco de dados real.
