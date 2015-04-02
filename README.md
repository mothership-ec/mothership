# Mothership: E-commerce for Humans

<a href="http://mothership.ec">Mothership</a> is open source web retail software, combining e-commerce with Electronic Point Of Sale (EPOS) into a single, unified platform. It is based on over 10 years experience, yet it is entirely new, containing zero legacy code, making it a perfect platform for developers.

<img src="readme_files/dashboard.jpg">

It incorporates the full range of applications you'd expect to run an online store, with some rather nice surprises too, including fully integrated EPOS (Electronic Point Of Sale). Here's an incomplete list (it does much more!) of the headline functionality Mothership currently supports:

* CMS
* Inventory
* Shopping cart and checkout
* Stripe integration (with open architecture for other merchants)
* Excellent fulfilment process with printed documents and automated emails
* Returns
* Multiple currencies
* Multiple tax rates
* Gift Vouchers
* Discount tokens
* Campaign Monitor mailing list integration
* Xero online accounts integration
* Electronic Point Of Sale
* Reports

A comprehensive [Functionality Reference list](http://wiki.mothership.ec/Functionality_Reference) is available on the Mothership Wiki.

## Installation

There are two ways to install Mothership:

+ Using the automatic installer
+ Manually

### The installer

To install Mothership using the installer:

+ <a href="http://mothership.ec/files/downloads/mothership.phar">Download the installer</a>
+ Create an empty database
+ Run `php <path to>mothership.phar` in the terminal
+ Follow the instructions and answer the questions

### Manually

+ Run `composer create-project mothership-ec/mothership * <path to installation>`
+ Add your database details to `config/db.yml`
+ Run `bin/cog migrate:run` from the installation directory in the terminal
+ Run `bin/cog asset:dump` and `bin/cog asset:generate` from the installation directory in the terminal
+ Run `chmod -R 777 tmp public logs data` from the installation directory in the terminal
+ Run `bin/cog task:run user:create_admin` in your terminal to create the first admin user

## System requirements

To set up <a href="http://mothership.ec">Mothership</a> using the installer, you must have the following:

+ **PHP** 5.4.0 or higher
	+ **PHP intl extention** (see <a href="http://php.net/manual/en/intl.setup.php">http://php.net/manual/en/intl.setup.php</a>)
	+ It is also recommended that you set the memory_limit in your php.ini file to at least 256M, as the process of copying and minifying all the CSS and JavaScript from the individual modules can be quite intensive. However, we hope to optimise this in the future.
+ **MySQL** 5.1.0 or higher
+ **Apache**
	+ **We cannot currently offer any guarantee that Mothership works with Nginx or other server software**
+ A **Unix-like** operating system (i.e. OSX, Linux, etc)
	+ If you are using Windows, it is recommended that you use a virtual machine such as
	 <a href="https://www.virtualbox.org/">VirtualBox</a> to set up your installation.
	+ Please note that **we cannot currently offer any guarantee that Mothership itself will work properly in a Windows environment**
+ **Composer**
	+ Composer is a PHP dependency manager which can be downloaded from <a href="https://getcomposer.org/download/">the Composer website</a>.
	+ It is recommended that you install Composer either globally or by adding the following line to your `.bash_profile`

	```
	alias composer='php /[path/to]/composer.phar'

	```