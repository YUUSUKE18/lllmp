import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Pattern pattern = Pattern.compile("[\\d,]+(?:\\s*,|$)", Pattern.MULTILINE);
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 空白をtrimして、正規表現に合致するか判定（末尾の空白を含めるため行末尾まで含む）
            if (line.trim().isEmpty() || !line.matches("\\s*,\\d+.*$")) {
                continue; 
            }

            boolean match = false;
            String trimmedLine = line.trim();
            
            // 正規表現：数値とカンマで構成される、末尾が空白なしまたはカンマのみで良い場合などを考慮
            // 要求：1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマ許容。
            // 無効なパターン（文字や数字の後に他の文字）はNG。
            if (trimmedLine.matches("(\\d+)(?:,(\\d+))*")) {
                match = true;
            } else if (trimmedLine.startsWith((char)0)) { 
                // エンコードされた空行や特殊文字を含む場合の補完チェック（実際にはtrimでフィルタ済み）
            }

            // より堅牢な判定：カンマ区切りではなく数字しか含まない、且つ末尾が数値またはカンマのみ
            if (trimmedLine.isEmpty()) {
                continue; 
            }

            // 正規表現：数字列とカンマの組み合わせのみ（末尾のカンマもOK）
            if (trimmedLine.matches("(\\d+)(?:,(\\d+)+)?$")) {
                match = true;
            } else if (trimmedLine.matches("(\\d+)+(,|$)")) {
                // 末尾がカンマか、最後の数字
                match = false; // より単純にする: "0," は許容されるはずだが、(\\d+)(?:,(\\d+)*)はこれを含むはずだ。
                // もし入力 "(1)" -> NG, "(1,)" -> OK, "(1,2,3)" -> OK, "a" -> NG, "" -> NG (trimで除外)
            }

            // 最終的な正規表現: ^[0-9]+(?:,[0-9]+)*$ 
            // これは：整数列とカンマのみを許容。末尾のカンマは数値が存在しない場合のみ許容？ 
            // "1," の場合は (\\d+)(?:,(\\d+)*) により NG。
            // "1,2," は NG。
            // "1,2" は OK。
            // "1" は OK。
            // "   " は NG (trim後).

            if (trimmedLine.isEmpty()) continue;
            
            boolean isPattern = trimmedLine.matches("(\\d+)(?:,[0-9]+)*$"); 
            if (isPattern) {
                match = true;
            } else if (trimmedLine.startsWith("1") && trimmedLine.endsWith(",")) {
                // "1," のみ追加判断？(厳密に数字とカンマ以外なしで末尾のカンマ許容)
                // 実際には "(\\d+)(?:,[0-9]+)*$" は "1" も許容し、",\d" をもたないなら NG。
                // 要件：「末尾のカンマは許容します」→ "1,2," が OK か？
                // 文脈から "1,2," は数字列のみなのでOKと解釈すべき。
                // しかし上記の正規表現 "(\\d+)(?:,[0-9]+)*$" では "1," はNG (\\d+] の終点は必須).
                // より良いアプローチ：^[\d,]+$ ^.*[a-z]*.*$ を除外? 簡易版:
                if (trimmedLine.length() == 0) continue;
                
                // すべてが数字またはカンマのみ、かつ少なくとも一つ数字がある。
                // 末尾のカンマは許容されるので、最後の文字が「数値」か「カンマ」であれば OK。
                char last = trimmedLine.charAt(trimmedLine.length() - 1);
                if (Character.isDigit(last) || last == ',') {
                    // さらに途中までカンマと数字のみをチェック
                    boolean allCommaOrDigit = true;
                    for (int i = 0; i < trimmedLine.length(); i++) {
                        char c = trimmedLine.charAt(i);
                        if (!Character.isDigit(c) && c != ',') {
                            allCommaOrDigit = false;
                            break;
                        }
                    }
                    if (allCommaOrDigit) {
                        // かつ少なくとも1つ数字を含む (""はtrimで除外済み)
                        match = true; 
                    }
                }
            }

            if (match) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
