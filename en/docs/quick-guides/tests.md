# Running Tests in Eitri-App

It is possible to write and run tests to verify that each part of your code is working correctly, from unit tests that evaluate isolated functions to integration tests that validate the combination of modules in your Eitri-App.

##### Types of Tests

<ol>
    <li>
        Unit:
        <ol>
            A unit test is the application of tests on the input and output signatures of a system. It involves validating both valid and invalid data via I/O (input/output) and is performed by developers or test analysts.
        </ol>
    </li>
    <li>
        Integration:
        <ol>
                Integration testing is the phase of software testing in which modules are combined and tested as a group. It follows unit testing, where modules are tested individually, and precedes system testing, where the complete (integrated) system is tested in an environment that simulates the production environment.
        </ol>
    </li>
</ol>

##### Requirements

- Test file name pattern with `.test.`. Example: `CalcService.test.js`
- Files must be located inside `/src/*`
- The following property declared in `eitri-app.conf.js`:

```
    type: "module"
```

##### Example Test File

```js
import CalcService from "./CalcService";

describe("CalcService", () => {
  test("addition", () => {
    const result = CalcService.addition(5, 15);
    console.log("result", result);
    expect(result).toBe(20);
  });

  test("subtraction", () => {
    const result = CalcService.subtraction(15, 35);
    expect(result).toBe(-20);
  });

  test("multiplication", () => {
    const result = CalcService.multiplication(7, 85);

    expect(result).toBe(595);
  });

  test("division", () => {
    const result = CalcService.division(100, 4);

    expect(result).toBe(25);
  });
});
```

Class to be tested:

```js
export default class CalcService {
  static addition = (num1 = 0, num2 = 0) => {
    return num1 + num2;
  };

  static subtraction = (num1 = 0, num2 = 0) => {
    return num1 - num2;
  };

  static multiplication = (num1 = 0, num2 = 0) => {
    return num1 * num2;
  };

  static division = (num1 = 0, num2 = 0) => {
    return num1 / num2;
  };
}
```

##### How to Run the Tests

```bash
# Run the command below
eitri test

# If you want to run while watching the files and re-executing on each change.
eitri test --watch
```

##### Native Calls and Mocks

Testing methods that depend on native calls is not supported, but you can create a mock of the method to return an expected value, etc.

Mock examples:

```js
// Make sure to include the following imports
import { jest } from "@jest/globals";

import Eitri from "eitri-bifrost";

jest.spyOn(Eitri, "getInitializationInfos").mockResolvedValueOnce({
  productId: "123",
});

jest.spyOn(Eitri.http, "get").mockResolvedValueOnce({
  productId: "123",
  name: "PS5 Pro",
});
```
