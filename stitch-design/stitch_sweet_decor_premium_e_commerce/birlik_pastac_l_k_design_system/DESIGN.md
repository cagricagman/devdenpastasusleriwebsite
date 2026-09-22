---
name: Birlik Pastacılık Design System
colors:
  surface: '#fff8f6'
  surface-dim: '#e3d8d4'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf1ee'
  surface-container: '#f7ebe8'
  surface-container-high: '#f1e6e2'
  surface-container-highest: '#ece0dd'
  on-surface: '#201a19'
  on-surface-variant: '#554244'
  inverse-surface: '#352f2d'
  inverse-on-surface: '#faeeeb'
  outline: '#887174'
  outline-variant: '#dbc0c3'
  surface-tint: '#9f3c52'
  primary: '#9c3a50'
  on-primary: '#ffffff'
  primary-container: '#bb5268'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2bd'
  secondary: '#7d5710'
  on-secondary: '#ffffff'
  secondary-container: '#fdc979'
  on-secondary-container: '#78530a'
  tertiary: '#346647'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d7f5e'
  on-tertiary-container: '#f6fff5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#400014'
  on-primary-fixed-variant: '#80253c'
  secondary-fixed: '#ffdeae'
  secondary-fixed-dim: '#f1be6f'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#b9efc8'
  tertiary-fixed-dim: '#9dd3ad'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#1d5033'
  background: '#fff8f6'
  on-background: '#201a19'
  surface-variant: '#ece0dd'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

This design system embodies the "Modern Boutique Bakery" aesthetic, merging the warmth of a high-end patisserie with the functional clarity of Scandinavian minimalism. The brand personality is professional yet inviting, catering to both professional pastry chefs and dedicated home enthusiasts who view baking as an art form.

The visual direction follows a **Corporate / Modern** approach with **Minimalist** influences. It prioritizes high-quality product photography, generous whitespace, and a sophisticated typographic hierarchy. The emotional response should be one of reliability and inspiration—suggesting that the tools and ingredients provided by the store are of the highest artisanal grade. 

Key stylistic pillars include:
- **Refined Warmth:** Using a palette of rose, gold, and cream to avoid the clinical feel of standard e-commerce.
- **Precision:** Clean lines and structured layouts that reflect the exactness required in pastry arts.
- **Tactile Elegance:** Using soft shadows and subtle depth to make digital surfaces feel as premium as the physical products.

## Colors

The color palette is anchored by a sophisticated **Rose (#C85C72)**, serving as the primary brand identifier for actions and highlights. This is complemented by **Gold (#D8A85B)**, used sparingly for secondary accents, badges, or premium membership indicators.

- **Neutral Foundation:** We avoid pure blacks. Text Primary (#2F2927) is a warm charcoal that maintains high contrast while feeling softer on the eyes.
- **Surface Strategy:** The Background (#FFFDFC) is a slightly "off-white" cream, which provides a warmer canvas than pure white. Surface (#FFFFFF) is used for cards and interactive elements to create subtle "lift."
- **Functional Colors:** Success and Error states are tempered to match the palette's saturation levels, ensuring they provide feedback without breaking the boutique aesthetic.

## Typography

This system utilizes a dual-font strategy to balance elegance with utility. 

**Playfair Display** is reserved for headlines and editorial moments. Its high-contrast serifs evoke the sophisticated branding of luxury bakeries and culinary journals. For "Display" levels, a slight negative letter spacing is applied to maintain a tight, professional look.

**Manrope** handles all functional UI, body text, and labels. Its modern, geometric construction ensures maximum legibility across all device sizes. 

**Usage Guidelines:**
- Use `display-lg` for hero sections and major marketing beats.
- Use `headline-lg` for product names on detail pages.
- Use `label-sm` in all-caps for categories, overlines, or small metadata badges.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach for desktop to maintain the boutique "catalog" feel, transitioning to a fluid model for mobile devices.

- **Desktop (1280px+):** A 12-column grid with 24px gutters. Content is centered with generous 64px outer margins to create a sense of exclusivity and "breathing room."
- **Tablet (768px - 1024px):** 8-column grid with 24px gutters and 40px margins.
- **Mobile (below 768px):** 4-column fluid grid with 16px gutters and 20px margins.

**Spacing Rhythm:**
We employ an 8pt-based spacing system (with 4px increments for tight UI). Vertical "Stack" spacing should be aggressive—use `stack-xl` (64px) between major sections (e.g., between "Featured Products" and "Our Story") to reinforce the minimalist Scandinavian influence.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Because the background is a warm cream (#FFFDFC), we use soft, multi-layered shadows to lift elements without introducing harsh grays.

- **Level 0 (Flat):** Used for the main background and decorative elements.
- **Level 1 (Subtle Lift):** Used for product cards and input fields. Shadow: `0 2px 8px rgba(47, 41, 39, 0.04)`.
- **Level 2 (Hover/Active):** Used for hovered cards and dropdown menus. Shadow: `0 10px 20px rgba(47, 41, 39, 0.08)`.
- **Level 3 (Modal/Overlay):** Used for shopping carts and pop-ups. Shadow: `0 20px 40px rgba(47, 41, 39, 0.12)`.

Avoid heavy borders; instead, use 1px strokes in Border (#E9E2DE) for structural separation when elevation isn't appropriate.

## Shapes

The shape language is defined by **Rounded (Level 2)** corners. This creates a "gentle" aesthetic that avoids the sharpness of extreme minimalism while remaining more professional than the "bubbly" feel of roundedness level 3.

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem) radius.
- **Large Elements (Cards, Modals):** 16px (1rem) radius.
- **Extra Large (Hero Banners):** 24px (1.5rem) radius.

Images should always follow the container's roundedness to maintain a cohesive, "packaged" look.

## Components

### Buttons
- **Primary:** Background #C85C72, Text #FFFFFF. High-padding (12px 24px), 8px radius.
- **Secondary:** Background #F7DCE2, Text #C85C72. Used for less prominent actions.
- **Outline:** 1px Border #C85C72, Text #C85C72. 

### Input Fields
- Use Surface (#FFFFFF) with a 1px Border (#E9E2DE). 
- On focus, the border shifts to #C85C72 with a subtle glow. 
- Labels use `label-md` in Text Secondary.

### Product Cards
- No border; use Level 1 Elevation.
- High-quality imagery on Soft Background (#FBF4F1).
- Product titles use `title-lg` (Manrope).
- Prices use `body-md` in Primary (#C85C72) with a semi-bold weight.

### Chips & Tags
- Used for categories (e.g., "Gluten-Free," "New Arrival").
- Pill-shaped (rounded-full) with Secondary Light (#F5E8D1) background and Secondary (#D8A85B) text.

### Navigation
- Top navigation should be minimalist, using `label-md` for links.
- Shopping cart indicator uses a thin-stroke icon with a Primary Rose notification dot.

### Specialized Components
- **Ingredient Scale:** A custom slider or input set for bulk purchases, styled with the same rounded, premium aesthetic.
- **Recipe Cards:** Larger cards with an emphasis on typography (`headline-md`) and integrated "Add all to cart" primary buttons.