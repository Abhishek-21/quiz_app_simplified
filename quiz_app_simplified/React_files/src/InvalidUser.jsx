import React,{Component} from 'react'
import './invaliduser.css';

//this component is used to show user that he isn't authorised

class InvalidUser extends Component {
    componentDidMount(){
        setInterval(() => {
            console.log(document.getElementsByClassName("fas")[0]);
            let changeVal = document.getElementsByClassName("fas")[0];
            if(changeVal.className === "fas fa-smile") {
                changeVal.className = "fas fa-sad-cry";
            }
            else {
                changeVal.className = "fas fa-smile";
            }
        }, 1000);
    }
    render() {
        return (
            <div id="invalid-user-container">
                <table>
                    <tbody>
                        <tr>
                            <td style={{textAlign: "center"}}><i className='fas fa-smile' style={{color: "yellow" , fontSize: "80px"}}></i></td>
                        </tr>
                        <tr>
                            <td>
                                <a href="/">
                                    <span><i className="fa fa-long-arrow-left"></i>&nbsp;&nbsp;Login page</span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InvalidUser;