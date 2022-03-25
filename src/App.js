import "./App.css";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "./Firebase-config";
function App() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState();
  const [newDOB, setNewDOB] = useState();
  const userCollectionRef = collection(database, "user");

  const createUser = async () => {
    await addDoc(userCollectionRef, {
      name: newName,
      age: Number(newAge),
      dateOfBirth: newDOB,
    });
    setNewAge(" ");
    setNewDOB(" ");
    setNewName(" ");
  };
  const updateAge = async (id, age) => {
    await updateDoc(doc(database, "user", id), { age: age + 1 });
  };
  const deleteUser = async (id) => {
    await deleteDoc(doc(database, "user", id));
  };
  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
      setUser(data.docs.map((elem) => ({ ...elem.data(), id: elem.id })));
    };
    getUser();
  }, []);
  // updateAge, deleteUser, createUser
  console.log(user);
  const card = {
    width: "25vw",
    backgroundColor: "#e8e4e3",
    borderRadius: "25px",
    marginTop: "2vmax",
    padding: "2vmax 1vmax",
  };
  const appstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  const input = {
    width: "24vmax",
    padding: "1vmax",
    borderRadius: "10px",
    marginTop: "1vmax",
    fontSize: "0.9vmax",
  };
  const btn = {
    fontSize: "1vmax",
    padding: "0.5vmax 1.5vmax",
    marginTop: "0.8vmax",
    marginLeft: "1vmax",
    borderRadius: "15px",
    cursor: "pointer",
  };
  return (
    <div className="App" style={appstyle}>
      <input
        style={input}
        value={newName}
        type="text"
        placeholder="Enter Your Name"
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        style={input}
        value={newAge}
        type="number"
        placeholder="Enter Your Age"
        onChange={(e) => setNewAge(e.target.value)}
      />
      <input
        style={input}
        value={newDOB}
        type="date"
        onChange={(e) => {
          setNewDOB(e.target.value);
          console.log(newDOB);
        }}
      />

      <button style={btn} onClick={createUser}>
        Create Data
      </button>
      {user.map((elem, i) => {
        return (
          <div key={i} style={card}>
            <h1>Name: {elem.name}</h1>
            <h1>Age: {elem.age}yrs</h1>
            <h2>DOB: {elem.dateOfBirth}</h2>
            {/* <h2>DOB :- {elem.dateOfBirth}</h2> */}
            <button
              style={btn}
              onClick={() => {
                updateAge(elem.id, elem.age);
              }}
            >
              Increase Age + 1
            </button>
            <button style={btn} onClick={() => deleteUser(elem.id)}>
              Delete This is User
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
