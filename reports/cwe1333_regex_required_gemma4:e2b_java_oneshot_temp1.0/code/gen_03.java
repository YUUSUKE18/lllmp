import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) {
                break;
            }

            // 正規表現パターン: 1つ以上の数字とカンマが交互に現れることを確認。
            // 末尾のカンマは許容される。
            // \d+ は1つ以上の数字
            // (?:,\d*)* はカンマとそれに続く0個以上の数字の繰り返し（カンマ区切りで数字が続いていること）
            // ここでは、行全体が「数字とカンマ」のみで構成され、1つ以上の数字が含まれていることを確認する。

            // 判定ロジックの簡略化と正規表現の適用：
            // 1. 空行は妥当ではない。
            // 2. 数字とカンマ以外が含まれていないか。
            // 3. 1個以上の数字列がカンマで区切られているか。

            // 妥当な行の判定のための正規表現:
            // ^[0-9,]*$ : 行が数字とカンマのみで構成されていることを確認する。
            // このパターンだけでは「1個以上の数字列」の存在を保証しないため、後続のチェックが必要。
            
            // より厳密なチェック:
            // 1. 行が空でない（trim()でチェック）
            // 2. 行が数字とカンマのみで構成されているか
            // 3. 少なくとも1つの数字が含まれているか (数字列が1つ以上あること)

            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 1. 数字とカンマ以外の文字が含まれていないかチェック
            // [^0-9,]* は数字またはカンマ以外の文字が0回以上あることを意味する。
            // このパターンが0文字でなければ、無効。
            if (!trimmedLine.matches("[0-9,]*")) {
                continue; // 数字とカンマ以外の文字を含む行は妥当ではない
            }

            // 2. 少なくとも1つの数字が含まれているかチェック
            // 数字が含まれていない行（例: "," や ",,"）は妥当ではない。
            boolean containsDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsDigit = true;
                    break;
                }
            }

            if (containsDigit) {
                // 少なくとも1つの数字が含まれており、数字とカンマのみで構成されている
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
