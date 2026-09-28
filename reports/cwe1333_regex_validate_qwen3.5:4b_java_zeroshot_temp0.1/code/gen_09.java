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
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれていないかチェック
            boolean hasInvalidChar = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 有効な行かどうか判定
            StringTokenizer tokenizer = new StringTokenizer(trimmedLine);
            boolean isValid = false;
            
            // 少なくとも 1 つのトークンがあるか確認
            if (tokenizer.hasMoreTokens()) {
                try {
                    while (tokenizer.hasMoreTokens()) {
                        String token = tokenizer.nextToken();
                        // トークンが数字のみであるか確認（StringTokenizer はデフォルトで空白区切りだが、ここではカンマも区切れるように設定）
                        // 仕様：カンマ区切りの整数列。StringTokenizer のデフォルトは空白なので、カスタム分割が必要か、または手動解析。
                        // 再考：StringTokenizer は空白を区切り文字とするデフォルトだが、ここでは「数字とカンマ」のみが許容されるため、
                        // カンマも区切り文字として扱う必要がある。
                    }
                } catch (NumberFormatException e) {
                    isValid = false;
                }
            } else {
                // 空行は既に除外済みだが、トークンがない場合は妥当ではない（1 個以上の数字列が必要）
                isValid = false;
            }
            
            // トークン化の再実装：カンマと空白を区切り文字として扱う
            if (isValid) {
                // 上記のロジックは少し複雑になるため、手動で分割して確認する方が確実
                String[] parts = trimmedLine.split("[,\\s]+");
                for (String part : parts) {
                    if (!part.isEmpty() && !Character.isDigit(part.charAt(0))) {
                        isValid = false;
                        break;
                    }
                }
            }
            
            // 最終的な判定ロジックの再確認
            // 1. 数字とカンマ以外がないか
            // 2. カンマ区切りで少なくとも 1 つの整数があるか
            // 3. 末尾のカンマは許容される（split で空文字列が生成されないように注意）
            
            // 再実装：手動解析
            boolean isCorrect = true;
            int lastDigitIndex = -1;
            int commaCount = 0;
            
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isCorrect = false;
                    break;
                }
                
                if (c == ',') {
                    commaCount++;
                } else {
                    // 数字の場合、最後の数字のインデックスを更新
                    lastDigitIndex = i;
                }
            }
            
            if (!isCorrect) {
                continue;
            }
            
            // 少なくとも 1 つの数字があるか確認
            if (lastDigitIndex == -1) {
                continue;
            }
            
            // 末尾のカンマは許容されるが、数字がない場合は無効（既に lastDigitIndex でチェック済み）
            // カンマのみで始まる行は無効（lastDigitIndex が -1 でチェック済み）
            
            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
