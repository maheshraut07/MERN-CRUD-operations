import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to='/create' className="btn btn-success">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success">Edit</Link>
                  <button className="btn btn-danger mx-2" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;


/**
 In the given code, the map function is used to render a table row (<tr>) for each user in the Users array. Here's a breakdown of how map is used:

The Users.map() function iterates over each user object in the Users array.
For each user, it returns a JSX element representing a table row (<tr>).
Inside the <tr>, it includes table data (<td>) for each user attribute (Name, Email, Age), as well as action buttons for editing and deleting the user.
The key={user.Email} is used to uniquely identify each table row. It's important to provide a unique key prop when rendering lists of elements in React to help React identify which items have changed, are added, or are removed.
Overall, the map function is used here to dynamically generate table rows based on the data in the Users array, making the table content dynamic and reflecting the actual user data.
 */