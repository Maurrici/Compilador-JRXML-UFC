#!/bin/bash
#
# Uso: ./compile.sh -j <java_home> -s <arquivo.jrxml> -o <diretorio_saida>
#

BASEDIR=$(dirname "$0")
LIB_DIR="$BASEDIR/lib"

show_help() {
    echo "Uso: ./compile.sh -j <java_home> -s <arquivo.jrxml> -o <diretorio_saida>"
    echo ""
    echo "Exemplo:"
    echo "  ./compile.sh -j 'C:/Program Files/Java/jdk1.6.0_45' -s /caminho/relatorio.jrxml -o /saida"
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -j) JAVA_HOME="$2"; shift 2 ;;
        -s) SOURCE_FILE="$2"; shift 2 ;;
        -o) OUTPUT_DIR="$2"; shift 2 ;;
        -h) show_help ;;
        *) show_help ;;
    esac
done

# Check arguments
[ -z "$JAVA_HOME" ] || [ -z "$SOURCE_FILE" ] || [ -z "$OUTPUT_DIR" ] && show_help
[ ! -d "$JAVA_HOME" ] && echo "ERRO: Java não encontrado: $JAVA_HOME" && exit 1
[ ! -f "$SOURCE_FILE" ] && echo "ERRO: Arquivo não encontrado: $SOURCE_FILE" && exit 1

# Create output dir if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Build classpath
CLASSPATH=""
for jar in "$LIB_DIR"/*.jar; do
    # Para Windows: use ; no classpath, Linux/macOS: use :
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        CLASSPATH="$CLASSPATH;$jar"
    else
        CLASSPATH="$CLASSPATH:$jar"
    fi
done
# Remove primeiro separador
CLASSPATH="${CLASSPATH#:;}"  # remove ; inicial
CLASSPATH="${CLASSPATH#:}"   # remove : inicial

# Output file
FILENAME=$(basename "$SOURCE_FILE" .jrxml)
OUTPUT_FILE="$OUTPUT_DIR/$FILENAME.jasper"

echo "Compilando $SOURCE_FILE..."

"$JAVA_HOME/bin/java" -cp "$CLASSPATH" \
    net.sf.jasperreports.engine.JasperCompileManager \
    "$SOURCE_FILE" \
    "$OUTPUT_FILE"

# Resultado
if [ $? -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
    echo "OK: $OUTPUT_FILE"
else
    echo "ERRO na compilação"
fi
