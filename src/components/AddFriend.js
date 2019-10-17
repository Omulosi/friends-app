import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/auth';
import { FriendsContext } from '../context';

const api = `http://localhost:5000/api/friends`;
const AddFriend = (props) => {
  const [_, setFriends] = useContext(FriendsContext)
  const [friend, setFriend] = useState({name:'', age: '', email:''})

  const handleChange = (e) => {
    setFriend({...friend, [e.target.name]: [e.target.value]})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (friend) {
      axiosWithAuth().post(api, friend)
        .then(res => {
          setFriends(res.data);
          props.history.push('/friends')
        })
    }
    
  }

  return (
    <div className="form-data">
      <div className="login-header mb-4">
        Add Friend
      </div>
      <form className='input-form' onSubmit={handleSubmit} method="post">      
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type='text'
            name='name'
            onChange={handleChange}
            value={friend.name}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Age</label>
          <input
              type='number'
              name='age'
              onChange={handleChange}
              value={friend.age}
              required
              className="form-control"
            />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
              type='email'
              name='email'
              onChange={handleChange}
              value={friend.email}
              required
              className="form-control"
            />
        </div>
        <button className="btn btn-primary">Add Friend</button>
      </form>
    </div>
  );
};

export default AddFriend;
