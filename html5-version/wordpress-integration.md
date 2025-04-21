
# WordPress Integration Guide for Bäderberg Website

This document provides step-by-step instructions for converting the HTML5 template into a WordPress theme.

## Theme Setup

1. **Create Theme Structure**

   Create a new folder in `wp-content/themes/` called `baederberg` with these files:

   ```
   baederberg/
   ├── style.css
   ├── functions.php
   ├── index.php
   ├── header.php
   ├── footer.php
   ├── page.php
   ├── single.php
   ├── front-page.php
   ├── 404.php
   ├── screenshot.png
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── images/
   ├── template-parts/
   │   ├── content-none.php
   │   ├── content-page.php
   │   ├── content-project.php
   │   ├── content-service.php
   │   ├── content-region.php
   │   └── content-testimonial.php
   └── inc/
       ├── custom-post-types.php
       ├── customizer.php
       └── widgets.php
   ```

2. **Theme Information**

   Add theme information to `style.css`:

   ```css
   /*
   Theme Name: Bäderberg
   Theme URI: https://baederberg.ch
   Author: Your Name
   Author URI: https://yourwebsite.com
   Description: Custom WordPress theme for Bäderberg Renovationen
   Version: 1.0
   License: GNU General Public License v2 or later
   License URI: http://www.gnu.org/licenses/gpl-2.0.html
   Text Domain: baederberg
   */
   ```

## Custom Post Types & Taxonomies

In `inc/custom-post-types.php`:

1. **Services Custom Post Type**

   ```php
   // Register Services CPT
   function baederberg_register_services_cpt() {
       $labels = array(
           'name'               => __('Services', 'baederberg'),
           'singular_name'      => __('Service', 'baederberg'),
           'menu_name'          => __('Services', 'baederberg'),
           'add_new'            => __('Add New', 'baederberg'),
           'add_new_item'       => __('Add New Service', 'baederberg'),
           'edit_item'          => __('Edit Service', 'baederberg'),
           'new_item'           => __('New Service', 'baederberg'),
           'view_item'          => __('View Service', 'baederberg'),
           'search_items'       => __('Search Services', 'baederberg'),
           'not_found'          => __('No services found', 'baederberg'),
           'not_found_in_trash' => __('No services found in Trash', 'baederberg'),
       );

       $args = array(
           'labels'              => $labels,
           'public'              => true,
           'publicly_queryable'  => true,
           'show_ui'             => true,
           'show_in_menu'        => true,
           'query_var'           => true,
           'rewrite'             => array('slug' => 'service'),
           'capability_type'     => 'post',
           'has_archive'         => false,
           'hierarchical'        => false,
           'menu_position'       => 5,
           'menu_icon'           => 'dashicons-admin-tools',
           'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
       );

       register_post_type('service', $args);
   }
   add_action('init', 'baederberg_register_services_cpt');
   ```

2. **Projects Custom Post Type**

   ```php
   // Register Projects CPT
   function baederberg_register_projects_cpt() {
       $labels = array(
           'name'               => __('Projects', 'baederberg'),
           'singular_name'      => __('Project', 'baederberg'),
           'menu_name'          => __('Projects', 'baederberg'),
           'add_new'            => __('Add New', 'baederberg'),
           'add_new_item'       => __('Add New Project', 'baederberg'),
           'edit_item'          => __('Edit Project', 'baederberg'),
           'new_item'           => __('New Project', 'baederberg'),
           'view_item'          => __('View Project', 'baederberg'),
           'search_items'       => __('Search Projects', 'baederberg'),
           'not_found'          => __('No projects found', 'baederberg'),
           'not_found_in_trash' => __('No projects found in Trash', 'baederberg'),
       );

       $args = array(
           'labels'              => $labels,
           'public'              => true,
           'publicly_queryable'  => true,
           'show_ui'             => true,
           'show_in_menu'        => true,
           'query_var'           => true,
           'rewrite'             => array('slug' => 'project'),
           'capability_type'     => 'post',
           'has_archive'         => true,
           'hierarchical'        => false,
           'menu_position'       => 6,
           'menu_icon'           => 'dashicons-portfolio',
           'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
       );

       register_post_type('project', $args);
   }
   add_action('init', 'baederberg_register_projects_cpt');
   
   // Register Project Categories Taxonomy
   function baederberg_register_project_category_taxonomy() {
       $labels = array(
           'name'                       => __('Project Categories', 'baederberg'),
           'singular_name'              => __('Project Category', 'baederberg'),
           'search_items'               => __('Search Project Categories', 'baederberg'),
           'popular_items'              => __('Popular Project Categories', 'baederberg'),
           'all_items'                  => __('All Project Categories', 'baederberg'),
           'edit_item'                  => __('Edit Project Category', 'baederberg'),
           'update_item'                => __('Update Project Category', 'baederberg'),
           'add_new_item'               => __('Add New Project Category', 'baederberg'),
           'new_item_name'              => __('New Project Category Name', 'baederberg'),
           'separate_items_with_commas' => __('Separate categories with commas', 'baederberg'),
           'add_or_remove_items'        => __('Add or remove categories', 'baederberg'),
           'choose_from_most_used'      => __('Choose from the most used categories', 'baederberg'),
           'menu_name'                  => __('Categories', 'baederberg'),
       );

       $args = array(
           'labels'            => $labels,
           'public'            => true,
           'show_in_nav_menus' => true,
           'show_admin_column' => true,
           'hierarchical'      => true,
           'show_tagcloud'     => false,
           'show_ui'           => true,
           'query_var'         => true,
           'rewrite'           => array('slug' => 'project-category'),
       );

       register_taxonomy('project_category', 'project', $args);
   }
   add_action('init', 'baederberg_register_project_category_taxonomy');
   ```

3. **Region Custom Post Type**

   ```php
   // Register Regions CPT
   function baederberg_register_regions_cpt() {
       $labels = array(
           'name'               => __('Regions', 'baederberg'),
           'singular_name'      => __('Region', 'baederberg'),
           'menu_name'          => __('Regions', 'baederberg'),
           'add_new'            => __('Add New', 'baederberg'),
           'add_new_item'       => __('Add New Region', 'baederberg'),
           'edit_item'          => __('Edit Region', 'baederberg'),
           'new_item'           => __('New Region', 'baederberg'),
           'view_item'          => __('View Region', 'baederberg'),
           'search_items'       => __('Search Regions', 'baederberg'),
           'not_found'          => __('No regions found', 'baederberg'),
           'not_found_in_trash' => __('No regions found in Trash', 'baederberg'),
       );

       $args = array(
           'labels'              => $labels,
           'public'              => true,
           'publicly_queryable'  => true,
           'show_ui'             => true,
           'show_in_menu'        => true,
           'query_var'           => true,
           'rewrite'             => array('slug' => 'region'),
           'capability_type'     => 'post',
           'has_archive'         => true,
           'hierarchical'        => false,
           'menu_position'       => 7,
           'menu_icon'           => 'dashicons-location-alt',
           'supports'            => array('title', 'editor', 'thumbnail', 'excerpt'),
       );

       register_post_type('region', $args);
   }
   add_action('init', 'baederberg_register_regions_cpt');
   ```

4. **Testimonials Custom Post Type**

   ```php
   // Register Testimonials CPT
   function baederberg_register_testimonials_cpt() {
       $labels = array(
           'name'               => __('Testimonials', 'baederberg'),
           'singular_name'      => __('Testimonial', 'baederberg'),
           'menu_name'          => __('Testimonials', 'baederberg'),
           'add_new'            => __('Add New', 'baederberg'),
           'add_new_item'       => __('Add New Testimonial', 'baederberg'),
           'edit_item'          => __('Edit Testimonial', 'baederberg'),
           'new_item'           => __('New Testimonial', 'baederberg'),
           'view_item'          => __('View Testimonial', 'baederberg'),
           'search_items'       => __('Search Testimonials', 'baederberg'),
           'not_found'          => __('No testimonials found', 'baederberg'),
           'not_found_in_trash' => __('No testimonials found in Trash', 'baederberg'),
       );

       $args = array(
           'labels'              => $labels,
           'public'              => true,
           'publicly_queryable'  => true,
           'show_ui'             => true,
           'show_in_menu'        => true,
           'query_var'           => true,
           'rewrite'             => array('slug' => 'testimonial'),
           'capability_type'     => 'post',
           'has_archive'         => false,
           'hierarchical'        => false,
           'menu_position'       => 8,
           'menu_icon'           => 'dashicons-format-quote',
           'supports'            => array('title', 'editor', 'thumbnail'),
       );

       register_post_type('testimonial', $args);
   }
   add_action('init', 'baederberg_register_testimonials_cpt');
   ```

## Theme Functions

In `functions.php`:

```php
<?php
// Setup theme features
function baederberg_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'baederberg'),
        'footer'  => __('Footer Menu', 'baederberg'),
    ));
}
add_action('after_setup_theme', 'baederberg_setup');

// Enqueue scripts and styles
function baederberg_scripts() {
    // Styles
    wp_enqueue_style('baederberg-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style('baederberg-main', get_template_directory_uri() . '/assets/css/styles.css', array(), '1.0.0');
    
    // Scripts
    wp_enqueue_script('baederberg-main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('baederberg-main', 'baederberg_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('baederberg_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'baederberg_scripts');

// Register widget areas
function baederberg_widgets_init() {
    register_sidebar(array(
        'name'          => __('Footer Widget Area 1', 'baederberg'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in the first column of the footer.', 'baederberg'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget Area 2', 'baederberg'),
        'id'            => 'footer-2',
        'description'   => __('Add widgets here to appear in the second column of the footer.', 'baederberg'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget Area 3', 'baederberg'),
        'id'            => 'footer-3',
        'description'   => __('Add widgets here to appear in the third column of the footer.', 'baederberg'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'baederberg_widgets_init');

// Include custom post types
require get_template_directory() . '/inc/custom-post-types.php';

// Include customizer options
require get_template_directory() . '/inc/customizer.php';

// AJAX handler for contact form
function baederberg_process_contact_form() {
    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'baederberg_nonce')) {
        wp_send_json_error('Nonce verification failed');
    }
    
    // Process form data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validate data
    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error('Please fill in all required fields');
    }
    
    // Send email
    $to = get_option('admin_email');
    $subject = 'New Contact Form Submission from ' . $name;
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n\n";
    $body .= "Message:\n$message";
    $headers = array('From: ' . get_bloginfo('name') . ' <' . $email . '>');
    
    $sent = wp_mail($to, $subject, $body, $headers);
    
    if ($sent) {
        wp_send_json_success('Your message has been sent successfully!');
    } else {
        wp_send_json_error('There was a problem sending your message. Please try again later.');
    }
}
add_action('wp_ajax_baederberg_process_contact_form', 'baederberg_process_contact_form');
add_action('wp_ajax_nopriv_baederberg_process_contact_form', 'baederberg_process_contact_form');

// Custom image sizes
add_image_size('project-thumbnail', 600, 450, true);
add_image_size('service-thumbnail', 400, 300, true);
add_image_size('testimonial-avatar', 100, 100, true);
add_image_size('hero-background', 1920, 1080, true);
```

## Template Files

1. **Header Template (header.php):**

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="site-container">
    <header class="site-header" id="header">
        <div class="container">
            <div class="header-inner">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
                    <div class="logo-container">
                        <?php 
                        if (has_custom_logo()) {
                            the_custom_logo();
                        } else {
                            echo '<img src="' . get_template_directory_uri() . '/assets/images/logo.png" alt="' . get_bloginfo('name') . '" class="logo-img">';
                        }
                        ?>
                    </div>
                </a>

                <nav class="main-nav">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'menu',
                        'container'      => false,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </nav>

                <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn-primary">Kostenlose Beratung</a>
                
                <button class="mobile-menu-toggle" aria-label="Menü öffnen">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </header>
```

2. **Footer Template (footer.php):**

```php
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <div class="footer-logo">
                        <a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
                    </div>
                    <p><?php echo get_theme_mod('footer_description', 'Ihr Spezialist für hochwertige Bad- und Küchenumbauten sowie Innenausbau in der Schweiz.'); ?></p>
                    
                    <div class="footer-features">
                        <div class="footer-feature">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/shield-icon.svg" alt="Garantie">
                            <p><?php echo get_theme_mod('footer_feature_1', '5 Jahre Garantie auf alle Arbeiten'); ?></p>
                        </div>
                        <div class="footer-feature">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/map-pin-icon.svg" alt="Vermessung">
                            <p><?php echo get_theme_mod('footer_feature_2', 'Kostenlose Vermessung vor der Installation'); ?></p>
                        </div>
                    </div>
                    
                    <div class="social-links">
                        <?php if (get_theme_mod('social_facebook')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('social_facebook')); ?>" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/facebook-icon.svg" alt="Facebook">
                        </a>
                        <?php endif; ?>
                        
                        <?php if (get_theme_mod('social_instagram')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('social_instagram')); ?>" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/instagram-icon.svg" alt="Instagram">
                        </a>
                        <?php endif; ?>
                        
                        <?php if (get_theme_mod('social_linkedin')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('social_linkedin')); ?>" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/linkedin-icon.svg" alt="LinkedIn">
                        </a>
                        <?php endif; ?>
                    </div>
                </div>
                
                <?php if (is_active_sidebar('footer-1')) : ?>
                <div class="footer-links">
                    <?php dynamic_sidebar('footer-1'); ?>
                </div>
                <?php endif; ?>
                
                <?php if (is_active_sidebar('footer-2')) : ?>
                <div class="footer-links">
                    <?php dynamic_sidebar('footer-2'); ?>
                </div>
                <?php endif; ?>
                
                <?php if (is_active_sidebar('footer-3')) : ?>
                <div class="footer-contact">
                    <?php dynamic_sidebar('footer-3'); ?>
                </div>
                <?php endif; ?>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php echo get_theme_mod('footer_copyright', 'Alle Rechte vorbehalten.'); ?></p>
                <div class="footer-legal">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </div>
            </div>
        </div>
    </footer>
</div><!-- .site-container -->
<?php wp_footer(); ?>
</body>
</html>
```

3. **Homepage Template (front-page.php)**:

Create template sections for each part of the homepage and include them in front-page.php. This approach makes the code modular and easier to maintain.

## Advanced Configuration

For complete WordPress integration:

1. **Theme Customizer**

   Create customization options in `inc/customizer.php` for:
   - Logo upload
   - Color schemes
   - Contact information
   - Social media links
   - Footer text

2. **Advanced Custom Fields Integration**

   Consider using ACF plugin for:
   - Project details (gallery, specifications)
   - Service features
   - Team member profiles
   - Region-specific content

3. **Contact Form 7**

   Set up a contact form with:
   - Name, email, phone fields
   - Message field
   - Service selection
   - Region selection
   - File upload for project plans

## SEO Optimization

1. Install Yoast SEO or Rank Math plugin
2. Configure XML sitemaps
3. Set up proper meta descriptions for all CPTs
4. Add structured data for services and projects
5. Optimize image alt tags and filenames

## Performance Optimization

1. Use a caching plugin (WP Rocket, WP Super Cache, etc.)
2. Optimize images
3. Minify CSS and JavaScript
4. Enable lazy loading for images
5. Consider using a CDN

## Security Considerations

1. Use a security plugin (Wordfence, Sucuri, etc.)
2. Implement CAPTCHA on forms
3. Keep WordPress core, plugins, and themes updated
4. Use strong passwords and limit login attempts
5. Consider using SSL certificate

## Final Checklist

- Responsive testing (mobile, tablet, desktop)
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Check page load speed
- Test all forms and interactions
- Validate HTML and CSS
- Check for broken links
- Test all custom post types and taxonomies
- Verify SEO meta information
- Set up Google Analytics
