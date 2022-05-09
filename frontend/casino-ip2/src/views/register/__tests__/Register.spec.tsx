import React from 'react';
import { render, screen } from "@testing-library/react";
import Register from "../Register";
import { AllProviders } from '../../../testUtils';

describe("Register", () => {
	it("renders a headline", async () => {
		render(
			<AllProviders>
				<Register/>
			</AllProviders>
		);

		const findHeadline = await screen.findByText(/Register/i);

		expect(findHeadline).toBeInTheDocument();
	});


    it("renders first name ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findFirstName = await screen.findByText(/Register/i);
        expect(findFirstName).toBeInTheDocument();
    });
    it("renders last name ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findLastName = await screen.findByText(/Register/i);
        expect(findLastName).toBeInTheDocument();
    });

    it("renders street ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findStreet = await screen.findByText(/Register/i);
        expect(findStreet).toBeInTheDocument();
    });

    it("renders city ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findCity = await screen.findByText(/Register/i);
        expect(findCity).toBeInTheDocument();
    });

    it("renders state ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findState = await screen.findByText(/Register/i);
        expect(findState).toBeInTheDocument();
    });

    it("renders zip ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findZIP = await screen.findByText(/Register/i);
        expect(findZIP).toBeInTheDocument();
    });

    it("renders birthdate ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findBirtDate = await screen.findByText(/Register/i);
        expect(findBirtDate).toBeInTheDocument();
    });

    it("renders email ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findEMail = await screen.findByText(/Register/i);
        expect(findEMail).toBeInTheDocument();
    });

    it("renders password ", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findPassword = await screen.findByText(/Register/i);
        expect(findPassword).toBeInTheDocument();
    });

    it("renders another password", async() =>{
        render(
            <AllProviders>
				<Register/>
			</AllProviders>
        );
        const findAnotherPassword = await screen.findByText(/Register/i);
        expect(findAnotherPassword).toBeInTheDocument();
    });
	
});