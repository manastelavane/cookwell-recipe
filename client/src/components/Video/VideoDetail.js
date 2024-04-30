import React from 'react'
import './VideoItem.css'
const VideoDetail = ({video}) => {
  if(!video){
      return <div>Loading...</div>
  }
    const videoSrc=`https://www.youtube.com/embed/${video.id.videoId}`
      return(
            <div className='video-detail-container'>
                <div className='embed'>
                    <iframe title='video player' src={videoSrc} />
                </div>
                <div className='segment'>
                    <h4 >
                        {video.snippet.title}
                    </h4>
                    <p>{video.snippet.description}</p>
                </div>
            </div>
        )
  
}

export default VideoDetail
