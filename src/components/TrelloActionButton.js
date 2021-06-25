import React from "react";
import Icon from "@material-ui/core/Icon"
import Card from '@material-ui/core/Card';
import TextArea from "react-textarea-autosize";
 import { Button } from "@material-ui/core";
class TrelloActionButton extends React.Component {
    state = {
        formOpen: false,
        text: ""
    };

    openForm = () => { this.setState({formOpen: true})}
    
    closeForm = () => { this.setState({formOpen: false})}

    handleInputChange = (e)=>{
        this.setState({
            text: e.target.value
        })
    }
    renderAddButton = ()=> {
        const { list } =  this.props

        const buttonText = list? "Add another List": "Add another card";
        const buttonTextOpacity = list? 1:0.5;
        const buttonTextColor = list ? "white": "inherit";
        const buttonTextBackgound = list ? "rgba(0,0,0,.15)": "inherit";

        return (
            <div
            onClick ={this.openForm}
            style={{...styles.openForButtonGroup,
            opacity: buttonTextOpacity,
            color: buttonTextColor,
            backgroundColor: buttonTextBackgound
            }}
            >
                <Icon>+</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Enter list title..." : "Enter a title for this card ...."
        const buttonTitle = list? "Add list": "Add Card";   
        return <div>
            <Card style={{
                overflow: "visible",
                minHeight: 80,
                minWidth: 272,
                padding: "6px 6px 2px"
            }}>
                <TextArea 
                placeholder={placeholder}
                autoFocus
                onBlur= {this.closeForm}
                value={this.state.text}
                onChange = {this.handleInputChange}
                style={{
                    resize: "none",
                    width: "100%",
                    overflow: "hidden",
                    outline: "none",
                    border: "none"
                }}
                />
            </Card>
            <div>
                <Button variant="container" style={{color: "white", backgroundColor: "#5aaC44"}}>{buttonTitle}</Button>
                <Icon style = {{ marginLeft: 0, cursor: "pointer"}}>X</Icon>
            </div>
            </div>;
    };
    render() {
        return this.state.formOpen? this.renderForm(): this.renderAddButton();
    }
}

const styles = {
    openForButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius:3,
        height: 36,
        width: 272,
        paddingLeft: 10, 
    }
}
export default TrelloActionButton;