import type { ReactNode } from "react";
import PointsProvider from "./PointsContext/PointsProvider";
import UserProvider from "./UserContext/UserProvider";

type MainContextProps = {
    children: ReactNode;
};

const MainContext = ({ children }: MainContextProps) => {
    return (
        <UserProvider>
            <PointsProvider>{children}</PointsProvider>
        </UserProvider>
    );
};

export default MainContext;
