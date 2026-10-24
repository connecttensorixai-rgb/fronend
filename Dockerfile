# ---------- Stage 1: build ----------
FROM node:22-alpine AS build
WORKDIR /app

# puppeteer is only used by local test scripts; don't download Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* values into the bundle at BUILD time
ARG VITE_API_URL
ARG VITE_APPS_SCRIPT_URL
ARG VITE_ADMIN_ROUTE
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_APP_ID
ENV VITE_API_URL=$VITE_API_URL \
    VITE_APPS_SCRIPT_URL=$VITE_APPS_SCRIPT_URL \
    VITE_ADMIN_ROUTE=$VITE_ADMIN_ROUTE \
    VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY \
    VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN \
    VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID \
    VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID

RUN npm run build

# ---------- Stage 2: serve ----------
FROM nginx:1.27-alpine

# nginx image runs envsubst on /etc/nginx/templates/*.template at startup,
# so ${PORT} (set by Cloud Run) is filled in automatically
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080
