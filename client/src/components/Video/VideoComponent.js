/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect } from 'react'
import VideoDetail from './VideoDetail'
import VideoList from './VideoList'
import useVideos from './hooks/useVideos'
import { useSelector } from 'react-redux'
import './VideoItem.css'

const VideoComponent = () => {
    const { card,isLoading} = useSelector((state) => state.cards);
    // console.log("hello")
    const [selectedVideo,setSelectedVideo]=useState(null)
  const [videos,search]=useVideos('')
  useEffect(()=>{
    if(card && card.Name){
        search(card?.Name)
    }
  },[])
  useEffect(()=>{
    setSelectedVideo(videos[0]);
  },[videos])
    if(isLoading){
        return(
            <>
                Loading...
            </>
        )
    }
  return (
    <div className='videoflex'>
     <VideoDetail video={selectedVideo} /> 
     <VideoList videos={videos} onVideoSelect={(video)=>setSelectedVideo(video)} />
    </div>
  )
}

export default VideoComponent
