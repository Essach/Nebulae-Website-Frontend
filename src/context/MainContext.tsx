import type { ReactNode } from "react";
import PointsProvider from "./PointsContext/PointsProvider";

type MainContextProps = {
    children: ReactNode;
};

const MainContext = ({ children }: MainContextProps) => {
    return <PointsProvider>{children}</PointsProvider>;
};

export default MainContext;
