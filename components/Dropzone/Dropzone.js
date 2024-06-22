import cn from 'classnames'
import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import css from './Dropzone.module.css'

export default function Dropzone({ files, setFiles }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
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

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview))
        },
        [files],
    )

    const thumbs = files.map((file) => (
        <div className={css.thumb} key={file.name}>
            <img src={file.preview} className={css.img} />
        </div>
    ))

    return (
        <section className={css.container}>
            <div
                {...getRootProps({
                    className: cn(css.dropzone, {
                        [css.dragActive]: isDragActive,
                        [css.hasContent]: files.length,
                    }),
                })}
            >
                <input {...getInputProps()} />
                <button>Select files</button>
                <p>Or, drop files here</p>
                <div className={css.cover}>+</div>
            </div>
            <aside className={css.thumbsContainer}>{thumbs}</aside>
        </section>
    )
}
