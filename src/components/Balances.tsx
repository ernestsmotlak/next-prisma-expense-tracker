import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import React, { useEffect, useState } from "react";

interface GroupProps {
    group: any;
    loggedInUser: number;
}

const Balances: React.FC<GroupProps> = ({ group, loggedInUser }) => {
    return <div className="p-4 bg-gray-100 rounded-md shadow-md">hij!</div>;
};

export default Balances;
