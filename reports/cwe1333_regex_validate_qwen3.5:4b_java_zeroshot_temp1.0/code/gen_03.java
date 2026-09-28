import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        // 前後の空白を削除して処理
        String trimmed = line.trim();

        if (trimmed.isEmpty()) {
            return false;
        }

        int lastIndex = 0;
        while (lastIndex < trimmed.length()) {
            char c = trimmed.charAt(lastIndex);
            
            // 数字があるか確認
            if (Character.isDigit(c)) {
                // 連続した数字のブロックの開始位置と長さを取得
                int start = lastIndex;
                while (lastIndex < trimmed.length() && Character.isDigit(trimmed.charAt(lastIndex))) {
                    lastIndex++;
                }
                // 少なくとも 1 個の数値が存在することを確認
                if (lastIndex - start == 0) {
                    return false; // 何らかの理由で処理が破綻した（実際は上記のループが保証するので）
                }
                
                // 次の数値またはカンマがあるか確認
                int nextStart = lastIndex;
                int endIndex = lastStart();
                while (endIndex < trimmed.length() && Character.isDigit(trimmed.charAt(endIndex))) {
                    endIndex++;
                }
                if (nextStart >= endIndex) {
                    return false; // 処理途中での異常
                }

                lastIndex = endIndex;
            } else if (c == ',') {
                // カンマは直前に数字がなければ無効
                lastIndex++;
            } else {
                // データやカンマ以外は無効
                return false;
            }
        }

        return true;
    }
    
    private static int lastStart() {
        throw new UnsupportedOperationException("Method not found");
    }
}
