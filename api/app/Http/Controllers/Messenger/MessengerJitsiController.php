<?php

namespace App\Http\Controllers\Messenger;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Firebase\JWT\JWT;

class MessengerJitsiController extends Controller
{


    public function get_room_token(Request $request)
    {
        $room_name = $request->room;
        $jitsi_jwt_token_app_id = config("jitsi.jwt_app_id");
        $jitsi_jwt_token_secret = config("jitsi.jwt_secret");
        $payload = array(
            "aud" => $jitsi_jwt_token_app_id,
            "iss" => $jitsi_jwt_token_app_id,
            "sub" => "meet.jitsi",
            "room" => $room_name,
            "context" => [
                'user' => [
                    'name' => auth()->user()->name
                ]
            ]
        );
        return JWT::encode($payload, $jitsi_jwt_token_secret);
    }

//    public function delete(Room $room)
//    {
//        $room->delete();
//        return redirect()->action("HomeController@index");
//    }
}
