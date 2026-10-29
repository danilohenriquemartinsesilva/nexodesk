# NexoDesk

Central de chamados internos da NexoTech. Colaboradores abrem chamados de suporte e o time acompanha, filtra e atualiza o andamento de cada um.

Projeto feito para o desafio técnico de front-end do processo seletivo de estágio da WSY Labs.

Autor: [Seu Nome Completo]

## Tecnologias

- React
- TypeScript
- Vite
- CSS puro
- JSON Server (API mockada)

## Funcionalidades

- Lista de chamados com título, setor, prioridade, status e data de criação
- Contadores no topo: total, abertos, em andamento e concluídos
- Busca por título e filtros de status e prioridade, que funcionam juntos, com botão para limpar
- Detalhes completos do chamado
- Formulário de novo chamado com validação (o chamado novo começa como "Aberto" com a data atual)
- Alterar o status e excluir chamado, com confirmação antes de excluir
- Estados de carregamento, lista vazia, erro e mensagens de sucesso
- Layout responsivo (desktop, tablet e mobile)

## Como executar

Pré-requisito: Node.js instalado.

```bash
npm install
```

São necessários dois terminais.

Terminal 1, a API mockada (porta 3001):

```bash
npm run api
```

Terminal 2, a aplicação:

```bash
npm run dev
```

Depois é só abrir o endereço que aparece no terminal (normalmente http://localhost:5173).

## Rotas da API

| Método | Rota | Descrição |
| ------ | ---- | --------- |
| GET | /tickets | Lista os chamados |
| GET | /tickets/:id | Detalhes de um chamado |
| POST | /tickets | Cria um chamado |
| PATCH | /tickets/:id | Atualiza o status |
| DELETE | /tickets/:id | Exclui um chamado |

Os dados ficam no arquivo `db.json`. O JSON Server grava as alterações nesse arquivo, então o que for criado, alterado ou excluído fica salvo nele.

## Estrutura

```
src/
  components/   telas e partes da interface
  services/     chamadas à API com fetch
  types/        tipos do TypeScript e nomes exibidos na tela
  utils/        funções de filtro, validação e formatação de data
  App.tsx       estados principais e ações (criar, alterar status, excluir)
```

## Decisões

- Sem bibliotecas extras de estado, formulário ou estilo: `useState` e CSS puro foram suficientes.
- Os chamados ficam no estado do `App`, e os componentes recebem os dados e as funções por props.
- A lista filtrada não é um estado, é calculada a cada renderização a partir da lista completa e dos filtros.
- O chamado aberto nos detalhes é guardado pelo `id` e buscado na lista, para sempre mostrar o dado atualizado.
- A tela só é atualizada depois que a API responde com sucesso. Se a API falhar, a lista não muda e aparece uma mensagem de erro.
- A rota `GET /tickets/:id` existe no serviço, mas a tela não a usa, porque todos os dados já são carregados na listagem.
- A confirmação de exclusão usa o `window.confirm`, por ser a forma mais simples.
- Os detalhes aparecem na própria página, acima da lista.
- Cores e fonte seguem a identidade da WSY Labs: verde `#1B663E` como cor principal e `#99CC33` como detalhe. A fonte é a Poppins, escolhida por ser uma sans-serif geométrica de peso leve.
- O favicon é do NexoDesk, e não o logo da WSY Labs.