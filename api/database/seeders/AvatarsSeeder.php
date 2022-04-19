<?php
	
	namespace Database\Seeders;
	
	use App\Models\User;
	use Illuminate\Database\Seeder;
	use Illuminate\Http\UploadedFile;
	use RTippin\Messenger\Actions\Messenger\StoreMessengerAvatar;
	use RTippin\Messenger\Exceptions\FeatureDisabledException;
	use RTippin\Messenger\Facades\Messenger;
	
	class AvatarsSeeder extends Seeder
	{
		/**
		 * @var StoreMessengerAvatar
		 */
		private StoreMessengerAvatar $storeMessengerAvatar;
		
		private $i = 0;
		
		/**
		 * AvatarsSeeder constructor.
		 */
		public function __construct(StoreMessengerAvatar $storeMessengerAvatar)
		{
			$this->storeMessengerAvatar = $storeMessengerAvatar;
		}
		
		/**
		 * Run the database seeds.
		 *
		 * @return void
		 * @throws FeatureDisabledException
		 */
		public function run() : void
		{
			$pics = [
				"https://images.unsplash.com/photo-1639500997560-5527eabfc0bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
				"https://images.unsplash.com/photo-1639410476622-1a91d655f052?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1545983731-23d840edc3b6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
				"https://images.unsplash.com/photo-1638869902592-42d6984e05f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=948&q=80",
				"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1505196298139-8cfce5efd3d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=086d0c442db382f3faadb8156eecafa7",
				"https://images.unsplash.com/photo-1617058998642-5ce6c139754b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1471864167314-e5f7e37e404c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=c5ec8dbca0d6e4495956046aca85275f",
				"https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1389&q=80",
				"https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",
				"https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1513827379601-9dba5099a3f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644965185489-84f852519773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=984&q=80",
				"https://images.unsplash.com/photo-1645002124895-009a4c3ea3af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2050&q=80",
				"https://images.unsplash.com/photo-1644914847716-2120555f8ea5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644943013701-b0112e8f58d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644910595529-1075df35cff5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1614565254221-27fa099f94b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
				"https://images.unsplash.com/photo-1644862742524-2d96acb5d739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2313&q=80",
				"https://images.unsplash.com/photo-1644701909994-0c40f456b71e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
				"https://images.unsplash.com/photo-1585230942583-186b3030d5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644392509422-14691fd97459?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644442146822-97c05b44e45d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80",
				"https://images.unsplash.com/photo-1644462282294-49a0ce636223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
				"https://images.unsplash.com/photo-1643930755935-77a44d031a41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=985&q=80",
				"https://images.unsplash.com/photo-1644207072264-61e9bd2507a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1644389980966-f39636c6bd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
				"https://images.unsplash.com/photo-1642980074229-439281d19f29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
			];
			
			User::all()->each(function(User $user) use ($pics) {
				
				Messenger::setProvider($user);
				
				$name = uniqid();
				$file = '/tmp/' . $name;
				file_put_contents($file, file_get_contents($pics[ $this->i ]));
				$this->i++;
				
				$this->storeMessengerAvatar->execute(
					new UploadedFile($file, $name)
				);
				
				unlink($file);
			});
		}
	}
