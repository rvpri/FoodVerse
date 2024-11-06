import { createContext, useState, useContext } from "react";

export const UsersContext = createContext();

function generateRandomId() {
  return Math.floor(10000 + Math.random() * 90000);
}

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  const handleAddUser = (userName, email, password) => {
    if (!userName || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    const newUser = {
      userName,
      email,
      password,
      id: generateRandomId(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log("Updated Users list:", users);
  };

  return (
    <UsersContext.Provider value={{ users, handleAddUser }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}

export { UsersProvider, useUsers };
