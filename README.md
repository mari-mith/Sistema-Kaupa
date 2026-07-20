# Kaupa.

Sistema de cadastro e gerenciamento de produtos, com frontend em **React (Vite) + Zustand** e backend em **Django + Django REST Framework**.

## Stack utilizada

**Frontend**
- React + Vite
- Zustand (gerenciamento de estado)
- Axios / Fetch API
- react-hot-toast (notificações)
- lucide-react (ícones)

**Backend**
- Django
- Django REST Framework
- Pillow (upload de imagens)
- django-cors-headers (comunicação com o frontend)

## Estrutura do projeto

```
kaupa/
├── backend/
│   ├── manage.py
│   ├── produtos/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── serializers.py
│   └── core/
│       ├── settings.py
│       └── urls.py
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── Header.jsx
    │   ├── ModalProduto.jsx
    │   ├── ConfirmacaoModal.jsx
    │   ├── index.css
    │   └── store/
    │       └── useProdutoStore.js
    ├── package.json
    └── vite.config.js
```

> Projeto Django principal: `core`. App: `produtos`. Banco de dados: SQLite.

---

## Pré-requisitos

- **Python** 3.12+ e **pip** (o projeto usa Django 6.0)
- **Node.js** 18+ e **npm** (ou yarn/pnpm)
- **Git** (opcional, para clonar o repositório)

---

## Como Rodar o Backend (Django)

### 1-Variáveis de Ambiente (.env)
1. Para segurança, a SECRET_KEY não deve ficar no código.
Na pasta backend/ , crie um arquivo chamado .env .
Gere uma chave segura:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
e adicione ao arquivo:

   ```bash
SECRET_KEY=sua-chave-secreta-aqui
   ```

2. No settings.py, carregue a chave:
```bash
   import os
from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
   ```
### 2- Execução
1. Acesse a pasta do backend:
    ```bash
   cd backend
    ```

2. Crie e ative um ambiente virtual:
   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # Linux/Mac
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```bash
   pip install django djangorestframework django-cors-headers pillow
   ```
   > Se você tiver um arquivo `requirements.txt`, use `pip install -r requirements.txt` no lugar.

4. Ajuste as permissões no settings.py:
   ```bash
   ALLOWED_HOSTS = ['localhost', '127.0.0.1']
   CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]

5. No `urls.py` principal do projeto (`core/urls.py`), adicione o suporte a arquivos de mídia (necessário para exibir as imagens dos produtos), caso ainda não esteja lá:

   ```python
   from django.conf import settings
   from django.conf.urls.static import static

   urlpatterns = [
       ...
   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
   ```

6. Rode as migrações:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. (Opcional) Crie um superusuário para acessar o admin:
   ```bash
   python manage.py createsuperuser
   ```

8. Inicie o servidor:
   ```bash
   python manage.py runserver
   ```

O backend estará rodando em **http://localhost:8000**, e a API de produtos em `http://localhost:8000/api/produtos/`.

---

## Como Rodar o Frontend (React + Vite)

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

   Se o `package.json` ainda não tiver as dependências específicas usadas no projeto, instale manualmente:
   ```bash
   npm install zustand axios react-hot-toast lucide-react
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará disponível em **http://localhost:5173** (porta padrão do Vite).

---

## Observações

- O modelo `Produto` possui os campos: `imagem`, `nome`, `descricao`, `preco` e `quantidade`.
- O upload de imagens depende do `Pillow` estar instalado (o `MEDIA_URL`/`MEDIA_ROOT` já estão configurados no `settings.py`).
