import React, { useEffect, useState } from "react";
import { PointsContext } from "./PointsContext";
import type { PointsContextType } from "./PointsContext";
import { onAuthStateChanged } from "firebase/auth";
import getUserPoints from "../../components/User/getPoints";
import { auth } from "../../firebaseApp";

const PointsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [points, setPoints] = useState<number>(0);
    const [loadingPoints, setLoadingPoints] = useState<boolean>(true);

    const value: PointsContextType = {
        points,
        setPoints,
        loadingPoints,
        setLoadingPoints,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoadingPoints(true);
            if (user) {
                const userPoints = await getUserPoints();
                setPoints(userPoints);
            } else {
                setPoints(0);
            }
            setLoadingPoints(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <PointsContext.Provider value={value}>
            {children}
        </PointsContext.Provider>
    );
};

export default PointsProvider;
