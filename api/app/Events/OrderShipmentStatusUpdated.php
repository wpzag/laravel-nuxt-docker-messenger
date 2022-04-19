<?php
	
	namespace App\Events;
	
	use Illuminate\Broadcasting\Channel;
	use Illuminate\Broadcasting\InteractsWithSockets;
	use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
	use Illuminate\Foundation\Events\Dispatchable;
	use Illuminate\Queue\SerializesModels;
	
	class OrderShipmentStatusUpdated implements ShouldBroadcast
	{
		use Dispatchable, InteractsWithSockets, SerializesModels;
		
		protected $user;
		protected $message;
		
		public function __construct()
		{
			$this->user = 'asdas';
			$this->message = 'asdasd';
		}
		
		public function broadcastWith()
		{
			// This must always be an array. Since it will be parsed with json_encode()
			return [
				'user' => 'asdasd',
				'message' => 'asdasd',
			];
		}
		
		public function broadcastAs()
		{
			return 'newMessage';
		}
		
		public function broadcastOn()
		{
			return new Channel('orders');
		}
	}
