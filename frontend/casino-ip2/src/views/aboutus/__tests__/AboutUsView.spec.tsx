import React from 'react';
import { render, screen } from "@testing-library/react";
import AboutUs from "../AboutUsView";
import { AllProviders } from '../../../testUtils';

describe("AboutUs", () => {
	it("it should render a headline", async () => {
		render(
			<AllProviders>
				<AboutUs/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/About Us/i);
	
		const findPerson1Card = await screen.findByTestId('person1-card');
		const findPerson2Card = await screen.findByTestId('person2-card');
		const findPerson3Card = await screen.findByTestId('person3-card');
		const findPerson4Card = await screen.findByTestId('person4-card');

		const findJulian = await screen.findByText(/Julian/i);
		const findKilian = await screen.findByText(/Kilian/i);
		const findMarco = await screen.findByText(/Marco/i);
		const findMoritz = await screen.findByText(/Moritz/i);

		const findPerson1Image = screen.getByAltText('person1');
		const findPerson2Image = screen.getByAltText('person1');
		const findPerson3Image = screen.getByAltText('person1');
		const findPerson4Image = screen.getByAltText('person1');

		expect(findHeadline).toBeInTheDocument();

		expect(findPerson1Card).toBeInTheDocument();
		expect(findPerson2Card).toBeInTheDocument();
		expect(findPerson3Card).toBeInTheDocument();
		expect(findPerson4Card).toBeInTheDocument();

		expect(findJulian).toBeInTheDocument();
		expect(findKilian).toBeInTheDocument();
		expect(findMarco).toBeInTheDocument();
		expect(findMoritz).toBeInTheDocument();

		expect(findPerson1Card).toHaveAttribute('height', '260px');
		expect(findPerson2Card).toHaveAttribute('height', '260px');
		expect(findPerson3Card).toHaveAttribute('height', '260px');
		expect(findPerson4Card).toHaveAttribute('height', '260px');
		
		expect(findPerson1Image).toHaveAttribute('src', 'platzhalter-person.jpg');
		expect(findPerson2Image).toHaveAttribute('src','platzhalter-person.jpg');
		expect(findPerson3Image).toHaveAttribute('src', 'platzhalter-person.jpg');
		expect(findPerson4Image).toHaveAttribute('src','platzhalter-person.jpg');
	});
});