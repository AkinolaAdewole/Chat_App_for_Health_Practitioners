import React from 'react';
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import {ChannelContainer, ChannelListContainer }

const apiKey = 'gvmwucfu48vm'

// create an instance of a streamchat
const client = StreamChat.getInstance(apiKey);
function App() {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChanellListContainer/>
        <ChanellListContainer/>
      </Chat>
    </div>
  );
}

export default App;
