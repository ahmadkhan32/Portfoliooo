# Deployment Guide for Antigravity

## Backend Deployment (Render.com)

1. **Create a Web Service** on Render.
2. **Connect Reposiory**: Select your GitHub repository.
3. **Root Directory**: `antigravity-backend`.
4. **Build Command**: `npm install`.
5. **Start Command**: `node src/server.js`.
6. **Environment Variables**: Add the following from your `.env`:
    - `MONGO_URI`
    - `JWT_SECRET`
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `NODE_ENV`: production
    - `CLIENT_URL`: https://your-frontend-url.vercel.app

## Frontend Deployment (Vercel)

1. **Import Project** on Vercel.
2. **Root Directory**: `antigravity-frontend`.
3. **Framework Preset**: Next.js (Automatic).
4. **Environment Variables**:
    - `NEXT_PUBLIC_API_URL`: https://your-backend-url.onrender.com/api
5. **Deploy**: Click Deploy.

## Post-Deployment Check

1. Verify the frontend loads.
2. Try logging in to `/login` to verify backend connection.
3. Test image upload in Admin panel to verify Cloudinary.
