import React from 'react'
import './VideoItem.css'
const VideoItem = ({video,onVideoSelect}) => {
  return (
    <div onClick={()=>onVideoSelect(video)} className='video-item'>
      <img alt={video.snippet.title} className='video-image' src={video.snippet.thumbnails.medium.url} />
      <div className='video-content'>
        <div className='video-header'>
        {video.snippet.title}
        </div>
      </div>
    </div>
  )
}

export default VideoItem
