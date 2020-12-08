import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import css from './Dropzone.less'

export default function Dropzone(props) {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = files.map((file) => (
    <div className={css.thumb} key={file.name}>
      <div className={css.thumbInner}>
        <img src={file.preview} className={css.img} />
      </div>
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={css.thumbsContainer}>{thumbs}</aside>
    </section>
  )
}
