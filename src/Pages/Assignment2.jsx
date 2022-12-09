import { useState } from "react";
export default function Assignment2() {
  const [output, setOutput] = useState(null);

  // Assignment 2 : Solution Function
  const restStrings = (givenString, givenChar) => {
    // Finding the first occurance index
    const idx = givenString.indexOf(givenChar);

    // Case: Letter NOT found in sentence
    if (idx < 0) {
      return "The letter does not exist in the sentence";
    }

    // Case: Letter  found in sentence
    return givenString.slice(idx + 1);
  };

  // Handling Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    //Inputs
    const sentence = form["sentence-field"].value;
    const letter = form["letter-field"].value;

    const result = restStrings(sentence, letter);
    setOutput(result);
  };

  return (
    <div>
      <section className="flex justify-center">
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sentence-field"
              >
                Sentence
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={() => setOutput(null)}
                id="sentence-field"
                type="text"
                required
                maxLength="100"
                placeholder="Enter a sentence"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="letter-field"
              >
                Letter
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="letter-field"
                onChange={() => setOutput(null)}
                required
                maxLength="1"
                type="text"
                placeholder="Enter a letter"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {output && (
            <>
              <p className="text-3xl mt-5">Output: </p>
              <p className="mt-3">{output}</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
