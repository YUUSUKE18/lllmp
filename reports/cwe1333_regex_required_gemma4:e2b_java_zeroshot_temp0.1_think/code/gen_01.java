import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントするための変数
        int validCount = 0;

        // 妥当な行を判定するための正規表現パターン
        // パターン: ^[\d]+(?:,[\d]+)*,?$
        // 解説:
        // ^          : 行の開始
        // [\d]+      : 少なくとも1つの数字で開始 (最初の数値を保証)
        // (?:,[\d]+)*: カンマと1つ以上の数字のペアが0回以上繰り返される (カンマ区切りのリスト)
        // ,?         : 末尾にカンマが0回または1回 (末尾のカンマを許容)
        // $          : 行の終了
        final String VALID_LINE_REGEX = "^\\d+(?:,\\d+)*,?$";
        final Pattern pattern = Pattern.compile(VALID_LINE_REGEX);

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する (trimを使用)
                String trimmedLine = line.trim();

                // 空行は妥当ではない
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 正規表現で妥当性を判定
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
