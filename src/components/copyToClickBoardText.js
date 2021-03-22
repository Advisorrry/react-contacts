import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import { useCopyToClipboard } from 'react-use'
import { Button, ClickAwayListener } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            cursor: 'pointer',
            color: '#3396ff',
            textTransform:'lowercase'

        },
        icon: {
            marginRight: theme.spacing(1),
        },
    }),
)

const STATUS_COPY = {
    COPY: 'copy',
    COPIED: 'copied',
}
const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: 'copy',
    [STATUS_COPY.COPIED]: 'copied',
}

export const CopyToClickBoardText = ({ text }) => {
    const classes = useStyles()

    const [, copyToClipboard] = useCopyToClipboard()
    const [statusCopy, setStatusCopy] = React.useState(STATUS_COPY.COPY)


    const onClickCopy = React.useCallback(() => {
        copyToClipboard(text)
        setStatusCopy(STATUS_COPY.COPIED)
    }, [copyToClipboard, text])

    const onClickAway = React.useCallback(() => {
        setStatusCopy(STATUS_COPY.COPY)
    }, [])

    return (
        <ClickAwayListener onClickAway={onClickAway}>
        <Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
            <Button
                
                className={classes.root}
                onClick={onClickCopy}>            
                <FileCopyOutlinedIcon className={classes.icon} fontSize="small" />
                {text}
            </Button>
        </Tooltip>
        </ClickAwayListener>
    )
}

CopyToClickBoardText.propTypes = {
    text: PropTypes.string.isRequired,
}
