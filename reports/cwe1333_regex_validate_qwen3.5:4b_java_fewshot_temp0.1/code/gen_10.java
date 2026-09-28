import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        // 空白を切り捨てて処理する
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }

        // カンマ区切りの要素を取得
        String[] parts = trimmed.split(",");

        // 各要素が整数列であるかチェック
        for (String part : parts) {
            // 空白が含まれている場合、または数字以外の文字が含まれている場合は無効
            if (!part.matches("\\d+")) {
                return false;
            }
        }

        return true;
    }
}
