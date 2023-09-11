import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

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

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext(); // Get the current chat channel from the context
    const [channelName, setChannelName] = useState(channel?.data?.name); // Initialize channelName state with the current channel's name
    const [selectedUsers, setSelectedUsers] = useState([]); // Initialize selectedUsers state for adding members

    const updateChannel = async (event) => {
        event.preventDefault();

        // Check if the channel name has changed
        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if (nameChanged) {
            // Update the channel's name and send a text message indicating the change
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}` });
        }

        if (selectedUsers.length) {
            // Add selected users as members to the channel
            await channel.addMembers(selectedUsers);
        }

        // Clear the channelName and selectedUsers states, and exit edit mode
        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} /> {/* Close button */}
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} /> {/* UserList component for selecting members */}
            <div className="edit-channel__button-wrapper" onClick={updateChannel}>
                <p>Save Changes</p> {/* Save Changes button */}
            </div>
        </div>
    )
}

export default EditChannel
