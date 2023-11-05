import React, {useState, useEffect} from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult'
import Playing from './Playing'


const spotifyApi = new SpotifyWebApi({
  clientId: "b2ef7909e45d474789ace09d4db0e931"
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingSong, setPlayingSong] = useState();

  function chooseTrack(track) {
    setPlayingSong(track)
    setSearch('')
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    if (!search) return setSearchResults([])

    let cancelSearch = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancelSearch) return
      setSearchResults(res.body.tracks.items.map(track => {
      const smallestImage = track.album.images.reduce((smallest, currImage) => 
      {
        if (currImage.height < smallest.height) return currImage
        return smallest}, 
      track.album.images[0])

      return {
        name: track.name,
        artist: track.artists[0].name,
        image: smallestImage.url,
        uri: track.uri
      }
    }))
    })
    return () => cancelSearch = true
  }, [search, accessToken])

  return (
    <Container className='d-flex flex-column py-2' style={{height: "100vh"}}>
      <Form.Control 
        type='search'
        placeholder='Search Songs/Artists' 
        value={search} 
        onChange={e => setSearch(e.target.value)}/>
      <div className='flex-grow-1 my-2' style={{overflowY: "auto"}}>
        {searchResults.map(track => 
          (<TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>))}
      </div>
      <div><Playing accessToken={accessToken} trackUri={playingSong?.uri}/></div>
    </Container>
  )
  }

