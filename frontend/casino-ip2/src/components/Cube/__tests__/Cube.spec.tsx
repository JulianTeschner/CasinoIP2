import Cube3D from "../Cube";
import Cube from 'react-3d-cube';
import '@testing-library/jest-dom';
import { AllProviders } from "../../../testUtils";
import { render, screen } from "@testing-library/react";


describe("Cube", () => {
    it("should render the cube-scene", async () => {
        render(
            <AllProviders>
                <Cube3D />
            </AllProviders>
        );

        const cubeScene = await screen.getByTestId('cube-scene');

        expect(cubeScene).toBeInTheDocument();
    });

    it("should render the cube", async () => {
        render(
            <AllProviders>
                <Cube3D>
                    <Cube size={300} index="front"></Cube>
                </Cube3D>
            </AllProviders>
        );

        const cubeFront = await screen.getByTestId('cube-front');
        const cubeBack = await screen.getByTestId('cube-back');
        const cubeTop = await screen.getByTestId('cube-top');
        const cubeBottom = await screen.getByTestId('cube-bottom');
        const cubeLeft = await screen.getByTestId('cube-left');
        const cubeRight = await screen.getByTestId('cube-right');

        const cubeOne = await screen.getByTestId('cube-one');
        const cubeTwo = await screen.getByTestId('cube-two');
        const cubeThree = await screen.getByTestId('cube-three');
        const cubeFour = await screen.getByTestId('cube-four');
        const cubeFive = await screen.getByTestId('cube-five');
        const cubeSix = await screen.getByTestId('cube-six');

        expect(cubeFront).toBeInTheDocument();
        expect(cubeFront).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');
        expect(cubeBack).toBeInTheDocument();
        expect(cubeBack).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');
        expect(cubeTop).toBeInTheDocument();
        expect(cubeTop).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');
        expect(cubeBottom).toBeInTheDocument();
        expect(cubeBottom).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');
        expect(cubeLeft).toBeInTheDocument();
        expect(cubeLeft).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');
        expect(cubeRight).toBeInTheDocument();
        expect(cubeRight).toHaveAttribute('style', 'background: white; width: 300px; height: 300px;');

        expect(cubeOne).toBeInTheDocument();
        expect(cubeTwo).toBeInTheDocument();
        expect(cubeThree).toBeInTheDocument();
        expect(cubeFour).toBeInTheDocument();
        expect(cubeFive).toBeInTheDocument();
        expect(cubeSix).toBeInTheDocument();
        
    });
});