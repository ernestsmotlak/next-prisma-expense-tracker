"use client";
import { useState } from "react";
import Group from "@/components/Group";
import ShowAllGroups from "@/components/ShowAllGroups";

const Page: React.FC = () => {
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

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
                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        Button
                    </button>
                    <ShowAllGroups onGroupClick={handleGroupClick} />
                    aaaa
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
        </div>
    );
};

export default Page;
