import { useRouter, useSegments } from 'expo-router';
import React from 'react';

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter()

  // React.useEffect(() => {
  //   const inAuthGroup = segments[0] === '(auth)';

  //   console.log(router)

  //   if (
  //     // If the user is not signed in and the initial segment is not anything in the auth group.
  //     !user &&
  //     !inAuthGroup
  //   ) {
  //     // Redirect to the sign-in page.
  //     console.log("redirect to signup")
  //     router.replace('/signup');
  //   } else if (user && inAuthGroup) {
  //     console.log("redict to page1")
  //     // Redirect away from the sign-in page.
  //     router.replace('/page1');
  //   }
  // }, [user, segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);


  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({}),
        signOut: () => setAuth(null),
        user,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}