# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

One issue is commas between the quotes and the program separating them when not needed. Some languages also use commas instead of decimals so the
CSV parser might separate those too. Some data may not be stored properly and data validation may be required (ie 30 being stored as thirty)


- #### Step 2: Use an LLM to help expand your perspective.

I used different LLMs with the given promps (GPT 4.1 and GPT 5 mini). 

After I had gotten answers from the LLMs, I changed the prompt by adding the following sentence: Ask me questions to better understand my intent and design a better CSV parser. Important questions that the LLM asked me were:

a) You said strict RFC 4180 earlier — should the parser only operate in strict mode, or do you want a configurable strict/lenient option?
b) Default behavior for headers: treat first row as header by default, or require an explicit option?
c) Do you want automatic type coercion (e.g., "30" → number 30) or leave all fields as strings and provide optional coercion hooks?

- #### Step 3: use an LLM to help expand your perspective.

Top 4 enhancements: 
1) (Functionality) Schema validation: deciding how you want your rows to be represented (ie strings or objects)[LLM] 

“As a user of the application, I want to be able to decide what form my data takes.” 

2) (Extensibility) Correcting incorrect data
Do you want automatic type coercion (e.g., "30" → number 30) or leave all fields as strings and provide optional coercion hooks? Consider validating data to convert incorrect forms, ie string to number [both]

“As a user of the application, I want to be able to quickly fix errors in data formats without having to individually look through all the data.” 

3) (Extensibility) Dealing with first rows as headers or as data. Should first rows be treated as "keys" or as "values." We could potentially give the user flexibility and permission to decide [LLM]

“As a user of the application, I want to be able to decide if the first row of data is the header or just part of data I want to check.” 

4) (Functionality) Dealing with empty columns/ rows and null values. [both]

“As a user of the application, I want to be able to have empty rows and columns without the parser throwing an error” 

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 



### Design Choices

### 1340 Supplement

- #### 1. Correctness
The tests should be checking that the data that is being given to the parser is output completely (ie the parser does not delete any data). The tests should also check that the parser and the Zod library do not hallucinate -- this could mean that the coerce function does not produce output that is completely irrelevant to the input. 

- #### 2. Random, On-Demand Generation
By generating random CSV data, we can understand the different situations and circumstances in which users might use the parser. By testing this data with our parser, we can identify short comings and bugs in the situation and attempt to remedy it. This allows testing to go beyond self-generated files which may not be able to embody all potential problems.  

- #### 3. Overall experience, Bugs encountered and resolved

#### Errors/Bugs: 
I faced bugs when trying to decided the return type for the CSVParser() function as I intended to make it return a z.infer type. However I realised that this would require typecasting and thus changed it to return ZodSafeParseResult<T>[].

#### Tests: 
For tests, the descriptions above the tests in the basic-parser.test.ts file indicates what edge cases it intends to test


#### How To: 
The CSV files for tests are already created, the tests can be run on the appropriate files (the path is already coded in). Some tests take in both a schema and CSV path and can thus be tested on CSV files which a different desired schema. 

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 

abodet: conceptual discussion, 
psromero: conceptual discussion
jgcasale:CSVParser logic 

Copilot: generating tests and understanding test format 

#### Total estimated time it took to complete project: 8 hours
#### Link to GitHub Repo:  https://github.com/cs0320-f25/typescript-csv-samyakjan2024.git
