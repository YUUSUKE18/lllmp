import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントするための変数
        int validCount = 0;

        // 正規表現パターンを定義します。
        // パターン: 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容する。
        // ^: 行の開始
        // \d+: 1つ以上の数字 (最初の数)
        // (?:,\d*)*: カンマとそれに続く0個以上の数字の繰り返し (区切り)
        // ,?: 末尾にカンマが0回または1回出現 (末尾のカンマを許容するため)
        // $: 行の終了
        // 注: このパターンは、行が空でないこと、かつ数字とカンマのみで構成され、
        // 少なくとも1つの数字列を含むことを保証します。
        final String VALID_PATTERN = "^\\d+(?:,\\d*)*,?$";
        final Pattern pattern = Pattern.compile(VALID_PATTERN);

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            
            // 標準入力の各行を処理
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視するため、行をトリムする
                String trimmedLine = line.trim();

                // 空行の場合はスキップ
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 正規表現を用いて妥当性を判定
                if (pattern.matcher(trimmedLine).matches()) {
                    validCount++;
                }
            }

            // 結果を標準出力に出力
            System.out.println("valid=" + validCount);

        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（通常は競技プログラミング環境では不要だが、堅牢性のために記述）
            // System.err.println("Error reading input: " + e.getMessage());
        }
    }
}
