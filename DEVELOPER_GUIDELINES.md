# 🚀 Developer Guidelines - FreshmenFest 2025 Frontend
test
## 📋 **MANDATORY READING** - Project Structure and Rules

This document contains **STRICT GUIDELINES** that all developers must follow. Failure to follow these guidelines will result in failed builds, deployment issues, and code review rejections.

---

## 🏗️ Architecture Overview

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

---

## 🌳 Branch Strategy (STRICT)

### Branch Rules
1. **`main`** → Production deployment (requires manual approval)
2. **`dev`** → Development deployment (auto-deploy)
3. **`feature/*`** → Feature branches (merge to `dev`)

### Workflow
```
feature/new-feature → dev (PR + 1 review) → Auto-deploy to dev.freshmenfest2025.com
                         ↓
                    dev → main (PR + manual approval) → Auto-deploy to freshmenfest2025.com
```

### Protection Rules
- **Main branch**: Requires manual approval + status checks
- **Dev branch**: Requires 1 review + status checks
- **No direct pushes** to main or dev branches

---

## 🔧 Local Development Setup

### 1. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local (already configured correctly)
# PUBLIC_API_URL=http://localhost:4321/api
# PUBLIC_SITE_URL=http://localhost:4321
```

### 2. Start Development
```bash
# Install dependencies
pnpm install

# Start frontend (with proxy)
pnpm dev
# ✅ Frontend runs on http://localhost:4321
# ✅ API requests to /api/* are proxied to localhost:8080
```

### 3. Backend Integration
- **Backend must run on:** `http://localhost:8080`
- **Frontend dev server:** `http://localhost:4321`
- **Vite proxy** automatically forwards `/api/*` requests

---

## 🚨 **CRITICAL RULES** - API Development

### Frontend API Rules (ALWAYS)
```javascript
// ✅ CORRECT - Always use /api prefix in frontend
await fetch('/api/register');
await fetch('/api/events');
await fetch('/api/users/123');

// ❌ WRONG - Never omit /api prefix
await fetch('/register');
await fetch('/events');
```

### Backend Route Rules (NEVER)
```javascript
// ✅ CORRECT - No /api prefix in backend routes
app.post('/register', registerHandler);
app.get('/events', getEventsHandler);
app.get('/users/:id', getUserHandler);

// ❌ WRONG - Never include /api in backend routes
app.post('/api/register', registerHandler);
app.get('/api/events', getEventsHandler);
```

### Why This Works
1. **Frontend** calls `/api/register`
2. **Load Balancer** strips `/api` prefix
3. **Backend** receives `/register`
4. **Local Proxy** handles this automatically

---

## 📁 **STRICT** Project Structure

```
src/
├── components/
│   ├── common/              # ✅ Shared components (Header, Footer, etc.)
│   ├── firstdate/           # ✅ First Date specific components
│   └── rpkm/               # ✅ RPKM specific components
├── layouts/
│   └── MainLayout.astro     # ✅ Main page layout
├── lib/
│   └── api.ts              # ✅ API utilities (use this!)
├── pages/
│   ├── api/                # ✅ Internal API routes only
│   ├── index.astro         # ✅ Home page
│   └── [...].astro         # ✅ Other pages
└── styles/
    └── global.css          # ✅ Global styles only
```

### File Naming Rules
- **Components**: `PascalCase.astro` (e.g., `UserProfile.astro`)
- **Pages**: `kebab-case.astro` (e.g., `user-profile.astro`)
- **Utilities**: `camelCase.ts` (e.g., `apiUtils.ts`)

---

## 🖼️ **MANDATORY** Asset Management

### Images (STRICT RULES)
```bash
# ✅ CORRECT - Put images here
public/images/logo.png
public/images/events/event1.jpg

# ✅ CORRECT - Reference like this
<img src="/images/logo.png" alt="Logo" />
<img src="/images/events/event1.jpg" alt="Event" />

# ❌ WRONG - Don't put images anywhere else
src/assets/logo.png        # ❌ Wrong location
public/logo.png           # ❌ Wrong location
```

### Why This Matters
- Images in `/public/images/` are automatically served from CDN
- Faster loading worldwide
- Automatic caching and optimization

---

## 🔌 API Integration (USE THESE UTILITIES)

### Using the API Utility
```typescript
import { api } from '@/lib/api';

// ✅ CORRECT - Use the api utility
const { data, error } = await api.get('/users');
const result = await api.post('/register', userData);
const updated = await api.put('/users/123', updates);
const deleted = await api.delete('/users/123');

// ❌ WRONG - Don't use raw fetch
const response = await fetch('/api/users');  // Use api.get instead
```

### Error Handling
```typescript
// ✅ CORRECT - Always handle errors
const { data, error } = await api.get('/users');
if (error) {
  console.error('API Error:', error);
  return;
}
// Use data safely here
```

---

## 🎨 Styling Guidelines

### Tailwind CSS (PRIMARY)
```astro
<!-- ✅ CORRECT - Use Tailwind classes -->
<div class="bg-blue-500 text-white p-4 rounded-lg">
  <h1 class="text-2xl font-bold">Title</h1>
</div>

<!-- ❌ AVOID - Custom CSS unless necessary -->
<div style="background: blue;">  <!-- Use Tailwind instead -->
</div>
```

### Custom CSS (ONLY WHEN NEEDED)
```css
/* ✅ ACCEPTABLE - Global styles only */
/* src/styles/global.css */
body {
  font-family: 'Inter', sans-serif;
}

/* ❌ WRONG - Component-specific styles */
.my-component { ... }  /* Use Tailwind or scoped styles */
```

---

## 🚀 Deployment Workflow

### Automatic Deployments
1. **Push to `dev`** → Auto-deploy to `dev.freshmenfest2025.com`
2. **Push to `main`** → Auto-deploy to `freshmenfest2025.com`

### Manual Promotion
```bash
# 1. Create PR from dev to main
gh pr create --base main --head dev --title "Deploy to Production"

# 2. Wait for approval and merge
# 3. Production deployment starts automatically
```

### Environment URLs
- **Development**: https://dev.freshmenfest2025.com
- **Production**: https://freshmenfest2025.com
- **Local**: http://localhost:4321

---

## 📝 **MANDATORY** Code Conventions

### TypeScript (REQUIRED)
```typescript
// ✅ CORRECT - Always type your interfaces
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ CORRECT - Type function parameters
function createUser(userData: User): Promise<ApiResponse<User>> {
  return api.post('/users', userData);
}

// ❌ WRONG - No any types
function doSomething(data: any) { ... }  // Use proper types
```

### Component Props
```astro
---
// ✅ CORRECT - Type your props
interface Props {
  title: string;
  description?: string;
  isVisible: boolean;
}

const { title, description, isVisible } = Astro.props;
---

<!-- ❌ WRONG - Untyped props -->
<!-- const { title, description } = Astro.props; -->
```

### Import Paths
```typescript
// ✅ CORRECT - Use absolute imports
import Header from '@/components/common/Header.astro';
import { api } from '@/lib/api';

// ❌ WRONG - Relative imports for src files
import Header from '../../../components/common/Header.astro';
```

---

## 🔒 Security Rules (NON-NEGOTIABLE)

### Environment Variables
```typescript
// ✅ CORRECT - Public vars (client-safe)
const apiUrl = import.meta.env.PUBLIC_API_URL;
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

// ✅ CORRECT - Node environment (SSR only)
const nodeEnv = import.meta.env.NODE_ENV;

// ❌ WRONG - Don't add database credentials to frontend
// Frontend should never connect directly to database
```

### Data Handling
```typescript
// ✅ CORRECT - Validate user input
function sanitizeInput(input: string): string {
  return input.trim().toLowerCase();
}

// ❌ WRONG - Raw user input in queries
const query = `SELECT * FROM users WHERE name = '${userInput}'`;  // SQL injection risk
```

---

## 🧪 Testing Requirements

### Before Pushing Code
```bash
# ✅ REQUIRED - Always run these
pnpm build          # Must pass
pnpm preview        # Must work
```

### Build Verification
```bash
# ✅ Check build output
ls -la dist/server/entry.mjs    # Must exist
curl http://localhost:4321/api/health  # Must return 200
```

---

## 🚨 Common Mistakes to Avoid

### 1. API Routes
```javascript
// ❌ WRONG - Including /api in backend
app.get('/api/users', handler);

// ✅ CORRECT - No /api prefix
app.get('/users', handler);
```

### 2. Frontend API Calls
```javascript
// ❌ WRONG - Missing /api prefix
await fetch('/users');

// ✅ CORRECT - Always include /api
await fetch('/api/users');
```

### 3. Environment Variables
```javascript
// ❌ WRONG - Using wrong variable names
const api = process.env.API_URL;

// ✅ CORRECT - Use PUBLIC_ prefix for client vars
const api = import.meta.env.PUBLIC_API_URL;
```

### 4. Asset Paths
```astro
<!-- ❌ WRONG - Wrong image location -->
<img src="/assets/logo.png" />

<!-- ✅ CORRECT - Images in /images/ -->
<img src="/images/logo.png" />
```

---

## 📞 Getting Help

### When You're Stuck
1. **Check this document first**
2. **Read the error messages carefully**
3. **Test locally before pushing**
4. **Ask for help in the discord or dm RawSalmon directly**

### Quick Reference Commands
```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview               # Preview production build

# Testing
curl http://localhost:4321/api/health    # Test health endpoint
```

---

## ✅ Checklist Before Submitting PR

- [ ] Code follows naming conventions
- [ ] API calls use `/api` prefix in frontend
- [ ] Backend routes have NO `/api` prefix
- [ ] Images are in `/public/images/`
- [ ] TypeScript types are properly defined
- [ ] `pnpm build` passes successfully
- [ ] No console errors in browser
- [ ] Environment variables are correctly used
- [ ] PR is targeting the correct branch (`dev` for features)

---

## 🎯 Summary

**Remember the golden rules:**
1. **Frontend**: Always use `/api` prefix
2. **Backend**: Never use `/api` prefix
3. **Images**: Always in `/public/images/`
4. **Branches**: feature → dev → main
5. **Types**: Always use TypeScript
6. **Testing**: Build must pass before pushing

**Follow these guidelines strictly to ensure smooth development and deployment!**