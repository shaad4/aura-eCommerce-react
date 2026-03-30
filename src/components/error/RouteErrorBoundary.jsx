import { useLocation } from "react-router-dom"
import ErrorBoundary from "./ErrorBoundary";


export const RouteErrorBoundary = ({ children , global = false }) => {
    const location = useLocation();

    return(
        <ErrorBoundary key={location.pathname} global={global}>
            {children}
        </ErrorBoundary>
    )
}