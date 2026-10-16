# Naria UI

**A flexible React UI component library for React and Next.js.**

Naria UI helps frontend developers build web interfaces with ready-to-use components, customizable themes, and fine-grained component styling. Use components such as buttons, inputs, modals, calendars, and tabs without having to build every UI element from scratch.

With Naria UI, you can customize component parts through the `classNames` prop and adapt the interface to your project's design without relying on global CSS overrides.

## Why Naria UI?

- **Ready-to-use components** — Build interfaces with reusable components such as `Button`, `Input`, and `Modal`, with more components available in the library.
- **Theme options** — Choose from available themes to give your interface a consistent look without designing every component from scratch.
- **Granular styling** — Pass CSS utility classes through `classNames` to style the component root and supported internal parts.
- **Responsive interactions** — Components such as modals and tabs can adapt their behavior to mobile and desktop experiences.
- **Mobile-aware modal behavior** — On mobile, closing an open modal with the device's Back action can dismiss the modal without navigating away from the current page.

## Installation

Install the package using npm:

```bash
npm install naria-ui
```

Or use your preferred package manager:

```bash
# pnpm
pnpm add naria-ui

# yarn
yarn add naria-ui
```

## Styles and Themes

Naria UI provides a global stylesheet for its components and a default theme stylesheet. Import both stylesheets into your application to ensure components are displayed with the expected styles.

```tsx
import "naria-ui/dist/naria-ui.css";
import "naria-ui/dist/default.css";
```

- **Global styles** — `naria-ui/dist/naria-ui.css` provides the core styles required by the library components.
- **Default theme** — `naria-ui/dist/default.css` provides the default theme styling.

Add these imports to your application's global entry point.

For Next.js App Router, you can import the stylesheets in your root layout:

```tsx
// app/layout.tsx
import "naria-ui/dist/naria-ui.css";
import "naria-ui/dist/default.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

If your project already has a global stylesheet entry point, you can add the imports there instead, following your framework's CSS import requirements.

## Usage

Import the components you need from `naria-ui`.

### Button

```tsx
import { Button } from "naria-ui";

<Button
  value="Create account"
  type="submit"
  isLoading={isLoading}
  isDisabled={isLoading}
  classNames={{
    root: "btn btn-md btn-primary rounded-md",
    loading: {
      root: "text-grey-200",
      color: "text-grey-500",
    },
  }}
/>;
```

The `classNames` prop lets you customize supported component parts directly. In this example, the root element and loading indicator receive separate classes.

### Input

```tsx
import { Input } from "naria-ui";

// Use Input with the props supported by your installed version.
```

### Modal

```tsx
import { Modal } from "naria-ui";

<Modal
  isOpen={isModalOpen}
  onOpenChange={() => setIsModalOpen(false)}
  title="User reviews"
  classNames={{
    root: "bg-light max-w-6xl overflow-hidden rounded-t-3xl md:rounded-2xl !max-h-[90dvh]",
    closeIcon: "w-3",
    title: "font-bold text-lg",
    header: "py-4 px-6",
    body: "p-4 md:p-6 flex flex-col justify-between gap-4",
  }}
>
  {/* Your modal content */}
</Modal>;
```

The modal example shows how to style different parts of the component independently:

| `classNames` key | Purpose |
| --- | --- |
| `root` | Modal container |
| `closeIcon` | Close icon |
| `title` | Modal title |
| `header` | Modal header |
| `body` | Modal content area |

Use the class keys supported by each component in your installed version.

## Component-level Styling

Naria UI supports a `classNames` prop on components that expose styling slots. This allows you to pass classes directly to supported elements within a component instead of writing global CSS overrides.

For example:

```tsx
import { Button } from "naria-ui";

<Button
  value="Save changes"
  classNames={{
    root: "w-full rounded-md",
  }}
/>;
```

For components with multiple styling slots, you can customize several parts at once. Some components also expose nested slots for states or sub-elements, such as the `loading` slots shown in the Button example.

> The available `classNames` keys depend on the component. Check the component's supported props before using a slot.

## Themes

Naria UI includes theme options that help you create a consistent interface without styling every component from scratch.

To use the default theme, import its stylesheet:

```tsx
import "naria-ui/dist/default.css";
```

The default theme can be combined with the library's core stylesheet:

```tsx
import "naria-ui/dist/naria-ui.css";
import "naria-ui/dist/default.css";
```

Use the theme configuration and setup supported by your installed version of Naria UI. Refer to the component documentation for additional theme customization options.

## Responsive and Mobile Behavior

Some UI interactions need to work differently on mobile and desktop. Naria UI is designed with responsive component behavior in mind.

For example, when a modal is open on a mobile device, the device's Back action can close the modal instead of navigating away from the current page. This helps preserve the expected navigation flow in mobile web experiences.

Behavior can vary by component and environment; refer to the relevant component documentation for details.

## Available Components

Naria UI includes components for common interface needs, including:

- `Button`
- `Input`
- `Select`
- `Modal`
- `Calendar`
- `Tabs`

The complete component list and each component's available props should be documented here as the library evolves.

## Compatibility

Naria UI is intended for projects built with **React** and **Next.js**.

For framework versions, styling prerequisites, server-side rendering considerations, and any required provider or stylesheet setup, follow the compatibility notes for the version you install.

## Documentation and Examples

- **npm package:** [https://www.npmjs.com/package/naria-ui](https://www.npmjs.com/package/naria-ui)
- **Documentation:** 
- **Source code:** 

## Contributing

Contributions, bug reports, and suggestions are welcome. Add your preferred issue tracker and contribution guidelines here.

## License

See the package's `LICENSE` file for license details.
