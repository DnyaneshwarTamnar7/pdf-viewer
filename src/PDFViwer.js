import React from 'react'
import { useState } from 'react'


import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'


function PDFViewer() {

    const [file, setFile] = useState(null)
    const [viewFile, setViewFile] = useState(null)
    const [error, setError] = useState(null)
    const fileType = ['application/pdf']

    const handleFile = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                setError(null)
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setFile(e.target.result)
                }
            }
            else {
                setError('Please select .pdf file only')
                setFile(null)
            }
        }
        else {
            console.log("please select")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (file !== null) {
            setViewFile(file)
        }
        else {
            setViewFile(null)
        }
    }

    const newplugin = defaultLayoutPlugin()

    return (
        <div className='mt-2 container'>
            <form onSubmit={handleSubmit}>
                <div className='col-12'>
                    <div className="mb-3">
                        <span className='text-danger fs-4 mt-2 mb-5'>{error}</span>
                        <input className="form-control" type="file" id="formFile" onChange={handleFile}/>
                    </div>
                    <div>
                    <button type='submit' className='mt-3 mb-5 btn btn-success position-absolute top-40 start-50 translate-middle'>View PDF</button>
                    </div>
                </div>
                
            </form>

            <h2 className='text-center mt-5'>View PDF</h2>
            <div className='pdf-view-section mt-5'>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    {viewFile && <>
                        <Viewer fileUrl={viewFile} plugins={[newplugin]} />
                    </>}
                    {!viewFile && <>No PDF File</>}
                </Worker>
            </div>
        </div>
    )

}

export default PDFViewer
