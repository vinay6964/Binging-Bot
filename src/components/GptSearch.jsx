import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { LOGIN_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src={LOGIN_IMG}  alt='logo' />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch
