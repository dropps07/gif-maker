# GIFMAKR
* its a simple gif makr which takes mp4 as an input and then converts it into a url for browser to read 
# problems
* 1-> ffmpeg libraries does not work on the latest verision
* 2-> Due to the new policy by google chrome of Cross-Origins Resource Sharing (CORS) blocking the ffmpeg api which has faced some bufferedShared issue

# Solutions
* we could downgrade the ffmoeg version to 0.9.0 in which case, it works just perfect!
* We could make a new file inside chrome and bypass CORS, head to `c:ProgramFiles/Google/applications/chrome.exe` and then create a new shortcut with a js file that runs this code `"C:\Program Files\Google\Chrome\Application\chrome.exe" --enable-features=SharedArrayBuffer`
  
