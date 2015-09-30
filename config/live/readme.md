# Live environment configuration

Config settings for the live environment go in this directory. Any settings in this directory will override
the base `config` directory when the site is in its live environment. The environment is set by the `COG_ENV`
server variable.

To set the environment to live in Apache, add the following line to your server configuration:

    SetEnv COG_ENV live

To set the environment to live in Nginx, add the following to your server configuration:

    location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_param COG_ENV live;

            fastcgi_pass unix:/var/run/php5-fpm.sock;
    }

Environments will default to `local`, which favour values set in the `config/local` directory.

The acceptable environment names are:

+ `live`
+ `local`
+ `staging`
+ `dev`

For more information, see http://wiki.mothership.ec/Developer_Guide:_Setting_up_Mothership_environments_in_Apache#Environments