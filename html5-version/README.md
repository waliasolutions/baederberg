
# Bäderberg - HTML5 Template for WordPress

This is a clean HTML5 template version of the Bäderberg website, created to be easily integrated into a WordPress theme.

## Structure

```
html5-version/
├── index.html              # Main homepage
├── badumbau.html           # Bathroom renovation page (to be created)
├── kuechenumbau.html       # Kitchen renovation page (to be created)
├── innenausbau.html        # Interior design page (to be created)
├── region-zurich.html      # Region page for Zurich (to be created)
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript file
│   └── images/             # Directory for all images (to be populated)
└── README.md               # This file
```

## WordPress Integration

To convert this HTML5 template into a WordPress theme:

1. Create a new WordPress theme folder in `wp-content/themes/`
2. Create the following essential WordPress files:
   - `style.css` (Theme header information)
   - `functions.php` (Theme functionality)
   - `index.php` (Main template)
   - `header.php` (Header section)
   - `footer.php` (Footer section)
   - `page.php` (Default page template)
   - `single.php` (Single post template)
   - `archive.php` (Archive template)
   - `404.php` (404 error page)
   - `screenshot.png` (Theme thumbnail)

3. Move assets (CSS, JS, images) to the theme directory
4. Convert HTML structure into WordPress template tags and functions
5. Implement WordPress nav menus, widgets, and dynamic content areas

## Theme Assets

Before WordPress integration, you'll need to create/obtain:

- SVG icons for the services section
- Logo image (currently referenced as `logo.png`)
- Default images for projects and testimonials
- Background image for the hero section

## Notes for WordPress Development

- Use `wp_enqueue_style()` and `wp_enqueue_script()` to load CSS and JS files
- Implement theme options for customization
- Create custom post types for services, projects, and testimonials
- Set up a contact form using Contact Form 7 or similar plugin
- Implement regions as either custom post types or taxonomies
- Make sure to properly localize all text for multilingual support

## Next Steps

1. Complete all HTML template pages (service pages, regions, etc.)
2. Gather all necessary assets (images, icons)
3. Convert the HTML structure into a WordPress theme
4. Test and refine theme functionality

## License

This template is intended for use with the Bäderberg website only.
