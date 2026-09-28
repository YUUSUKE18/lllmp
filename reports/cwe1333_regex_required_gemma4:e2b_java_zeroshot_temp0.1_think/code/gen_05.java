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
        // パターン解説:
        // ^[\s]*       : 行の先頭の任意の空白文字（無視）
        // (            : グループ開始
        //   \d+        : 1つ以上の数字（最初の数）
        //   (?:,\d+)* : カンマとそれに続く1つ以上の数字の繰り返し（カンマ区切りの残りの数）
        // )            : グループ終了
        // (?:,)?       : オプションの末尾のカンマ（末尾のカンマは許容）
        // [\s]*$       : 行末の任意の空白文字
        // これにより、行が数字とカンマのみで構成され、少なくとも1つの数字を含むことを確認する。
        final String VALID_LINE_PATTERN = "^[\\s]*(\\d+(?:,\\d+)*)(?:,)?[\s]*$";
        Pattern pattern = Pattern.compile(VALID_LINE_PATTERN);

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                // 空行の場合はスキップ
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 正規表現を用いて妥当性を判定
                Matcher matcher = pattern.matcher(line);
                
                // 行全体（空白を含む）に対してマッチングを行う
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
