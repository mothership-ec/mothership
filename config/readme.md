# Environment configuration

Config settings for the environment go in this directory. Mothership will check the environment set by the `COG_ENV`
server variable. It will first check the `config/[environment name]` directory, and if it cannot find the config
setting, it will check the `config` directory. For instance, when setting the database, your base `config/db.yml` config file
might look like this:

    hostname: localhost
    user: root
    pass: password
    name: mothership_db
    charset: utf8
    cache: mysql_memory

However, in the live environment, it will be on a server and so the database user, password and schema will probably
be different, so your `config/live/db.yml` file will might look like this:

    user: mothership_user
    pass: $uper$ecurePassword
    name: mothership_db_live

Therefore, in the live environment, when accessing the database, it will still look at `localhost` for the server,
but will connect to the `mothership_db_live` database with the `mothership_user` user.

To set the environment to live in Apache, add the following line to your server configuration:

    SetEnv COG_ENV live

To set the environment to live in Nginx, add the following to your server configuration:

    location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_param COG_ENV live;

            fastcgi_pass unix:/var/run/php5-fpm.sock;
    }

The acceptable environment names are:

+ `live`
+ `local`
+ `staging`
+ `dev`

For more information, see <a href="http://wiki.mothership.ec/Developer_Guide:_Setting_up_Mothership_environments_in_Apache#Environments>the wiki</a>