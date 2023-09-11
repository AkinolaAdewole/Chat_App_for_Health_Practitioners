import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react'; // Importing necessary components and hooks

import { UserList } from './'; // Importing the UserList component
import { CloseCreateChannel } from '../assets'; // Importing an asset component

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext(); // Get the chat client and active channel from the context
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']) // Initialize selectedUsers with the current user's ID or an empty array
    const [channelName, setChannelName] = useState(''); // Initialize channelName state

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            // Create a new chat channel of the specified type and with provided details
            const newChannel = await client.channel(createType, channelName, {
                name: channelName,
                members: selectedUsers
            });

            await newChannel.watch(); // Start watching the new channel

            // Reset states and set the newly created channel as the active channel
            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} /> {/* Close button */}
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers} /> {/* UserList component for selecting members */}
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p> {/* Button to create the channel */}
            </div>
        </div>
    )
}

export default CreateChannel
