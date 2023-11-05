import React from 'react'

export default function TrackSearchResult({track, chooseTrack}) {
  
  const handlePlay = () => {
    chooseTrack(track)
  }


  return (
    <div className='d-flex m-2 align-items-center' style={{cursor: 'pointer'}} onClick={handlePlay}>
      <img src={track.image} style={{width: '64px', height: '64px'}}/>
      <div className='ml-3'>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  )
}
