<?php

/**
 * This is Quiz Question controller
 * From here the admin can add,update,delete or view the quiz Questions
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizAnswerModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizAnswerController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizAnswerModel();
        $taskRecords = $_obj->get($request);
        if(!count($taskRecords)) {
            return array("error" => "No record Found");                 // works simply passing array returns JSON
        }
        return $taskRecords;
    }
    public function post(Request $request) {
        // try {
            $_obj = new QuizAnswerModel();
            $taskRecords = $_obj->post($request);
            return $taskRecords;
            // return json_encode(array("success" => $taskRecords));
        // } catch(\Illuminate\Database\QueryException $e) {
            // $errorCode = $e->errorInfo[1];
            // return json_encode(array("error" => $errorCode));
        // }
    }
    public function update(Request $request) {
        try {
            $_obj = new QuizAnswerModel();
            $taskRecords = $_obj->edit($request);
            return json_encode(array("success" => $taskRecords));
        } catch(\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            return json_encode(array("error" => $errorCode));
        }
    }
    public function delete(Request $request) {
        try {
            $_obj = new QuizAnswerModel();
            $taskRecords = $_obj->remove($request);
            return json_encode(array("success" => $taskRecords));
        } catch(\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            return json_encode(array("error" => $errorCode));
        }
    }
}
