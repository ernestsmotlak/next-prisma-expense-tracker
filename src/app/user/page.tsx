"use client";
import { useState } from "react";
import Group from "@/components/Group";
import ShowAllGroups from "@/components/ShowAllGroups";
import CreateGroup from "../user/CreateGroup";

const Page: React.FC = () => {
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [isCreateGroupVisible, setCreateGroupisVisible] = useState<boolean>(false);

    const handleGroupClick = (groupId: number) => {
        setSelectedGroupId(groupId);
    };

    const handleReturn = () => {
        setSelectedGroupId(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">
                User Dashboard
            </h1>

            {/* Conditionally render components based on the state */}
            {selectedGroupId === null ? (
                <div className="text-center">
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center space-x-2 mx-auto mb-5"
                            onClick={() => setCreateGroupisVisible(!isCreateGroupVisible)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                            />
                        </svg>
                        <span>Create Group</span>
                    </button>
                    <ShowAllGroups onGroupClick={handleGroupClick} />
                </div>
            ) : (
                <div>
                    <div className="flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={handleReturn}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Return to Groups
                        </button>
                    </div>
                    <Group groupId={selectedGroupId} />
                </div>
            )}
            {/* <CreateGroup /> */}

            {isCreateGroupVisible && <CreateGroup />}
            
        </div>
    );
};

export default Page;
