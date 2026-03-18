# UFC Compilador JRXML

Aplicação desktop desenvolvida para compilar arquivos .jrxml utilizando JasperReports 3.5.3, garantindo compatibilidade com sistemas legados utilizados na UFC.

## Sobre o projeto

Ferramentas modernas do JasperReports geram arquivos .jasper incompatíveis com sistemas antigos.
Este projeto resolve esse problema permitindo compilar .jrxml na versão correta, evitando falhas em sistemas legados.

--------------------------------------------------

## Como rodar o projeto

### Pré-requisitos

- Node.js
- Java (JDK 8 ou compatível)

Verifique:

node -v
java -version

### Executar em modo desenvolvimento

npm install
npm start

--------------------------------------------------

## Gerar builds

### Windows

npm run build

### Linux

(Recomendado rodar em ambiente Linux - WSL, VM ou CI)

npx electron-builder --linux

--------------------------------------------------

## Downloads

Os arquivos estão disponíveis na pasta "versions/".

### Windows

- UFC Compilador JRXML Setup.exe
  ./versions/UFC Compilador JRXML Setup.exe

### Linux (em breve)

- AppImage
- .deb

--------------------------------------------------

## Desenvolvedores

- Maurício de Moura dos Santos
- Maryane de Castro Lima