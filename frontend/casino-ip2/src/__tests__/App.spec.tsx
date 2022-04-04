import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe("App", () => {
	it("renders a headline", async () => {
		render(<App/>);
		
		const findHeadline = await screen.findByText(/App/i);

		expect(findHeadline).toBeInTheDocument();
	});
});
