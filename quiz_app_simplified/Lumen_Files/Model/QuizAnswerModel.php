<?php

/**
 * This is the quiz question model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizAnswerModel extends Model 
{
    protected $table5 = 'quiz_answers';
    public function get(Request $request) {
        if($request->has('question_id')) {
            $users = DB::table($this->table5)
            ->where('question_id','=',$request['question_id'])
            ->get();
            return $users; 
        } else {
            $users = DB::table($this->table5)
            ->get();
            return $users; 
        }
    }

    public function post($insert_array) {
        if(!empty($insert_array)) {
            $users = DB::table($this->table5)->insert($insert_array);
        return $users;
        } else {
            return false;
        }  
    }
    public function edit($update_array,$updated_ans_id) { 
        $users = DB::table($this->table5)
                    ->where('id', $updated_ans_id)
                    ->update($update_array);
        return $users;
    }
    public function remove($remove_answer) {
        $users = DB::table($this->table5)
        ->where('id','=',$remove_answer)->delete();
        return $users;
    }
}





// create table Quiz_topics(
//     Topic_id int(11) auto_increment primary key not null,
//     Topic_name varchar(255),
//     Quiz_category varchar(255),
//     Topic_description varchar(255),
//     Created_on datetime default CURRENT_TIMESTAMP,
//     Updated_on varchar(255) default '0000-00-00 00:00:00',
//     );


// create table Question_set(
//     Question_id int(11) auto_increment primary key not null,
//     Question_title varchar(255),
//     Question_Description text,
//     Answers varchar(255),
//     Correct_Answer varchar(255),
//     Status enum('1','0'),
//     Topic_name varchar(255)
//     );

// CREATE TABLE `Quiz_app`.`Quiz_categories` ( `Category_id` INT(11) NOT NULL AUTO_INCREMENT ,  `Category_name` VARCHAR(255) NOT NULL ,  `Created_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,  `Updated_on` VARCHAR(255) NOT NULL DEFAULT '\'0000-00-00 00:00:00\'' ,    RIMARY KEY  (`Category_id`)) ENGINE = InnoDB;