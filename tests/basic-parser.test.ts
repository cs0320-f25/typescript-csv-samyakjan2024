import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import z from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const ANOTHER_CSV_PATH = path.join(__dirname, "../data/another.csv");
const ANOTHER2_CSV_PATH = path.join(__dirname, "../data/another2.csv");
const ANOTHER3_CSV_PATH = path.join(__dirname, "../data/another3.csv");


function writeTempCSV(content: string): string {
  const tmpPath = path.join(os.tmpdir(), `testcsv_${Date.now()}_${Math.random()}.csv`);
  fs.writeFileSync(tmpPath, content);
  return tmpPath;
}

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

// this test tests data validatio such as if thirty can be converted to 30

test("parseCSV yields data", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "30"]);
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

// following tests written with the help of CoPilot, explanation added by me

// this test checks that commas within quotes are not separated 
test("parseCSV handles quoted fields with commas", async () => {
  const results = await parseCSV(ANOTHER_CSV_PATH);
  expect(results).toEqual([
    ["name", "description"],
    ["Alice", "likes, apples"],
    ["Bob", "comma, inside"]
  ]);
});


test("parseCSV handles quoted fields with newlines", async () => {
  const results = await parseCSV(ANOTHER2_CSV_PATH);
  expect(results).toEqual([
    ["name", "notes"],
    ["Alice", "Line1\nLine2"]
  ]);
});

test("parseCSV handles escaped double quotes", async () => {
  const results = await parseCSV(ANOTHER3_CSV_PATH);
  expect(results).toEqual([
    ["name", "quote"],
    ["Alice", "She said \"hello\""]
  ]);
});

test("parseCSV throws on inconsistent field counts", async () => {
  const csv = 'name,age\nAlice,23\nBob';
  const filePath = writeTempCSV(csv);
  await expect(parseCSV(filePath)).rejects.toThrow();
});

test("parseCSV preserves leading/trailing spaces", async () => {
  const csv = 'name,desc\n Alice , " spaced " ';
  const filePath = writeTempCSV(csv);
  const results = await parseCSV(filePath);
  expect(results).toEqual([
    ["name", "desc"],
    [" Alice ", " spaced "]
  ]);
});

// this test checks that empty fields are handled correctly

test("parseCSV handles empty fields", async () => {
  const results = await parseCSV(path.join(__dirname, "../data/empty_fields.csv"));
  expect(results).toEqual([
    ["name", "age"],
    ["Alice", ""],
    ["", "Bob"],
    ["Charlie", "25"]
  ]);
});

// testing parseCSV with schema validation

const schema = z.tuple([z.string(), z.string()]);

test("parseCSV with schema validation", async () => {

const results = await parseCSV(ANOTHER_CSV_PATH, schema);
  expect(results).toEqual([
    ["name", "description"],
    ["Alice", "likes, apples"],
    ["Bob", "comma, inside"]
  ]);
});

