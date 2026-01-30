# Eitri Luminus

O Eitri Luminus é a biblioteca de componentes básicos do Eitri para a montagem das telas de Eitri-apps. Com ela você pode montar componentes mais complexos para as experiências de seus Eitri-apps e extender ainda mais as possibilidades do Eitri em seu app.

## Recursos

O Eitri Luminus conta com:

- [Tailwind 3](https://v3.tailwindcss.com/){:target="_blank"} para estilização
- [DaisyUI 4](https://v4.daisyui.com/){:target="_blank"} para componentes prontos

## Documentação

[→ Eitri Luminus Documentation ( 2.x.x )](https://cdn.83io.com.br/library/luminus-ui/doc/latest/){:target="_blank" .md-button .md-button--primary }

> Para documentação de versões anteriores [clique aqui](https://cdn.83io.com.br/library/luminus-ui/doc/1.83.0/){:target="_blank"}

## Componentes Básicos

O Eitri Luminus oferece diversos componentes para construir suas interfaces:

- **Window**: Container principal das telas
- **View**: Container para agrupamento de elementos
- **Text**: Exibição de textos
- **Button**: Botões interativos
- **Image**: Exibição de imagens
- **Input**: Campos de entrada de texto
- E muitos outros...

## Exemplo de Uso

```jsx
import { Window, View, Text, Button, Image } from 'eitri-luminus'

export default function Home() {
    return (
        <Window>
            <View display="flex" direction="column" padding="medium">
                <Image src="logo.png" width={100} height={100} />
                <Text fontSize="large">Bem-vindo ao Eitri!</Text>
                <Button
                    label="Começar"
                    onPress={() => console.log('Clicou!')}
                />
            </View>
        </Window>
    )
}
```

## Temas

Os componentes do Eitri Luminus respeitam o tema configurado para sua aplicação. Para personalizar o tema, acesse o [Console Eitri](https://console.eitri.tech/) e configure as cores, fontes e estilos desejados.

Para mais informações sobre temas, consulte a página de [Design System](design-system.md).
