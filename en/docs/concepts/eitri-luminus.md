# Eitri Luminus

Eitri Luminus is Eitri's basic components library for building Eitri-app screens. With it, you can create more complex components for your Eitri-app experiences and further extend Eitri's possibilities in your app.

## Features

Eitri Luminus includes:

- [Tailwind 3](https://v3.tailwindcss.com/){:target="_blank"} for styling
- [DaisyUI 4](https://v4.daisyui.com/){:target="_blank"} for ready-made components

## Documentation

[→ Eitri Luminus Documentation ( 2.x.x )](https://cdn.83io.com.br/library/luminus-ui/doc/latest/){:target="_blank" .md-button .md-button--primary }

> For documentation of previous versions [click here](https://cdn.83io.com.br/library/luminus-ui/doc/1.83.0/){:target="_blank"}

## Basic Components

Eitri Luminus offers various components to build your interfaces:

- **Window**: Main screen container
- **View**: Container for grouping elements
- **Text**: Text display
- **Button**: Interactive buttons
- **Image**: Image display
- **Input**: Text input fields
- And many more...

## Usage Example

```jsx
import { Window, View, Text, Button, Image } from 'eitri-luminus'

export default function Home() {
    return (
        <Window>
            <View display="flex" direction="column" padding="medium">
                <Image src="logo.png" width={100} height={100} />
                <Text fontSize="large">Welcome to Eitri!</Text>
                <Button
                    label="Get Started"
                    onPress={() => console.log('Clicked!')}
                />
            </View>
        </Window>
    )
}
```

## Themes

Eitri Luminus components respect the theme configured for your application. To customize the theme, access the [Eitri Console](https://console.eitri.tech/) and configure the desired colors, fonts, and styles.

For more information about themes, see the [Design System](design-system.md) page.
