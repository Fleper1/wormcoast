import React, {Dispatch, FC, FormEventHandler, SetStateAction, useState} from "react";
import {render, screen} from "@testing-library/react";
import {expect} from "chai";

it("Render file reader component", async () => {
    const {container} = render(<FileReader></FileReader>);

    const formDOM = await screen.getByRole("form")
    expect(formDOM).to.be.not.null;

    const label = await screen.getByRole("label")
    expect(label).to.be.not.null;

    const spanText = await screen.getByText("Drop files here");
    expect(spanText).to.be.not.null;

    const inputFile = await screen.getByRole("grid")
    expect(inputFile).to.be.not.null;

    const submitButton = await screen.getByText("Upload");
    expect(submitButton).to.be.not.null;
})

interface FileReaderProps {
    setFormState?: Dispatch<SetStateAction<any>>
}

const FileReader: FC<FileReaderProps> = ({setFormState}) => {
    const [fileState, setFileState] = useState<File | null>(null)

    const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (!setFormState) return;
        if (!fileState) return;
        const formData = new FormData()
        formData.set('event', 'grid');
        formData.set('grid', fileState);

        setFormState(formData)
    }


    return (
        <form name={"form"} onSubmit={handleFormSubmit}>
            <label role={"label"} htmlFor="binary"  id="dropcontainer">
                <span>Drop files here</span>
                or
                <input role={"grid"} name={'grid'} type="file" id="binary" accept=".grid" required onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return;
                    setFileState(file)
                }}/>
            </label>
            <button style={{marginTop: "10px"}} type={'submit'}>Upload</button>
        </form>
    );
};
