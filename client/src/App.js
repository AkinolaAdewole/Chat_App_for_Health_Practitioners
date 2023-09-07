import React,{useState} from 'react';
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import {ChannelContainer, ChannelListContainer, Auth } from './components'
import './App.css'

// Create a new instance of the Cookies class to manage cookies in your application.
const cookies = new Cookies();
const apiKey = 'gvmwucfu48vm'
const authToken = cookies.get("token");

// Create an instance of StreamChat using the provided apiKey. 
// This instance of StreamChat will be used to interact with the Stream Chat API.
const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

function App() {

  const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if(!authToken) return <Auth />

  return (
    <div>
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    </div>
  );
}

export default App;
