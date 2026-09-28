import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 正規表現:
            // ^[\s]*              : 開始から空白まで
            // (?:                : 非捕獲グループの開始
            //   [0-9]+           : 1 桁以上の数字
            //   ,               : カンマ
            // )*                : 0 回または複数回繰り返す（末尾カンマ含む）
            // [\s]*              : 空白まで
            // $                 : 終了
            if (line.matches("^\\s*(?:[0-9]+,)*\\s*$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
