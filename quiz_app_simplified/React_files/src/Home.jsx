import React, { Component } from 'react';
import Header from './Header.jsx';               //this is importing of header section of admin panel
import Model from './Model.jsx';                 //this is importing of model section for adding new contents
import Model2 from './Model2.jsx';               //this is importing of model section for viewing contents
import Model3 from './Model3.jsx';               //this is importing of model section for editing contents
import './Home.css';
import $ from 'jquery';

export default class Home extends Component {
  // constructor being used here to set state for buttons
  constructor(props){
    super(props);

    this.state = {
      button1: 'but',
      button2: 'but2'
    };
  };

  // when the component did mount it should again validate user based on encrytion key
  componentDidMount() {

    let verifyId = document.URL.split("=")[1];
    if ((verifyId === undefined) || (verifyId.trim() === '') || (verifyId.trim() === null)) {
      window.location="http://localhost:3000/InvalidUser";
    } else {
        let dataString = {
          user_id: verifyId
        };
        dataString = JSON.stringify(dataString);
        $.ajax ({
          type: "post",
          contentType: "application/json",
          url: "http://localhost:8000/login",   
          data: dataString,
          success: function(response) {              
            if (response.matched_result !== 1) {
              window.location="http://localhost:3000/InvalidUser";
            }
          }
        });
    } 

  // model-container is the one which appears when user click on any categories

  document.getElementById("quiz-category").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New categories",
      button2: "View Categories"
    })
  })

  document.getElementById("quiz-topic").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New Topics",
      button2: "View Topics"
    })
  })

  document.getElementById("question-set").addEventListener("click",() => {
    document.getElementById("model-container-background").style.display = "block";
    this.setState({
      button1: "Add New Questions",
      button2: "View Questions"
    })
  })

  this.saveForm(); // to save forms
  // this.changeTopicOption();  //to change topics
  }


  // the following function is used to make an ajax call to fetch the categories using callback


  allCategories = (callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:8000/categories",   
      success: callback
    });
  }

  // the following function is used to make an ajax call to fetch the topics using callback

  allTopics = (callback) => {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "http://localhost:8000/topic",   
      success: callback
    });
  }

  specificCategory = (id_check,callback) => {
    let dataString = {
      "category_id": id_check
    }
    dataString = JSON.parse(JSON.stringify(dataString));
    $.ajax({
      type: "GET",
      contentType: "application/json",
      data: dataString,
      url: "http://localhost:8000/categories",   
      success: (response) => {
        callback(response[0].category_name);
      }
    });
  }

  specificTopic = (id_check,callback) => {
    let dataString = {
      "topic_id": id_check
    }
    dataString = JSON.parse(JSON.stringify(dataString));
    $.ajax({
      type: "GET",
      contentType: "application/json",
      data: dataString,
      url: "http://localhost:8000/topic",   
      success: (response) => {
        callback(response[0].topic_name);
      }
    });
  }

  specificTopicForCategory = (id_check,callback) => {
    let dataString = {
      "category_id": id_check
    }
    dataString = JSON.parse(JSON.stringify(dataString));
    $.ajax({
      type: "GET",
      contentType: "application/json",
      data: dataString,
      url: "http://localhost:8000/topic",   
      success: (response) => {
        callback(response);
      }
    });
  }

  allAnswers = (question_id,callback) => {
    let dataString = {
      "question_id": question_id
    }
    dataString = JSON.parse(JSON.stringify(dataString));
    $.ajax({
      type: "GET",
      contentType: "application/json",
      data: dataString,
      url: "http://localhost:8000/answers",   
      success: (response) => {
        callback(response);
      }
    });
  }

  changeTopicOption = () => {
    document.getElementById("Category-name").addEventListener('click',(e) => {
      if(e.target.value === 'null') {
        document.getElementById("Topic-name").disabled = true;
        document.getElementById("Topic-name").style.cursor = "not-allowed";
      } else {
        document.getElementById("Topic-name").disabled = false;
        document.getElementById("Topic-name").style.cursor = "pointer";
        let options_table = document.getElementById("Topic-name");
        while (options_table.firstChild){
          options_table.removeChild(options_table.firstChild);
        }
        this.specificTopicForCategory(e.target.value,function(result) {
          if(result.length === undefined) {
            let quiz_topic_options = document.createElement("OPTION");
            quiz_topic_options.innerHTML = "No Record Found";
            quiz_topic_options.value = '';
            options_table.appendChild(quiz_topic_options);
          } else {
            result.forEach(element => {
              let quiz_topic_options = document.createElement("OPTION");
              quiz_topic_options.innerHTML = element.topic_name;
              quiz_topic_options.value = element.id;
              options_table.appendChild(quiz_topic_options);
            });
          }
        });
      }
    });
  }


  saveQuestionDetails = (checkingCall) => {
    let answers = document.getElementsByClassName("answer-field");
    let question_title = document.getElementById("question-title").value;  
    let question_description = document.getElementById("question-description").value;
    let correct_answer = document.getElementById("correct-answer").value;
    let topic_id = document.getElementById("Topic-name").value;
    let category_id = document.getElementById("Category-name").value;
    if(question_title === '' || question_title === null){
      alert("Question title cannot be Null");
    }
    else {
      let to_store_array = [];
      for (let index = 0; index < answers.length; index++) {
      if(answers[index].value !== null || answers[index].value !== '') {
        let is_correct = '0';
        if(answers[index].value === correct_answer) {
          is_correct = '1';
        }
        let dataString = {
          "answer": answers[index].value,
          "is_correct": is_correct
        }
        to_store_array.push(dataString);        
      }
    } 
      if(checkingCall === 1) {
        let dataString = {
          question_title: question_title,
          question_description: question_description,
          topic_id: topic_id,
          category_id: category_id,
          answer: to_store_array
        }
        dataString = JSON.stringify(dataString);
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: "http://localhost:8000/questions",        
          data: dataString,
          success: function(response) {     
            let result = response;
            if(result.success) {
              document.getElementById("add-value-container-background").style.display = "none";
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Saved Successfully!!!'; 
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
            else if(result.error === 'Duplicate entry'){
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Duplicate Entry!';
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
            else {
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Server Error!';
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
          }
        });
      } else if(checkingCall === 2) {
        let question_id = document.getElementById("question_pass").value;
        let answer_id = document.getElementById("answer_value_fetch_inp").value;
        answer_id = answer_id.split(",");
        let dataString = {
          id: question_id,
          question_title: question_title,
          question_description: question_description,
          topic_id: topic_id,
          category_id: category_id,
          answer: to_store_array,
          answer_id: answer_id
        }
        dataString = JSON.stringify(dataString);
        $.ajax({
          type: "PUT",
          contentType: "application/json",
          url: "http://localhost:8000/questions",        
          data: dataString,
          success: function(response) {     
            let result = response;
            if(result.success) {
              document.getElementById("add-value-container-background").style.display = "none";
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Saved Successfully!!!'; 
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
            else if(result.error === 'Duplicate entry'){
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Duplicate Entry!';
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
            else {
              document.getElementById("question-title").value = '';
              document.getElementById("question-description").value = '';
              document.getElementById("Category-name").value = '';
              document.getElementById("message-box").innerText = 'Server Error!';
              document.getElementById("message-box").style.display = "inline-block";
              $('#message-box').delay(2000).fadeOut('slow');
            }
          }
        });
      }
    }
  }
  
    // opening the add or view modal from here
  
  openChildModal = (valueModal,data = null) => {
    let me=this;
    // add value container is the modal to add new values based on categories

    document.getElementsByClassName("close-box2")[0].addEventListener("click",() => {
        document.getElementById("add-value-container-background").style.display = "none";
    })

    // view value container is the modal to view existing values based on categories

    document.getElementsByClassName("close-box2")[1].addEventListener("click",() => {
      document.getElementById("view-value-container-background").style.display = "none";
    })

    // only creating dynamic modal for categories and other things based on event listener
    
    if(valueModal === 'edit categories' ) {
      document.getElementById("add-value-container-background").style.display = "block";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '7% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let row = table.insertRow();
      let cell = row.insertCell(0);
      let row1 = table.insertRow();
      let cell1 = row1.insertCell(0);
      let inpField = document.createElement("INPUT");   
      inpField.id = "category-value";
      inpField.className = data.id;        // passing original database name as id 
      let btn = document.createElement("BUTTON");  
      btn.id = "Edit-category-content"; 
      inpField.value = data.category_name;
      btn.innerHTML = "Edit Category";                   
      cell.appendChild(inpField);
      cell1.appendChild(btn);
    }


    if(valueModal === 'categories') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '7% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let row = table.insertRow();
      let cell = row.insertCell(0);
      let row1 = table.insertRow();
      let cell1 = row1.insertCell(0);
      let inpField = document.createElement("INPUT");   
      inpField.id = "category-value";
      let btn = document.createElement("BUTTON");  
      btn.id = "submit-category-content"; 
      inpField.placeholder = "Enter New Category";
      btn.innerHTML = "Save Category";                   
      cell.appendChild(inpField);
      cell1.appendChild(btn);
    }

    // only creating dynamic modal for Topics

    if(valueModal === 'Topics') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '6% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
          table.removeChild(table.firstChild);
      }
      let topic_id_row = table.insertRow();
      let quiz_category_row = table.insertRow();
      let topic_description_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let topic_id_column = topic_id_row.insertCell(0);
      let quiz_category_column = quiz_category_row.insertCell(0);
      let topic_description_column = topic_description_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let topic_name_field = document.createElement("INPUT");
      let quiz_category_field = document.createElement("SELECT");
      quiz_category_column.appendChild(quiz_category_field);
      this.allCategories(function(result) {
        result.forEach(element => {
          let quiz_category_options = document.createElement("OPTION");
          quiz_category_options.innerHTML = element.category_name;
          quiz_category_options.value = element.id;
          quiz_category_field.appendChild(quiz_category_options);
        });
      });
      let topic_description_field = document.createElement("INPUT");
      let submit_button = document.createElement("BUTTON");
      topic_id_column.appendChild(topic_name_field);
      topic_description_column.appendChild(topic_description_field);
      submit_button_column.appendChild(submit_button);
      topic_name_field.placeholder = "Enter The Topic Name";
      topic_name_field.id = "topic-name"; 
      quiz_category_field.id = "quiz-category-field";            
      topic_description_field.placeholder = "Enter The Topic Description";
      topic_description_field.id = "topic-description";
      submit_button.innerHTML = "Save Topic";
      submit_button.id = "submit-topic";
    }

    if(valueModal === 'edit topic') {
      document.getElementById("add-value-container-background").style.display = "block";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '6% 0px';
      document.getElementById('add-value-container').style.margin = '4% auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let topic_id_row = table.insertRow();
      let topic_description_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let topic_id_column = topic_id_row.insertCell(0);
      let topic_description_column = topic_description_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let topic_name_field = document.createElement("INPUT");
      let topic_description_field = document.createElement("INPUT");
      let submit_button = document.createElement("BUTTON");
      topic_id_column.appendChild(topic_name_field);
      topic_description_column.appendChild(topic_description_field);
      submit_button_column.appendChild(submit_button);
      topic_name_field.value = data.topic_name;
      topic_name_field.id = "topic-name";
      topic_name_field.className = data.id;            
      topic_description_field.value = data.topic_description;
      topic_description_field.id = "topic-description";
      submit_button.innerHTML = "Edit Topic";
      submit_button.id = "edit-topic";
    }

    // only creating dynamic modal for Questions 

    if(valueModal === 'Questions') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '1.5rem';
      document.getElementById('add-value-container').style.margin = '0px auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let question_title_row = table.insertRow();
      let question_description_row = table.insertRow();
      let category_name_row = table.insertRow();
      let topic_name_row = table.insertRow();
      let answer_row = table.insertRow();
      let more_answer_row = table.insertRow();
      let correct_answer_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let question_title_column = question_title_row.insertCell(0);
      let question_description_column = question_description_row.insertCell(0);
      let answer_column = answer_row.insertCell(0);
      let more_answer_column = more_answer_row.insertCell(0);
      more_answer_column.style.padding = "0px 20px";                               //dynamically adding extra fields
      let correct_answer_column = correct_answer_row.insertCell(0);
      let category_name_column = category_name_row.insertCell(0);
      let topic_name_column = topic_name_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let question_title_field = document.createElement("INPUT");
      let question_description_field = document.createElement("INPUT");
      let answer_field = document.createElement("INPUT");
      answer_field.style.width = "78%";
      let add_more_answers = document.createElement("BUTTON");
      add_more_answers.style.width = "40px";
      add_more_answers.style.height = "40px";
      add_more_answers.style.borderRadius = "50%";
      add_more_answers.style.marginLeft = "20px";
      add_more_answers.innerHTML = "+";
      add_more_answers.addEventListener('click',()=>{
      let answer_field_more = document.createElement("INPUT");
      answer_field_more.style.margin = "25px 0px";
      answer_field_more.placeholder = "Add more Answers";
      more_answer_column.appendChild(answer_field_more);
      answer_field_more.className = "answer-field";
      })
      let correct_answer_field = document.createElement("INPUT");
      let category_name_field = document.createElement("SELECT");
      let category_options = document.createElement("OPTION");
        category_options.innerHTML = "-----------------";
        category_options.value = "null";
        category_name_field.appendChild(category_options);
      this.allCategories(function(result) {
        result.forEach((element) => {
          category_options = document.createElement("OPTION");
          category_options.innerHTML = element.category_name;
          category_options.value = element.id;
          category_name_field.appendChild(category_options);
        });
      });
      let topic_name_field = document.createElement("SELECT");
      let topic_options = document.createElement("OPTION");
        topic_options.innerHTML = "-----------------";
        topic_options.value = "null";
        topic_name_field.disabled = true;
        topic_name_field.style.cursor = "not-allowed";
        topic_name_field.appendChild(topic_options);
      let submit_button_field = document.createElement("BUTTON");
      question_title_column.appendChild(question_title_field);
      question_description_column.appendChild(question_description_field);
      answer_column.appendChild(answer_field);
      answer_column.appendChild(add_more_answers);
      correct_answer_column.appendChild(correct_answer_field);
      category_name_column.appendChild(category_name_field);
      topic_name_column.appendChild(topic_name_field);
      submit_button_column.appendChild(submit_button_field);
      question_title_field.placeholder = "Enter The Question Title";
      question_title_field.id = "question-title";
      question_description_field.placeholder = "Enter Question Description";
      question_description_field.id = "question-description";
      answer_field.placeholder = "Enter Your Answer";
      answer_field.className = "answer-field";
      correct_answer_field.placeholder = "Enter The Correct Answer";
      correct_answer_field.id = "correct-answer";
      category_name_field.id = "Category-name";
      topic_name_field.id = "Topic-name";
      submit_button_field.innerHTML = "Save Question";
      submit_button_field.id = "submit-question";
      this.changeTopicOption();
    }

    if(valueModal === 'edit question') {
      document.getElementById("add-value-container-background").style.display = "block";
      document.getElementById("view-value-container-background").style.display = "none";
      let table = document.getElementById("modalTable");
      document.getElementById('add-value-container-background').style.padding = '1.5rem';
      document.getElementById('add-value-container').style.margin = '0px auto';
      while (table.firstChild){
        table.removeChild(table.firstChild);
      }
      let question_title_row = table.insertRow();
      let question_description_row = table.insertRow();
      let category_name_row = table.insertRow();
      let topic_name_row = table.insertRow();
      let answersTotal = data.answers.split(",");                                                // splitting of answers is done here
      answersTotal.forEach(element => {
        let answer_row = table.insertRow();
        let answer_column = answer_row.insertCell(0);
        let answer_field = document.createElement("INPUT");
        answer_column.appendChild(answer_field);
        answer_field.value = element;
        answer_field.className = "answer-field";
      });
      
      let correct_answer_row = table.insertRow();
      let submit_button_row = table.insertRow();
      let id_pass_question = table.insertRow();
      let id_question_pass = id_pass_question.insertCell(0);
      id_question_pass.id = "question_pass";
      id_question_pass.value = data.id;                                                        // question_id 
      id_question_pass.style.display = 'none';
      let question_title_column = question_title_row.insertCell(0);
      let question_description_column = question_description_row.insertCell(0);
      let correct_answer_column = correct_answer_row.insertCell(0);
      let category_name_column = category_name_row.insertCell(0);
      let topic_name_column = topic_name_row.insertCell(0);
      let submit_button_column = submit_button_row.insertCell(0);
      let question_title_field = document.createElement("INPUT");
      let question_description_field = document.createElement("INPUT");
      let answer_id_field_fetch = document.createElement("INPUT");
      let correct_answer_field = document.createElement("INPUT");
      let category_name_field = document.createElement("SELECT");
      let category_options = document.createElement("OPTION");
        category_options.innerHTML = "-----------------";
        category_options.value = "null";
        category_name_field.appendChild(category_options);
      this.allCategories(function(result) {
        result.forEach((element) => {
          category_options = document.createElement("OPTION");
          category_options.innerHTML = element.category_name;
          category_options.value = element.id;
          category_name_field.appendChild(category_options);
        });
      });
      let topic_name_field = document.createElement("SELECT");
      let topic_options = document.createElement("OPTION");
      topic_options.innerHTML = "-----------------";
      topic_options.value = "null";
      topic_name_field.disabled = true;
      topic_name_field.style.cursor = "not-allowed";
      topic_name_field.appendChild(topic_options);
      let submit_button_field = document.createElement("BUTTON");
      question_title_column.appendChild(question_title_field);
      question_description_column.appendChild(question_description_field);
      answer_id_field_fetch.value = data.answers_id;                                                // get answer id
      question_description_column.appendChild(answer_id_field_fetch);
      correct_answer_column.appendChild(correct_answer_field);
      category_name_column.appendChild(category_name_field);
      topic_name_column.appendChild(topic_name_field);
      submit_button_column.appendChild(submit_button_field);
      question_title_field.value = data.question_title;                                            //get question_title
      question_title_field.id = "question-title";
      question_title_field.className = data.question_title;                                       // get question_title as classname
      question_description_field.value = data.question_description;                               // question_description
      question_description_field.id = "question-description";
      correct_answer_field.value = data.correct_answers;                                          //correct_answer
      correct_answer_field.id = "correct-answer";
      topic_name_field.value = data.topic_id;                                                     // topic_name  here I used topic id
      category_name_field.id = "Category-name";
      topic_name_field.id = "Topic-name";
      answer_id_field_fetch.style.display = "none";
      answer_id_field_fetch.id = "answer_value_fetch_inp";
      submit_button_field.innerHTML = "Edit Question";
      submit_button_field.id = "Edit-question";
      this.changeTopicOption();
    }

    //same as above fetching values from database and showing them as per format

    
    if(valueModal === 'View Categories') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      me.refs.mode.changeGridSection('category');
    }

    if(valueModal === 'View Topics') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      me.refs.mode.changeGridSection('topic');
    }
    if(valueModal === 'View Questions') {
      document.getElementById("view-value-container-background").style.display = "block";
      document.getElementById("add-value-container-background").style.display = "none";
      me.refs.mode.changeGridSection('questions');
    }
  }

  // the following function is used to submit values to the database after validating them 

  saveForm = () => {
    document.getElementById("modalTable").addEventListener('click',(e) => {
      if(e.target.id === 'submit-category-content') {
        let category = document.getElementById("category-value").value;
        if(category === '' || category === null) {
          alert("Category field cannot be Empty!!!");
        } else {
          let dataString = {
            "category_name": category
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8000/categories",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                document.getElementById("add-value-container-background").style.display = "none";
                $('#message-box').delay(2000).fadeOut('slow');
              } else if(result.error === 'Duplicate entry'){
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'Edit-category-content') {
        let category_id = document.getElementById("category-value").className;
        let new_category_name = document.getElementById("category-value").value;
        if(new_category_name === '' || new_category_name === null){
          alert('Category field cannot be null!!!');
        }
        else{
          let dataString = {
            "category_id": category_id,
            "new_category_name": new_category_name
        }
        dataString = (JSON.stringify(dataString));
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8000/categories",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!'; 
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
              else if(result.error === 'Duplicate entry'){
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
              else {
                document.getElementById("category-value").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'submit-topic') {
        let topic_name = document.getElementById("topic-name").value;  
        let category_id = document.getElementById("quiz-category-field").value;
        let topic_description = document.getElementById("topic-description").value;
        if(topic_name === '' || topic_name === null){
          alert("Topic name cannot be Null !!!");
        } else {
            let dataString = {
              "topic_name": topic_name,
              "topic_description": topic_description,
              "category_id": category_id
            }
            dataString = (JSON.stringify(dataString));
            $.ajax({
              type: "POST",
              contentType: "application/json",
              url: "http://localhost:8000/topic",        
              data: dataString,
              success: function(response) {              
                let result = JSON.parse(response);
                if(result.success) {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                  document.getElementById("message-box").style.display = "inline-block";
                  document.getElementById("add-value-container-background").style.display = "none";
                  $('#message-box').delay(2000).fadeOut('slow');
                } else if(result.error === 'Duplicate entry') {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());                          
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Duplicate Entry!';
                  document.getElementById("message-box").style.display = "inline-block";
                  $('#message-box').delay(2000).fadeOut('slow');
                } else {
                  document.getElementById("topic-name").value = '';
                  $("#quiz-category-field").val($("#quiz-category-field option:first").val());
                  document.getElementById("topic-description").value = '';
                  document.getElementById("message-box").innerText = 'Server Error!';
                  document.getElementById("message-box").style.display = "inline-block";
                  $('#message-box').delay(2000).fadeOut('slow');
                }
              }
            });
        }
      }
      if(e.target.id === 'edit-topic') {
        let topic_id = document.getElementById("topic-name").className;
        let new_topic_name = document.getElementById("topic-name").value;  
        let new_topic_description = document.getElementById("topic-description").value;
        if(new_topic_name === '' || new_topic_name === null){
          alert('Topic name cannot be Null !!!');
        } else {
          let dataString = {
            "topic_id": topic_id,
            "new_topic_name": new_topic_name,
            "new_description": new_topic_description
          }
          dataString = (JSON.stringify(dataString));
          $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8000/topic",        
            data: dataString,
            success: function(response) {              
              let result = JSON.parse(response);
              if(result.success) {
                document.getElementById("add-value-container-background").style.display = "none";
                document.getElementById("topic-name").value = '';
                document.getElementById("topic-description").value = '';
                document.getElementById("message-box").innerText = 'Saved Successfully!!!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else if(result.error === 1062) {
                document.getElementById("topic-name").value = '';
                document.getElementById("topic-description").value = '';
                document.getElementById("message-box").innerText = 'Duplicate Entry!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              } else {
                document.getElementById("topic-name").value = '';
                document.getElementById("topic-description").value = '';
                document.getElementById("message-box").innerText = 'Server Error!';
                document.getElementById("message-box").style.display = "inline-block";
                $('#message-box').delay(2000).fadeOut('slow');
              }
            }
          });
        }
      }
      if(e.target.id === 'submit-question') {
        this.saveQuestionDetails(1);
      }
      if(e.target.id === 'Edit-question') {
        this.saveQuestionDetails(2);
      }
    })  
  }

  // this function is used to delete a specific existing row from any category,topic or question set

  deleteRow = (valueDelete,data) => {
    if(valueDelete === 'delete category') {
      let category_id = data.id;
      let dataString = {
        "category_id": category_id
      }
      dataString = (JSON.stringify(dataString));
      $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8000/categories",        
        data: dataString,
        success: function(response) {              
          let result = JSON.parse(response);
          if(result.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else if(result.error === 1451) {
            document.getElementById("message-box").innerText = 'Cannot Delete, Category cantains Data!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
    if(valueDelete === 'delete topic') {
      let topic_id = data.id;
      let dataString = {
        "topic_id": topic_id
      }
      dataString = (JSON.stringify(dataString));
      $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "http://localhost:8000/topic",        
        data: dataString,
        success: function(response) {              
          let result = JSON.parse(response);
          if(result.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else if(result.error === 1451) {
            document.getElementById("message-box").innerText = 'Cannot Delete, Topic cantains Data!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
    if(valueDelete === 'delete question') {
      let question_id = data.id;
      let answers_id = data.answers_id.split(",");
      let dataString = {
        question_id: question_id,
        answer_id: answers_id
      }
      dataString = JSON.stringify(dataString);
      $.ajax({
        type: "delete",
        contentType: "application/json",
        url: "http://localhost:8000/questions",        
        data: dataString,
        success: function(response) {    
          if(response.success) {
            document.getElementById("message-box").innerText = 'Deletion Successful!!!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          } else {
            document.getElementById("message-box").innerText = 'Server Error!';
            document.getElementById("message-box").style.display = "inline-block";
            $('#message-box').delay(2000).fadeOut('slow');
          }
        }
      });
    }
  }

  

  // finally the render method is used to render the UI
  
  render() {
    return (
      <div id="home-page-container">
        <Header />
        <div id="message-box">default</div>
        <Model button1={this.state.button1} button2={this.state.button2} openChildModal={this.openChildModal}/>
        <Model2 button1={this.state.button1} />
        <Model3 button1={this.state.button1} section={this.viewSection} ref="mode" openChildModal={this.openChildModal} deleteRow={this.deleteRow} />
      </div>
    );
  }
}


