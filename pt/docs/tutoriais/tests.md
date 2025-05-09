# Executando Testes no Eitri-App

É possível escrever e executar testes que verificam se cada parte do seu código está funcionando corretamente, desde testes unitários que avaliam funções isoladas até testes de integração que validam a combinação dos módulos do seu Eitri-App.

##### Tipos de Testes

<ol>
    <li>
        Unitário:
        <ol>
            Teste de unidade (unitário) é toda a aplicação de teste nas assinaturas de entrada e saída de um sistema. Consiste em validar dados válidos e inválidos via I/O (entrada/saída) sendo aplicado por desenvolvedores ou analistas de teste.
        </ol>
    </li>
    <li>
        Integração:
        <ol>
                Teste de integração é a fase do teste de software em que módulos são combinados e testados em grupo. Ela sucede o teste de unidade, em que os módulos são testados individualmente, e antecede o teste de sistema, em que o sistema completo (integrado) é testado num ambiente que simula o ambiente de produção.
        </ol>
    </li>
</ol>

##### Requisitos

- Nome de arquivo de Teste com padrão `.test.` . Exemplo: `CalcService.test.js`
- Arquivos devem estar dentro do `/src/*`
- A seguinte propriedade declarada no `eitri-app.conf.js`

```
    type: "module"
```

##### Exemplo de Arquivo de Teste

```js
import CalcService from "./CalcService";

describe("CalcService", () => {
  test("addition", () => {
    const result = CalcService.addition(5, 15);
    console.log("result", result);
    expect(result).toBe(20);
  });

  test("subtraction", () => {
    const result = CalcService.subtraction(15, 35);
    expect(result).toBe(-20);
  });

  test("multiplication", () => {
    const result = CalcService.multiplication(7, 85);

    expect(result).toBe(595);
  });

  test("division", () => {
    const result = CalcService.division(100, 4);

    expect(result).toBe(25);
  });
});
```

Classe que será testada:

```js
export default class CalcService {
  static addition = (num1 = 0, num2 = 0) => {
    return num1 + num2;
  };

  static subtraction = (num1 = 0, num2 = 0) => {
    return num1 - num2;
  };

  static multiplication = (num1 = 0, num2 = 0) => {
    return num1 * num2;
  };

  static division = (num1 = 0, num2 = 0) => {
    return num1 / num2;
  };
}
```

##### Como executar os testes

```bash
# Execute o comando abaixo
eitri test

# Caso queira executar observando os arquivos e re-executando a cada alteração.
eitri test --watch
```

##### Chamadas nativas e mocks

Testes de métodos que dependem de chamadas nativas não são suportados, mas você pode gerar um mock do método retornando um valor esperado e etc.

Exemplos de mock:

```js
// Certifique-se de fazer os seguintes imports
import { jest } from "@jest/globals";

import Eitri from "eitri-bifrost";

jest.spyOn(Eitri, "getInitializationInfos").mockResolvedValueOnce({
  productId: "123",
});

jest.spyOn(Eitri.http, "get").mockResolvedValueOnce({
  productId: "123",
  name: "PS5 Pro",
});
```
