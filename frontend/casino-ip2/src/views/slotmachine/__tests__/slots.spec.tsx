import React from 'react';
import { render, screen } from "@testing-library/react";
import Slotmachine from "../Slotmachine";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import renderer from 'react-test-renderer';
import axios from "axios";


it('renders correctly', ()=> {
    const tree = renderer.create(<Slotmachine/>).toJSON();
    expect(tree).toMatchSnapshot();
})