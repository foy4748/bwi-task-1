import db from "../Contexts/FireStoreContext";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function CRUD() {
  const [storedUsers, setStoredUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = { ...doc.data(), _id: doc.id };
          users.push(data);
        });
        setStoredUsers(users);
      } catch (error) {
        console.error(error);
        setDataLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const fullName = form.fullName.value;
    const createdAt = Date.now();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        fullName,
        email,
        createdAt,
      });
      console.log("Document written with ID: ", docRef.id);
      const newUsers = [
        ...storedUsers,
        { fullName, email, createdAt, _id: docRef.id },
      ];
      setStoredUsers(newUsers);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    const newUserSet = storedUsers.filter((itm) => itm._id !== id);
    setStoredUsers(newUserSet);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const washingtonRef = doc(db, "users", editUser._id);
      await updateDoc(washingtonRef, editUser);
      const newState = storedUsers.filter((itm) => itm._id !== editUser._id);
      newState.push(editUser);
      setStoredUsers(newState);
      setEditUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  const modal = (editUser) => {
    console.log(editUser);
    return (
      <>
        {/* The button to open modal */}
        <div className="modal" id="userEditModal">
          <div className="modal-box">
            <form
              className="max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleUpdate}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={editUser.fullName}
                  onChange={(e) =>
                    setEditUser((prev) => {
                      const newState = { ...prev, fullName: e.target.value };
                      return newState;
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) => {
                    setEditUser((prev) => {
                      const newState = { ...prev, email: e.target.value };
                      return newState;
                    });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Edit
                </button>
              </div>
            </form>

            <div className="modal-action">
              <a href="#" className="btn">
                Close
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      {editUser && modal(editUser)}
      <div></div>
      <h1 className="text-3xl text-center">Add a User</h1>
      {/* Add User Form*/}
      <div className="flex justify-center">
        <form
          className="max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleAddUser}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              id="fullName"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      {/* Stored Users List */}
      <div>
        <h1 className="text-center text-3xl">Added Users</h1>
        <div className="flex justify-center">
          <table className="w-1/2">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {setStoredUsers?.length &&
                storedUsers.map((users) => {
                  return (
                    <tr key={users._id}>
                      <td>{users.fullName}</td>
                      <td>{users.email}</td>
                      <td
                        className="text-center"
                        onClick={() => handleDelete(users._id)}
                      >
                        (X)
                      </td>
                      <td onClick={() => setEditUser(users)}>
                        <a href="#userEditModal" className="btn btn-xs">
                          open modal
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
