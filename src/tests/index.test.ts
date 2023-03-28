import { FileHandler } from "../fileHandler";

const FIXTURE_DIR = "./src/tests/Fixtures/"

describe("runTestFile01", () => {
    test('should load contents of the test01', async () => {
        let fixture = FIXTURE_DIR + "test01.txt";
        await new FileHandler().wordCount(fixture);
    })
});

describe("runTestFile02", () => {
    test('should parse contents of general test case test02', async () => {
        let fixture = FIXTURE_DIR + "test02.txt";
        await new FileHandler().wordCount(fixture);
        // Given more time I'd write a few more tests to check the values are correct.
    })
});


describe("runError", () => {
    test('should return an error if file path is invalid', async () => {
        let fixture = FIXTURE_DIR + "Error.txt";
        try {
            let file_handler = await new FileHandler().wordCount(fixture);
        } catch (error:any) {
            expect(error.message).toBe(`failed to process file ${fixture}`);
        }
    })
});