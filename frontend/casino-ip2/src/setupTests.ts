// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import defaultHandlers from "../mockdata/mockRequests";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };


const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
global.localStorage = localStorageMock;
global.server = setupServer(...defaultHandlers);
  
beforeAll(() => global.server.listen());
afterEach(() => global.server.resetHandlers());
afterAll(() => global.server.close());
