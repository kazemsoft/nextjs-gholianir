# Resume Generator Feature

## Overview

The portfolio includes an automatic resume generator that creates a professional PDF resume from your experiences, skills, and education data.

## How It Works

1. **Click "Download Resume" button** in the Hero section
2. System generates a clean, professional resume template
3. Converts the template to PDF
4. Automatically downloads as `MK-Qoliyan-Resume.pdf`

## Technical Implementation

### Components

**ResumeTemplate.tsx**
- React component that renders a clean, professional resume layout
- Pulls data from:
  - `generated-experiences.ts` - Work experience
  - `generated-skills.ts` - Technical skills
  - `constants.ts` - Education data
- Styled for A4 page size (850px width)
- Clean, minimal design suitable for ATS systems

**generateResumePDF.ts**
- Utility function that handles PDF generation
- Uses `html2canvas` to convert React component to image
- Uses `jsPDF` to create PDF from the image
- Handles multi-page PDFs automatically
- Cleans up after generation

### Libraries Used

- **jspdf** - PDF generation library
- **html2canvas** - Converts HTML to canvas image

### Flow

1. User clicks "Download Resume" button
2. Hero component calls `generateResumePDF()`
3. Function creates temporary off-screen container
4. Renders `ResumeTemplate` component in container
5. Converts rendered HTML to canvas using `html2canvas`
6. Converts canvas to PDF using `jsPDF`
7. Downloads PDF with filename `MK-Qoliyan-Resume.pdf`
8. Cleans up temporary DOM elements

## Resume Template Layout

### Sections

1. **Header**
   - Name: M.K. Qoliyan
   - Title: Full-Stack Developer
   - Contact info

2. **Profile**
   - Professional summary
   - Highlights key strengths

3. **Work Experience**
   - All experiences from `experiences.json`
   - Sorted by order (newest first)
   - Includes: Role, Company, Date, Location
   - Shows description bullet points
   - Lists top 8 skills per role

4. **Education**
   - Academic degrees
   - Universities

5. **Technical Skills**
   - All skills from `skills.json`
   - Displayed in 3-column grid
   - Shows skill name and proficiency level

6. **Footer**
   - Generation date
   - "Generated with Claude Code" attribution

## Customization

### Modify Resume Template

Edit `/components/ResumeTemplate.tsx`:

```tsx
// Change header info
<h1>Your Name</h1>
<p>Your Title</p>

// Modify profile text
<p>Your custom profile summary...</p>

// Adjust layout
className="grid grid-cols-2 gap-4"  // Change columns
```

### Change PDF Settings

Edit `/utils/generateResumePDF.ts`:

```typescript
// PDF orientation
orientation: 'portrait' // or 'landscape'

// PDF format
format: 'a4' // or 'letter', 'legal'

// Image quality
scale: 2 // Higher = better quality, larger file

// Filename
pdf.save('Your-Custom-Name.pdf')
```

## Data Sources

The resume automatically pulls from your content files:

- **Experiences**: `/content/experiences.json` → `generated-experiences.ts`
- **Skills**: `/content/skills.json` → `generated-skills.ts`
- **Education**: `constants.ts` (EDUCATION_DATA)

**Important**: Resume updates automatically when you update your JSON files and rebuild.

## Button States

The "Download Resume" button shows different states:

- **Normal**: "Download Resume"
- **Generating**: "Generating..." (disabled)
- **Hover**: Darker background

## Troubleshooting

### PDF Not Downloading

**Check:**
1. Browser pop-up blocker settings
2. Browser console for errors
3. Ensure all data files are present

### Blank or Broken PDF

**Check:**
1. Run `npm run generate` to update data
2. Verify experiences.json has valid data
3. Check browser console for rendering errors

### Styling Issues

**Fix:**
1. Edit `ResumeTemplate.tsx` styles
2. Use Tailwind classes for consistency
3. Test with `npm run dev`

### Multi-page Issues

The generator automatically handles multi-page PDFs when content exceeds one A4 page. If pagination looks wrong:

1. Adjust content length
2. Modify font sizes in template
3. Adjust spacing/padding

## File Locations

```
/components/
  ResumeTemplate.tsx       # Resume layout component

/utils/
  generateResumePDF.ts     # PDF generation logic

/components/
  Hero.tsx                 # Contains Download button

/content/
  experiences.json         # Work history data
  skills.json             # Skills data

/constants.ts
  EDUCATION_DATA          # Education data
```

## Development

### Test Locally

```bash
npm run dev
```

Click "Download Resume" button to test PDF generation.

### Modify Template

1. Edit `ResumeTemplate.tsx`
2. Save changes
3. Reload page and test download

### Debug

Enable console logging in `generateResumePDF.ts`:

```typescript
const canvas = await html2canvas(resumeElement, {
  scale: 2,
  useCORS: true,
  logging: true,  // Enable logging
  backgroundColor: '#ffffff',
});
```

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

**Note**: PDF quality may vary slightly between browsers.

## Performance

- Generation time: ~2-3 seconds
- PDF file size: ~500KB - 1MB (varies by content)
- No server required (client-side generation)

## Future Enhancements

Potential improvements:

1. **Multiple Templates**: Allow choosing different resume styles
2. **Custom Sections**: Add/remove sections via UI
3. **Color Themes**: Different color schemes
4. **Export Formats**: DOCX, TXT in addition to PDF
5. **Preview Mode**: Show resume before downloading
6. **Custom Fields**: Add phone, LinkedIn, portfolio links
7. **Localization**: Multi-language support

## Security

- All generation happens client-side
- No data sent to external servers
- No sensitive information stored
- PDF contains only public portfolio data

---

**Ready to generate your resume?** Just click the "Download Resume" button on your portfolio!
