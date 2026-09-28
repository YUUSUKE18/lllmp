import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
            // 妥当な形式: 数字とカンマのみで構成され、1個以上の数字列がカンマで区切られている
            
            // 末尾のカンマを取り除く（末尾のカンマは許容されるため、ここでは一旦そのまま扱う）
            String content = trimmedLine;
            
            // 妥当性の判定ロジック
            // 1. 数字とカンマ以外を含まないか
            // 2. 1個以上の数字列がカンマで区切られているか
            
            boolean isValid = true;
            int lastIndex = 0;
            
            for (int i = 0; i < content.length(); i++) {
                char c = content.charAt(i);
                if (Character.isDigit(c) || c == ',') {
                    // 数字またはカンマの場合
                } else {
                    // 数字とカンマ以外が含まれている
                    isValid = false;
                    break;
                }
                lastIndex = i + 1;
            }

            if (!isValid) {
                continue;
            }

            // 1個以上の数字列がカンマで区切られているかチェック
            // 末尾のカンマを考慮して、カンマで分割した結果の要素数をチェックする
            
            // 末尾のカンマを削除して分割を試みる
            String contentWithoutTrailingComma = content;
            if (content.endsWith(",")) {
                contentWithoutTrailingComma = content.substring(0, content.length() - 1);
            }
            
            // 空文字列でないことを確認してから分割
            if (!contentWithoutTrailingComma.isEmpty()) {
                String[] parts = contentWithoutTrailingComma.split(",");
                // 空でない要素が1個以上あるか
                if (parts.length > 0) {
                    // 念のため、分割された要素がすべて数字のみであることを確認する（上記ループで既にチェック済みだが、念のため）
                    boolean allAreNumbers = true;
                    for (String part : parts) {
                        if (!part.isEmpty()) {
                            for (char c : part.toCharArray()) {
                                if (!Character.isDigit(c)) {
                                    allAreNumbers = false;
                                    break;
                                }
                            }
                        }
                    }
                    
                    if (allAreNumbers) {
                        validLines++;
                    }
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
