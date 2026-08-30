import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        
        // 正規表現の定義
        // ^: 行始点
        // (?:\s*:)? : 空白と冒頭のコロン（オプション）
        // \s*: : 空白（コロンがなくても存在する可能性あり）
        // \S+: 非空白文字列（整数の開始）
        // (?:,\s*\S+)* : カンマで区切られた整数の連続（0回以上許容せず、1回以上必要）
        // $: 行終点
        // 数値自体が数字のみであることを保証するために、各要素に「[-]?\d+' とします。
        // ただし、負の数も含まれる可能性があるため [-]?\d+ を用います。
        Pattern pattern = Pattern.compile(
            "^\\s*:?\\s*" +
            "([-]?\\d+)+" +
            "(?:,\\s*[-]?\\d+)*" +
            "\\s*$"
        );

        int validCount = 0;
        
        while ((line = br.readLine()) != null) {
            // 正規表現に一致するかチェック
            if (pattern.matcher(line).matches()) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
