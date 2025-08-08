# DeAgro Digital Nexus

Um projeto unificado que explora a convergência de IA, Blockchain e Criptomoedas no setor financeiro, com foco especial em aplicações no agronegócio.

## 📋 Sobre o Projeto

Este projeto combina as melhores funcionalidades de um infográfico interativo e um website informativo sobre tecnologias financeiras emergentes, seguindo o padrão visual da DeAgro. Inclui visualizações de dados, insights powered by IA e conteúdo em áudio.

## 🚀 Funcionalidades

### 📊 Visualizações de Dados
- **Gráfico de Impacto da IA**: Mostra onde a IA oferece maior valor no setor bancário
- **Gráfico de Lacuna de Talentos**: Identifica áreas com deficiência de expertise em IA
- **Estatísticas Interativas**: Números animados sobre adoção de IA

### 🔗 Casos de Uso Blockchain
- Cards interativos com casos de uso detalhados
- Pagamentos transfronteiriços, financiamento de comércio, tokenização de ativos
- Identidade digital, contratos inteligentes, auditoria e compliance

### 🤖 Insights Powered by Gemini
- **Explicador de Conceitos**: Digite qualquer conceito financeiro/tecnológico para obter explicações
- **Gerador de Ideias para Podcast**: Gera ideias criativas para episódios de podcast
- Integração completa com API do Google Gemini

### 🎧 Conteúdo em Áudio
- Player de podcast integrado
- Áudio sobre "IA, Blockchain e Cripto no Setor Financeiro"
- Interface customizada seguindo o design da DeAgro

### 🎨 Design System DeAgro
- Paleta de cores verde e dourado da DeAgro
- Tipografia Geist/Inter
- Componentes responsivos e acessíveis
- Animações suaves e micro-interações

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Visualizações**: Chart.js
- **IA**: Google Gemini API
- **Design**: CSS Grid, Flexbox, CSS Custom Properties
- **Áudio**: HTML5 Audio API

## 📁 Estrutura do Projeto

```
deagro-digital-nexus/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos principais baseados na DeAgro
│   │   ├── components.css    # Componentes específicos
│   │   └── charts.css        # Estilos para gráficos
│   ├── js/
│   │   ├── main.js           # JavaScript principal
│   │   ├── charts.js         # Configuração dos gráficos
│   │   ├── gemini.js         # Integração com Gemini API
│   │   └── utils.js          # Funções utilitárias
│   ├── media/
│   │   └── podcast.mp3       # Arquivo de podcast
│   └── images/
├── config/
│   └── api-config.js         # Configurações de API
└── README.md                 # Esta documentação
```

## ⚙️ Configuração

### 1. API Key do Gemini

Para usar as funcionalidades de IA, você precisa configurar uma API key do Google Gemini:

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a API key gerada
5. No site, clique em qualquer funcionalidade de IA e cole a key quando solicitado

A API key será armazenada localmente no seu navegador.

### 2. Servidor Local

Para testar localmente, você pode usar qualquer servidor HTTP simples:

```bash
# Python 3
python -m http.server 8000

# Node.js (se tiver http-server instalado)
npx http-server

# PHP
php -S localhost:8000
```

Acesse `http://localhost:8000` no seu navegador.

## 🎯 Como Usar

### Navegação
- Use o menu superior para navegar entre seções
- Scroll suave automático para melhor experiência
- Design responsivo para desktop e mobile

### Gráficos Interativos
- Passe o mouse sobre os gráficos para ver detalhes
- Gráficos são carregados automaticamente ao entrar na seção

### Cards Blockchain
- Clique nos cards para ver detalhes expandidos
- Cada card mostra um caso de uso específico

### Funcionalidades IA
1. **Explicador de Conceitos**:
   - Digite um conceito (ex: "KYC", "DeFi", "Smart Contracts")
   - Clique em "Explicar Conceito"
   - Receba uma explicação detalhada

2. **Gerador de Ideias para Podcast**:
   - Clique em "Gerar Ideias para Podcast"
   - Receba 5 ideias criativas com títulos e descrições

### Player de Podcast
- Use os controles padrão do HTML5
- Áudio sobre a confluência de IA, Blockchain e Cripto
- Interface integrada ao design do site

## 🔧 Personalização

### Cores
As cores podem ser alteradas no arquivo `assets/css/main.css` nas variáveis CSS:

```css
:root {
  --primary-color: #3A5A40;      /* Verde DeAgro */
  --secondary-color: #DAA520;     /* Dourado DeAgro */
  --accent-blue: #0077B6;         /* Azul para dados financeiros */
  /* ... outras cores */
}
```

### Conteúdo
- Textos podem ser editados diretamente no `index.html`
- Dados dos gráficos estão em `assets/js/charts.js`
- Casos de uso blockchain estão em `assets/js/main.js`

### API Prompts
Os prompts do Gemini podem ser customizados em `config/api-config.js`:

```javascript
prompts: {
  conceptExplainer: "Seu prompt personalizado...",
  podcastIdeas: "Seu prompt personalizado..."
}
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: ≤ 480px

## 🔒 Segurança

- API keys são armazenadas apenas localmente
- Validação de inputs para prevenir XSS
- Rate limiting para APIs externas
- Tratamento de erros robusto

## 🚀 Deploy

### Opção 1: Servidor Estático
Faça upload de todos os arquivos para qualquer servidor web estático (Netlify, Vercel, GitHub Pages, etc.).

### Opção 2: CDN
Para melhor performance, considere usar um CDN para os assets estáticos.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no repositório
- Entre em contato com a equipe DeAgro

## 🙏 Agradecimentos

- **IBM Institute for Business Value** - Dados e insights sobre IA no setor financeiro
- **Google Gemini** - API de IA para funcionalidades interativas
- **Chart.js** - Biblioteca de gráficos
- **DeAgro** - Design system e identidade visual

---

**DeAgro Digital Nexus** - Explorando o futuro das finanças através da convergência tecnológica.

