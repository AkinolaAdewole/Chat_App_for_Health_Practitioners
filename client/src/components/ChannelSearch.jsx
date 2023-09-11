import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets/SearchIcon';

const ChannelSearch = () => {
    // Define state variables using the useState hook
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Get the client and setActiveChannel function from the chat context
    const { client, setActiveChannel } = useChatContext();

    // Define state variables for team and direct channels
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    // useEffect to reset the channel lists when the query is empty
    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query]);

    // Function to fetch and update team and direct channels based on the search query
    const getChannels = async (text) => {
        try {
            // Query team channels and users using the client
            const channelResponse = client.queryChannels({
                type: 'team',
                name: { $autocomplete: text },
                members: { $in: [client.userID] }
            });
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            });

            // Wait for both channel and user queries to complete
            const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

            // Update state variables if there are matching channels or users
            if (channels.length) setTeamChannels(channels);
            if (users.length) setDirectChannels(users);
        } catch (error) {
            // Handle any errors by resetting the query
            setQuery('');
        }
    };

    // Function to handle the search input
    const onSearch = (event) => {
        event.preventDefault();

        // Set loading state to true and update the query state
        setLoading(true);
        setQuery(event.target.value);

        // Call getChannels to fetch and update channel lists based on the query
        getChannels(event.target.value);
    };

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-serach__input__icon">
                    <SearchIcon />
                </div>

                {/* Input element for searching */}
                <input
                    className="channel-search__input__text"
                    placeholder="Search"
                    type="text"
                    value={query}
                    onChange={onSearch}
                />
            </div>
        </div>
    );
};

export default ChannelSearch;
