import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定する正規表現
        // ^\s* - 行の先頭の空白
        // (?:[0-9]+(?:,.*)?)* - 1つ以上の整数列とカンマの組み合わせ（ここでは単純に数字とカンマのシーケンスをチェック）
        // この問題の「1 個以上の数字列がカンマで区切られて並んでいる」という条件を満たすために、
        // 少なくとも1つの数字が含まれ、カンマで区切られている構造をチェックします。
        // より厳密に「カンマで区切られた整数列」を判定するために、数字とカンマのみを含むパターンを考えます。
        // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要があります。
        // 末尾のカンマは許容されます。
        // 例: 1,2,3, または 1,2,3,
        // 空行や数字とカンマ以外の文字は許容されません。

        // 妥当な行の判定ロジックを正規表現で表現します。
        // 1. 行が空でないこと
        // 2. 行が数字とカンマのみで構成されていること
        // 3. 少なくとも1つの数字が含まれていること (カンマのみの行は不適)

        // 正規表現の解説:
        // ^\s* : 行の先頭の空白
        // (?:[0-9]+(?:,|$))* : 1つ以上の数字の後にカンマが続く、または行末が続くパターンを繰り返す。
        // これだと複雑になるため、よりシンプルに「数字とカンマのみ」の文字列であるかをチェックし、
        // その後、数字が少なくとも1つあるかをチェックする方が実装しやすいかもしれません。
        // しかし、仕様は「正規表現を用いて」と指定されているため、正規表現で直接判定を試みます。

        // 妥当な行のパターン: 数字とカンマのみで構成され、数字が少なくとも1つ含まれている。
        // (?:[0-9][0-9,]*)*[0-9] : 任意の数字とカンマのシーケンス
        // このパターンは「1個以上の数字がカンマで区切られている」ことを直接表現するのは難しいです。
        // 以下のパターンで「数字とカンマのみ」という構造を許容し、その後に数字の存在をチェックします。

        // より直接的に「数字とカンマのみ」という制約に焦点を当てます。
        // ^\s* : 行頭の空白
        // [0-9,]* : 数字またはカンマが0回以上続く
        // $ : 行末
        String pattern = "^\\s*[0-9,]*\\s*$";

        while ((br.readLine() != null)) {
            String line = br.readLine();
            if (line == null) break;

            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現による検証
            // 1. 数字とカンマのみで構成されているか (末尾のカンマは許容)
            // 2. 少なくとも1つの数字が含まれているか
            
            // 1. 数字とカンマのみのチェック (末尾のカンマは許容されるため、数字が一つ以上存在すればOK)
            if (Pattern.matches("^\\s*[0-9,]*\\s*$", line)) {
                // 2. 少なくとも1つの数字が含まれているか
                boolean containsDigit = false;
                for (char c : line.toCharArray()) {
                    if (Character.isDigit(c)) {
                        containsDigit = true;
                        break;
                    }
                }
                
                if (containsDigit) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
