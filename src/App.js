import React from 'react';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import FriendList from './components/FriendList';
import AddFriend  from './components/AddFriend';
import EditFriend  from './components/EditFriend';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import {
  FriendsContextProvider,
  AuthContextProvider,
} from './context';


const App = () => {

  return (
    <AuthContextProvider>
      <FriendsContextProvider>
          <div className="">
            <Header />
            <section className="main-content container">
              <Switch>
                <Route  exact path="/" component={Home}/>
                <PrivateRoute path="/friends" component={FriendList} />
                <PrivateRoute path="/add-friend" component={AddFriend} />
                <PrivateRoute path="/edit-friend/:id" component={EditFriend} />
                <Route path="/login" component={Login}/>
              </Switch>
            </section>
          </div>
      </FriendsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
