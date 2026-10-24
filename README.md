# Frontend

React 18 + Vite 8 + Tailwind CSS single-page app (hash routing, Firebase auth, React Three Fiber visuals).

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Environment variables

Create a `.env` file in the project root (never commit it):

```
VITE_API_URL=
VITE_APPS_SCRIPT_URL=
VITE_ADMIN_ROUTE=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
```

`VITE_*` values are baked into the bundle at build time and are visible to anyone,
so never put real secrets in them.

## Deploy to Google Cloud Run

The app is built with Node and served by nginx on the port Cloud Run provides (8080).

Files: `Dockerfile`, `nginx.conf`, `cloudbuild.yaml`, `.dockerignore`.

1. Create an Artifact Registry repository (one time):
   ```bash
   gcloud artifacts repositories create my-repo --repository-format=docker --location=asia-south1
   ```
2. Build and deploy from the project root:
   ```bash
   gcloud builds submit --config cloudbuild.yaml \
     --substitutions=_REPO=my-repo,_VITE_APPS_SCRIPT_URL="https://...",_VITE_FIREBASE_API_KEY="...",_VITE_FIREBASE_AUTH_DOMAIN="...",_VITE_FIREBASE_PROJECT_ID="...",_VITE_FIREBASE_APP_ID="...",_VITE_ADMIN_ROUTE="...",_VITE_API_URL="..."
   ```
   (Or connect the repo to a Cloud Build trigger on `main` for automatic deploys.)
3. In Firebase Console, add the Cloud Run URL under Authentication, Settings, Authorized domains.

### Run the container locally

```bash
docker build -t frontend .
docker run -p 8080:8080 -e PORT=8080 frontend   # http://localhost:8080
```
