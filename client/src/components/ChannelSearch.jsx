import React,{useState, useEffect} from 'react'
import { useChatContext } from 'stream-chat-react'

import { SearchIcon } from '../assets/SearchIcon'

const ChannelSearch = () => {
  return (
    <div className="channel-search__container">
        <div className="channel-search__input__wrapper">
            <div className="channel-serach__input__icon">
                <SearchIcon />
            </div>   
        </div>
    </div>
  )
}

export default ChannelSearch