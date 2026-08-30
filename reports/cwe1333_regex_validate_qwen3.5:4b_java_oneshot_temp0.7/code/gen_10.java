import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
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
        if (line == null) return false;
        
        // 前後の空白を切り捨てて処理対象文字列を取得
        String trimmed = line.trim();
        if (trimmed.isEmpty()) return false;

        // カンマ区切りの整数列として扱えるかチェック
        // 1 個以上の数字が必須、末尾のカンマは許容
        
        try {
            // まず最初の文字が数字かチェック
            char firstChar = trimmed.charAt(0);
            if (!Character.isDigit(firstChar)) return false;

            // カンマ区切りの要素をすべて取得
            String[] parts = trimmed.split("\\s*,\\s*");
            
            // 各部分に少なくとも 1 つの数字が含まれているか確認
            boolean allValid = true;
            for (String part : parts) {
                if (part.isEmpty()) continue; // 空白で空になった部分はスキップ
                
                int i = 0;
                while (i < part.length() && Character.isDigit(part.charAt(i))) {
                    i++;
                }
                
                // 数字が少なくとも 1 つある必要がある
                if (i == 0) {
                    allValid = false;
                    break;
                }
            }
            
            return allValid;
        } catch (Exception e) {
            return false;
        }
    }
}
