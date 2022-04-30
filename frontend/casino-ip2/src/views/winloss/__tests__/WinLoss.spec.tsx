import React from 'react';
import { render, screen } from '@testing-library/react';
import WinLoss from '../WinLoss';

describe('win/loss overview', () => {
    it('should render the header', async () => {
        render(<WinLoss />);

        const header = await screen.findByText('Win-Loss Overview');

        expect(header).toBeInTheDocument();
    });
})