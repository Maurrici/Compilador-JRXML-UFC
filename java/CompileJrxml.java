import net.sf.jasperreports.engine.JasperCompileManager;
import java.io.File;

public class CompileJrxml {
    public static void main(String[] args) throws Exception {
        if (args.length != 2) {
            System.out.println("Uso: java CompileJrxml <arquivo.jrxml> <diretorio_saida>");
            System.exit(1);
        }
        String source = args[0];
        String outputDir = args[1];

        String fileName = new File(source).getName().replace(".jrxml", ".jasper");
        String outputFile = new File(outputDir, fileName).getAbsolutePath();
        
        JasperCompileManager.compileReportToFile(source, outputFile);
        System.out.println("Compilado: " + outputFile);
    }
}
