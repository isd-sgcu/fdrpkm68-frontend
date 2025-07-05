# FreshmenFest 2025 Frontend

A modern, dual-environment SSR frontend for FreshmenFest 2025 built with Astro, deployed on Google Cloud Platform with automatic CI/CD.

## 🏗️ Enhanced Architecture

### Production Environment
**URL:** `https://freshmenfest2025.com`
```
freshmenfest2025.com → Load Balancer
├── /api/* → Cloud Run (Backend) - strips /api prefix
├── /_astro/* → Cloud Storage Bucket (CDN)
├── /images/* → Cloud Storage Bucket (CDN)
└── /* → Cloud Run (Astro SSR Frontend)
```

### Development Environment  
**URL:** `https://dev.freshmenfest2025.com`
```
dev.freshmenfest2025.com → Load Balancer
├── /api/* → Cloud Run (Backend) - strips /api prefix  
├── /_astro/* → Cloud Storage Bucket (CDN)
├── /images/* → Cloud Storage Bucket (CDN)
└── /* → Cloud Run (Astro SSR Frontend)
```

## 🚀 Tech Stack

- **Framework**: Astro with SSR
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 20
- **Package Manager**: pnpm
- **Deployment**: Google Cloud Run + Cloud Storage
- **CI/CD**: GitHub Actions (Dual Environment)

## 🌳 Branch Strategy

### Workflow
```
feature/new-feature → dev (PR + review) → Auto-deploy to dev.freshmenfest2025.com
                         ↓
                    dev → main (PR + approval) → Auto-deploy to freshmenfest2025.com
```

### Branch Rules
- **`main`** → Production (requires manual approval)
- **`dev`** → Development (team can merge)
- **`feature/*`** → Feature branches

## 🛠️ Quick Start

### Prerequisites
- Node.js 20 or later
- pnpm
- Git

### Setup
```bash
# Clone and setup
git clone <repository-url>
cd fdrpkm68-frontend
pnpm install

# Copy environment template
cp .env.example .env.local

# Start development (with backend proxy)
pnpm dev
```

**Local URLs:**
- **Frontend**: http://localhost:4321
- **API Proxy**: http://localhost:4321/api/* → http://localhost:8080/*

## ⚡ Development Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server with API proxy |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm astro ...` | Run Astro CLI commands |

## 🔧 Environment Configuration

### Local Development (.env.local)
```bash
# Frontend runs on :4321, API proxy forwards to :8080
PUBLIC_API_URL=http://localhost:4321/api
PUBLIC_SITE_URL=http://localhost:4321
NODE_ENV=development
```

### GitHub Secrets (Production Only)
```
# Production secrets
PROD_API_URL=https://freshmenfest2025.com/api
PROD_SITE_URL=https://freshmenfest2025.com

# Shared secrets
GCP_PROJECT_ID=your-project-id
GCP_SA_KEY={service account JSON}
```

## 📁 Project Structure (STRICT)

```
src/
├── components/
│   ├── common/              # Shared components (Header, Footer)
│   ├── firstdate/           # First Date specific components  
│   └── rpkm/               # RPKM specific components
├── layouts/
│   └── MainLayout.astro     # Main page layout
├── lib/
│   └── api.ts              # API utilities (USE THIS!)
├── pages/
│   ├── api/                # Internal API routes only
│   └── *.astro             # Page components
└── styles/
    └── global.css          # Global styles only
```

## 🚨 **CRITICAL** Development Rules

### Frontend API Calls (ALWAYS)
```javascript
// ✅ CORRECT - Always use /api prefix
await fetch('/api/register');
await fetch('/api/events');

// ❌ WRONG - Never omit /api prefix  
await fetch('/register');
```

### Backend Routes (NEVER)
```javascript
// ✅ CORRECT - No /api prefix in backend
app.post('/register', handler);
app.get('/events', handler);

// ❌ WRONG - Don't include /api in backend
app.post('/api/register', handler);
```

### Asset Management (MANDATORY)
```bash
# ✅ CORRECT - Images location
public/images/logo.png
public/images/events/event1.jpg

# ✅ CORRECT - Image references  
<img src="/images/logo.png" alt="Logo" />
```

## 🔌 API Integration

### Use the Built-in API Utility
```typescript
import { api } from '@/lib/api';

// GET request
const { data, error } = await api.get('/users');

// POST request  
const result = await api.post('/register', userData);

// Error handling
if (error) {
  console.error('API Error:', error);
  return;
}
```

## 🚢 Deployment Process

### Automatic Deployments
1. **Push to `dev`** → Auto-deploy to `dev.freshmenfest2025.com`
2. **Push to `main`** → Auto-deploy to `freshmenfest2025.com`

### Promotion Workflow
```bash
# 1. Develop on feature branch
git checkout -b feature/new-feature

# 2. Create PR to dev branch
gh pr create --base dev --head feature/new-feature

# 3. After review, merge to dev
# → Auto-deploys to dev.freshmenfest2025.com

# 4. When ready for production
gh pr create --base main --head dev --title "Deploy to Production"

# 5. After approval, merge to main  
# → Auto-deploys to freshmenfest2025.com
```

### Environment URLs
- **Development**: https://dev.freshmenfest2025.com
- **Production**: https://freshmenfest2025.com  
- **Local**: http://localhost:4321

## 📊 Monitoring & Health Checks

- **Health Endpoint**: `/api/health`
- **Development Logs**: GitHub Actions → dev deployment
- **Production Logs**: GitHub Actions → main deployment
- **GCP Monitoring**: Cloud Run console

## 🔒 Security Features

- **Environment Separation**: Complete isolation between dev/prod
- **Secret Management**: GitHub Secrets for production
- **Service Account**: Minimal GCP permissions
- **HTTPS Only**: All environments enforce HTTPS
- **Container Security**: Non-root user, minimal attack surface

## 🎯 Key Features

- **✅ Dual Environment**: Automatic dev/prod deployment
- **✅ API Prefix Stripping**: Load balancer handles routing
- **✅ Static Asset CDN**: Global content delivery
- **✅ SSR Capabilities**: Dynamic content with SEO benefits
- **✅ Vite Proxy**: Seamless local development
- **✅ TypeScript**: Full type safety
- **✅ Tailwind CSS**: Utility-first styling

## 📚 Documentation

### Essential Reading
1. **[DEVELOPER_GUIDELINES.md](./DEVELOPER_GUIDELINES.md)** - **MANDATORY** coding standards
2. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment setup
3. **GCP Setup Guide** - Infrastructure configuration

### Quick References
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Cloud Run](https://cloud.google.com/run)

## ✅ Pre-Push Checklist

Before creating any PR, ensure:

- [ ] **Read DEVELOPER_GUIDELINES.md**
- [ ] Code follows naming conventions
- [ ] Frontend uses `/api` prefix for API calls
- [ ] Backend routes have NO `/api` prefix
- [ ] Images are in `/public/images/`
- [ ] `pnpm build` passes successfully
- [ ] TypeScript types are properly defined
- [ ] Targeting correct branch (`dev` for features)

## 🤝 Contributing

1. **Read DEVELOPER_GUIDELINES.md** (mandatory)
2. Create feature branch from `dev`
3. Follow all coding conventions
4. Test locally with `pnpm build`
5. Create PR targeting `dev` branch
6. Address review feedback
7. Merge triggers auto-deployment

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Need Help?

1. **Check [DEVELOPER_GUIDELINES.md](./DEVELOPER_GUIDELINES.md)** first
2. Review error messages carefully  
3. Test with `pnpm build` locally
4. Ask in team chat if stuck

**Remember: Frontend uses `/api`, Backend doesn't!** 🚀