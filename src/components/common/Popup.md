# Popup Component Documentation

## Overview
The `Popup` component provides a styled popup container with customizable size and color variants based on the FreshmenFest 2025 design system.

> [!NOTE]  
> Mobile breakpoint is changable krub. This is only for global setup so i set it from figma asset. if it's implemented we can change in component. Also see the demo at /popup-demo

[Ref Figma](https://www.figma.com/design/rNZD4Rho95tnZY1iCWvxRj/ISD68-x-FD-RPKM?node-id=548-24487&t=OLvfWJPQJ3p3Usdg-1)

## Import
```astro
---
import Popup from '@/components/common/Popup.astro';
---
```

## Usage

### Basic Usage
```astro
<Popup>
  <h2>Your content here</h2>
  <p>This content will be displayed inside the popup.</p>
</Popup>
```

### With Size and Color
```astro
<Popup size="small" color="vivid-pink">
  <div class="text-center">
    <h3>Small Pink Popup</h3>
    <p>Content goes here...</p>
  </div>
</Popup>
```

## Props

### `size` (optional)
- **Type:** `'large' | 'small'`
- **Default:** `'large'`
- **Description:** Controls the popup size and aspect ratio
  - `large`: Aspect ratio 365/783, min-height 400px, content area 80% × 70%
  - `small`: Aspect ratio 342/366, min-height 200px, content area 75% × 65%

### `color` (optional)
- **Type:** `'black' | 'vivid-pink' | 'light-green' | 'light-blue' | 'light-pink' | 'light-beige'`
- **Default:** `'black'`
- **Description:** Controls the border SVG variant used for styling

### `class` (optional)
- **Type:** `string`
- **Default:** `''`
- **Description:** Additional CSS classes to apply to the popup container

## Color Variants

The component uses SVG border images located in `/public/images/popup-borders/` with the naming pattern:
`popup-border-{size}-{color}.svg`

Colors:
- `black` - Default dark variant
- `vivid-pink` - Bright pink accent
- `light-green` - Soft green variant  
- `light-blue` - Light blue variant
- `light-pink` - Soft pink variant
- `light-beige` - Light beige variant

## Technical Details

### SVG Border System
The component dynamically loads SVG borders based on size and color combinations:
- Path: `/images/popup-borders/popup-border-${size}-${color}.svg`

### Content Positioning
- Content is absolutely positioned and centered within the svg
- Uses CSS transforms for precise centering
- Content area size varies by popup size (see Props section)
- Includes padding and text centering by default

## Examples

### Large Popup with Different Colors
```astro
<!-- Black popup (default) -->
<Popup>
  <h2>Welcome to FreshmenFest 2025</h2>
  <p>This is a large black popup.</p>
</Popup>

<!-- Vivid Pink popup -->
<Popup color="vivid-pink">
  <h2>Important Announcement</h2>
  <p>This is a large vivid pink popup.</p>
</Popup>

<!-- Light Green popup -->
<Popup color="light-green">
  <h2>Success Message</h2>
  <p>This is a large light green popup.</p>
</Popup>
```

### Small Popup Variations
```astro
<!-- Small Black popup -->
<Popup size="small">
  <h3>Quick Info</h3>
  <p>Compact message.</p>
</Popup>

<!-- Small Light Blue popup -->
<Popup size="small" color="light-blue">
  <h3>Information</h3>
  <p>Small blue popup.</p>
</Popup>

<!-- Small Light Pink popup -->
<Popup size="small" color="light-pink">
  <h3>Notification</h3>
  <p>Small pink popup.</p>
</Popup>
```

## Responsive Design

The popup component includes built-in responsive behavior:

### Mobile Breakpoints
- This breakpoint is changeable krub
- **≤640px (Mobile):** Content area adjusts to 90% × 80%
- **≤480px (Small Mobile):** 
  - Content area adjusts to 95% × 85%
  - Minimum height increases to 250px for better usability