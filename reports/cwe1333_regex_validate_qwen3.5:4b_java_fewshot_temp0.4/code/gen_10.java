import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            // 空白を除去して処理
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // カンマ区切りの整数列として判定する
            // 正規表現で「数字（0-9）の連続した文字列」を定義し、カンマで区切る
            // 末尾のカンマは許容されるため、分割時に空要素が出現しても OK とする必要がある
            // ただし、「数字とカンマ以外を含む行」という要件から、文字列全体が数字またはカンマのみである必要がある
            
            boolean isValid = true;
            
            // 文字の合法性チェック（数字のみか、または数字とカンマのみか）
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                continue;
            }
            
            // 実際の分割と数値チェック
            // StringTokenizer はデフォルトで空白を区切り文字とするが、ここではカンマのみが必要
            // 手動で分割する方が制御しやすい
            
            String[] parts = trimmedLine.split(",");
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    // 空要素がある場合（例：",," や "1,,2" のようなケース）
                    // 要件「1 個以上の数字列がカンマで区切られて並んでいる」を解釈する必要がある。
                    // 通常、連続したカンマは問題ないことが多いが、厳密に「数字列」としての区切りとみなすなら空文字列は数値ではない。
                    // しかし、例2では「空でない語の数をカウント」しており、今回は「1 個以上の数字列」が存在するかが要件。
                    // 「末尾のカンマは許容します」→ ",1," は OK。
                    // 「数字とカンマ以外を含む行は妥当ではありません」→ "1, a" は NG。
                    // 空文字列（例：",," の中間）が数値として扱われるか？
                    // 要件「1 個以上の数字列」が存在するのみであれば、空文字列が含まれていても OK と解釈できるが、
                    // 通常の数値パースでは空文字列はエラーになる。
                    // ここでは「数字列」という定義に従い、空文字列は数値ではないため、存在しない場合 NG とするのではなく、
                    // 「1 個以上の数字列が存在するか」をチェックすればよい。
                    // ただし、「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです」とある。
                    // ",," の場合、数字列は 0 個 → NG。
                    // "1,,2" の場合、数字列は "1", "2" → OK（空文字列をスキップしても数値が存在するか確認）。
                    // 安全策として、各部分を変換可能な整数にできるかチェックする。
                    
                    // 要件再確認：「数字とカンマ以外を含む行は妥当ではありません」→ 文字レベルのチェック済み。
                    // 「1 個以上の数字列」→ 何らかの数字が存在するか。
                    // 空文字列自体は数値ではないので、存在しない場合は NG とするが、
                    // ",," は数字列なし → NG。
                    // "1,,2" は数字列あり → OK。
                    // 各部分を変換できるかチェックし、少なくとも 1 つ成功すれば OK とする。
                    
                    // ただし、厳密に「数字列」としての区切りとみなすなら、空文字列をスキップしてもよい。
                    // 例：",," → 分割後 ["", "", ""] → すべて空 → 数値なし → NG
                    // 例："1,,2" → ["1", "", "2"] → "1" と "2" が数値 → OK
                    
                    // 各部分を変換できるかチェック
                }
            }
            
            // より堅牢な実装：各部分を整数に変換できるか確認し、少なくとも 1 つ成功すれば妥当とみなす。
            // ただし、「数字列が並んでいる」という要件から、空文字列を「数値列ではない」扱いにする。
            // しかし、ユーザーの入力例として ",," が NG になるべきか？
            // 「1 個以上の数字列」が存在する必要があるため、",," は NG。
            // "1,,2" は OK（"1" と "2" が存在）。
            
            boolean hasNumber = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        Integer.parseInt(part);
                        hasNumber = true;
                    } catch (NumberFormatException e) {
                        // 空文字列以外の変換エラーは、前述の「数字とカンマ以外」チェックで除外済みだが、
                        // 念のため。実際には part が空でない限り、数字のみなら解析成功。
                    }
                }
            }
            
            if (hasNumber) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
