import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        int validCount = 0;
        
        // 標準入力から読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                if (trimmedLine.isEmpty()) {
                    continue; // 空行は妥当ではない
                }

                // 1. 数字とカンマ以外の文字が含まれていないかチェック
                boolean containsOnlyDigitsAndCommas = true;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    char c = trimmedLine.charAt(i);
                    if (!Character.isDigit(c) && c != ',') {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }

                if (!containsOnlyDigitsAndCommas) {
                    continue; // 数字とカンマ以外を含む行は妥当ではない
                }

                // 2. カンマで分割し、1個以上の数字列が存在するかチェック
                // 末尾のカンマは許容されるため、split(",")の結果をそのまま利用する。
                String[] tokens = trimmedLine.split(",");
                boolean hasValidNumber = false;
                
                for (String token : tokens) {
                    // 空でないトークンが存在するか確認
                    if (!token.isEmpty()) {
                        // トークンが完全に数字列であるか確認
                        if (token.matches("\\d+")) {
                            hasValidNumber = true;
                            // 1個以上の数字列が区切られていればOK
                            break;
                        }
                    }
                }

                if (hasValidNumber) {
                    validCount++;
                }
            }
        } catch (IOException e) {
            // 入力エラー処理（通常は無視されることが多いが、念のため）
        }

        // 結果を出力
        System.out.println("valid=" + validCount);
    }
}
