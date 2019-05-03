import React,{ Component } from 'react'

// this model is the main modal that pops-up when on clicks on any category field

class Model extends Component {
    // the following method is used to open subsequent pop-ups and calling the parent component method 
    componentDidMount() {
        document.getElementById("close-box").addEventListener("click",() => {
            document.getElementById("model-container-background").style.display = "none";
        })
        document.getElementById("button1").addEventListener("click",() => {
            document.getElementById("model-container-background").style.display = "none";
            const button1Value = document.getElementById("button1").innerHTML;
            if(button1Value === 'Add New categories') {
                this.props.openChildModal('categories');
            }
            if(button1Value === 'Add New Topics') {
                this.props.openChildModal('Topics');
            }
            if(button1Value === 'Add New Questions') {
                this.props.openChildModal('Questions');
            }
        })
        document.getElementById("button2").addEventListener("click",() => {
            document.getElementById("model-container-background").style.display = "none";
            const button2Value = document.getElementById("button2").innerHTML;
            if(button2Value === 'View Categories') {
                this.props.openChildModal('View Categories');
            }
            if(button2Value === 'View Topics') {
                this.props.openChildModal('View Topics');
            }
            if(button2Value === 'View Questions') {
                this.props.openChildModal('View Questions');
            }
        })
    }

    //this is simply for the UI, the following two funtion is responsible for animation of fa fas
    
    faChangeShock = () => {
        const smile = document.getElementsByClassName("shake-smile")[0];
        smile.className = "fas fa-grimace shake-smile";
    };
    faChangeNormal = () => {
        const smile = document.getElementsByClassName("shake-smile")[0];
        smile.className = "fas fa-smile shake-smile";
    };

    // the following method is used to render the main-modal based on the user click 

    render() {
        return (
            <div id="model-container-background" style={{display: "none"}}>
                <div id="model-container">
                <div id="model-header"><span id="close-box">X</span></div>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2"><i className='fas fa-smile shake-smile' style={{color:"rgb(253, 208, 7)",fontSize: "8em"}} onMouseOver={this.faChangeShock} onMouseOut={this.faChangeNormal}></i></td>
                            </tr>
                            <tr>
                                <td><button id="button1">{this.props.button1}</button></td>
                                <td><button id="button2">{this.props.button2}</button></td>
                            </tr>
                        </tbody>    
                    </table>
                </div>
            </div>
        );
    }
}

export default Model;