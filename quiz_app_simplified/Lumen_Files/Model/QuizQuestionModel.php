<?php

/**
 * This is the quiz question model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizQuestionModel extends Model 
{
    protected $table4 = 'quiz_questions';
    public function get(Request $request) {
        if($request->has('topic_id')) {
            $users = DB::table($this->table4)
            ->where('topic_id','=',$request['topic_id'])
            ->get();
            return $users; 
        } else if($request ->has('edit_question')) {
            $sql = 'SELECT qq.id as id,qq.question_title as question_title,qq.question_description as question_description,qq.topic_id as topic_id,qq.category_id as category_id,qq.created_on as created_on,qq.updated_on as updated_on,GROUP_CONCAT(qa.id) as answers_id,GROUP_CONCAT(qa.answer) as answers, qa.question_id,GROUP_CONCAT(qa.is_correct) as correct_answers from quiz_questions as qq inner join quiz_answers as qa on qq.id=qa.question_id GROUP BY question_id';
            $users = DB::select($sql,[]);
            return $users;
        } else {
            $users = DB::table($this->table4)
            ->get();
            return $users; 
        }
    }

    public function post($insert_array) {  
        if(!empty($insert_array)) {
            $users = DB::table($this->table4)->insertGetId($insert_array);
        return $users;
        } else {
            return false;
        }  
    }
    public function edit($updated_array) { 
        $users = DB::table($this->table4)
            ->where('id', $updated_array['id'])
            ->update($updated_array);
        return $users;
    }
    public function remove($question_value) {
        $users = DB::table($this->table4)
        ->where('id', '=', $question_value)->delete();
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