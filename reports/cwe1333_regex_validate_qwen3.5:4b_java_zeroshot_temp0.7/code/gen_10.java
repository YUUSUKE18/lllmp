import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = reader.readLine()) != null) {
            // 空白を除去して処理する
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                continue; // 空行は無視するが、仕様では「妥当ではありません」とあるので確認が必要。
                        // しかし、「1 個以上の数字列がカンマで区切られて並んでいること」が要件なので、
                        // 空行はこれを満たさないため「妥当ではない」。出力ロジックに影響しないのか？
                        // 問題文：「標準出力へ...valid=<妥当な行数> という 1 行だけを出力します。」
                        // 「妥当とは...」と定義しているが、「空行、および数字とカンマ以外を含む行は妥当ではありません」とある。
                        // したがって、空行はカウントしない（または無効）。
                        // ただし、「空行」は「数字とカンマ以外を含む行」に該当するか？
                        // 「1 個以上の数字列がカンマで区切られて並んでいること」を満たさないため、妥当ではない。
                        // 出力には含めない。
                
                continue; 
            }

            // 空白をすべて除去した文字列を作成（前後の空白は無視、内部も余白ありもしないか？「数字とカンマ以外を含む行は妥当ではありません」）
            // "1,2," や ",3," は OK。" 1, 2," は NG。
            
            // 内部の空白チェック: 「数字とカンマ以外を含む行」→ もし ' ' があれば NG。
            if (trimmedLine.contains(" ")) {
                continue; 
            }

            String[] parts = trimmedLine.split(",");
            
            // 分割後の部分数チェック（1 個以上の数字列が必要）
            if (parts.length < 1) {
                continue;
            }

            boolean isValid = true;
            for (String part : parts) {
                // 各部分が文字だけの数字であることチェック
                // 空白が含まれていない前提で、数字のみか確認
                if (!isNumeric(part)) {
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

    private static boolean isNumeric(String s) {
        // 空文字列の場合は NG（1,2 の場合、空でない数字が必要）
        if (s.isEmpty()) return false;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c < '0' || c > '9') {
                return false;
            }
        }
        return true;
    }
}
