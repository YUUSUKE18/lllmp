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
        // これにより、空行や数字とカンマ以外の文字を含む行を排除し、
        // 少なくとも1つの数字列が存在することを保証する。
        final Pattern VALID_LINE_PATTERN = Pattern.compile("^[\d,]+$");

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            
            // 標準入力の各行を処理する
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視する（trim処理）
                String trimmedLine = line.trim();

                // 1. 空行の判定 (trim後の長さが0)
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 2. 正規表現による妥当性の判定
                // 妥当な行は、数字とカンマのみで構成されている必要がある。
                if (VALID_LINE_PATTERN.matcher(trimmedLine).matches()) {
                    validCount++;
                }
            }
        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（通常は競技プログラミング環境では不要だが、堅牢性のために記述）
        }

        // 標準出力へ結果を出力
        System.out.println("valid=" + validCount);
    }
}
