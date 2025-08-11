import React, { createContext, useContext } from "react";

export interface PointsContextType {
    points: number | null;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    loadingPoints: boolean;
    setLoadingPoints: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PointsContext = createContext<PointsContextType | undefined>(
    undefined
);

export const usePoints = () => {
    const context = useContext(PointsContext);
    if (!context) throw new Error("Must be inside PointsProvider");
    return context;
};
// const PointsProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [points, setPoints] = useState<number>(0);

//     return (
//         <PointsContext.Provider value={{ points, setPoints }}>
//             {children}
//         </PointsContext.Provider>
//     );
// };

// export default PointsProvider;
