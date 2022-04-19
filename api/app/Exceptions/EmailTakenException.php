<?php
	
	namespace App\Exceptions;
	
	use Exception;
	use Illuminate\Http\Response;
	
	class EmailTakenException extends Exception
	{
		/**
		 * Render the exception as an HTTP response.
		 *
		 * @return Response
		 */
		public function render() : Response
		{
			return response()->view('oauth.emailTaken', [], 400);
		}
	}

