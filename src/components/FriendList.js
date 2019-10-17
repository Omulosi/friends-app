import React, { useState, useEffect, useContext } from 'react';
import FriendItem from './FriendItem';
import { axiosWithAuth } from '../utils/auth';
import { FriendsContext } from '../context';
import { addFriend } from '../store/actions/actions';

const Home = (props) => {
  const [{friends}, dispatch] = useContext(FriendsContext)
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axiosWithAuth().get('http://localhost:5000/api/friends')
      .then(res => {
        dispatch(addFriend(res.data));
      })
      .catch(err => {
        setError(err.response.data.error)
      })
  }, [])

  return (
    <div className="table-md">
      <div className="error">{error && error}</div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            friends.map((friend) => (
              <FriendItem friend={friend} key={friend.id} {...props}/>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;
