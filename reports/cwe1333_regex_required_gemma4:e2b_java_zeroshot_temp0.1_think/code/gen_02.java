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

                // 1. 空行の判定
                if (trimmedLine.isEmpty()) {
                    continue;
                }

                // 2. 正規表現による妥当性の判定
                // 妥当な行のパターン:
                // 1. 少なくとも1つの数字が含まれていること。
                // 2. 数字とカンマ以外の文字が含まれていないこと。
                // 3. カンマ区切りの整数列の構造を持っていること（末尾のカンマは許容）。
                
                // パターン解説:
                // ^: 行の開始
                // [\d,]*: 0個以上の数字またはカンマ（行全体がこれらのみで構成されていることを確認）
                // (?=.*?\d): 肯定先読み。この行の中に少なくとも1つの数字が存在することを確認する。
                // [^\d,]*$: 残りの文字は0個以上。
                
                // よりシンプルに、行全体が数字とカンマのみで構成されていることを確認し、
                // さらに数字が少なくとも1つ含まれていることを確認する。
                
                // 構造チェック用の正規表現:
                // 1. 行全体が数字とカンマのみで構成されているか ([\d,]+ の少なくとも1つが必要)
                // 2. 内部に少なくとも1つの数字が含まれているか
                
                // 妥当な行の構造をチェックする正規表現:
                // ^[\d,]+(?:,\d+)*[,]?$
                // これは、数字で始まり、カンマ区切りで、末尾にカンマがあっても良い、という構造を表現します。
                
                // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するため、
                // 以下の2段階で検証を行います。
                
                // ステップ1: 数字とカンマ以外の文字が含まれていないかチェック
                if (!Pattern.matches("^[\\d,]*$", line)) {
                    continue; // 数字とカンマ以外の文字が含まれていれば無効
                }

                // ステップ2: 少なくとも1つの数字が含まれているかチェック
                // この行が空行でないことが保証されているため、数字が含まれているかを確認する。
                if (Pattern.matcher(line).find("\\d")) {
                    validCount++;
                }
            }

        } catch (IOException e) {
            // 入力エラー処理（通常は無視）
        }

        // 結果を出力
        System.out.println("valid=" + validCount);
    }
}
