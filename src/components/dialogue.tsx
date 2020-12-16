import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Button } from './buttons';

type Props = {
    colourProfile?: 'default' | 'primary'
    title: string
    mainContent: string | JSX.Element
    handleClose: () => void
    open: boolean
}

export const Dialogue = ( p: Props ): JSX.Element => {
    const {
        title,
        mainContent,
        colourProfile,
        handleClose,
        open
    } = p;

    return (
        <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{ mainContent }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose } profile={ colourProfile || 'default' } size='default'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}