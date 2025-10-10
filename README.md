# 🎨 Task Manager Frontend

Frontend de la aplicación **Task Manager**, una herramienta de gestión de tareas moderna, desarrollada con **React + Vite** y **Tailwind CSS**.  
Este proyecto se comunica con una API REST desarrollada en **Spring Boot** y desplegada en **Render**, mientras que el frontend está desplegado en **Vercel**.

---

## 🚀 Demo en Vivo

👉 **[Task Manager App](https://taskmanager-frontend-zeta.vercel.app/)**  

---

## ✨ Características

- ✅ CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)  
- ✅ Registro e inicio de sesión de usuarios  
- ✅ Diseño **responsive** y moderno con **Tailwind CSS**  
- ✅ Tareas organizadas por estado (pendientes / completadas)  
- ✅ Comunicación con backend mediante **Axios**  
- ✅ Variables de entorno configurables (`.env`)  
- ✅ Despliegue en **Vercel** con CI/CD automático  

---

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca de interfaz de usuario  
- **Vite** - Entorno de desarrollo rápido  
- **Tailwind CSS** - Framework CSS utility-first  
- **Axios** - Cliente HTTP  
- **React Hooks** - Gestión de estado y efectos  
- **Vercel** - Hosting del frontend  

---

## 📁 Estructura del Proyecto

```
📦 taskmanager-frontend
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/          # Vistas principales
│   ├── services/       # Comunicación con la API
│   ├── App.jsx         # Componente raíz
│   └── main.jsx        # Punto de entrada
├── public/             # Recursos estáticos
├── package.json        # Dependencias
└── vite.config.js      # Configuración del entorno
```

---

## ⚙️ Configuración de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://render/api
VITE_APP_NAME=Task Manager
```

---

## 🏃 Ejecución Local

### Requisitos
- Node.js 16+  
- npm o yarn  

### Pasos
```bash
# Clonar repositorio
git clone https://github.com/gonzalocg123/taskmanager-frontend.git
cd taskmanager-frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en:  
👉 http://localhost:5173

---

## 🌈 Características de la Interfaz

- 💎 Diseño moderno y minimalista  
- 📱 Totalmente responsive  
- ⚡ Transiciones suaves y feedback inmediato  
- 🔐 Login y registro integrados  
- 🧭 Navegación simple e intuitiva  

---

## 🐞 Errores Comunes

### CORS Error
Verifica que el backend tenga habilitado el dominio del frontend en `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "tuurlvercel"
));
```

---

## 🚀 Despliegue en Vercel

1. Vincula el repositorio con **Vercel**.  
2. Configura variables de entorno:
   ```
   VITE_API_URL=https://render/api
   ```
3. Deploy automático con cada push a la rama `main`.

---

## 👨‍💻 Autor

**Gonzalo C.G.** - Desarrollador Full Stack  
📧 [chicagodinogonzalo@gmail.com](chicagodinogonzalo@gmail.com)  
🐙 [GitHub](https://github.com/gonzalocg123)  
💼 [LinkedIn](https://www.linkedin.com/in/gonzalo-chica-godino-27710a33a/)

---

## 📝 Licencia

Distribuido bajo la licencia **MIT**.  
Consulta el archivo `LICENSE` para más información.

---

<div align="center">

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!  

### 🚀 Desarrollado con pasión por [Gonzalo C.G.](https://github.com/gonzalocg123)

</div>
