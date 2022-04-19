<?php
	
	use Illuminate\Database\Migrations\Migration;
	use Illuminate\Database\Schema\Blueprint;
	use Illuminate\Support\Facades\Schema;
	
	class CreateAuthProvidersTable extends Migration
	{
		/**
		 * Run the migrations.
		 *
		 * @return void
		 */
		public function up()
		{
			Schema::create('auth_providers', function(Blueprint $table) {
				$table->id();
				$table->bigInteger('user_id')->unsigned();
				$table->string('provider');
				$table->string('provider_user_id')->index();
				$table->text('access_token')->nullable();
				$table->text('refresh_token')->nullable();
				$table->timestamps();
				
				$table->foreign('user_id')
					->references('id')
					->on('users')
					->onDelete('cascade');
			});
		}
		
		/**
		 * Reverse the migrations.
		 *
		 * @return void
		 */
		public function down()
		{
			Schema::dropIfExists('oauth_providers');
		}
	}
