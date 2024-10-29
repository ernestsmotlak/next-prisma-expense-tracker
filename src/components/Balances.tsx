import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import React, { useEffect, useState } from "react";

interface GroupProps {
    group: any;
    loggedInUser: number;
}

const Balances: React.FC<GroupProps> = ({ group, loggedInUser }) => {
    return (
        <div className="mt-5 mb-5 p-4 bg-gray-100 rounded-md shadow-md">
            <h1 className="bg-purple-200 text-xl font-semibold">Balance is shown here:</h1>
            <br />
            Group: {JSON.stringify(group)}
            <br />
            User: {loggedInUser}
        </div>
    );
};

export default Balances;
