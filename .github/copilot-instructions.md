# GitHub Copilot Instructions

## Project Context
This repository contains Connor McNeely's professional portfolio website deployed on Vercel. The site is a static HTML/CSS/JS application showcasing engineering expertise, professional experience, and projects.

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Deployment**: Vercel (static site hosting)
- **Repository**: Git with protected main branch
- **Workflow**: Feature branches → Pull Requests → Main branch

## Development Guidelines

### Code Style
- Use semantic HTML5 elements
- Follow mobile-first responsive design principles
- Maintain consistent indentation (4 spaces)
- Use CSS custom properties (CSS variables) for theming
- Keep JavaScript modular and well-commented
- Avoid external dependencies when possible (prefer vanilla JS)

### Branch Strategy
- Work on feature branches prefixed with descriptive names
- Branch naming: `copilot/feature-description` or `claude/feature-description-sessionID`
- Never push directly to `main` branch
- Always create Pull Requests for review

### Deployment
- Main branch auto-deploys to Vercel
- Vercel project: leadership_legacy
- Production URL: https://leadershiplegacy.vercel.app/
- Test changes on feature branch before merging

### File Structure
```
/
├── index.html          # Main portfolio page
├── vercel.json         # Vercel configuration
├── README.md           # Project documentation
└── .github/
    └── copilot-instructions.md  # This file
```

## Common Tasks

### Adding New Portfolio Sections
1. Follow existing HTML structure and styling patterns
2. Maintain consistent color scheme using CSS variables
3. Ensure mobile responsiveness (test at 768px breakpoint)
4. Add smooth scroll animations using Intersection Observer
5. Update navigation if adding new section

### Performance Optimization
- Inline critical CSS for above-the-fold content
- Use CSS animations over JavaScript when possible
- Optimize images and use modern formats (WebP)
- Leverage browser caching with proper headers in vercel.json
- Keep total page size under 500KB

### Accessibility Requirements
- Maintain semantic HTML structure
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Include alt text for all images
- Maintain color contrast ratios (WCAG AA minimum)
- Test with keyboard navigation
- Support screen readers

### Security
- No inline JavaScript event handlers (use addEventListener)
- Sanitize any user input if forms are added
- Use Content Security Policy headers
- Follow OWASP best practices

## Quality Standards

### Before Creating PR
- [ ] Test on mobile (< 768px) and desktop
- [ ] Verify all animations work smoothly
- [ ] Check browser console for errors
- [ ] Validate HTML and CSS
- [ ] Test all navigation links
- [ ] Verify responsive images load correctly
- [ ] Check cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Ensure fast load time (< 2 seconds)

### Testing Checklist
- [ ] Smooth scrolling navigation works
- [ ] Intersection Observer animations trigger correctly
- [ ] Stats counter animation works
- [ ] Hero typing effect displays properly
- [ ] Contact links are functional
- [ ] Floating action button (FAB) shows/hides correctly
- [ ] Progress bar tracks scroll position

## Portfolio Content Guidelines

### When Adding Experience
- Include company name and location
- Specify date range (YYYY - Present or YYYY - YYYY)
- List 3-5 key achievements with metrics
- Use action verbs (Led, Designed, Implemented, Reduced, Improved)
- Highlight quantifiable results (%, numbers, impact)

### When Adding Projects
- Include project title and organization
- Describe the technical challenge
- List technologies and methodologies used
- Showcase measurable outcomes
- Use project icons/emojis consistently

### When Adding Skills
- Group by category (Mechanical, Automation, Programming, etc.)
- Use skill tags for individual technologies
- Keep skill names concise
- Maintain visual consistency with existing tags

## Copilot-Specific Instructions

### Issue Assignment
When assigned an issue:
1. Read requirements carefully
2. Check existing code patterns
3. Maintain consistency with current design
4. Test thoroughly before requesting review
5. Provide clear commit messages

### Code Review Feedback
When receiving feedback on PRs:
- Address all requested changes
- Ask clarifying questions if requirements unclear
- Test changes after each iteration
- Update tests/documentation as needed

### Communication
- Use clear, descriptive commit messages
- Comment on complex code sections
- Reference issue numbers in commits
- Provide context in PR descriptions

## Network Access
**Approved Resources:**
- https://fonts.googleapis.com (Google Fonts if needed)
- https://cdnjs.cloudflare.com (CDN resources if absolutely necessary)
- https://vercel.com (deployment platform)

**Blocked Resources:**
- External analytics services (avoid third-party tracking)
- External ad networks
- Unnecessary third-party scripts

Prefer self-hosted or inline resources when possible.

## Contact Information
For questions about engineering content or portfolio updates:
- Email: connordmcneely@gmail.com
- Phone: (337) 581-7113

---

**Note**: This portfolio represents Connor McNeely's professional engineering expertise in mechanical design, automation, AI/ML, and process optimization. Maintain the professional, technical tone throughout.
