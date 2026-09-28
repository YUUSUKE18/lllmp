import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 正規表現: 空行は許容せず、数字とカンマ以外の存在を許容せず。
            // 1 個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容するため (?=[,\d]) のような制御を使うか、
            // [\d,]+ または \d+[,]{0,} で表現できるが、'['の後に ',\d]+' がより簡潔。
            // より正確に: 全体が (\d+[,\d]*)^ と ($|,) で閉じることが許容される形式。
            // しかし、要件には「数字とカンマ以外を含む行は妥当ではありません」とあり、「1 個以上の数字列がカンマで区切られて並んでいること」とあります。
            // これを表現する簡潔な正規表現: ^\s*(?:[\d]+[,]{0,}\s*)+$. (空白も許容) または厳密に数字とカンマのみ。
            // 問題文「行の前後の空白は無視します」→ trimming が済み、内部の空白も含む？通常空白は区切りとして解釈されるか？
            // '空白区切りの整数列'の例より、空白は区別子ではないが、数字とカンマのみで構成された文字列とするのが安全。
            // 要件: 1 個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容する。
            // 数字とカンマ以外を含む行 → 妥当ではない (空白を除く) と解釈すべきか？ 
            // '空白は無視します' とあるので、内部の空白も許容して数え上げておきましても良いが、通常「数字とカンマ以外」は NG。
            // 例： "1,2,3" -> OK, ",2," -> OK (開始前の空白は trim で除去済み), "1, 2" -> ?
            // 要件「行の前後の空白は無視します」→外部のみ。内部は「数字とカンマ以外を含む行は妥当ではありません」。
            // しかし、通常 CSV は空白を区切りとして扱うこともあるが、ここで「整数列」とあるので [\d]+ で厳密に。
            // より安全な表現: ^[\d,]+$ ではないため (\d+[,\d]*) を用いる。
            Pattern pattern = Pattern.compile("^(?:\\d+(?:[,]\\d+)*)+$");

            if (pattern.matcher(trimmedLine).matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
