import React from "react";
import {render, screen} from "@testing-library/react";
import {expect} from "chai";

it("Render navbar component", async () => {
    const {container} = render(<Navbar></Navbar>);

    const div = await screen.getByRole("wrapper")
    expect(div).to.be.not.null;

    const dot = await screen.getByRole("dot")
    expect(dot).to.be.not.null;

    const taskLink = await screen.getByText("Task");
    expect(taskLink).to.be.not.null;

    const resultLink = await screen.getByText("Result")
    expect(resultLink).to.be.not.null;
})

const Navbar = () => {
    return (
        <div role={"wrapper"}>

            <a href={"/"}>Task</a>
            <a href={"/result"}>Result</a>

            <div role={"dot"}></div>
        </div>
    );
};