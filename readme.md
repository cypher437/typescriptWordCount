
## DESCRIPTION

A coding demonstration project to count the frequencies of words from a given text file. Ignores padding, casing and treats each line as a single word token. The output is saved into a `.results` in an alphabetical order.

The project utilizing **Typescript**, **Jest** and **Node.js**

## Perquisites
Built with the following:
- Node.Js v18.13.0
- NPM v8.19.3
- typescript 5.0.2

## Setup
```
git clone https://github.com/cypher437/typescriptWordCount.git
npm install
```
## Run

### Quick run
From the root of the project run
```
npm run demo
```

### With your own file
Invoke **index.ts**  with either Node or Deno passing in a path a text file.

Running from Node:
```
npx ts-node src\index.ts tests\Fixtures\test01.txt
```

## Output
the parsed text is saved into .results and displayed in the console.
```
tests\Fixtures\test01.txt.result
```

![Screenshot of a test01 output](/assets/test01.png)

## Test with Jest

```
npm run test
```

![Screenshot of a Jest test passing](/assets/passing.png)