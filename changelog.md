# Version History

## 6.3

- Optimized color scheme files by converting SASS color variables into CSS variables
- Updated social media icons inside of CaGov icons font library
- Published Visual Studio integration with Library Manager (LibMan) allowing .Net users to use the State Template NPM package
- Fixed pagination component
- Updated starter site content
- Added statewide alert compoent

## 6.2

- NPM package support for state template
- Separated template website development from template source development
- Updated bootstrap version to 5.3
- Optimized core JavaScript code and placed reference to it in the head tag next to core css references
- Improved rendering of the site header in mobile view

## 6.1.2

- Updated project with consistent formatting
- Removed settings section since modern browsers provide those options to the users
- Removed unused breakpoint (1280px)
- Updated mobile navigation experience, look and feel
- Updated mobile side navigation experience, look and feel
- Cleaned up the JavaScript core code to go inline with JS lint requirenments

## 6.1.1

- Updated tab component JS to make it more accessible
- Fixed headings semantic structure throughout website
- Fixed accessibility issues throughout website
- Added pagination component
- Added executive profile component
- Updated search results look and feel
- Added side navigation sample website to demo side navigation depth levels
- Updated icon search build process and added more icons search keywords
- Added newsroom patterns including newsroom, newslist and news article

## 6.1.0

- Updated alert banner
- Added 8 new icons to the CAGov icons font
- Added side navigation component
- Added pagination to the icon search page
- Added automatic "on this page" navigation component
- Added new contact us form that posts feedback to airtable

## 6.0.8

- Updated site structure and rebuild framework to use Eleventy site generation #191
- Replaced server site includes with njk includes and templates
- Changed website output folder to /\_site/ #206
- Updated utility header include to look like design system #192
- Updated branding include (site header) to look like CA Design System's site header #194
- Updated mobile controls styles to look like CA Design System
- Updated search component's styles to look like search component in the CA Design System #197
- Updated main navigation styles to resemble the CA Design System navigation #196
- Update global footer in beta to look like CA Design System's statewide footer #193
- Added page navigation and list navigation samples #224
- Updated side navigation styles #223
- Aligned buttons look and feel with Design System look and feel #246
- Updated back-to-top component to look like Design System #245
- Replace site font in beta with Public Sans that is used by CA Design System #195
- Updated navigation structure, information architecture and content flow #232
- Introduced code samples categories, such as components, templates and CSS units. Sorted out code sample pages based on those categories, added side navigation (list navigation) on each of those pages #253
- Addwd new CA.gov color scheme #225
- Added new Fearure Card content template (into Content Patterns samples) #220
- Added new Link Grid content template (into Content Patterns samples) #221
- Updated Tabs component styles to resemble design system #219
- Updated accordion component with a new design and the latest code from Design System #199
- Added new Step List component #222
- Added new structural components pages (Utility Header #320, Settings Bar #318, Mobile Controls #316, Site Header #319, Search Bar #317, Global Footer #315)

## 6.0.7

- Added responsive font size calculation functionality
- Adjusted some of the components to responsive font sizing
- Updated CaGov Font: added GitHub icon and updated pdf-text icon
- Moved site fonts into the local /fonts/ folder and made local font loading instead of google to limit http requests
- Added number counter on load function to fire it when visible on load
- Added settings.js into gulpfile.js to activate utility header's settings
- Fixed search.js console error that was firing when search widget was not in the page

## 6.0.6 (jQuery-less Beta Release)

- Updated core files with new jQuery-less navigation.js
- Removed jQuery and jQuery plugins
- Updated accordion file (took it from cagov design system)
- Fixed gulp js uglify functions
- Updated utility header, settings, and branding section styles
- Updated header's position to sticky instead of fixed
- Fixed header.js script that hides utility header on scroll
- Updated main nav layout, updated main banner height property
- Removed owl carousels modules, added bootstrap carousel sample
- Updated modal box in carousel page
- Made search to expand in mobile
- Fixed search in mobile
- Fixed explore button on the homepage
- Fixed profile banners
- Removed text-decoration from main menu links
- Added mobile search include on most pages
- removed jumps from mobile search expand and collapse transitions
- Made side padding consistent across main shell components
- Updated outdated grid classes
- Changed label class to badge
- Updated badges in samples landing page
- Added pure JS accordion-list component
- Changed accordion list heading font to source sans
- fixed duplicate id issue in search components
- Added jssrcmap task to gulpfile to make sure it bings bootstrap map
- Updated side nav accordion
- Updated CDN page
- Updated getting started page
- Updated update page
- Updated search.js, side navigation, and other navigation pages
- Updated accordion styles, removed js styles from accordion script
- Updated alert banner close button styles and structure
- Updated modal markup, fixed tabs markup, fixed tabs styles
- Updated form elements and styles, added icons to the images folder
- Updated icons
- Added number counter and parallax code
- Updated business-profile and contact pages
- Updated FAQ template page and adjusted accordion styles
- Updated Bootstrap to v5.1.3, fixed user profile layout page

## 6.0.5

- Removed plotly.js and d3.js from js/libs
- Removed background opacity for service tiles to fix color contrast false positives
- Updated carousels backgrounds to fix color contrast false positives.

## 6.0.4

- Fixed "Links are not clearly identifiable" issue by replacing background image links underlining technique with original text underline property
- Increased links color and surrounding text contrast ratio to 3.1
- Fixed "fixed Link without a text alternative issue"
- Updated jQuery to v3.6.0
- Updated search reset button selection variable
- Fixed sliders overflow scrollbars
- Fixed full width nav active search bar on focus placement

## 6.0.3

- Removed role tablist attribute from tag, and collapse extension
- Fixed "Visible label and accessible name do not match" a11y error
- Fixed "Text is clipped when zoomed in" a11y error
- Fixed "State or property not supported" in main navigation
- Fixed "Headings are not structured" issue
- Fixed missing landmark issue
- Fixed "Scrollable element is not keyboard accessible"
- Fixed color contrast issues on some pages
- Fixed "Hidden element has focusable content" issue
- Fixed Container element is empty issue
- Removed charts examples (for lack of a11y)
- Fixed "Form field is not labeled" issue
- Fixed "Line height is fixed" issue
- Addressed "Font size is fixed issue"
- Removed content fade-in script from home page and featured search page
- Fixed "line-hight below minimum value" and fixed font size issues
- Fixed "Decorative element is exposed to assistive technologies" issue
- Fixed some icon font class names that were accidentally renamed during icon font update process. Removed "1" at the end of the following icon font classes: ca-gov-icon-collapse1, ca-gov-icon-construction1 and ca-gov-icon-expand1

## 6.0.1

- Fixed side navigation border bottom style
- Revised parallax js plugin and parallax-bg class implementation
- Added parallax sample page
- Fixed two column layouts on some pages
- Updated accordion keyboard accessibility

## 6.0.0

- Added new pre-made content-based layout pages that showcase specific business areas such as
  - About
  - Agency Profile
  - Contact
  - Events
  - FAQs
  - Homepage
  - News
  - Services
  - Search Results
  - User profile
- Added new pages that provide more State Template usability directions:

  - CSS Shortcuts
  - Layouts
  - Navigation Samples
  - Update State Template

- Added new modules:

  - Blurb
  - Modal
  - Side navigation
  - Sticky footer
  - Timeline

- Updated existing modules and components

  - Accordions
  - Icon blocks
  - Info blocks
  - Lists
  - Tabs

- Added new color schemes
  - Delta
  - Santa Cruz
  - Shasta
- Cleaned up scss files (moved color properties and their variable to the color schemes section, updated globals.scss files)
- Added new full width active search navigation option
- Made new dyslexic font option available in the settings
- Redesigned template's navigation structure focusing on how to get started with the State Template, also to showcase layout pages, color schemes and content modules
- Added new icons to CAGov font library
