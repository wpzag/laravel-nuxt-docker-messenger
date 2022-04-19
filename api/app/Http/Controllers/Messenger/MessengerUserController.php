<?php
	
	namespace App\Http\Controllers\Messenger;
	
	use App\Models\User;
	use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
	use Illuminate\Foundation\Bus\DispatchesJobs;
	use Illuminate\Foundation\Validation\ValidatesRequests;
	use Illuminate\Http\Request;
	use Illuminate\Http\UploadedFile;
	use Illuminate\Routing\Controller as BaseController;
	use Illuminate\Support\Facades\Artisan;
	use RTippin\Messenger\Exceptions\MessengerComposerException;
	use RTippin\Messenger\Facades\MessengerComposer;
	use RTippin\Messenger\Http\Resources\ProviderResource;
	use RTippin\Messenger\Models\Participant;
	use RTippin\Messenger\Models\Thread;
	
	class MessengerUserController
	
	{
		public function current(Request $request){
		
				return new ProviderResource($request->user(), true);
			
		}
		public function index(Request $request)
		{
			$q=$request->q;
			$users=User::where('id','!=',auth()->user()->id)
				-> when(!empty($q) , fn($query)=>$query->where('name','LIKE',"%{$q}%") )
				->paginate(20);
			
			$users->getCollection()->transform(function ($user, $key) {
				return new ProviderResource($user,true) ;
			});
			
			return response()->json($users);
		}
		public function demo()
		{
		
			$users=User::limit(30)->get();
			
//			return	$users->map(function ($user, $key) {
//				return new ProviderResource($user,true) ;
//			});
			return response()->json($users->map(fn ($user) => new ProviderResource($user) ));
		}
		
	}
