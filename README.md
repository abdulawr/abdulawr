# Terminal Portfolio - Abdul Basit

A modern, interactive terminal-style portfolio website built with vanilla HTML, CSS, and JavaScript. Features a sleek cyberpunk aesthetic with animated backgrounds, floating particles, and a fully functional command-line interface.

## Features

- **Interactive Terminal Interface**: Navigate through portfolio content using terminal commands
- **Animated Background**: Dynamic grid overlay and floating particles for visual appeal
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Command History**: Navigate previous commands using arrow keys
- **Smooth Animations**: Professional transitions and hover effects
- **Modern Design**: Glassmorphism effects with cyberpunk color scheme

## Available Commands

| Command | Description |
|---------|-------------|
| `help` | Display all available commands |
| `about` | Show personal information and summary |
| `experience` | View professional work history |
| `education` | Display academic background |
| `skills` | List technical skills and expertise |
| `projects` | Browse portfolio projects |
| `certifications` | Show professional certifications |
| `awards` | Display awards and recognition |
| `contact` | Get contact information |
| `social` | View social media links |
| `clear` | Clear terminal output |

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Inter & JetBrains Mono (Google Fonts)
- **Design**: Custom CSS with CSS Grid and Flexbox
- **Animations**: CSS keyframes and transitions
- **Responsive**: CSS media queries

## File Structure

```
terminal-portfolio/
├── index.html              # Main portfolio file
├── portfolio-data.json     # Portfolio data (optional)
└── README.md              # This file
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/terminal-portfolio.git](https://github.com/abdulawr/abdulawr.git)
   cd terminal-portfolio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your web browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Start exploring**
   - Type `help` to see all available commands
   - Use arrow keys to navigate command history
   - Click anywhere to focus the terminal input

## Customization

### Personal Information
Edit the `portfolioData` object in the JavaScript section to update:
- Personal details (name, title, location)
- Work experience and achievements
- Education background
- Skills and technologies
- Project portfolio
- Certifications and awards
- Contact information

### Styling
Modify CSS custom properties in `:root` to change:
```css
:root {
    --primary: #00DC82;        /* Primary accent color */
    --secondary: #00A8E8;      /* Secondary accent color */
    --bg-primary: #0A0E27;     /* Main background */
    --bg-secondary: #151A3A;   /* Secondary background */
    /* ... other variables */
}
```

### Adding New Commands
1. Add the command to the `commands` object in the Terminal constructor
2. Create a corresponding method (e.g., `showNewSection()`)
3. Update the `getCommandDescription()` method

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Optimized animations with `transform` and `opacity`
- Efficient particle system with CSS animations
- Smooth scrolling and responsive interactions
- Minimal JavaScript for fast loading

## Live Demo

Visit the live portfolio: https://abdulawr.github.io/abdulawr/

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

**Abdul Basit**
- Email: ab.basit.dak@gmail.com
- LinkedIn: [dev-abasit](https://www.linkedin.com/in/dev-abasit)
- GitHub: [abdulawr](https://github.com/abdulawr)
- Location: Brno, Czech Republic

---

Built with ❤️ by Abdul Basit | Terminal Portfolio v3.0.1
