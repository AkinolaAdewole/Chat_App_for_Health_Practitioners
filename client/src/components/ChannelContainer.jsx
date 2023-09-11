import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    // If the channel is being created, render the CreateChannel component
    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        );
    }

    // If the channel is being edited, render the EditChannel component
    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        );
    }

    // Define an EmptyState component to display when the chat history is empty
    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is the beginning of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p>
        </div>
    );

    // If neither creating nor editing, render the Channel component with its inner content
    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState} // Set the EmptyState component as the indicator for an empty channel
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />} // Render MessageTeam component for messages
            >
                <ChannelInner setIsEditing={setIsEditing} /> // Render ChannelInner component
            </Channel>
        </div>
    );
}

export default ChannelContainer;
