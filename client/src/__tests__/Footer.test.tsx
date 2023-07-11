import {render, screen} from "@testing-library/react";
import {expect} from "chai";
import React from "react";

it("Render footer component", async () => {
    render(<Footer></Footer>);

    const footerText = await screen.getByText("Footer")
    expect(footerText).to.be.not.null;

    const div = await screen.getByRole("div");
    expect(div).to.be.not.null;
});

const Footer = () => {
    return (
        <div role="div">
            <p style={{color: "white", margin: 0}}>Footer</p>
        </div>
    );
};