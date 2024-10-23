"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Group from "@/components/Group"; // Adjust the path if needed

const Page: React.FC = () => {
    const [groupId, setGroupId] = useState<string | null>(null);
    const [navigatedAway, setNavigatedAway] = useState<boolean>(false); // Track if the user navigated away
    const router = useRouter();

    useEffect(() => {
        // Retrieve the selectedGroupId from localStorage
        const storedGroupId = localStorage.getItem("selectedGroupId");
        // console.log("from group page.tsx: " + storedGroupId);

        if (storedGroupId) {
            setGroupId(storedGroupId); // Set the state with the retrieved groupId
        }

        // Cleanup function to clear localStorage if navigated away
        return () => {
            if (navigatedAway) {
                console.log(
                    "Cleaning up: removing selectedGroupId from localStorage"
                );
                localStorage.removeItem("selectedGroupId");
            }
        };
    }, [navigatedAway]); // Depend on navigatedAway state

    const handleReturn = () => {
        // Clear the selectedGroupId from localStorage
        localStorage.removeItem("selectedGroupId");
        setNavigatedAway(true); // Set the state to indicate navigation away
        router.push("/user"); // Redirect back to the user dashboard
    };

    return (
        <div>
            <h1>Group Page</h1>
            {groupId ? (
                <Group groupId={parseInt(groupId)} />
            ) : (
                <p>No group selected</p>
            )}

            {/* Add a button to return to the user dashboard */}
            <div className="flex justify-center mt-10">
                <button
                    type="button"
                    onClick={handleReturn}
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                >
                    Return to User Dashboard
                </button>
            </div>
        </div>
    );
};

export default Page;
