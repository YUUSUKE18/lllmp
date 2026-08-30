import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;

            if (line.isEmpty()) {
                continue;
            }

            List<String> parts = new ArrayList<>();
            int count = 0;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (c == '\n' || c == '\r') break;
                
                boolean isDigit = Character.isDigit(c);
                boolean isComma = c == ',';
                
                if (isDigit) {
                    parts.add(String.valueOf(c));
                    count++;
                } else if (isComma) {
                    if (count > 0) {
                        parts.add("");
                        count = 0;
                    }
                } else if (!Character.isWhitespace(c)) {
                    break; 
                }
            }

            // 再確認: カンマと数字のみの文字列かどうか
            boolean allCommaOrDigit = true;
            for (int i = 0; i < parts.size(); i++) {
                if (!Character.isWhitespace(parts.get(i).charAt(0))) {
                    String partStr = parts.get(i);
                    if (!partStr.isEmpty()) {
                        for (int j = 0; j < partStr.length(); j++) {
                            char ch = partStr.charAt(j);
                            if (!(ch == ',' || Character.isDigit(ch))) {
                                allCommaOrDigit = false;
                                break;
                            }
                        }
                    }
                } else {
                    // 空白のみなら OK にして再処理するか、そのまま OK とする。
                    // 仕様：「数字とカンマ以外を含む行は妥当ではありません」
                    // 「行の前後の空白は無視します」という要件があるが、「空白を含む行」が妥当か否かが問題。
                    // しかし例文「空白区切りの整数列」のように、空文字や空白が許容される場合がある。
                    // 本題：「数字とカンマ以外を含む行は妥当ではありません」→ 空白も外すと解釈すべきか？
                    // 「行の前後の空白は無視します」→ これは入力処理時のトリミングや、末尾空白を無視する文脈だろうか。
                    // しかし本仕様では「1 個以上の数字列がカンマで区切られて並んでいること」と定義され、「空白」自体は数字でもなくカンマでもないため、
                    // 「空白を含む行は妥当ではありません」と解釈するのが自然だが、「前後の空白は無視します」という文脈から、
                    // 空文字や空白のみで始まる/終わることは許容すると捉えるべきか。
                    // より安全に: 数字とカンマ以外が含まれないこと（空白も含む）かつ、少なくとも 1 つの要素があることを判定する。
                    
                    // 再評価：「空白を含む行は妥当ではありません」なら allCommaOrDigit のチェックで OK にしてよいが、
                    // 「前後の空白は無視します」という文脈を考えると、実際には空文字列や空白のみで構成されていても OK と捉えるべきか？
                    // しかし、「数字とカンマ以外を含む行は妥当ではありません」→ 空白も「数字とカンマ以外」なので外す。
                    // よって: すべてが「,」または「数字」の文字列であること、かつ少なくとも 1 つの要素があることをチェック。
                    
                    if (partStr.isEmpty() || partStr.length() > 0) {
                        for (int j = 0; j < partStr.length(); j++) {
                            char ch = partStr.charAt(j);
                            if (!(ch == ',' || Character.isDigit(ch))) {
                                allCommaOrDigit = false;
                                break;
                            }
                        }
                    }
                }
            }

            // 要件再考：「1 個以上の数字列がカンマで区切られて並んでいること」→ つまり、要素（文字列）の数は >= 1。
            // かつ、その要素は「空白」のみでも良いのか？「数字とカンマ以外を含む行は妥当ではありません」という記述から、
            // 「空白のみ」も「数字とカンマ以外」に含まれるため、妥当とはならない。
            // よって: 全ての文字が「,」または「数字」であり、かつ「要素」は存在する必要がある（ただし要素は空文字列でも良いか？）。
            // 例："," → 空文字 x2, 数値 0 → OK?
            // "1," → ["1", ""] → OK?
            // "1" → ["1"] → OK
            // "" → [] → NG (1 個以上必要)
            
            boolean isValid = allCommaOrDigit && !parts.isEmpty();

            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
