import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
        // 妥当な行数をカウントするための変数
        int validCount = 0;

        // 妥当な行を判定するための正規表現パターン
        // このパターンは、行が数字、カンマ、空白のみで構成されており、かつ少なくとも1つの数字を含むことを確認します。
        // ^[\s,]* : 行の先頭から、空白またはカンマが0回以上続く
        // \d+      : 1つ以上の数字（これが少なくとも1つの数字列が存在することを示す）
        // [\s,]*$  : 行の末尾まで、空白またはカンマが0回以上続く
        // このパターンは、行が「カンマ区切りの整数列」の形式を満たしているかを判定します。
        final String VALIDATION_REGEX = "^[\\s,]*\\d+.*$";
        final Pattern pattern = Pattern.compile(VALIDATION_REGEX);

        // 標準入力から行を読み込む
        try (BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = br.readLine()) != null) {
                // 行の前後の空白を無視するため、ここでは読み込んだ行をそのまま検証します。
                // ただし、仕様に基づき、行全体が上記のパターンに一致するかを判定します。
                
                // 行が完全に空行（readLine()がnullを返す）でないことを確認
                if (line != null) {
                    // 行全体を検証
                    if (pattern.matcher(line).matches()) {
                        validCount++;
                    }
                }
            }
        } catch (IOException e) {
            // 入力エラーが発生した場合の処理（通常は無視されることが多い）
        }

        // 結果を標準出力に出力
        System.out.println("valid=" + validCount);
    }
}
