import React, {Component} from 'react';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";

export class ChannelPicker extends Component {
    
    render() {
        return <div>
            <form className="formContainer">
                <TextField label="Write message"/>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    }
}
