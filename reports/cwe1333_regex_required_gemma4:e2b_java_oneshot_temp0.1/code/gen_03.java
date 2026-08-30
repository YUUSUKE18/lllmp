import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        // カンマ区切りの整数列を判定するための正規表現
        // ^\s* 表示行の先頭の空白
        // (?:[0-9]+(?:,\s*[0-9]+)*)  1つ以上の数字とカンマの組み合わせ（末尾のカンマも許容）
        // $ 表示行の末尾
        // この正規表現は、少なくとも1つの数字が含まれ、カンマで区切られていることを確認します。
        // 末尾のカンマも許容するため、行全体が数字とカンマのみで構成されていることを確認します。
        // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
        // 少なくとも1つの数字が含まれていることを確認します。
        // 許容されるパターン: 数字, 数字, ..., 数字, (カンマ)
        // 少なくとも1つの数字が含まれていることを確認するパターン:
        // ^\s*                                 行頭の空白
        // (?:[0-9]+(?:,\s*[0-9]+)*)             1つ以上の数字とカンマの組み合わせ
        // \s*$                                 行末の空白
        // このパターンは、数字が少なくとも1つ含まれていることを保証します。
        String pattern = "^\\s*(?:[0-9]+(?:,\\s*[0-9]+)*)\\s*$";

        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して判定するため、行全体をパターンにマッチさせる
            if (Pattern.compile(pattern).matcher(line).matches()) {
                validLines++;
            }
        }
        System.out.println("valid=" + validLines);
    }
}
