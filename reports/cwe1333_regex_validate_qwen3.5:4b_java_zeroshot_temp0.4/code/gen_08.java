import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = reader.readLine()) != null) {
            // 前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない（仕様：「数字とカンマ以外を含む行は妥当ではありません」）
            if (line.isEmpty()) {
                continue; 
            }

            // 文字列に数値やカンマが含まれていない場合は無効
            boolean hasNumericOrComma = false;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (Character.isDigit(c) || c == ',') {
                    hasNumericOrComma = true;
                    break;
                }
            }

            if (!hasNumericOrComma) {
                continue; 
            }

            // 文字列をカンマで分割し、要素が空でないか確認
            String[] parts = line.split(",");
            boolean isValid = true;
            for (String part : parts) {
                // 各部分に空白が含まれているかチェック（trim 済みだが、内部の空白は許容されない）
                if (!part.matches("\\d+")) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
