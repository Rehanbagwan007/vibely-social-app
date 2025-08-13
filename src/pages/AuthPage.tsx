import { SignIn, SignUp } from '@clerk/clerk-react';
import { useState } from 'react';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Vibely
          </h1>
          <p className="text-muted-foreground mt-2">
            Share your moments with the world
          </p>
        </div>

        {/* Auth Form */}
        <div className="instagram-card p-8">
          {isSignIn ? (
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-2xl font-semibold text-center mb-6",
                  headerSubtitle: "text-muted-foreground text-center mb-6",
                  socialButtonsBlockButton: "btn-instagram-outline w-full mb-3",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldLabel: "text-sm font-medium text-foreground",
                  formFieldInput: "instagram-input w-full",
                  formButtonPrimary: "btn-instagram w-full mt-4",
                  footerActionLink: "text-primary hover:underline"
                }
              }}
              fallbackRedirectUrl="/"
            />
          ) : (
            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none border-0 bg-transparent",
                  headerTitle: "text-2xl font-semibold text-center mb-6",
                  headerSubtitle: "text-muted-foreground text-center mb-6",
                  socialButtonsBlockButton: "btn-instagram-outline w-full mb-3",
                  dividerLine: "bg-border",
                  dividerText: "text-muted-foreground",
                  formFieldLabel: "text-sm font-medium text-foreground",
                  formFieldInput: "instagram-input w-full",
                  formButtonPrimary: "btn-instagram w-full mt-4",
                  footerActionLink: "text-primary hover:underline"
                }
              }}
              fallbackRedirectUrl="/"
            />
          )}
        </div>

        {/* Switch between Sign In / Sign Up */}
        <div className="instagram-card p-6 mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-primary font-semibold hover:underline"
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© 2024 Vibely. Made with ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;