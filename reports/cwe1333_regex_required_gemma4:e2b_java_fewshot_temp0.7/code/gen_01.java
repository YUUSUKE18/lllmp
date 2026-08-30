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
            // ^\s*         -> 行の先頭の空白（無視）
            // (?:[0-9]+,\s*)* -> 1個以上の数字とカンマの組み合わせが0回以上繰り返される（空行やカンマのみを許容する部分を考慮）
            // [0-9]+       -> 少なくとも1個の数字が存在する必要がある
            // (?:,\s*[0-9]+)* -> その後にカンマと数字が続くかもしれない
            // $            -> 行の終わり
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことをチェックする。
            // 末尾のカンマは許容される。
            
            // 妥当なパターンを定義:
            // 1. 行が完全に空（空白のみ）でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字が含まれていること。
            // 4. 末尾のカンマは許容されること。

            // 正規表現の試み:
            // ^\s*                -> 行頭の空白
            // (?:[0-9]+(?:,\s*[0-9]+)*) -> 1つ以上の数字列と、それに続くカンマと数字列の繰り返し
            // \s*$                -> 行末の空白
            // このパターンは、数字とカンマのシーケンスのみを許容し、数字が少なくとも1つあることを暗に含意する。
            // 末尾のカンマの許容を考慮して、より柔軟に定義する。

            // 許容される形式: 数字,数字,... または 数字, または 数字,数字,...
            // 空行や数字とカンマ以外の文字はNG。
            // 少なくとも1つの数字があること。
            // 末尾のカンマは許容。

            // 1. 行の前後の空白を無視して、中身が数字とカンマのみで構成されているか確認する。
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 正規表現: 
            // ^[0-9,]*$ : 行が数字とカンマのみで構成されていることを確認（末尾カンマも含む）
            // (?=.*[0-9]) : 少なくとも1つの数字が含まれていることを確認
            // この二つを組み合わせることで、数字とカンマのみで構成され、かつ数字が含まれていることを保証する。
            String regex = "^[0-9,]*$";
            if (Pattern.matches(regex, line)) {
                // 数字とカンマのみで構成されている場合、少なくとも1つの数字があるか確認する
                if (line.matches(".*[0-9].*")) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
