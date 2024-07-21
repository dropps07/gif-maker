import React, { useState, useEffect } from 'react';
import './App.css';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';// Starting with working with the library
const ffmpeg = createFFmpeg({ log: true }); //so that we can see everything in the log console

//Actual web assembly binary has not been bundled yet it is a large file.
//so we load wasm binary asynchronously over a Content Delivery Network (cdn)
function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const load = async () => {
    await ffmpeg.load();     //awaiting the ffmpeg to load
    setReady(true);          // flipping the ready state to true when ffmpeg is loaded
  }

  useEffect(() => {
    load();
  }, [])


  const convertToGif = async () => {
    //wasm manages its own in-memory file system(FS)we have to make it known and save our fetched video file
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');  //the i flag is for the input file, t flag is for time that we want length of a video to be.
    // read a file
    const data = ffmpeg.FS('readFile', 'out.gif');

    //create a url
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' })); //blob stands for raw file in this case we are passing binary that we are accessing from the data buffer 
    setGif(url)
  }

  return ready ? (       //using ternary operator to check if ready state is true or or not 
    <div className='App'>
      {video && <video controls width="250" src={URL.createObjectURL(video)}></video>}

      <input type='file' onChange={(e) => setVideo(e.target.files?.item(0))} /> {/*by setting item to 0 we will select the first file 
    e.target takes refers to the input element and .file holds the selected file
    optional operator ? ensures if the input is null or undefined it will return undefined*/}

      <h3>Result</h3>
      <button onClick={convertToGif}>Convert</button>
      {gif && <img src={gif} />} {/*this is a image tag thats only displayed when we have the displayed when we have gif url*/}


    </div>
  )
    :
    //if ready then we will show our ui else we will show a loading message
    (<p>Loading...</p>)
}

export default App;
