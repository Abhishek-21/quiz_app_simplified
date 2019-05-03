<?php

/**
 * This is the quiz question model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizModel extends Model 
{
    protected $table4 = 'quiz_questions';
    protected $table5 = 'quiz_answers';
    public function get($check_topic_id) {
        $sql = "select t2.topic_id,t2.question_title as question_title,t2.answers as answers,t1.answer as correct_answer from (SELECT answer,question_id from quiz_answers where is_correct = 1) as t1 inner join (select question_title,group_concat(answer) as answers,topic_id,qq.id as ques_id from quiz_questions as qq inner join quiz_answers as qa on qq.id=qa.question_id group by question_title) as t2 on t1.question_id=t2.ques_id where t2.topic_id = $check_topic_id";
        $users = DB::select($sql,[]);
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