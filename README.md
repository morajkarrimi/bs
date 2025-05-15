# Modern Barbershop Website

A responsive, single-page barbershop website with video background and three main sections.

## Features

- Responsive design that works on all devices
- Video background with fallback
- Smooth scrolling navigation
- Modern, clean design with animations
- Three distinct sections (Hero, Services, About)
- Mobile-friendly navigation

## Files Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styling
- `script.js` - JavaScript functionality
- `assets/videos/` - Directory for the video background
- `assets/images/` - Directory for images (can add your own)

## How to Use

1. **Clone or download the repository**
2. **Add your video background**:
   - Place a video file named `barbershop.mp4` in the `assets/videos/` directory
   - See the README.txt in that directory for video specifications
3. **Replace placeholder images**:
   - Add your own images to the `assets/images/` directory
   - Update the image paths in the HTML file
4. **Customize content**:
   - Edit the text, prices, and other content in the HTML file
   - Adjust colors and styles in the CSS file if desired
5. **Test your website**:
   - Open `index.html` in a web browser to see your changes

## Customization Options

### Colors

The website uses CSS variables for easy color customization. In the `styles.css` file, modify these variables:

```css
:root {
    --primary-color: #0c0c0c;     /* Dark background color */
    --secondary-color: #c59d5f;   /* Gold accent color */
    --text-color: #333;           /* Main text color */
    --light-color: #ffffff;       /* Light text/background color */
    --grey-color: #f5f5f5;        /* Light grey backgrounds */
    --dark-grey: #222;            /* Darker grey elements */
}
```

### Sections

You can easily add or remove sections by following the HTML structure pattern:

```html
<section id="section-name" class="section-name">
    <div class="container">
        <!-- Your content here -->
    </div>
</section>
```

Then add corresponding CSS styles in the stylesheet.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

- Font Awesome for icons
- Google Fonts for typography (Montserrat & Playfair Display)
- Demo images from placeholder service

## License

This project is free to use and modify for personal or commercial purposes. 