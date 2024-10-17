import React, { useState } from "react";

const CreateGroup: React.FC = () => {
    const [names, setNames] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter
            if (nameInput.trim()) {
                setNames([...names, nameInput.trim()]);
                setNameInput(""); // Clear the input for new entry
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here (e.g., send the names array to the server)

        if (localStorage.getItem("username")) {
            names.unshift(localStorage.getItem("username"));
        } else {
            console.error("Username not found in localStorage!");
        }

        const newNames = removeDuplicates(names);
        console.log("Submitted names:", newNames);
    };

    function removeDuplicates(array: String[]): String[] {
        let noDups = [...new Set(array)];
        return noDups;
    }

    const handleDelete = (nameToDelete: string) => {
        setNames(names.filter((name) => name !== nameToDelete));
    };

    return (
        <div className="flex justify-center flex-col items-center mt-4">
            <h1 className="text-4xl bg-blue-200 p-2 mb-4">Create Group</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label
                    htmlFor="namesInput"
                    className="block text-lg font-medium mb-2"
                >
                    Enter names:
                </label>
                <input
                    type="text"
                    id="namesInput"
                    value={nameInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a name and press Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            <ul className="name-list mt-4 w-full max-w-md">
                <li className="bg-gray-100 p-2 mb-2 rounded-md shadow-sm flex justify-between items-center">
                    {localStorage.getItem("username")}
                    <button className="ml-4 px-2 py-1 bg-green-400 text-white rounded-md hover:bg-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    </button>
                </li>
                {names.map((name, index) => (
                    <li
                        key={index}
                        className="bg-gray-100 p-2 mb-2 rounded-md shadow-sm flex justify-between items-center"
                    >
                        {name}
                        <button
                            onClick={() => handleDelete(name)}
                            className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreateGroup;
