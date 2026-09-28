import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;

        // 妥当な行の数をカウントする
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行のチェック
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 正規表現による妥当性の判定
            // パターン: 1個以上の数字とカンマの組み合わせ。末尾のカンマは許容する。
            // ^: 行の先頭
            // (?:[0-9]+(?:,[0-9]+)*): 1つ以上の数字がカンマで区切られているパターン
            // (?:,|$)?: 最後のカンマまたは行末（任意）
            // このパターンは、少なくとも1つの数字列が存在することを要求します。
            // より厳密に「カンマ区切りの整数列」として、数字とカンマのみで構成され、少なくとも1つの数字列があることを確認します。

            // 妥当な行の定義:
            // - 数字とカンマのみで構成されていること。
            // - 少なくとも1つの数字列が含まれていること。
            // - 末尾のカンマは許容されること。

            // 正規表現の詳細な解説:
            // ^                          : 行の先頭
            // (?:                         : 非キャプチャグループ（数字列の繰り返し）
            //     [0-9]+                  : 1つ以上の数字
            //     (?:,[0-9]+)*           : カンマとそれに続く数字の繰り返し（1つ以上の数字列の後にカンマが続く）
            // )                          : グループの終わり
            // (?:,|$)                     : 最後の要素がカンマまたは行末であること（末尾のカンマを許容するため）

            // より単純に、「数字とカンマのみ」で構成され、「少なくとも1つの数字」が含まれていることを確認する。
            // 妥当なパターン: 1つ以上の数字とカンマの組み合わせ。
            // 例: "1,2,3", "100", "1,2,"
            String regex = "^(?:[0-9]+(?:,[0-9]+)*)(?:,|$)";
            
            // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列が存在することを許容します。
            // 末尾のカンマも許容します。
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(trimmedLine);

            if (matcher.matches()) {
                validCount++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validCount);
    }
}
