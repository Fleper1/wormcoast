import React, {Dispatch, FC, FormEventHandler, SetStateAction, useState} from 'react';
import cl from "./FileReader.module.css"

interface FileReaderProps {
    setFormState: Dispatch<SetStateAction<any>>
}

export const FileReader: FC<FileReaderProps> = ({setFormState}) => {
    const [fileState, setFileState] = useState<File | null>(null)

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (!fileState) return;
        const formData = new FormData()
        formData.set('event', 'grid');
        formData.set('grid', fileState);
        setFormState(formData)
    }


    return (
        <form className={cl.form} onSubmit={handleFormSubmit}>
            <label htmlFor="binary" className={cl.dropContainer} id="dropcontainer">
                <span className={cl.dropTitle}>Drop files here</span>
                or
                <input name={'grid'} type="file" id="binary" accept=".grid" required onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return;
                    setFileState(file)
                }}/>
            </label>
            <button style={{marginTop: "10px"}} type={'submit'}>Upload</button>
        </form>
    );
};

