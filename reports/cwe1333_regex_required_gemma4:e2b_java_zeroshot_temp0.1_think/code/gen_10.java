import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントするための変数
        int validCount = 0;

        // 妥当な行を判定するための正規表現パターン
        // ^[\d,]+$ : 行全体が1文字以上の数字(\d)またはカンマ(,)のみで構成されていることを要求する。
        // これにより、空行や数字以外の文字を含む行は除外される。
        // また、+により、少なくとも1つの数字が含まれていることを保証する。
        final String VALID_LINE_PATTERN = "^[\\d,]+$";
        final Pattern pattern = Pattern.compile(VALID_LINE_PATTERN);

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            
            // 標準入力の各行を処理する
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する
                String trimmedLine = line.trim();

                // 空行は妥当ではないためスキップ
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 正規表現を用いて妥当性を判定する
                if (pattern.matcher(trimmedLine).matches()) {
                    validCount++;
                }
            }

        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（通常は無視またはログ出力）
        }

        // 結果を標準出力に出力する
        System.out.println("valid=" + validCount);
    }
}
