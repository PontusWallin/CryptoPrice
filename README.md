# 🚀 Crypto Price
A full-stack application to fetch, cache, and display cryptocurrency price data — powered by NestJS, Quasar, and Prisma.

## ✨ Features
- Real-time crypto price tracking with caching
- Clean, component-based frontend using Quasar
- Uses **NestJS** with clean architecture principles
- Swagger UI for easy API inspection
- PostgreSQL database with Prisma ORM
- Modular, scalable Nx monorepo architecture
- Modern and minimal dependency management with pnpm
- Full stack testing support with vitest and Jest


## 🧪 Tech Stack

**Frontend**: Quasar (Vue 3 + Vite)  
**Backend**: NestJS + Axios + Prisma  
**Database**: PostgreSQL  
**ORM**: Prisma  
**Testing**: Vitest (frontend), Jest (backend)  
**Tooling**: Nx Monorepo, PNPM, Docker Compose

## 🛠️ Getting Started

1. **Install Node.js v20+**
2. **Install dependencies** from the root:
   ```sh
   pnpm install
   ```
3. **Configure environment variables** in `apps/api/.env`:
   ```
   DATABASE_URL="postgresql://pontus:password1234@localhost:5432/crypto_price?schema=public"
   TTL=30000
   ```
4. **Start database container**:
   ```sh
   cd apps/api
   docker compose up
   ```
5. **Generate Prisma client**:
   ```sh
   cd apps/api 
   npx prisma generate
   ```
6. **Start dev servers**:
   ```sh
   pnpm nx run-many --target=serve --all
   ```
7. **Open app**:
- Frontend: [`http://localhost:9000`](http://localhost:9000)
- Swagger Docs: [`http://localhost:3000/docs`](http://localhost:9000/docs)

8. **Run tests**:
   ```sh
   pnpm nx run-many --target=test --all
   ```

---

## 🌱 Future Improvements
This project was built as a proof of concept with a robust and scalable base.  Here are some ideas for future improvements:

🧱 Backend Enhancements
- **DTOs & Validation**: Since the current project doesn’t handle any user-facing CRUD operations, no DTOs were introduced. That said, the NestJS structure is ready to support them as soon as data validation or external API interactions become more complex.
- **Workers & Queues**: A new workspace can be created to handle background tasks, such as data ingestion, caching, and notifications. Instead of handling it with a simple cron job as is done currently.
- **Database Normalization**: The current database structure is very simple and when scaling it will be useful to split the data into multiple normalized tables. For example, the `crypto` table could be split into multiple tables, such as `crypto`, `exchange`, and `price`. This would help to reduce data duplication and make it easier to maintain the database.

🎨 Frontend Growth
- **SSR ready**: Server-side rendering is not currently implemented, but the Quasar framework supports it. This would improve SEO and performance for the landing page.
- **SSG**: Alternatively, we could switch to a static site generator like Nuxt or SvelteKit for the landing page. This would allow us to pre-render the page at build time, improving performance and SEO.
- **PWA and Mobile**: The Quasar framework supports PWA and mobile app development. This would allow us to create a mobile app that can be installed on iOS and Android devices, improving the user experience.
- **UX**: The current error handling and loading UX is very basic. We can add notifications, modals, and other UI elements to improve the user experience. For example, we can add a loading spinner when fetching data from the API, or a notification when the data is successfully cached.
- **Admin panel ready**: The layout system and built-in components from Quasar make it a great tool for building admin panels and other internal tools. 
  
🧰 Tooling & Architecture Improvements
- **Testing**: Test coverage is minimal due to time constraints but structure supports full testing.
- **Shared libraries with shared data structure**: Currently, the backend and frontend use different data structures. This is not a problem for this project, but in a larger project, it would be useful to have a shared library with the data structure. This reduces data duplication and improves maintainability.

## 🧠 Built with intention
Every tool and pattern used in this project was chosen to deliver clean architecture and build something scalable for lots of future growth. I am confident this project can serve as a base for some very cool applications in the future!
Here's what guided the decisions I made:

- **Quasar**: Chosen for speed during prototyping **and** it's potential to scale into PWA, mobile and even Desktop apps.
- **NestJS**: A great framework for building scalable and maintainable server-side applications. Great for testable code and modular architecture.
- **Prisma**: A modern, type-safe, ORM that makes it easy to work with databases.
- **Postgress via Docker**: A powerful and reliable database that is easy to set up and use.
- **Nx Monorepo**: Enables scaling with multiple apps and libraries in a single repository.