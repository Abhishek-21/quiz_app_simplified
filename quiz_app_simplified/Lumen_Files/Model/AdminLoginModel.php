<?php


/**
 * This is Admin login model
 * From here the data is verified and passed to controller
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AdminLoginModel extends Model 
{
    protected $admin_records = 'admin_records';
    public function post(Request $request) {
        if($request->has('username') && $request->has('password')){
                $users = DB::table($this->admin_records)->where('username','=',$request['username'])
                ->where('password','=',$request['password'])
                ->get();
                return $users;
        }
        else if($request['user_id']) {
                $users = DB::table($this->admin_records)->get();
                return $users;    
        }     
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