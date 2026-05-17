# 🌐 ICV - Interactive CV

## 📍 Live Application
### **[https://icv-sk.vercel.app/](https://icv-sk.vercel.app/)**

---

## 📋 Project Overview

ICV is an interactive CV/Portfolio application built with modern web technologies. It features a responsive frontend built with Vue 3 and Vite, powered by a FastAPI backend with MongoDB integration.

### Stack
- **Frontend**: Vue 3, TypeScript, Vite, Vitest
- **Backend**: FastAPI, Python, MongoDB
- **Deployment**: Vercel (Frontend)

---

## 📁 Project Structure

```
ICV/
├── frontend/          # Vue 3 + Vite application
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── data/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   └── __tests__/
│   └── package.json
│
└── backend/           # FastAPI Python application
    ├── main.py
    ├── requirements.txt
    └── cv_data.json
```

---

## 🚀 Quick Start

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
# Create and activate virtual environment (Windows)
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r backend/requirements.txt

# Start development server
cd backend
python -m uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

---

## 📝 Available Scripts

### Frontend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test:unit` - Run unit tests with Vitest
- `npm run lint` - Lint code with ESLint

### Backend

- `python -m uvicorn main:app --reload` - Start development server
- `python -m uvicorn main:app` - Start production server

---

## 🔧 Configuration

### Frontend
- **Vite Config**: `frontend/vite.config.ts`
- **TypeScript Config**: `frontend/tsconfig.json`
- **ESLint Config**: `frontend/eslint.config.ts`

### Backend
- **Environment Variables**: Create a `.env` file in the backend directory
- **MongoDB URL**: Set `MONGO_URL` in your `.env` file

---

## 🧪 Testing

### Frontend Unit Tests
```bash
cd frontend
npm run test:unit
```

---

## 📚 Documentation

- Frontend development setup is documented in [frontend/README.md](frontend/README.md)
- Frontend uses Vue 3 with TypeScript and Vite as build tool
- Backend API endpoints are defined in [backend/main.py](backend/main.py)

---

## 🌐 Deployment

The frontend is deployed on **Vercel** and automatically deploys on push to the main branch.

Visit the live application: **[https://icv-sk.vercel.app/](https://icv-sk.vercel.app/)**

---

## 👨‍💻 Development

### Code Style
- Follow ESLint rules for the frontend
- Use TypeScript for type safety
- Maintain consistent code formatting

### IDE Recommendations
- **VS Code** with Vue and Python extensions
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for Vue 3 support
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) for Python support

---

## 📄 License

Project by serco

---

**Last Updated**: May 2026
