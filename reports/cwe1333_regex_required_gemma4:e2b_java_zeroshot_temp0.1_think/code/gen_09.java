import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントするための変数
        int validCount = 0;

        // 標準入力から読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;

            // 各行を読み込み、検証する
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                // 1. 空行は妥当ではない
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 2. 正規表現による妥当性の判定
                // 仕様: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。
                // パターン解説:
                // ^[\d,]+      : 行が数字またはカンマで始まっていること（少なくとも1文字）。
                // (?:,\d+)*    : カンマと1つ以上の数字のペアが0回以上繰り返されること。
                // ,?           : 末尾にカンマが0回または1回あること（末尾のカンマを許容）。
                // $            : 行の終わり。
                String regex = "^[\\d,]+(?:,\\d+)*,?$";
                
                Pattern pattern = Pattern.compile(regex);
                Matcher matcher = pattern.matcher(trimmedLine);

                if (matcher.matches()) {
                    validCount++;
                }
            }

        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（通常は無視）
        }

        // 結果を標準出力に出力
        System.out.println("valid=" + validCount);
    }
}
