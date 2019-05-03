<?php

/**
 * This is Quiz category controller
 * From here the admin can add,update,delete or view the quiz categories
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizCategoriesModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizCategoriesController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizCategoriesModel();
        $taskRecords = $_obj->get($request);
        if(!count($taskRecords)) {
            return array("error" => "No record Found");                 // works simply passing array returns JSON
        }
        return $taskRecords;
    }

    public function post(Request $request) {
        try {
            $_obj = new QuizCategoriesModel();
            $taskRecords = $_obj->post($request);
            return json_encode(array("success" => $taskRecords));
        } catch(\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1062') {
                return json_encode(array("error" => "Duplicate entry"));
            } else {
                return json_encode(array("error" => $errorCode));
            }
        } 
    }
    public function update(Request $request) {
        try {
            $_obj = new QuizCategoriesModel();
            $taskRecords = $_obj->edit($request);
            return json_encode(array("success" => $taskRecords));
       } catch(\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1062') {
                return json_encode(array("error" => "Duplicate entry"));
            } else {
                return json_encode(array("error" => $errorCode));
       
            }
        }
    }
    public function delete(Request $request) {
        try {
            $_obj = new QuizCategoriesModel();
            $taskRecords = $_obj->remove($request);
            return json_encode(array("success" => $taskRecords));
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if($errorCode == '1451') {
                return json_encode(array("error" => 1451));
            } else {
                return json_encode(array("error" => $errorCode));
            }
        }
    }

}
