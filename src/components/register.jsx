import React from 'react';
import firebase from 'firebase'
import CircularProgress from 'material-ui/CircularProgress';
import { observer } from 'mobx-react';

  function writeUserData(userId, name, email, photoURL) {
     firebase.database().ref('users/' + userId).set({
       userId: userId,
       name: name,
       email: email,
       photoURL: photoURL
     });
     console.log("Added " + name);
   }

@observer
export default class RegisterEmployee extends React.Component {
  registerUser = () => {
       var provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider).then(function(result) {
       // This gives you a Google Access Token. You can use it to access the Google API.
       var token = result.credential.accessToken;
       // The signed-in user info.
       var user = result.user;
       writeUserData(user.uid, user.displayName, user.email, user.photoURL);
       firebase.auth().signOut();
     }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
   })
   this.props.appState.registerEmployee = false;
   this.props.appState.home = true;
 }

   componentDidMount() {
       return this.registerUser()
    }


   render() {
     return (
       <CircularProgress />
     )
   }
};
