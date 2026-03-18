# UFC Compilador JRXML

Aplicação desktop desenvolvida para compilar arquivos .jrxml utilizando JasperReports 3.5.3, garantindo compatibilidade com sistemas legados utilizados na UFC.

## Sobre o projeto

Ferramentas modernas do JasperReports geram arquivos .jasper incompatíveis com sistemas antigos.
Este projeto resolve esse problema permitindo compilar .jrxml na versão correta, evitando falhas em sistemas legados.

## Downloads

- [Windowns](https://github.com/Maurrici/Compilador-JRXML-UFC/releases/latest)

--------------------------------------------------

## Como rodar o projeto

### Pré-requisitos

- Node.js
- Java (JDK 8 ou compatível)

Verifique:
```Javascript
node -v
java -version
```
### Executar em modo desenvolvimento

```Javascript
npm install
npm start
```

--------------------------------------------------

## Gerar builds

### Windows
```Javascript
npm run build
```
### Linux

(Recomendado rodar em ambiente Linux - WSL, VM ou CI)
```Javascript
npm run build-linux
```
--------------------------------------------------

## Desenvolvedores

- Maurício de Moura dos Santos
- Maryane de Castro Lima
