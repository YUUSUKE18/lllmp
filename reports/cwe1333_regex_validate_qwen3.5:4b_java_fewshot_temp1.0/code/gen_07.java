import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

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

            boolean isValid = true;
            String[] parts = line.split(",");
            
            // 数字とカンマ以外が含まれているかチェックするために、まず完全に一致するか確認する必要がある。
            // しかし、split は leading/trailing whitespace を削除しなかった場合の影響も考慮する必要がある。
            // 要件: "行の前後の空白は無視します" -> trim() 済みだが、要素内部に不要な文字があるか？
            // 要件: "数字列がカンマで区切られて並んでいる" -> 各要素が純粋な整数であること。
            // 要件: "末尾のカンマは許容します" -> split は末尾空要素を作る場合あり、それを取り扱う必要がある。

            if (parts.length == 0) {
                // 本来不可能だが処理の妥当性確認のために
                isValid = false;
            } else {
                for (String part : parts) {
                    // trim をして、空白文字が含まれているかチェック
                    String cleanPart = part.trim();
                    
                    // カンマで区切られた後、空行や不要な文字がないか確認。
                    // 各要素は整数のみである必要がある。
                    if (cleanPart.isEmpty()) {
                        // 例: "1,,2" -> split で "" が生成される。これは許容されるのか？
                        // 要件: "1 個以上の数字列がカンマで区切られて並んでいる"
                        // "末尾のカンマは許容します" だけ明記されているが、複数の連続カンマは明示されていない。
                        // ただし、split(",") は adjacent commas に空要素を作る。
                        // 通常の解釈: "1, 2" -> ["1", " 2"] (trim で修正)
                        // "1,,2" -> ["1", "", "2"] -> "" は整数でない。妥当性なし。
                        // しかし、要件は「数字とカンマ以外を含む行は妥当ではありません」
                        // つまり、入力文字列に除外的な文字（空白以外の非数字文字）がある場合、または空要素がある場合を許容しないか？
                        // 「1 個以上の数字列がカンマで区切られて並んでいる」 -> 間隔と構造の厳密さ。
                        // 安全策: 各要素（trim 後）が整数のパターンに一致するか確認。
                        isValid = false; 
                        break;
                    }
                    
                    try {
                        Integer.parseInt(cleanPart);
                    } catch (NumberFormatException e) {
                        isValid = false;
                        break;
                    }
                }
            }

            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
