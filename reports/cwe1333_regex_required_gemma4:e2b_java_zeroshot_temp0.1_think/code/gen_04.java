import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 標準入力から読み込む
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;

        // 妥当な行数をカウントする
        String line;
        try {
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                // 1. 空行は妥当ではない
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 2. 正規表現による妥当性の判定
                // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
                // 末尾のカンマは許容する。数字とカンマ以外を含む行は妥当ではない。
                
                // 正規表現の解説:
                // ^                  : 行の開始
                // [\d,]*             : 0個以上の数字またはカンマ（数字とカンマ以外の文字は許容しない）
                // \d                 : 少なくとも1つの数字が存在すること（必須条件）
                // [\d,]*$            : その後に続く任意の数字またはカンマ
                //
                // このパターンは、行が数字とカンマのみで構成されており、かつ少なくとも1つの数字を含むことを保証する。
                String regex = "^[\\d,]*\\d[\\d,]*$";
                
                // 注意: JavaのString.matches()は行全体をマッチさせるため、trim()した文字列に対して適用する。
                if (Pattern.matches(regex, trimmedLine)) {
                    validCount++;
                }
            }
        } catch (IOException e) {
            // 入力エラー処理（通常は無視）
        }

        // 標準出力へ結果を出力
        System.out.println("valid=" + validCount);
    }
}
