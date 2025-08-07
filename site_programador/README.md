
# Hebert Francisco - Portfolio Website

Este é o código-fonte do portfólio pessoal de Hebert Francisco, um desenvolvedor Full Stack. O site foi projetado com uma interface de usuário moderna, é totalmente responsivo e inclui um sistema de edição de conteúdo na própria página, protegido por senha.

## ✨ Funcionalidades

-   **Design Moderno e Responsivo**: Aparência limpa e profissional que se adapta perfeitamente a desktops, tablets e celulares.
-   **UI/UX Aprimorada**: Animações suaves, transições e uma hierarquia visual clara para proporcionar uma ótima experiência ao visitante.
-   **Edição Segura na Própria Página**: Um sistema intuitivo que permite ao administrador do site editar textos e imagens diretamente na página, com acesso protegido por senha.
-   **Otimizado para Performance**: Carregamento rápido com preloader e scripts otimizados para interações fluidas.

## 🛠️ Como Gerenciar o Conteúdo (Modo de Edição)

A funcionalidade mais poderosa deste site é a capacidade de editar o conteúdo diretamente no navegador. As alterações são salvas no `localStorage` do navegador, o que significa que elas persistem na máquina local onde foram feitas.

### 1. Ative o Modo de Edição

Existem duas maneiras de iniciar o processo de edição:

1.  **Via URL**: Adicione `?edit=true` ao final da URL do seu site.
    -   Exemplo: `https://seusite.com.br/?edit=true`
2.  **Via Atalho de Teclado**: Pressione `Ctrl + Alt + E`.

### 2. Digite a Senha

Ao tentar ativar o modo de edição, uma janela pop-up solicitará a senha de administrador.

-   **Senha Padrão**: `admin`
-   **IMPORTANTE**: Você **DEVE** alterar esta senha! Abra o arquivo `index.js` e mude o valor da constante `ADMIN_PASSWORD` na linha 44 para algo seguro.

Após inserir a senha correta, o modo de edição será ativado e você verá um painel no canto inferior direito.

### 3. Edite o Conteúdo

-   **Textos**: Os textos editáveis serão destacados com um contorno tracejado azul. Clique em qualquer um desses textos e comece a digitar para alterá-lo.
-   **Imagens**: As imagens editáveis serão destacadas com um contorno tracejado laranja. Clique na imagem que deseja alterar e escolha um novo arquivo do seu computador.

### 4. Salve e Saia

-   **Salvando**: Após fazer suas alterações, clique no botão **"Salvar"** no painel de edição. Suas alterações serão salvas no armazenamento local do seu navegador.
-   **Saindo**: Para sair do modo de edição, clique no botão **"Sair"** ou use o atalho `Ctrl + Alt + E` novamente.

## 🚀 Deploy no Netlify e Limitações

**Este site funciona perfeitamente no Netlify** e em qualquer outro provedor de hospedagem de sites estáticos.

É crucial entender como o salvamento funciona:

-   **O que o botão "Salvar" faz?** Ele salva suas alterações no `localStorage` do **seu** navegador. Isso significa que, se você recarregar a página no mesmo navegador, suas alterações ainda estarão lá.
-   **Quem pode ver as alterações?** Apenas você, no navegador em que fez as edições. As alterações **não são** enviadas para o servidor ou para o seu repositório Git. Elas não ficam visíveis para outros visitantes.

**O sistema de edição é uma ferramenta de "staging" de conteúdo.** Ele permite que você, o administrador, visualize e ajuste o conteúdo diretamente no layout final do site. Uma vez que você esteja satisfeito com as alterações, você deve **manualmente atualizar o conteúdo no arquivo `index.html`** e enviar as novas imagens para a pasta `assets/` para tornar as mudanças permanentes e visíveis para todos.

## 📂 Estrutura do Projeto

-   `index.html`: A estrutura principal da página web. Todos os elementos editáveis possuem atributos `data-editable` ou `data-editable-src`.
-   `styles.css`: Contém todos os estilos visuais, responsividade e as regras para o modo de edição.
-   `index.js`: O cérebro do site. Gerencia todas as interações, animações e a lógica do sistema de edição, incluindo a autenticação.
-   `assets/`: Pasta para armazenar imagens e outros recursos estáticos.

---

Desenvolvido com foco na excelência em engenharia de front-end.
