// // import React, { createContext, useState, useContext, useEffect } from "react";

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //     const [currentUser, setCurrentUser] = useState(null);

// //     useEffect(() => {
// //         const storedUser = localStorage.getItem("userSession");
// //         if (storedUser) {
// //             setCurrentUser(JSON.parse(storedUser));
// //         }
// //     }, []);

// //     const loginUser = (userData) => {
// //         setCurrentUser(userData);
// //         localStorage.setItem("userSession", JSON.stringify(userData)); // Persist user session
// //     };

// //     const logoutUser = () => {
// //         setCurrentUser(null);
// //         localStorage.removeItem("userSession"); // Clear session on logout
// //     };

// //     return (
// //         <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // };

// import React, { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userSession");
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, [setCurrentUser]); 

//   const loginUser = (userData) => {
//     setCurrentUser(userData);
//     localStorage.setItem("userSession", JSON.stringify(userData)); 
//   };

//   const logoutUser = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("userSession"); 
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (userData) => {
    setCurrentUser(userData); 
  };

  const logoutUser = () => {
    setCurrentUser(null); 
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
