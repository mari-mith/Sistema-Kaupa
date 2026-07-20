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
- python-dotenv (variáveis de ambiente)

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

### 1. Acesse a pasta do backend

```bash
cd backend
```

### 2. Crie e ative um ambiente virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install django djangorestframework django-cors-headers pillow python-dotenv
```
> Se você tiver um arquivo `requirements.txt`, use `pip install -r requirements.txt` no lugar.

### 4. Configure a `SECRET_KEY` em variável de ambiente

Por segurança, a `SECRET_KEY` não deve ficar exposta no código. Com o Django já instalado (passo anterior), gere uma chave nova:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Na pasta `backend/`, crie um arquivo `.env` e cole a chave gerada:

```
SECRET_KEY=sua-chave-secreta-aqui
```

No `settings.py`, carregue a chave a partir do ambiente:

```python
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
```

**Importante:** adicione o `.env` ao `.gitignore` antes de fazer qualquer commit, para não subir a chave pro repositório:

```
# backend/.gitignore
.env
venv/
__pycache__/
db.sqlite3
media/
```

### 5. Ajuste `ALLOWED_HOSTS` e CORS no `settings.py`

```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
```

> O Vite, por padrão, sobe o frontend na porta **5173**. Se você rodar o frontend em outra porta, atualize `CORS_ALLOWED_ORIGINS` de acordo — do contrário, as requisições do frontend para a API serão bloqueadas por CORS.

### 6. Configure o suporte a arquivos de mídia

No `urls.py` principal do projeto (`core/urls.py`), adicione, caso ainda não esteja lá:

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Isso é necessário para exibir as imagens dos produtos enviadas via upload.

### 7. Rode as migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. (Opcional) Crie um superusuário para acessar o admin

```bash
python manage.py createsuperuser
```

### 9. Inicie o servidor

```bash
python manage.py runserver
```

O backend estará rodando em **http://localhost:8000**, e a API de produtos em `http://localhost:8000/api/produtos/`.

---

## Como Rodar o Frontend (React + Vite)

### 1. Acesse a pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

Se o `package.json` ainda não tiver as dependências específicas usadas no projeto, instale manualmente:
```bash
npm install zustand axios react-hot-toast lucide-react
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em **http://localhost:5173** (porta padrão do Vite).

---

## ✅ Checklist rápido para rodar tudo

- [ ] Backend rodando em `http://localhost:8000`
- [ ] Frontend rodando em `http://localhost:5173` (ou a porta ajustada em `CORS_ALLOWED_ORIGINS`)
- [ ] Arquivo `.env` criado em `backend/` com a `SECRET_KEY`, e `.env` incluído no `.gitignore`
- [ ] `ALLOWED_HOSTS` e `CORS_ALLOWED_ORIGINS` configurados no `settings.py`
- [ ] Migrações aplicadas (`python manage.py migrate`)
- [ ] Pillow instalado (necessário para upload de imagens, já que o modelo `Produto` usa `ImageField`)

---

## Endpoints da API

| Método | Endpoint                          | Descrição                                          |
|--------|------------------------------------|-----------------------------------------------------|
| GET    | `/api/produtos/`                   | Lista todos os produtos                             |
| GET    | `/api/produtos/?nome=termo`        | Busca produtos por nome (parcial, case-insensitive) |
| GET    | `/api/produtos/{id}/`              | Detalhes de um produto específico                   |
| POST   | `/api/produtos/`                   | Cria um novo produto                                |
| PATCH  | `/api/produtos/{id}/`              | Atualiza um produto                                 |
| DELETE | `/api/produtos/{id}/`              | Remove um produto                                   |

---

## Observações

- O modelo `Produto` possui os campos: `imagem`, `nome`, `descricao`, `preco` e `quantidade`.
- O upload de imagens depende do `Pillow` estar instalado (o `MEDIA_URL`/`MEDIA_ROOT` já estão configurados no `settings.py`).
- **Validação no backend**: o `serializers.py` valida que `nome` não pode estar vazio, e que `preco` e `quantidade` devem ser números positivos. Isso vale tanto para criação (`POST`) quanto para atualização (`PATCH`), independentemente de a requisição vir do frontend ou de qualquer outro cliente.