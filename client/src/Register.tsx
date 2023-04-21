import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUserName, setId } = useContext(UserContext);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/register", { username, password });
    setLoggedInUserName(username);
    setId(data.id);
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm pb-2">
          Register
        </button>
      </form>
    </div>
  );
};
