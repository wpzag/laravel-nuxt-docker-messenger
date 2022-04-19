<?php
	
	namespace App\Listeners;
	
	use RTippin\Messenger\Broadcasting\CallJoinedBroadcast;
	use RTippin\Messenger\Events\CallJoinedEvent;
	
	class SendJoinedEventToOtherParticipant
	{
		/**
		 * Create the event listener.
		 *
		 * @return void
		 */
		public function __construct()
		{
			//
		}
		
		/**
		 * Handle the event.
		 *
		 * @param CallJoinedEvent $event
		 * @return void
		 */
		public function handle(CallJoinedEvent $event)
		{
			broadcaster()->toOthersInThread($event->call->thread)->with(['call' => $event->call, 'sender' => $event->participant])->broadcast(CallJoinedBroadcast::class);
		}
	}
