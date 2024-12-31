import { createContext, useState, useContext } from "react";

export const UsersContext = createContext();

function UsersProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAunthenticated] = useState(false);
  function login(email, password, navigate) {
    console.log("hello priyu");

    async function checkLogin(email, password, navigate) {
      try {
        const response = await fetch(
          `http://localhost:8001/users?email=${email}`
        );
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
          throw new Error("No user found with this email");
        }

        console.log(data[0].password);
        console.log(password);
        if (data[0].password === password) {
          console.log("Login success");
          setUser(data[0]);
          setIsAunthenticated(true);
          navigate("/");
        } else {
          throw new Error("Enter correct password");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    checkLogin(email, password, navigate);
  }

  function handleAddUser(userName, email, password, navigate) {
    const newUser = {
      userName,
      email,
      password,
    };

    async function addNewUser() {
      try {
        const response = await fetch("http://localhost:8001/users", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        console.log(response.ok);
        navigate("/login");
      } catch (error) {
        console.error(error.message);
      }
    }
    addNewUser();
  }

  return (
    <UsersContext.Provider
      value={{ handleAddUser, login, isAuthenticated, user }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}

export { UsersProvider, useUsers };
