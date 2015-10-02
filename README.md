# Mothership: E-commerce for Humans

<a href="http://mothership.ec">Mothership</a> is open source web retail software, combining e-commerce with Electronic Point Of Sale (EPOS) into a single, unified platform. It is based on over 10 years experience, yet it is entirely new, containing zero legacy code, making it a perfect platform for developers.

<img src="readme_files/dashboard.jpg">

It incorporates the full range of applications you'd expect to run an online store, with some rather nice surprises too. Here's an incomplete list of the headline functionality Mothership currently supports:

* Electronic Point of Sale (EPOS)
* CMS
* Inventory
* Shopping cart and checkout
* Stripe integration (with open architecture for other merchants)
* Excellent fulfilment process with printed documents and automated emails
* Returns
* Multiple currencies
* Multiple tax rates
* Gift vouchers
* Discount tokens
* Reports

## Coming soon!

* Xero online accounts integration
* Campaign Monitor mailing list integration

A comprehensive [Functionality Reference list](http://wiki.mothership.ec/Functionality_Reference) is available on the Mothership Wiki.

## EPOS

Mothership's integrated EPOS solution allows businesses to keep their web and bricks-and-mortar stores in perfect harmony, with stock levels always up to date, and reporting giving oversight of the entire business.

<img src="readme_files/epos.jpg">

To see EPOS in action, be sure to <a href="https://youtu.be/ahMedgeHLKU">check out our video</a>

### Receipt printing with Waldo

Receipt printing does not come packaged with the EPOS module. However, we have a device called **Waldo** which connects the
EPOS system to the till printer via your wifi network.

Waldo uses a combination of websockets, node.js and a Raspberry Pi to communicate data sent from the Mothership EPOS site to the receipt
printer. Our Waldo extension allows retailers to print receipts, scannable vouchers and end of day reports. All receipts come with a barcode for the
order ID, allowing for easy order identification when processing a return. If you would like to know more about Waldo, please <a href="http://mothership.ec/contact">contact us</a>.

## System requirements

To set up <a href="http://mothership.ec">Mothership</a> using the installer, you must have the following:

+ **PHP** 5.4.0 or higher (Mothership may have issues running on PHP 7)
	+ **PHP intl extention** (see <a href="http://php.net/manual/en/intl.setup.php">http://php.net/manual/en/intl.setup.php</a>)
+ **MySQL** 5.1.0 or higher
+ **Apache** or **Nginx**
+ A **Unix-like** operating system (i.e. OSX, Linux, etc)
	+ Mothership **will not** work in a Windows environment at present

### Recommended

+ **Composer**
	+ Composer is a PHP dependency manager which can be downloaded from <a href="https://getcomposer.org/download/">the Composer website</a>.
	+ Composer is not required to install Mothership using the <a href="http://mothership.ec/files/downloads/mothership.phar">automatic installer</a>, but will be required for keeping your installation up to date, or installing Mothership manually
	+ It is recommended that you install Composer globally
+ **Git**
    + We recommend using <a href="https://git-scm.com/">Git</a> for version control, and this base installation takes the assumption that you are using Git to manage and track changes to your installation

## Installation

There are two ways to install Mothership:

+ Using the automatic installer
+ Manually

To install, follow the instructions below. For more help, be sure to check out <a href="http://wiki.mothership.ec">our wiki</a>, or visit <a href="http://forum.mothership.ec">our forum</a>.

### The installer

To install Mothership using the installer:

1. <a href="http://mothership.ec/files/downloads/mothership.phar">Download the installer</a>
1. Create an empty database
1. Run `php <path to>mothership.phar` in the terminal
1. Follow the instructions and answer the questions

### Manually

1. Run `composer create-project mothership-ec/mothership * <path to installation>`
1. Add your database details to `config/db.yml`
1. Run `bin/cog migrate:run` from the installation directory in the terminal
1. Run `bin/cog asset:dump` and `bin/cog asset:generate` from the installation directory in the terminal
1. Run `chmod -R 777 tmp public logs data` from the installation directory in the terminal
1. Run `bin/cog task:run user:create_admin` in your terminal to create the first admin user

### Setting up EPOS

The majority of the work with regards to setting up EPOS on your Mothership installation has already been done for you.

All you need to do now is:

1. Edit <a href="app/site/src/Epos/Branch/SampleBranch.php">this file</a> so that it applies to your shop.
1. The `SampleBranch` class is called in the <a href="app/site/src/Bootstrap/Services.php">service container</a>, so if you have renamed it, you will need to rename it there too (and add any additional branches you have created).
1. Set the URL you want to use to access the EPOS system in your browser in the `epos.yml` config file.
1. Add some users to the <a href="app/site/src/Epos/UserGroup/ShopStaff.php">Shop Staff</a> group in the admin panel.

## Working on and contributing to this repository

To set up an environment to develop on this repository

1. Clone the repo and install the dependencies using Composer
1. Create a `config/local` directory
1. Move **all** config files into this directory. Be sure not to commit any of these config files.
1. Follow instructions from **3.** onwards from the manual install guide above
1. Be sure to follow our <a href="http://wiki.mothership.ec/Mothership#Contributing_to_Mothership">contribution guidelines</a> and <a href="CODE_OF_CONDUCT.md">code of conduct</a>
