---
status: new
---

# Design System

Com o Eitri é possível determinar paletas de cores personalizadas para cada uma das aplicações usando Eitri para que seu Design System seja respeitado em todos os Eitri-apps e utilizar componentes pré-configurados para agilizar a montagem de suas telas.

## Eitri Luminus

O Eitri Luminus é a biblioteca de componentes básicos do Eitri para a montagem das telas de Eitri-apps. Com ela você pode montar componentes mais complexos para as experiências de seus Eitri-apps e extender ainda mais as possibilidades do Eitri em seu app.

!!! tip
    O Eitri Luminus agora conta com [Tailwind 3](https://v3.tailwindcss.com/){:target="_blank"} e [DaisyUI 4](https://v4.daisyui.com/){:target="_blank"}

!!! abstract "Versões Anteriores"
    Para documentação de versões anteriores [clique aqui](https://cdn.83io.com.br/library/luminus-ui/doc/latest/){:target="_blank"}

[:octicons-arrow-right-24: Documentação Luminus Daisy ( 2.x.x )](https://cdn.83io.com.br/library/luminus-ui/storybook/latest/){:target="_blank" .md-button .md-button--primary }

## Tema

Um tema é um conjunto de tokens de estilos baseado em CSS que permite a personalização visual dos Eitri-App. Ele facilita a criação e modificação do design, garantindo que o aplicativo atenda às necessidades específicas de usuários e marcas.

Os temas no Eitri estão integrados ao aplicativo, permitindo personalizações diretamente no [Console](https://console.eitri.tech/){:target="_blank"}. Designers e desenvolvedores podem criar ou ajustar rapidamente o visual de um aplicativo, com mudanças refletidas de forma consistente em todos os ambientes.


!!! warning "Atenção"
    O tema é válido para todos os ambientes do Eitri e é incluídos no momento da geração de versão dos Eitri-apps, sendo assim. Para aplicar uma alteração de tema em um Eitri-app, publique a alteração do tema e gere uma nova versão de seu Eitri-app.


### Configuração do tema
Para personalizar seu tema no Eitri, basta acessar o [Console](https://console.eitri.tech/){:target="_blank"} e seguir as instruções abaixo. É possível definir cores, fontes, tamanhos e outros estilos, garantindo a harmonia visual do aplicativo.

1. Acesse o [Console](https://console.eitri.tech/){:target="_blank"} e faça login com sua conta

2. Clique em **"Aplicativos"** no menu superior

3. Escolha o aplicativo que deseja personalizar

4. No menu contextual a esquerda clique em "Tema do aplicativo"

5. Personalize seu tema clicando em **"Editar Tema"**

6. Ao finalizar a edição clique em **"Atualizar Tema"**

7. Será criada uma nova versão de seu tema (Por padrão, será criada como **"rascunho"**)

8. Clique em **"Publicar"** para que as alterações passem a ser incorporadas nas próximas versões geradas de seus Eitri-apps