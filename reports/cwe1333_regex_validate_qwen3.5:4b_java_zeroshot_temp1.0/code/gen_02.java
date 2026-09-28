import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去し、空行を除外する（ただし空行は無効とされるため除外）
            if (line == null || line.trim().isEmpty()) {
                continue; // 空行は問題ないか？仕様「空行...は妥当ではありません」なので処理しない。
                          // しかし入力として来るなら、条件に合致しないので skip してカウントしない。
                          // ここで注意：問題文「空行...は妥当ではありません」とあるので、空行をスキップするのではなく、その行が不適格なため count を増やしずらい必要があるか？
                          // 「各々が...を判定します」と「妥当とは〜」と定義後、「標準出力へ valid=X」としてあるので、
                          // 全ての入力行に対して評価し、該当する数を集めるのが自然。
                          // 空行は「妥当ではありません」→カウントしない。
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は無効とされるため、この行を valid に含めない
                continue; 
            }

            // 数式チェック: 1. 文字の列が全て数字またはカンマである。2. カンマで区切られている。
            if (!isNumberSeparatedByComma(trimmedLine)) {
                continue;
            }

            validCount++;
        }

        System.out.println("valid=" + validCount);
    }

    // カンマ区切りの整数列（末尾カンマ可、前後空白は無視）が妥当かを判定する
    private static boolean isNumberSeparatedByComma(String line) {
        if (line.isEmpty()) return false;

        String[] parts = line.split(",");
        for (String part : parts) {
            // 各部分の文字が全て数字であるか確認（マイナスを含む整数として扱うべきか？問題文「整数列」と言っているが、入力例にないため単純な桁数扱いとする）
            // 標準的な「整数」はマイナスも可能だが、「1 個以上の数字列」なので、単なる数字（0-9）と仮定する。
            // あるいは「文字列が全て数字」と判断し、負号の有無を考慮しない方が堅牢か？
            // 例："-5,2" は妥当か？問題文「1 個以上の数字列」なので、「5」と「2」のみである必要があり、- は認めない。
            // または「整数」として - を含む。しかし「数字列」という言葉で「0~9 の文字列」と解釈するのが厳密。
            // 安全策：文字が '0'-'9' のみか確認。
            
            boolean allDigits = true;
            for (char c : part.toCharArray()) {
                if (c < '0' || c > '9') {
                    allDigits = false;
                    break;
                }
            }

            if (!allDigits) return false;
        }

        // カンマで区切られているか確認（部分数が 1 以上か）
        // split は空要素を返さない。
        // ",," -> [""]? あるいは分割結果が複数ある必要があるか？
        // 問題文「カンマで区切られて並んでいる」→少なくとも 1 つの数字があり、2 つならカンマが必要。
        return true; 
    }
}
