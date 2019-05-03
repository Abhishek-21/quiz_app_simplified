import React, { Component } from 'react';
import './quiz.css';
import $ from 'jquery';

// this is the complete quiz section here 

class QuizSection extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            section: 1,
            sectionScroll: 0,
            category: 0,
            topic: 0,
            test: 0,
            testTopic: -1
        };
    }

    componentDidMount() {
        this.openSection();                       // after mounting it should open the quiz section
    }

    // the following function open a section and set states accordingly so that it could be used for 
    // further rendering

    openSection = () => {
        if(document.getElementsByClassName("tab")[0]){
            document.getElementsByClassName("tab")[0].addEventListener('click',() => {
                this.setState({section: 0,sectionScroll: 1,category: 1});
            });
            document.getElementsByClassName("tab")[1].addEventListener('click',() => {
                this.setState({section: 0,sectionScroll: 1,topic: 1});
            });
        }
    }

    // the following function is used to open test or quiz-area based on current state of variable set
    testState = (testTopic) => {
        this.setState({test: 1,testTopic: testTopic,section: 0,sectionScroll: 0});
    }

    // finally rendering the different component based on the state

    render() {
        return (
            <div>
                { this.state.section ? <SectionComponent /> : '' }
                { this.state.sectionScroll ? <SectionView category={this.state.category} topic={this.state.topic} test={this.testState} /> : '' }
                { this.state.test ?  <Test testTopic={this.state.testTopic}/> : ''}
            </div>
        );
    }
}

// the following component is responsible for the display of home page of quiz section

class SectionComponent extends Component {
    
    //the following variable is used to keep a track of component, if mounted or unmounted

    is_Mounted = false;
    componentDidMount() {
        this.is_Mounted = true;
        setInterval(()=>{
            if(this.is_Mounted){
                this.color1 = (Math.random()*100)+(Math.random()*100);
                this.color2 = (Math.random()*100)+(Math.random()*100);
                this.color3 = (Math.random()*100)+(Math.random()*100);
                this.color4 = (Math.random()*100)+(Math.random()*100);
                this.color5 = (Math.random()*100)+(Math.random()*100);
                this.color6 = (Math.random()*100)+(Math.random()*100);
                document.getElementById('footer-home-section').style.background = `linear-gradient(to right, rgba(${this.color1}, ${this.color2}, ${this.color3}, 0.801),rgba(${this.color4}, ${this.color5}, ${this.color6}, 0.801))`;
            }
        },1000);
    }

    //on unmount the variable value is changed appropriately

    componentWillUnmount() {
        this.is_Mounted = false;
    }

    render() {
        return (
            <div>
                <div id="main-quiz-ui">
                    <div id="main-quiz-ui-container">
                        <div id="tabs-container">
                            <div className="tab category-container">
                                Categories
                            </div>
                            <div className="tab topic-container">
                                Topics                  
                            </div>  
                        </div>
                        <div id="footer-home-section">Take the Quiz</div>
                    </div>
                </div>
            </div>
        );
    }
}

// the following section is responsible for displayin the quiz section with topics and categories

class SectionView extends Component {
    
    //making ajax call when component did mount to fetch the appropriate data

    componentDidMount() {
        if(this.props.category === 1) {
            let table = document.getElementById("view-contents");
            while (table.firstChild){
                table.removeChild(table.firstChild);
            }
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:8000/categories",
                success: function(response) {              
                    let row = table.insertRow();
                    let name_column = row.insertCell(0);
                    name_column.innerHTML = "Category Name";
                    name_column.style.fontWeight = "bold";
                    name_column.style.fontSize = "1.2rem";
                    name_column.style.paddingBottom = "1.5rem";
                    name_column.id = 'header-table';
                    if(response.error) {
                        let row = table.insertRow();
                        let name_column = row.insertCell(0);
                        name_column.innerHTML = "No Topics yet";
                    } else {
                        if(!response.error) {
                            response.forEach((element) => {
                                let row = table.insertRow();
                                row.id = element.id;
                                let name_column = row.insertCell(0);
                                name_column.innerHTML = element.category_name;
                            });
                        }
                    }
                }
            });
            document.getElementById('view-contents').addEventListener('click',(e) => {
                this.openNewSection(e.target.parentNode.id,'categories');
            })
        }
        if(this.props.topic === 1){
            let table = document.getElementById("view-contents");
            while (table.firstChild){
                table.removeChild(table.firstChild);
            }
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:8000/topic",
                success: function(response) {              
                    let row = table.insertRow();
                    let name_column = row.insertCell(0);
                    name_column.innerHTML = "Topic Name";
                    name_column.style.fontWeight = "bold";
                    name_column.style.fontSize = "1.2rem";
                    name_column.style.paddingBottom = "1.5rem";
                    name_column.id = 'header-table';
                    if(response.error) {
                        let row = table.insertRow();
                        let name_column = row.insertCell(0);
                        name_column.innerHTML = "No Topics yet";
                    } else {
                        if(!response.error) {
                            response.forEach((element) => {
                                let row = table.insertRow();
                                row.id = element.id;
                                let name_column = row.insertCell(0);
                                name_column.innerHTML = element.topic_name;
                            });
                        }
                    }
                }
            });
            document.getElementById('view-contents').addEventListener('click',(e) => {
                this.openNewSection(e.target,'topics');
            })
        }
        document.getElementById("view-sub-contents").addEventListener('click', (e) => {
            if(e.target.innerHTML !== 'Topic Name') {
                this.openNewSection(e.target,'topics');
            }
        })
    }

    // this following method is used to open the sub section 

    openNewSection = (section,field) => {
        if(field === 'categories') {
            let table = document.getElementById("view-sub-contents");
            while (table.firstChild){
                table.removeChild(table.firstChild);
            }
            let category_id = section;
            let dataString = {
                "category_id": category_id
            }
            dataString = JSON.parse(JSON.stringify(dataString)); 
            $.ajax({
                type: "GET",
                contentType: "application/json",
                data: dataString,
                url: "http://localhost:8000/topic",
                success: function(response) {              
                    let row = table.insertRow();
                    let name_column = row.insertCell(0);
                    name_column.innerHTML = "Topic Name";
                    name_column.style.fontWeight = "bold";
                    name_column.style.fontSize = "1.2rem";
                    name_column.style.paddingBottom = "1.5rem";
                    name_column.id = 'header-table';
                    if(response.error) {
                        let row = table.insertRow();
                        let name_column = row.insertCell(0);
                        name_column.innerHTML = "No Topics yet";
                    } else {
                        if(!response.error) {
                            response.forEach((element) => {
                                let row = table.insertRow();
                                row.id = element.id;
                                let name_column = row.insertCell(0);
                                name_column.innerHTML = element.topic_name;
                            });
                        }
                    }
                }
            });
        }
        if(field === 'topics' && section.innerHTML !== 'Topic Name' && section.innerHTML !== 'No Topics yet'
            && section.innerHTML !== 'Take Quiz' && section.innerHTML.indexOf("Topic Name") === -1 && section.innerHTML.indexOf("Take Quiz") === -1) {
            let table = document.getElementById("view-sub-contents");
            while (table.firstChild){
                table.removeChild(table.firstChild);
            }
            let row = table.insertRow();
            let row2 = table.insertRow();
            let name_column = row.insertCell(0);
            let button_column = row2.insertCell(0);
            let button = document.createElement("BUTTON");
            button.innerHTML = "Take Quiz";
            button.id = "test-button";
            button_column.appendChild(button);
            name_column.id = section.parentNode.id;
            name_column.innerHTML = section.innerHTML;
            name_column.style.fontWeight = "bold";
            name_column.style.fontSize = "1.2rem";
            name_column.style.paddingBottom = "1.5rem";
        }
        if(field === 'topics' && section.innerHTML === 'Take Quiz') {
            // console.log();
            this.props.test(section.parentNode.parentNode.parentNode.children[0].children[0].id);
        }
    }

    // finally rendering the contents both left side and sub-section components

    render() {
        return (
            <div id="section-view-container">
                <div id="original-content">
                    <table id="view-contents">
                        <tbody>
                                {/* dynamic content here */}
                        </tbody>
                    </table>
                </div>
                <div id="new-sub-section">
                    <table id="view-sub-contents">
                        <tbody>
                                {/* dynamic content here */}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// this is the test component where one can give the test or quiz

class Test extends Component {

    // the following method will auto submit if the time is up

    testTimeUp = () => {
        this.setState({testUp: 1});
    }

    constructor(props){
        super(props);

        this.state = {
            testUp: 0,
            quizQues: '',
            answers: ''
        };
    }

    // adding answer and quiz qusetions into the state variables to be passed to the child component

    testResult = (quizQues,answers) => {
        this.setState({quizQues: quizQues,answers: answers})
    }

    // rendering the appropriate component based on state set

    render() {
        return (
            <div>                
                { this.state.testUp ? <TestResults quizQues={this.state.quizQues} quizAns={this.state.answers} /> : <TestAttend timeUp={this.testTimeUp} testTopic={this.props.testTopic} testResult={this.testResult} /> }
            </div>
        );
    }
}

// the upcoming component sets the result to be displayed to the user

class TestResults extends Component {

    // on mount of the component displayResult method is called to set the result

    componentDidMount() {
        this.displayResult();
    }
    
    constructor(props){
        super(props);
    
        this.state = {
            correctAnswer: 0
        };
    }

    //all scores calculations are done here

    displayResult = () => {
        let parentArea = document.getElementById("displayArea");
        let quizQues = this.props.quizQues;
        let quizAns = this.props.quizAns;
        let score = 0;
        while (parentArea.firstChild){
            parentArea.removeChild(parentArea.firstChild);
        }
        for (let index = 0; index < quizQues.length; index++) {
            let ques = document.createElement("DIV");
            let correctAns = document.createElement("DIV");
            let userAns = document.createElement("DIV");
            let verifyUser = document.createElement("i");
            correctAns.style.fontSize = "0.8rem";
            userAns.style.fontSize = "0.8rem";
            ques.innerHTML = (index+1)+') '+quizQues[index].question_title;
            correctAns.innerHTML =  'Correct Answer: '+quizQues[index].correct_answer;
            parentArea.appendChild(ques);
            parentArea.appendChild(correctAns);
            if(quizAns[index] === null || quizAns[index] === undefined) {
                userAns.innerHTML = 'Your Answer: Didn\'t Answer';
                verifyUser.className = "fa fa-check";
                verifyUser.style.fontSize = "25px";
                verifyUser.style.color = "green";
                verifyUser.style.marginLeft = "10px";
                parentArea.appendChild(userAns).appendChild(verifyUser);
            } else {
                userAns.innerHTML = 'Your Answer: '+quizAns[index];
                verifyUser.className = "fa fa-check";
                verifyUser.style.fontSize = "25px";
                verifyUser.style.color = "green";
                verifyUser.style.marginLeft = "10px";
                parentArea.appendChild(userAns).appendChild(verifyUser);
            }
            if(quizQues[index].correct_answer === quizAns[index]){
                score += 1;
            } else {
                verifyUser.className = "fa fa-close";
                verifyUser.style.color = "red";
            }
        }
        if(quizQues.length === undefined) {
            document.getElementById("scores").innerHTML = 'Score: '+score +'/'+0; 
        } else {
            document.getElementById("scores").innerHTML = 'Score: '+score +'/'+quizQues.length; 
        }
    }
    
    // this method is used to redirect user to the home page

    goBackHome = () => {
        window.location="http://localhost:3000/quiz-section";
    }

    //rendering the appropriate contents and message for test or quiz users

    render() {
        return(
            <div>
                <div id="greeting-msg">Thank You For Taking the quiz</div>
                <div id="displayArea"></div>
                <div id="footer-conatiner-test">
                    <button id="scores"></button>
                    <button onClick={this.goBackHome}>Go back</button>
                </div>
            </div>
        );
    }
}

// this component is the one where test is attended by the user

class TestAttend extends Component {
   componentDidMount() {
       let me = this;
        this.getQuestionQuiz(function(response) {
            me.setState({quesQuiz: response}); 
            if(response.length === 0) {
                document.getElementById("butt-next").style.display = "none";
                document.getElementById("submit-test").style.display = "none";
                document.getElementById("butt-go-back").style.display = "block";
            } 
        });
   }
    constructor(props){
        super(props);
    
        this.state = {
            quesQuiz: '',
            quesCount: 0
        };
        this.answer = [];
    }

    //this method below is used to fetch the questions related to the topic 

    getQuestionQuiz = (callback) => {
        let topic = this.props.testTopic;
        let dataString = {
            "topic_id": topic,
            "quiz": 1
        };
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8000/quiz",   
            data: dataString,
            success: callback
        });
    }

    // this method is used to change to the next question

    nextQues = () => {
        this.setState({quesCount: this.state.quesCount + 1})
        if( document.getElementById("active-answer")) {
            document.getElementById("active-answer").id = "";
        }
        let ques = this.state.quesCount + 1;
        if (!(ques < this.state.quesQuiz.length)) {
            document.getElementById("butt-next").style.display = "none";
            document.getElementById("disp-end-message").style.display = "block";
            document.getElementById("list-heading").style.display = "none";            
            document.getElementById("disp-end-message").innerHTML = "Thank you for your patience";
            this.props.testResult(this.state.quesQuiz,this.answer);            
        }
    }

    // this method is used to be fetch answer related to the questions 

    getAnswers = (e) => {
        let answers = e.split(",");
        answers.forEach(element => {
            let li = document.createElement("LI");
            let div = document.createElement("DIV");
            div.innerHTML = element;
            document.getElementById("answer-list").appendChild(li).appendChild(div);
        });
    }

    //the answer of user are stored by this function

    saveAns = (e) => {
        this.answer[this.state.quesCount] =  e.target.innerHTML;
        if(document.getElementById("active-answer")){
            document.getElementById("active-answer").id = '';
        }
        e.target.id = "active-answer";
    }

    // the following method is used to stop the quiz

    stopQuiz = (quesQuiz,answers) => {
        this.props.testResult(quesQuiz,answers); 
        this.props.timeUp();   
    }

    // this method is used to redirect user to the home-page

    goBackHome = () => {
        window.location="http://localhost:3000/quiz-section";
    }

    // rendering different component based on stae set

    render() {
        
        return (
            <div>
                <div id="test-container-field">
                    { (this.state.quesQuiz.length) ? <HeaderTest stopQuiz={() => {this.stopQuiz(this.state.quesQuiz,this.answer)} } quesExist={this.state.quesQuiz.length}/> : <div>&nbsp;</div> }
                    <div id="questions-list">
                    <div id="list-heading">{(this.state.quesQuiz.length > 0 && this.state.quesCount < this.state.quesQuiz.length) ? (this.state.quesCount+1)+') '+this.state.quesQuiz[this.state.quesCount].question_title : 'Sorry No Question found'}</div>      
                        <div id="disp-end-message" style={{display: "none"}}></div>                   
                        <ol type='a' id="answer-list"> 
                            {
                                (this.state.quesQuiz.length > 0 && this.state.quesCount < this.state.quesQuiz.length) 
                                ? 
                                (this.state.quesQuiz[this.state.quesCount].answers.split(',')).map((element,index) => {
                                    return(
                                        <li key={index}>
                                            <div onClick={this.saveAns} style={{width: "80%"}}>{element}</div>
                                        </li>
                                    )
                                })
                                : 
                                "" 
                            }
                        </ol>
                        <div id="footer-quiz">
                            <button onClick={this.nextQues} id="butt-next">Next</button>
                            <button onClick={() => {this.stopQuiz(this.state.quesQuiz,this.answer)}} id="submit-test">Submit</button>
                            <button onClick={this.goBackHome} id="butt-go-back" style={{display: "none"}}>Go back</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// this method is responisible for the timer and stop quiz functionalites from header in test section
class HeaderTest extends Component {
    _isMounted = false;
    componentDidMount() {
        this._isMounted = true;
        this.timer();
}

timer = () => {
    if(this.props.quesExist) {
        setInterval(() => { 
            if(this.state.minutes>=0 && this._isMounted === true) {
                this.quizTimeLeft(this.state.minutes,this.state.seconds);
            }
        },1000);
    } else {
        document.getElementById("header-timer-section").style.display = "none";
        document.getElementById("header-stopQuiz-section").style.display = "none";
    }
    
}
componentWillUnmount() {
    this._isMounted = false;
}

quizTimeLeft = (minutes,seconds) => {
    seconds -= 1;
    if(seconds <= 0) {
    minutes -= 1;
    this.setState({minutes: minutes, seconds: 59})
    } else {
    this.setState({seconds: seconds})
    }
    if(minutes<0){
        this.props.stopQuiz();      
    }
}

constructor(props){
    super(props);

    this.state = {
        currentTime: '',
            minutes: 4,
            seconds: 59,
    };
}



    render() {
        return (
            <div>
                <div id="header-quiz">
                    <button id="header-timer-section">Time left: { (this.state.seconds < 10) ? this.state.minutes+':0'+this.state.seconds : this.state.minutes+':'+this.state.seconds } </button>
                    <button onClick={this.props.stopQuiz} id="header-stopQuiz-section">Stop quiz</button>
                </div>
            </div>
        );
    }
}

export default QuizSection;
