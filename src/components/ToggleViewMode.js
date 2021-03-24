import React from 'react'
import PropTypes from 'prop-types'

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'

import { DATA_VIEW_MODES } from '../constants/data_view_modes'

export const ToggleViewMode = ({ viewMode, setViewMode }) => {
    const handleChangeViewMode = React.useCallback(
        (_, nextview) => {
            setViewMode(nextview)
        },
        [setViewMode],
    )

    return (
        <ToggleButtonGroup
            orientation="horizontal"
            onChange={handleChangeViewMode}
            value={viewMode}
            exclusive>
            <ToggleButton value={DATA_VIEW_MODES.GRID} aria-label={DATA_VIEW_MODES.GRID}>
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value={DATA_VIEW_MODES.TABLE} aria-label={DATA_VIEW_MODES.TABLE}>
                <ViewListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

ToggleViewMode.propTypes = {
    viewMode: PropTypes.oneOf([DATA_VIEW_MODES.GRID, DATA_VIEW_MODES.TABLE]).isRequired,
    setViewMode: PropTypes.func.isRequired
}
