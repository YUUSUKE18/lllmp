import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれているかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // 数字列がカンマで区切られているかチェック
            // 末尾のカンマは許容されるため、最後の文字がカンマでも OK
            // ただし、最初の文字がカンマの場合は無効（1 個以上の数字列が必要）
            if (line.startsWith(",")) {
                continue;
            }
            
            // カンマがない場合は妥当（単一の数字列）
            int commaCount = 0;
            for (int i = 0; i < line.length(); i++) {
                if (line.charAt(i) == ',') {
                    commaCount++;
                }
            }
            
            // カンマが 1 つ以上ある場合、各セグメントが数字のみであることを確認
            // 既に数字とカンマ以外がないことを確認しているので、分割した各文字列が空でないか確認する必要がある
            // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2," は OK, ",1" は NG, "1,,2" は NG (空白なしでも連続カンマは数字列ではない)
            
            String[] parts = line.split(",");
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 連続したカンマや末尾のカンマで生じる空文字列は許容されない（数字列が並んでいるという条件に反）
                    // ただし、split の挙動により末尾のカンマで空文字列が生成される場合がある
                    // "1," -> ["1", ""] (Java 8+ split trailing empty string is discarded, but default behavior might vary)
                    // Java の String.split(",") はデフォルトで trailing empty strings を削除するが、これは仕様解釈に依存
                    // より安全なアプローチ: カンマの位置をチェックする
                    continue; 
                }
            }
            
            // より堅牢なチェック: 文字列をカンマで分割し、各要素が空でないか確認
            // ただし、split(",") は trailing empty string を削除するため "1," -> ["1"] になる可能性がある
            // 仕様: "1,2," は妥当。"1,,2" は不妥当（連続カンマ）。"1," は妥当。
            // split(",") の挙動: "1," -> ["1", ""], ",1" -> ["", "1"], "1,,2" -> ["1", "", "2"]
            // しかし、Java 8 の split は trailing empty string を削除するので "1," -> ["1"]
            // これは "1,2," -> ["1", "2"] となり、空文字列が含まれない。
            // ただし、中間の連続カンマ "1,,2" -> ["1", "", "2"] は空文字列を含む。
            
            // 再考: split(",") の挙動はプラットフォーム依存でないが、trailing empty string 削除はデフォルトではない
            // Java 8 の split は trailing empty string を削除する。
            // しかし、中間の空文字列は保持される。
            // "1,,2".split(",") -> ["1", "", "2"]
            // "1,".split(",") -> ["1"] (trailing empty string 削除)
            // ",1".split(",") -> ["", "1"] (leading empty string 保持)
            
            // したがって、空文字列が含まれているかチェックする必要がある。
            // ただし、"1," は妥当なので、split で生成される空文字列は末尾のみ許容される可能性があるが、
            // split の挙動上、末尾の空文字列は削除されるので、すべての要素が空でないかチェックすれば OK。
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    // "1,,2" の場合 ["1", "", "2"] -> 空文字列あり
                    // "1," の場合 ["1"] -> 空文字列なし
                    // ",1" の場合 ["", "1"] -> 空文字列あり（先頭カンマで NG）
                    break;
                }
            }
            
            // 上記のループは break するが、正しい判定ロジックが必要
            // より明確な方法: カンマを区切りとして、各セグメントが数字のみであることを直接チェック
            
            // 再実装: 文字列をカンマで分割し、各要素が空でないか確認
            boolean isInvalid = false;
            
            // 先頭がカンマの場合は NG
            if (line.startsWith(",")) {
                isInvalid = true;
            } else {
                // カンマの位置を特定
                int lastCommaIndex = -1;
                for (int i = 0; i < line.length(); i++) {
                    if (line.charAt(i) == ',') {
                        lastCommaIndex = i;
                    }
                }
                
                // カンマがない場合 -> OK
                if (lastCommaIndex == -1) {
                    isInvalid = false;
                } else {
                    // 最後のカンマが末尾にあるか確認（許容される）
                    // ただし、その前に数字がある必要がある
                    int lastDigitIndex = -1;
                    for (int i = line.length() - 1; i >= 0; i--) {
                        if (Character.isDigit(line.charAt(i))) {
                            lastDigitIndex = i;
                            break;
                        }
                    }
                    
                    // 最後の数字が末尾にあるか確認（末尾カンマの許容）
                    // "1," -> 最後の数字は index 0, 文字列長 2 -> OK
                    // ",1" -> 最後の数字は index 1, 文字列長 2 -> NG (先頭カンマで既に NG)
                    
                    // 各セグメントが空でないか確認: 
                    // セグメントは [0..lastDigitIndex], [lastDigitIndex+1..nextComma-1], ...
                    // より単純: split(",") で分割し、すべての要素が空でないか確認
                    // ただし、split の挙動を考慮
                }
            }
            
            // 最終的なロジック: 
            // 1. 文字列に数字とカンマ以外がないことを確認済み
            // 2. 先頭がカンマではないこと
            // 3. 分割されたすべてのセグメントが空でないこと
            
            String[] segments = line.split(",");
            for (String segment : segments) {
                if (segment.isEmpty()) {
                    isInvalid = true;
                    break;
                }
            }
            
            if (!isInvalid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
