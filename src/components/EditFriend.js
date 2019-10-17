import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/auth';
import { FriendsContext } from '../context';
import { editFriend } from '../store/actions/actions';

const api = `http://localhost:5000/api/friends/`;

const EditFriend = (props) => {
  const [{friends, current}, dispatch] = useContext(FriendsContext)
  const [friend, setFriend] = useState(current)
  const id = props.match.params.id;

  const handleChange = (e) => {
    setFriend({...friend, [e.target.name]: [e.target.value]})
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const url = `${api}${id}`;
    if (friend) {
      axiosWithAuth().put(url, friend)
        .then(res => {
          dispatch(editFriend(res.data));
          props.history.push('/friends')
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  }

  return (
    <div className="form-data">
      <div className="login-header mb-4">
        Edit Friend
      </div>
      <form className='input-form' onSubmit={(e) => handleSubmit(e, id)} method="post">      
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
        <button className="btn btn-primary">Edit Friend</button>
      </form>
    </div>
  );
};

export default EditFriend;
