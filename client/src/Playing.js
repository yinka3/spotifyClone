import {useEffect, useState} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Playing({ accessToken, trackUri }) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => setIsPlaying(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state => {
        if (!state.isPlaying) setIsPlaying(false)}
    }
    play={isPlaying}
    uris={trackUri ? [trackUri] : []}
    />
  )
}
