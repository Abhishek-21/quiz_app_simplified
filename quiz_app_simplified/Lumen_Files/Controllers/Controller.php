<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function get(Request $request) {
        $_obj = new User();
        $taskRecords = $_obj->get($request);
        if(!$taskRecords->first()) {
            return 0;
        }
        else {
            if(isset($request['username']) && isset($request['password'])){
                return sha1($taskRecords[0]->user_id);
            }
            else if ($request['user_id']) {
                foreach ($taskRecords as $value) {
                    if(sha1($value->user_id) === $request['user_id']) 
                        return 1;
                }
                return 0;
            }
        }
    }

    // categories 

    public function getCategory(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->getCategory($request);
        return $taskRecords;
    }

    public function postCategory(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->postCategory($request);
        return $taskRecords;
    }
    public function updateCategory(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->updateCategory($request);
        return $taskRecords;
    }
    public function deleteCategory(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->deleteCategory($request);
        return $taskRecords;
    }

    // Topics

    public function getTopic(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->getTopic($request);
        return $taskRecords;
    }

    public function postTopic(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->postTopic($request);
        return $taskRecords;
    }
    public function updateTopic(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->updateTopic($request);
        return $taskRecords;
    }
    public function deleteTopic(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->deleteTopic($request);
        return $taskRecords;
    }

    // questions

    public function getQuestions(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->getQuestions($request);
        return $taskRecords;
    }

    public function postQuestions(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->postQuestions($request);
        return $taskRecords;
    }
    public function updateQuestions(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->updateQuestions($request);
        return $taskRecords;
    }
    public function deleteQuestions(Request $request) {
        $_obj = new User;
        $taskRecords = $_obj->deleteQuestions($request);
        return $taskRecords;
    }

}
