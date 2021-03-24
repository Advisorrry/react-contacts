import React from "react"
import { DATA_VIEW_MODES } from "../constants/data_view_modes"

const getInitialDataViewMode = () => {
    return localStorage.getItem('viewMode') || DATA_VIEW_MODES.TABLE
}

export const useViewMode = () => {
    
    const [viewMode, setViewMode] = React.useState(getInitialDataViewMode)

    React.useEffect(() => {
        localStorage.setItem('viewMode', viewMode)
    }, [viewMode])

    return [viewMode, setViewMode]
}
