import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            try {
                // 正規表現: 空白を無視し、末尾のカンマを許容し、空でない数字列がカンマで区切られていることを確認
                // ^[0-9,]+$ は 文字のみが数字かカンマであることを保証する
                // ただし、数字とカンマ以外が含まれることが「妥当ではない」条件であるため、
                // 正規表現は入力に含まれる文字が全て数字やカンマである必要がある。
                // また、1 個以上の数字列が存在する必要があり、数字列の間はカンマである必要がある。
                // 「空でない語」という要件から、単に空白を含むだけでよくても「数値」が含まれていない行は NG。
                // 具体的な正規表現: ^[\s]*[0-9]+(\s*[,\s]+[0-9]+)*$ 
                // これにより、空白で始まり、数字列がカンマ（または空白を含んだカンマ）で区切られ、最後まで終わることを保証し、
                // 数字とカンマ以外の文字が含まれていないことをチェックする。
                if (line.matches("^\\s*[0-9]+(?:\\s*,\\s*[0-9]+)*\\s*$")) {
                    validLines++;
                }
            } catch (Exception e) {
                // 正規表現の例外などは発生しないが、安全性のため無視
            }
        }
        System.out.println("valid=" + validLines);
    }
}
