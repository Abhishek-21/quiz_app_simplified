<?php

/**
 * This is Quiz Question controller
 * From here the admin can add,update,delete or view the quiz Questions
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizQuestionModel;
use App\QuizAnswerModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizQuestionsController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizQuestionModel();
        $taskRecords = $_obj->get($request);
        if(!count($taskRecords)) {
            return array("error" => "No record Found");                 // works simply passing array returns JSON
        }
        return $taskRecords;
    }
    public function post(Request $request) {
        $status_code = "";
        $status_message = ""; 
        if(!empty($request)) {
            $data_array = $request;
            $insert_array = [];
            $insert_array['category_id'] = $data_array['category_id'];
            $insert_array['question_description'] = $data_array['question_description'];
            $insert_array['question_title'] = $data_array['question_title'];
            $insert_array['topic_id'] = $data_array['topic_id'];
            $_obj = new QuizQuestionModel();
            $check_data_inserted = $_obj->post($insert_array);
            if($check_data_inserted) {
                $insert_answer = [];
                $answers = $data_array['answer'];
                foreach ($answers as $key => $value) {
                    $answers[$key]['question_id'] = $check_data_inserted;
                }
                $insert_answer = $answers;
                $answer_model = new QuizAnswerModel();
                $answer_insert = $answer_model->post($insert_answer);
                if($answer_insert) {
                    $status_code = 201;
                    $status_message = "Created Succesfully";
                    return array("success" => $status_message);
                } else {
                    $status_code = 409;
                    $status_message = "Something Went Wrong";
                    return array("error" => $status_message);

                }
                
            } else {
                $status_code = 409;
                $status_message = "Something Went Wrong";    
                return array("error" => $status_message);
            }
        } else {
            $status_message = "Empty array";
            return array("error" => $status_message);
        }
    }

    public function update(Request $request) { 
        $status_code = "";
        $status_message = ""; 
        if(!empty($request)) {
            $data_array = $request;
            $updated_array = [];
            $updated_array['id'] = $data_array['id'];
            $updated_array['category_id'] = $data_array['category_id'];
            $updated_array['question_description'] = $data_array['question_description'];
            $updated_array['question_title'] = $data_array['question_title'];
            $updated_array['topic_id'] = $data_array['topic_id'];
            $updated_array['updated_on'] = ''.date('Y-m-d h:i:s');
            $_obj = new QuizQuestionModel();
            $check_data_updated = $_obj->edit($updated_array);
            if($check_data_updated) { 
                $updated_answer = [];
                $updated_answer = $data_array['answer'];
                $updated_ans_id = $data_array['answer_id'];
                $answer_model = new QuizAnswerModel();
                foreach ($updated_answer as $key => $value) {
                    $answer_updated = $answer_model->edit(array('answer' => $value['answer'],'is_correct' => $value['is_correct']),$updated_ans_id[$key]);  
                }
                $status_message = "submittion successfull!!!";    
                return array("success" => $status_message);
            } else {
                $status_code = 409;
                $status_message = "Something Went Wrong2";    
                return array("error" => $status_message);
            }
        } else {
            $status_message = "Empty array";
            return array("error" => $status_message);
        }
    }

    public function delete(Request $request) { 
        $answer_id= $request['answer_id'];
        $answer_model = new QuizAnswerModel();
        foreach ($answer_id as $key => $value) {
            $value = $answer_model->remove($value);
        }
        $question_id = $request['question_id'];
        $question_model = new QuizQuestionModel();
        $value = $question_model->remove($question_id);
        if($value === 1) {
            return array("success" => 1);
        } else {
            return array("error" => 0);

        }
    }
}
