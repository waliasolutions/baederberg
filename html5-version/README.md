
# Bäderberg - HTML5 Template for WordPress

This is a modular HTML5 template version of the Bäderberg website, created to be easily integrated into a WordPress theme.

## Structure

```
html5-version/
├── index.html              # Main homepage template with includes
├── badumbau.html           # Bathroom renovation page (to be created)
├── kuechenumbau.html       # Kitchen renovation page (to be created)
├── innenausbau.html        # Interior design page (to be created)
├── region-zurich.html      # Region page for Zurich (to be created)
├── includes/               # Reusable HTML components
│   ├── head.html           # <head> content
│   ├── header.html         # Site header
│   ├── footer.html         # Site footer
│   ├── regions-list.html   # List of regions for navigation
│   └── ...                 # Other component includes
├── assets/
│   ├── css/
│   │   ├── base.css        # Base styles and typography
│   │   ├── components.css  # Component-specific styles
│   │   ├── layout.css      # Layout and grid styles
│   │   └── responsive.css  # Media queries and responsive styles
│   ├── js/
│   │   ├── main.js         # Main JavaScript file
│   │   ├── mobile-menu.js  # Mobile menu module
│   │   ├── gallery-filter.js # Gallery filtering module
│   │   └── ...             # Other JavaScript modules
│   └── images/             # Directory for all images
└── README.md               # This file
```

## Usage

This template uses Server Side Includes (SSI) for modularity. To preview it locally:

1. Use a local server that supports SSI (Apache with SSI enabled)
2. Or use a static site generator that supports includes
3. For WordPress integration, you'll need to convert the includes to PHP includes

## WordPress Integration

To convert this HTML5 template into a WordPress theme:

1. Create a new WordPress theme folder in `wp-content/themes/`
2. Convert the HTML includes to PHP includes or use get_template_part()
3. Create the essential WordPress files (style.css, functions.php, etc.)
4. Convert HTML structure into WordPress template tags and functions

### Example PHP conversion:

```php
<!-- In header.php -->
<header class="site-header" id="header">
  <!-- Header content -->
</header>

<!-- In index.php -->
<?php get_header(); ?>
  <!-- Main content -->
<?php get_footer(); ?>
```

## JavaScript Modules

The JavaScript has been split into modular files:

- `main.js` - Entry point that imports and initializes all modules
- `mobile-menu.js` - Mobile menu functionality
- `gallery-filter.js` - Project filtering functionality
- `contact-form.js` - Form validation and submission
- `scroll-effects.js` - Smooth scrolling and header effects

## CSS Structure

The CSS has been organized into logical files:

- `base.css` - Core styles, variables, typography
- `components.css` - Reusable UI components
- `layout.css` - Page layout and grid systems
- `responsive.css` - Media queries and responsive adjustments

## Next Steps

1. Complete all HTML template pages using the component includes
2. Gather all necessary assets (images, icons)
3. Convert the HTML structure into a WordPress theme

## License

This template is intended for use with the Bäderberg website only.
