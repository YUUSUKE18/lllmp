import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            // 正規表現の説明:
            // ^             : 行の先頭
            // \s*           : 空白を 0 回以上許容
            // (?:\d+,\s*\d+)*   : 1 つ以上の「数字列」、カンマとオプション空白で区切り
            //               または単一の「数字列」
            // \s*$          : 行の最後に空白を 0 回以上許容
            if (line.matches("(?:\\d+(?:,\\s*\\d+)*|\\d+)\\s*$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
