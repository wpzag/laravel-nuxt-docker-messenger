# [Docker-Laravel-Nuxt] Messenger 🔥 🔥

This is a fully featured messenger app built using [RTippin/messenger](https://github.com/RTippin/messenger).

# Demo

[Demo Website](https://zagcenter.com)

## Preview

<img src="https://user-images.githubusercontent.com/64034451/155853651-58b4c247-bbb6-41c6-99f8-53fc4680d6dc.png" alt="Example of uploading image to GitHub's CDN" width="900px">

## Requirements

- Fresh installation of Ubuntu 18.04 x64 with at least 4 GB RAM
- Valid domain name and Email address

## Installation

```bash

#Install Docker & nano (text editor)
sudo apt-get update;
sudo apt-get install --yes nano;
sudo apt-get install --yes docker.io;
sudo systemctl start docker;
sudo systemctl enable docker;

#Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose;
sudo chmod +x /usr/local/bin/docker-compose;

# Install git && Clone the messenger repository 
sudo apt-get  --yes install git;
git clone https://github.com/osamaegy/laravel-nuxt-docker-messenger.git;

# cd into our project
cd laravel-nuxt-docker-messenger

#Rename the env files K
mv .example.env .env;

mv api/.example.env api/.env; # laravel .env file


#Edit the email and host name ( they both must be valid )
sudo nano .env ; # this is the .env file in the root folder
#HOSTNAME=example.com
#CERTBOT_EMAIL=example@gmail.com

# Give appropriate permissions for laravel
sudo chown -R $USER:www-data api;
sudo chmod -R 775 api/storage;
sudo chmod -R 775 api/bootstrap/cache;

# Start up our docker containers
docker-compose -f docker-compose.yml up --build -d;

#Setting up laravel
docker-compose exec php composer install -n;
docker-compose exec php php artisan key:generate --force;
docker-compose exec php php artisan migrate:fresh --seed --force;

```
