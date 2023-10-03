POWERSHELL:


Problema:
Execução de scripts não assinados desabilitada.

Resulta em:
Não permite que os comandos da CLI sejam executados

Mensagem de erro:
eitri : O arquivo XXXXXXX não pode ser carregado porque a execução de scripts foi desabilitada neste sistema.
Para obter mais informações, consulte about_Execution_Policies em https://go.microsoft.com/fwlink/?LinkID=135170.


Resolução:
Mudar a política de execução de scripts do Windows

Aplicação:
1. Execute o powershell como administrador
2. Rode o seguinte comando: Set-ExecutionPolicy RemoteSigned
3. Confirme a alteração

RemoteSigned executa scripts e arquivos de configuração assinados por um fornecedor confiável e tambem scripts e arquivos locais.
