import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyCGyOT7oriIVjgCQqgX95IpmZfJufdfdik",
  authDomain: "chatapp-5c583.firebaseapp.com",
  projectId: "chatapp-5c583",
  storageBucket: "chatapp-5c583.appspot.com",
  messagingSenderId: "841943616670",
  appId: "1:841943616670:web:087d0327204f918267bf8f",
  measurementId: "G-HDW54KBEWK"
})

const auth = firebase.auth();
const firestore = firebase.firestore(); 

const [user] = useAuthState(auth);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user? <ChatRoom/>: <SignIn/> }
        
      </section>
    </div>
  );
}

function SignIn(){
 
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.SignInWithGoogle(provider);
  }
 
  return (
  <button onClick={SignInWithGoogle}>Sign in with Goggle Account </button>
 
  )


}

function SignOut(){
  return auth.currentUser && (

    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )

}

function ChatRoom(){

  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const[messages] = useCollectionData(query, {idField: 'id'});

  

  return (

    <>
        <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message = {msg} />)}
        
        </div>    
    
    
    </>






  )



}

export default App;
