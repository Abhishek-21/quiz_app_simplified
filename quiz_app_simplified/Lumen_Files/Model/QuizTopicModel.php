<?php

/**
 * This is the quiz topic model all data is passed from here to the controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class QuizTopicModel extends Model 
{
    protected $quiz_topics = 'quiz_topics';

    public function get(Request $request) {
        if ($request->has('category_id')) {
            $users = DB::table($this->quiz_topics)
                    ->where('category_id','=',$request['category_id'])
                    ->get();
            return $users;
        }
        else if($request->has('topic_id')) {
            $users = DB::table($this->quiz_topics)
                    ->where("id","=",$request["topic_id"])
                    ->get(['topic_name']);
            return $users;
        } else {
            $users = DB::table($this->quiz_topics)
                    ->get();
            return $users;    
        }
    }

    public function post(Request $request) {
        $users = DB::table($this->quiz_topics)
                ->insert([
                        'topic_name' => $request['topic_name'],
                        'topic_description' => $request['topic_description'],
                        'category_id' => $request['category_id']
                    ]);
        return $users;   
    }
    public function edit(Request $request) {
        $users = DB::table($this->quiz_topics)
                ->where('id', $request['topic_id'])
                ->update([
                        'topic_name' => $request['new_topic_name'],
                        'topic_description' => $request['new_description'],
                        'updated_on' => date('Y-m-d h:i:s')
                    ]);
        return $users; 
    }
    public function remove(Request $request) {
        $users = DB::table($this->quiz_topics)
                ->where('id', '=', $request['topic_id'])->delete();
        return $users;
    }
}


/// update and delete task funtionalies need to be checked foreign key constraint



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