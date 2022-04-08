import React from 'react';
import { render, screen } from "@testing-library/react";
import Overview from "../Overview";

describe("Overview", () => {
	it("renders a div", async () => {
		render(<Overview/>);

		const findDiv = await screen.findByText(/Overview/i);

		expect(findDiv).toBeInTheDocument();
	});
});