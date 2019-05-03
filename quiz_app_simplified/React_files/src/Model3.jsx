import React,{ Component } from 'react';

// this the modal that is used to view data from different categories
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import $ from 'jquery';

class Model3 extends Component {


    constructor(props){
        super(props);
    
        this.state = {
            colDef: [],
            rowDef: [],
            frameworkComponent:{
                deletefield: DeleteButton,                               // framework component is mentioned in order to shoew the delete button component
                editfield: EditButton
              },
              
              defaultColDef: {
                resizable: true,                                       // default field that is mentioned in all columns are defined here
                editable: true,
              },
        };
    }


    onButtonClick = e => {
       if(e.data.category_name && e.colDef.headerName === 'Edit') {
          this.props.openChildModal('edit categories',e.data);
       } else if(e.data.topic_name && e.colDef.headerName === 'Edit') {
          this.props.openChildModal('edit topic',e.data);
       } else if(e.data.question_title && e.colDef.headerName === 'Edit') {
          this.props.openChildModal('edit question',e.data);
       } else if(e.data.category_name && e.colDef.headerName === 'Delete') {
          this.props.deleteRow('delete category',e.data);
       } else if(e.data.topic_name && e.colDef.headerName === 'Delete') {
          this.props.deleteRow('delete topic',e.data);
       } else if(e.data.question_title && e.colDef.headerName === 'Delete') {
        this.props.deleteRow('delete question',e.data);
       }

    }

    checkCellClicked = (e) => {
        if(e.colDef.headerName === 'Edit') {
            this.onButtonClick(e);
        } else if(e.colDef.headerName === 'Delete') {
            this.onButtonClick(e);
        }
    }
    

    changeGridSection = (sectionValue) => {
        let me = this;

        if(sectionValue === 'category') {
            let colDef =  [{
                headerName: "Id", field: "grid_id",checkboxSelection: true,width: 80
              },{
                headerName: "Category Name", field: "category_name",resizable: true
              }, {
                headerName: "Created On", field: "created_on",width: 290
              }, {
                headerName: "Updated on", field: "updated_on",width: 290
              }, {
                headerName: "Edit", field: "edit",cellRenderer:'editfield',width: 100
              }, {
                headerName: "Delete", field: "delete",cellRenderer:'deletefield',width: 100

              }]

            $.ajax({
                type: "get",
                contentType: "application/json",
                url: "http://localhost:8000/categories",        
                success: function(response) {
                    console.log(response.length)
                    response.forEach((element,index) => {
                        element['grid_id'] = index+1;
                    });
                    
                    me.setState({colDef,rowDef: response})
                }
            })
        } else if(sectionValue === 'topic') {
            let colDef =  [{
                headerName: "Id", field: "grid_id",checkboxSelection: true,width: 80
              },{
                headerName: "Topic Name", field: "topic_name"
              }, {
                headerName: "Topic Description", field: "topic_description",width: 290
              }, {
                headerName: "Category Id", field: "category_id",width: 100
              }, {
                headerName: "Created on", field: "created_on",width: 250
              }, {
                headerName: "Updated on", field: "updated_on",width: 250
              }, {
                headerName: "Edit", field: "edit",cellRenderer:'editfield',width: 100
              }, {
                headerName: "Delete", field: "delete",cellRenderer:'deletefield',width: 100

              }]

            $.ajax({
                type: "get",
                contentType: "application/json",
                url: "http://localhost:8000/topic",        
                success: function(response) {
                    response.forEach((element,index) => {
                        element['grid_id'] = index+1;
                    });
                    
                    me.setState({colDef,rowDef: response})
                }
            })
        } else if(sectionValue === 'questions') {
            let colDef =  [{
                headerName: "Id", field: "grid_id",checkboxSelection: true,width: 80
              },{
                headerName: "Question Title", field: "question_title",width: 300,resizable: true
              }, {
                headerName: "Question Description", field: "question_description",width: 150
              }, {
                headerName: "Answers", field: "answers",width: 300,resizable: true
              }, {
                headerName: "Correct Answer", field: "correct_answers",width: 100,resizable: true
              }, {
                headerName: "Topic Id", field: "topic_id",width: 100
              }, {
                headerName: "Category Id", field: "category_id",width: 100
              }, {
                headerName: "Created on", field: "created_on",width: 250
              }, {
                headerName: "Updated on", field: "updated_on",width: 250
              }, {
                headerName: "Edit", field: "edit",cellRenderer:'editfield',width: 100
              }, {
                headerName: "Delete", field: "delete",cellRenderer:'deletefield',width: 100

              }]
            let dataString = {
              edit_question: 1
            }
            dataString = JSON.parse(JSON.stringify(dataString));
            $.ajax({
                type: "get",
                contentType: "application/json",
                url: "http://localhost:8000/questions",      
                data: dataString,  
                success: function(response) {

                  response.forEach((element,index) => {
                        element['grid_id'] = index+1;
                        
                        let answers = element['answers'].split(",");
                        let corr_ans = element['correct_answers'].split(",");
                        corr_ans.forEach((element1,index) => {
                          if(element1 === '1'){
                            element['correct_answers'] = answers[index];
                          }
                        }); 
                    });
                    
                    me.setState({colDef,rowDef: response})
                }
            })
        }
    }

    render() {
        return (
            <div id="view-value-container-background" style={{display: "none"}}>
                <div id="view-value-container">
                <div className="model-header2"><span className="close-box2">X</span></div>
                    <div id="changelook" style={{ height: '380px', width: '100%' ,textAlign: "left"}} className="ag-theme-balham">
                        <AgGridReact
                            columnDefs={this.state.colDef}
                            rowData={this.state.rowDef}
                            rowSelection="multiple"
                            onGridReady={ (params) => { this.gridApi = params.api;  } }
                            frameworkComponents={this.state.frameworkComponent}
                            rowHeight = {40}

                            onCellClicked = {this.checkCellClicked}
                            >
                        </AgGridReact>
                    </div>
                </div>                
            </div>
        );
    }   
}

export default Model3


class DeleteButton extends Component {
 
    constructor(props){
      super(props);
    
      this.state = {};
    }
    render() {
      return (
        <span>
            <button type="button" name="deleteButton" id="deleteButton" >
            <i className="fa fa-trash-o" ></i>&nbsp;&nbsp;Delete</button>
        </span>
      );
    }
  }
  
  class EditButton extends Component {
   
    constructor(props){
      super(props);
    
      this.state = {};
    }
    render() {
      return (
        <span>
            <button type="button" name="editButton" id="editButton" >
            <i className="fa fa-edit" ></i>&nbsp;&nbsp;Edit</button>
        </span>
      );
    }
  }