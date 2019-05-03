import React,{ Component } from 'react';

// this is the second modal that is used when adding or editing contents

class Model2 extends Component {
    
    render() {
        return (
            <div id="add-value-container-background" style={{display: "none"}}>
                <div id="add-value-container">
                <div className="model-header2"><span className="close-box2">X</span></div>
                    <div style={{overflow: "auto",maxHeight: "500px"}}>                    
                        <table id="modalTable">
                            <tbody>
                                {/* dynamically adding form content  */}
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>
        );
    }
}

export default Model2