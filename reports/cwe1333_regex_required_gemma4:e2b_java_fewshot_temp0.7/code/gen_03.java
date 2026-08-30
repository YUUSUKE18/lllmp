import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 正規表現パターン:
            // ^\s*          -> 行の先頭の空白を無視
            // (?:[0-9]+,\s*)* -> 1個以上の数字とカンマの組（数字の後にカンマと空白が続くパターン）の繰り返し
            // [0-9]+       -> 最後の数字列
            // (?:,.*)?     -> 末尾のカンマと任意の文字（末尾のカンマを許容するため）
            // $            -> 行の終わり
            // このパターンは「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要があります。
            // より単純に、数字とカンマのみで構成され、空行でないことを確認します。
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
            // 許容される形式: "1,2,3", "1,2,", "1" (カンマなしも許容されるか？)
            // 「空でない語」の判定に似ており、カンマ区切りの整数列を想定します。
            
            // 1. 行の前後の空白を無視して、行全体が数字とカンマのみで構成されているかを確認する。
            // 2. 空行でないことを確認する。
            
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現: 数字、カンマ、空白（行頭・行末以外）のみで構成されているか、
            // そして少なくとも1つの数字が含まれていることを確認する。
            // 妥当な形式の例: "1,2,3", "1,2,"
            // 妥当でない例: "a,1", "1,2,a", "1,,2" (カンマが連続しない、数字以外が含まれないことを厳密に定義する必要がある)
            
            // 仕様に従い、「1個以上の数字列がカンマで区切られて並んでいる」ことを確認します。
            // 許容されるのは、数字とカンマのみで構成され、数字が少なくとも1つある場合。
            // 末尾のカンマは許容されます。
            // 正規表現: ^\s* (数字とカンマの組み合わせが1回以上ある) \s*$
            // 最小のパターンとして、少なくとも一つの数字とカンマが存在する。
            // 例: "1" は妥当か？ (1個の数字列) -> 妥当と解釈する。
            // 例: "1,2" -> 妥当
            // 例: "1," -> 妥当
            
            // 任意の数字とカンマのシーケンス（数字とカンマのみ）で構成されていることを確認し、
            // 少なくとも1つの数字が含まれていることを確認します。
            // パターン: ^\s*([0-9]+(?:,?[0-9]+)*)(?:,)?\s*$
            // これは複雑すぎるため、より直接的に「数字とカンマ」のみで構成されていることをチェックし、
            // 少なくとも一つの数字が存在するかをチェックします。
            
            // 判定ロジックを再定義:
            // 1. 行が空でないこと (trimmedLine.length() > 0)
            // 2. 行に含まれる文字が、数字 (0-9) とカンマ (,) のみであること。
            // 3. 少なくとも1つの数字が含まれていること。
            
            boolean isFormatValid = true;
            boolean containsDigit = false;
            
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (Character.isDigit(c)) {
                    containsDigit = true;
                } else if (c != ',') {
                    // 数字とカンマ以外が含まれていたら不妥当
                    isFormatValid = false;
                    break;
                }
            }
            
            if (!isFormatValid) {
                continue;
            }
            
            // 念のため、数字が1つ以上含まれていることを確認
            if (containsDigit) {
                // 1個以上の数字列がカンマで区切られている、または単一の数字列として解釈できる
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
