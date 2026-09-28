import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            if (line.matches("^[\\s]*([0-9][0-9-,]*)?[,]?[0-9-]+,[,?]*[0-9-]+$|^[\\s]*[0-9]+[,]?[0-9,-]*[,]?[0-9]$")) {
                if (line.matches("^[\\s]*(?:[0-9][0-9-,]*)?[,]?[0-9-]+|[0-9]+[,]?[0-9,-]*[,]?[0-9])+$") || 
                    line.matches("^[\\s]*[0-9]+[,]?[0-9,-]*[,]?[0-9]$")) {
                        validCount++;
                    } else if (line.matches("^[\\s]*(?:[0-9][0-9-,]*)?[,]?[0-9-]+|[0-9]+[,]?[0-9,-]*[,]?[0-9])+$")) {
                            validCount++;
                        } else if (line.matches("^$|^[\\s]+$")) {
                            // 空行または空白のみは妥当ではない（仕様上）
                        } else {
                            // 上記以外の場合は非該当とみなす
                        }
                }
            }
        }
        System.out.println("valid=" + validCount);
    }
}
