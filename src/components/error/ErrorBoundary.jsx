import React from 'react';
import ErrorFallback from "./ErrorFallback";
import GlobalCrash from "./GlobalCrash";

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError : false };
    }

    static getDerivedStateFromError(error){
        return {hasError:true};
    }

    componentDidCatch(error, errorInfo){
        console.log("UI Crash : ", error, errorInfo);
    }

    render(){
        if(this.state.hasError){
            if(this.props.global){
                return <GlobalCrash />
            }
            return <ErrorFallback />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;