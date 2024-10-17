import React, { useState } from "react";

const CreateGroup: React.FC = () => {
    const [names, setNames] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };

    const handleGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!groupName.trim()) {
            console.error("Group name cannot be empty!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            const username = localStorage.getItem("username");

            if (!token || !userId || !username) {
                console.error(
                    "Missing token, userId, or username in localStorage!"
                );
                return;
            }

            const temp: string[] = [username, ...names];
            const newNames = removeDuplicates(temp);

            const response = await fetch(
                `http://localhost:3012/group/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        groupName,
                        participants: newNames.join(", "), // Join names as a comma-separated string
                    }),
                }
            );

            // Log response for debugging
            const responseData = await response.json();
            console.log("Response Data:", responseData);

            if (!response.ok) {
                throw new Error("Failed to create a new group!");
            }
        } catch (error) {
            console.error("Error creating group!", error);
        }
    };

    function removeDuplicates(array: string[]): string[] {
        return [...new Set(array)];
    }

    const handleDelete = (nameToDelete: string) => {
        setNames(names.filter((name) => name !== nameToDelete));
    };

    return (
        <div className="flex justify-center flex-col items-center mt-4">
            <h1 className="text-4xl bg-purple-300 p-2 mb-4">Create Group</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label
                    htmlFor="groupNameInput"
                    className="block text-lg font-medium mb-2"
                >
                    Group Name:
                </label>
                <input
                    type="text"
                    id="groupNameInput"
                    value={groupName}
                    onChange={handleGroupName}
                    placeholder="Group Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <br />
                <br />
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

            <ul className="name-list mt-4 w-full max-w-md mb-80">
                <li className="bg-gray-100 p-2 mb-2 rounded-md shadow-sm flex justify-between items-center">
                    {localStorage.getItem("username")}
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
