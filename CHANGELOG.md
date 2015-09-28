# Changelog

## 1.2.0

- Returns address on delivery note is pulled from `merchant.yml` instead of being hard coded
- Added item options on delivery note
- Changed logo image on delivery note to `logo-print.png`
- Added `Contact` page type with contact form integrated
- Replace default 'Terms and Conditions' link on return submission confirmation to `/terms-and-conditions` in `view/Message:Mothership:Orderreturn/return/account/confirm.html.twig` view override
- Replace current carousel with <a href="https://github.com/mothership-ec/ms-carousel">Mothership Carousel</a>
- Update Cog to version 4.11.0
- Update Control Panel to version 3.5.0
- Update Commerce to version 5.14.0
- Update Discount to version 2.1.3
- Update Voucher to version 2.2.2

## 1.1.4

- Renamed "Continue 'Shopping'" link on checkout complete stage to "Continue shopping"
- "Continue shopping" link on checkout complete stage no longer links to '/shop' but rather back to the home page.
- Resolve issue where `delivery_note_print.css` stylesheet was not called correctly when rendering a delivery note
- Resolve issue where returns overview in admin panel was overriden by another view file (`Message:Mothership:OrderReturn/return/template.html.twig`)
- Update Cog to version 4.9.1
- Update Cog User to version 2.0.3
- Update CMS to version 4.8.0
- Update Commerce to version 5.13.0
- Update E-commerce to version 3.2.1
- Update File Manager to version 3.1.2
- Update MS User to 4.2.1
- Update Discount to version 2.1.2
- Update Returns to 5.1.0

## 1.1.3

- Update Cog to version 4.6.0
- Update CMS to version 4.5.0
- Update Commerce to version 5.7.0
- Update Control Panel to version 3.4.3
- Update E-commerce to version 3.1.0
- Update File Manager to version 3.1.1
- Update Returns to 5.0.2
- Update MS User to 4.0.3
- Update Voucher to 2.1.2

## 1.1.2

- Update Mothership components with Composer

## 1.1.1

- Update readme
- Fix issue where state selector wouldn't display when creating an account via the checkout

## 1.1.0

- Added `BlogPost` page type by default
- Added `BlogListing` page type by default
- Added social share links to blog pages
- Fix issues with product gallery
- Social links appear by default
- Improved styling on default homepage promos
- Amended `Product` page type to extend `AbstractProduct`
- Amended `ProductListing` page type to extend `AbstractProductListing`
- Fix issue where forgotten password link would direct users to the admin forgotten password link

## 1.0.0

- Released Mothership installation as a stand-alone repository, use of `mothership-ec/mothership-skeleton-theme` is deprecated
