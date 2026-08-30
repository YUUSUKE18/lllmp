import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }
            
            boolean isInvalid = false;
            
            // 空白が含まれているかチェック（trim で除去済みだが、内部に余分な空白がある場合）
            // 指定通り「数字とカンマ以外を含む行は妥当ではありません」なので、文字列が正規表現 ^\s*\d+,\s*\d*?$ に合致するかチェック
            if (!line.matches("^\\s*\\d+(?:,\\s*\\d+)*\\s*$")) {
                isInvalid = true;
            }
            
            if (!isInvalid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
