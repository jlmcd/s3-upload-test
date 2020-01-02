import React, {useState} from 'react'
import { v4 as uniqueId } from 'uuid'
import axios from 'axios'

export default () => {
  const [isUploading, toggleUploading] = useState(false)
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [tempUrl, setTempUrl] = useState(null)

  const selectFile = e => {
    const file = e.target.files[0]
    if (file) {
      setFile(file)
      setTempUrl(URL.createObjectURL(file))
    }
  }
  const uploadFile = async () => {
    if (file) {
      toggleUploading(true)
      const fileName = `${uniqueId()}_${file.name.replace(/\s/g, '_')}`
      let res = null
      try {
        res = await axios.post(
          `/api/upload-s3?filename=${fileName}&type=${file.type}`
        )
      } catch (err) {
        return console.log(err)
      }
      const { signedRequest, url } = res.data
      const options = {
        headers: {
          'Content-Type': file.type
        }
      }
      try {
        await axios.put(signedRequest, file, options)
        setUrl(url)
        toggleUploading(false)
      } catch (err) {
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          )
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`)
        }
      }
    } else {
      alert('No file selected')
    }
  }

  return (
    <div className="uploader">
      <div className="upload-bar">
        <input
          onChange={selectFile}
          type="file"
          id="upload-image"
          accept="image/*"
        />
        <label htmlFor="upload-image">Choose a File</label>
        <button onClick={uploadFile}>Upload</button>
      </div>
      <div className="preview-window">
        {isUploading ? (
          <h2>Uploading</h2>
        ) : tempUrl ? (
          <img className="img-preview" src={tempUrl} alt="" />
          ) : (
          <h4>Preview</h4>
        )}
      </div>
      <h3>{url && `File available at ${url}`}</h3>
    </div>
  )
}