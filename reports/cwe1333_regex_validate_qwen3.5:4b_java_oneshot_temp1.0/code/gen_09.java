import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            
            // 最初の文字が数字または'-'（マイナス）で始まるか確認
            // ただし、単一の「-」だけの場合などは数式として解釈される可能性がありますが、
            // 「整数列」と指定されているため、負の整数のみを許容します。
            char firstChar = trimmed.charAt(0);
            
            boolean isNumber = false;
            if (Character.isDigit(firstChar)) {
                isNumber = true;
            } else if (firstChar == '-') {
                // マイナスの場合、2 目以降が数字であるか確認が必要。
                // 単純に「整数の開始」なので、残りの文字が整数構成になっているかチェックします。
                int len = trimmed.length();
                if (len > 1) {
                    String rest = trimmed.substring(1);
                    boolean allDigits = true;
                    for (int i = 0; i < len - 1; i++) {
                        if (!Character.isDigit(rest.charAt(i))) {
                            allDigits = false;
                            break;
                        }
                    }
                    isNumber = allDigits;
                } else {
                    // "- " のような形は整数ではないが、問題文「数字とカンマ以外を含む行は妥当ではありません」より厳密。
                    // しかし、「-」だけでは数式として成り立たないため不成立とするのが適切か？
                    // 通常整数列の定義では - が最初の allowed character だが単独では無意味。
                    // ここでは「整数」として解釈できないと扱う (例: "-,a" は No, "-" も No とおくか)
                    // 問題文の「数字とカンマ以外を含む行」という記述は、文字列中に 'a' が混ざっている場合を指す。
                    // それより前に「1 個以上の数字列がカンマで区切られて並んでいる」
                    // "-" は数字列ではないので、単体でも不成立と判断します。
                    isNumber = false; 
                }
            }
            
            if (!isNumber) {
                continue;
            }
            
            try {
                // カンマ区切り整数列としてパースを試みる
                String[] parts = trimmed.split(",");
                
                int i = 0;
                for (int k = 0; k < parts.length; k++) {
                    String part = parts[k].trim();
                    if (part.isEmpty()) {
                        // 空の要素（カンマ連続など）がある場合も、問題文「1 個以上の数字列がカンマで区切られている」を解釈すると不成立か？
                        // 通常 CSV 規格では空白は許容だが、整数パース時にはエラーになる。
                        // 例: "1,2" -> OK, "1,,2" -> No (空文字列がないので OK とすべきか？)
                        // 問題文：「末尾のカンマは許容します」とあるが、「数字とカンマ以外を含む行」も No.
                        // 空白のみは無視するとあるが、部分として空でないか確認。
                        if (part.isEmpty()) {
                            continue; 
                        }
                    } else {
                        // 文字が整数であるかチェック
                        try {
                            Integer.parseInt(part);
                        } catch (NumberFormatException e) {
                            isNumber = false;
                            break;
                        }
                    }
                }
                
                if (isNumber) {
                    validCount++;
                }
            } catch (Exception e) {
                // split または処理エラーがあれば不成立
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
