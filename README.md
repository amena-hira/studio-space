# StudioSpace

StudioSpace is a peer-to-peer marketplace where creators can discover and book professional photography, film, podcast, music, and art studio spaces. Studio owners can also publish and manage their own listings.

## Live Site

- **Website:** [https://studio-space-sand.vercel.app](https://studio-space-sand.vercel.app)

## Examiner Test Credentials

```text
Email: alex.rivera@example.com
Password: Aa1234
```
## Website Features

- Studio Discovery & Filtering: Explore a wide range of creative studios, including photography studios, podcast rooms, music suites, film stages, and art workshops, with category-based filtering.

- Secure User Authentication: Users can register, log in, and authenticate with Google, with protected routes and JWT-based security.

- Studio Management (CRUD): Studio owners can add new studios, view their listings, update studio information, and delete studios through a user-friendly dashboard.

- Studio Booking System: Users can book studios for specific dates and time slots, track booking statuses, and cancel pending reservations.

- Responsive Design & Theme Customization: Enjoy a modern, mobile-friendly interface with light and dark mode support for a seamless user experience across devices.

## Tech Stack

### Client

- Next.js 16 and React 19
- Tailwind CSS and shadcn/ui
- Better Auth
- Swiper
- Sonner

### Server

- Node.js and Express
- MongoDB
- JOSE for JWT verification
- CORS and dotenv

## Run Locally

### 1. Clone the repositories

```bash
git clone https://github.com/amena-hira/studio-space.git
git clone https://github.com/amena-hira/studio-space-server.git
```

### 2. Install dependencies

```bash
cd studio-space
npm install
```

In another terminal:

```bash
cd studio-space-server
npm install
```

### 3. Configure environment variables

Create a `.env` file in `studio-space`:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret
BACKEND_URL=http://localhost:8000
```

Create a `.env` file in `studio-space-server`:

```env
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
BASE_URL=http://localhost:3000
```

### 4. Start the server

```bash
cd studio-space-server
npm run dev
```

### 5. Start the client

```bash
cd studio-space
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Source Code

- **Client:** [https://github.com/amena-hira/studio-space](https://github.com/amena-hira/studio-space)
- **Server:** [https://github.com/amena-hira/studio-space-server](https://github.com/amena-hira/studio-space-server)
