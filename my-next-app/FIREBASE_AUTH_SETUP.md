# Firebase Google Authentication Setup

## Firebase Configuration Complete ✅

The application has been properly configured with Firebase Authentication using Google Sign-In.

## What Has Been Set Up

### 1. **Firebase SDK Installation**
- Installed `firebase` package

### 2. **Environment Variables**
Created `.env.local` with your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBjLdevSPDlpmhynJ8OSKsecDhxD_BqYP0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=genaihackathon-9ad01.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=genaihackathon-9ad01
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=genaihackathon-9ad01.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=620198920997
NEXT_PUBLIC_FIREBASE_APP_ID=1:620198920997:web:aa0bc277dcefec56de50cc
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-QVL2VFGLN5
```

### 3. **Firebase Initialization** (`/lib/firebase.ts`)
- Properly initialized Firebase app
- Configured Google Auth Provider with account selection prompt
- Prevents multiple Firebase initializations

### 4. **Authentication Context** (`/lib/AuthContext.tsx`)
- Created `AuthProvider` context for managing authentication state
- Functions: `signInWithGoogle()`, `signOut()`
- Automatic session persistence
- Real-time auth state updates

### 5. **Protected Routes** (`/app/components/ProtectedRoute.tsx`)
- Wraps protected pages to require authentication
- Automatically redirects to `/login` if not authenticated
- Shows loading state during auth check

### 6. **Login Page** (`/app/login/page.tsx`)
- Beautiful login UI matching your app design
- Google Sign-In button with official Google branding
- Error handling and loading states
- Auto-redirects to dashboard after successful login

### 7. **Updated Navbar** (`/app/components/Navbar.tsx`)
- Shows user profile picture and name when logged in
- Dropdown menu with user info and sign out button
- "Sign In" button when not authenticated

### 8. **Protected Pages**
All main pages are now protected and require authentication:
- ✅ Dashboard (`/pages/dashboard`)
- ✅ Live Map (`/pages/map`)
- ✅ Cattle Management (`/pages/cattle`)
- ✅ Geofences (`/pages/geofences`)
- ✅ Alerts (`/pages/alerts`)

## Firebase Console Setup Required

### **IMPORTANT: Enable Google Sign-In Provider**

You must enable Google authentication in your Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `genaihackathon-9ad01`
3. Navigate to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Click **Enable**
6. Add your email as the **Project support email**
7. Click **Save**

### **Configure Authorized Domains**

For production, add your domain to authorized domains:

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your production domain (e.g., `yourdomain.com`)
3. `localhost` is already authorized for development

## How to Use

### Sign In Flow:
1. User visits any protected page (e.g., `/pages/dashboard`)
2. Automatically redirected to `/login`
3. Clicks "Continue with Google"
4. Selects Google account
5. Redirected to dashboard after successful authentication

### Sign Out Flow:
1. Click on user avatar in navbar
2. Click "Sign Out"
3. Redirected to login page

## Authentication Features

✅ **Google OAuth 2.0** - Secure authentication via Google
✅ **Session Persistence** - Users stay logged in across sessions
✅ **Protected Routes** - Pages require authentication
✅ **Auto-Redirect** - Unauthenticated users sent to login
✅ **User Profile** - Display name and photo from Google
✅ **Real-time State** - Auth state updates instantly
✅ **Error Handling** - Proper error messages for failed auth

## Testing Authentication

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. Click "Get Started" or try to access `/pages/dashboard`

4. You'll be redirected to `/login`

5. Click "Continue with Google" and sign in

6. You'll be redirected to the dashboard

## Code Structure

```
/lib
  ├── firebase.ts          # Firebase initialization
  └── AuthContext.tsx      # Authentication context & hooks

/app
  ├── login/
  │   └── page.tsx        # Login page with Google Sign-In
  ├── components/
  │   ├── Navbar.tsx      # Shows user info when authenticated
  │   └── ProtectedRoute.tsx  # HOC for protected pages
  ├── pages/
  │   ├── dashboard/      # Protected
  │   ├── map/           # Protected
  │   ├── cattle/        # Protected
  │   ├── geofences/     # Protected
  │   └── alerts/        # Protected
  └── layout.tsx         # Wraps app with AuthProvider
```

## Security Notes

- ✅ Environment variables use `NEXT_PUBLIC_` prefix for client-side access
- ✅ Firebase handles all OAuth token management
- ✅ Sessions persist in browser local storage
- ✅ Protected routes check authentication before rendering
- ✅ Google handles password security

## Next Steps

1. **Enable Google Sign-In** in Firebase Console (required!)
2. Test the authentication flow
3. Optionally add more auth providers (Email/Password, GitHub, etc.)
4. Configure Firebase Security Rules for your database (if using Firestore)
5. Add user profile management page

## Troubleshooting

**Issue: "Google Sign-In not enabled"**
- Solution: Enable Google provider in Firebase Console

**Issue: "Unauthorized domain"**
- Solution: Add your domain to Firebase authorized domains

**Issue: User not redirecting after login**
- Solution: Check browser console for errors, ensure all routes are correct

**Issue: "Firebase app already initialized"**
- Solution: Already handled with `getApps().length` check in firebase.ts

## Support

Firebase Documentation: https://firebase.google.com/docs/auth
Next.js Authentication: https://nextjs.org/docs/authentication
