<?php

/**
 * This is admin controller 
 * 
 * this controller maintains or manages user login  
 *  
 * 
*/
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\AdminLoginModel;

use Laravel\Lumen\Routing\Controller as BaseController;

class AdminLoginController extends BaseController
{
    public function post(Request $request) {
    //     $_obj = new AdminLoginModel();
    //     $taskRecords = $_obj->post($request);
    //     if(!$taskRecords || !$taskRecords->first()) {
    //         return array("error" => "No record found","response_code" => 0);
    //     }
    //     else {
    //         if($request->has('username') && $request->has('password')){
    //             return array("user_id" => sha1($taskRecords[0]->id),"response_code" => 1);                          // sha1 encrytion is used for security
    //         }
    //         else if ($request['user_id']) {
    //             foreach ($taskRecords as $value) {
    //                 if(sha1($value->id) === $request['user_id'])           // sha1 encrytion is used for security
    //                     return array("matched_result" => 1);
    //             }
    //             return array("matched_result" => 0);
    //         }
    //     }
    // }
    $_obj = new AdminLoginModel();
    $taskRecords = $_obj->post($request);

    if($request->has('username') && $request->has('password')) {
        $_obj = new AdminLoginModel();
        $taskRecords = $_obj->post($request);
        if(!$taskRecords || !$taskRecords->first()) {
            return array("error" => "No record found","response_code" => 0);
        } else {
            return array("user_id" => sha1($taskRecords[0]->id),"response_code" => 1);
        }
    } else if ($request->has('user_id')) {
        foreach ($taskRecords as $value) {
            if(sha1($value->id) === $request['user_id'])           // sha1 encrytion is used for security
                return array("matched_result" => 1);
        }
        return array("matched_result" => 0);
    }
    }
}
