import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { axiosWithAuth } from '../utils/auth';
import { deleteFriend } from '../store/actions/actions';
import { FriendsContext } from '../context';
import { setCurrentFriend } from '../store/actions/actions';

const api = `http://localhost:5000/api/friends/`;

const FriendItem = (props) => {
  const [{friends, current}, dispatch] = useContext(FriendsContext)

  const { id, name, age, email } = props.friend;

  const del = (id) => {
    const url = `${api}${id}`;
    axiosWithAuth().delete(url, {params: {id: id} })
      .then(res => {
        dispatch(deleteFriend(res.data));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const edit = (id, props) => {
    const url = `/edit-friend/${id}`;
    dispatch(setCurrentFriend(props.friend))
    props.history.push(url);
  }

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{age}</td>
      <td>{email}</td>
      <td>
        <FaPen className="icon" onClick={() => edit(id, props)}/>
      </td>
      <td><FaTrashAlt className="icon" onClick={() => del(id)}/></td>
    </tr>
  );
}

export default FriendItem;
