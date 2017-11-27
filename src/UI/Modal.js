import React from 'react';
import Button from 'Button';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    render() {
        return (
            <div>
                <Button colored onClick={this.handleOpenDialog} raised ripple>Show Modal</Button>
                <Dialog open={this.state.openDialog}>
                    <DialogTitle>Allow this site to collect usage data to improve your experience?</DialogTitle>
                    <DialogContent>
                        <p>Allowing us to collect data will let us get you the information you want faster.</p>
                    </DialogContent>
                    <DialogActions fullWidth>
                        <Button type='button'>Agree</Button>
                        <Button type='button' onClick={this.handleCloseDialog}>Disagree</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}