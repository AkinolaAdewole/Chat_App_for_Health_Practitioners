import React from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';

const TeamMessage = () => {
    const { message } = useMessageContext();

    // If you want to open a thread when clicking the message, you can use handleOpenThread
    const handleOpenThread = () => {
        // Implement your logic here to open the thread
    };

    return (
        <MessageTeam
            message={{ ...message, user: {} }}
            handleOpenThread={handleOpenThread} // Pass the handleOpenThread function here
        />
    );
};

export default TeamMessage;
