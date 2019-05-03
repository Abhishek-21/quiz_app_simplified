<?php

/**
 * This is Quiz category controller
 * From here the admin can add,update,delete or view the quiz categories
 */

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\QuizModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class QuizController extends BaseController
{
    public function get(Request $request) {
        $_obj = new QuizModel();
        $check_topic_id = $request['topic_id'];
        $taskRecords = $_obj->get($check_topic_id);
        if(!count($taskRecords)) {
            return array("error" => "No record Found");                 // works simply passing array returns JSON
        }
        shuffle($taskRecords);
        return $taskRecords;
    }
}
