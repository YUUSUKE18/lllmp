import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;

        // 妥当な行数を数える
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 正規表現による妥当性の判定
            // 妥当なパターン: 1個以上の数字とカンマの組み合わせ。
            // 許容されるのは「1個以上の数字列がカンマで区切られて並んでいること」
            // これは、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            // パターン: (\d+,\s*)*\d+  -> 1つ以上の数字とカンマの組み合わせ。
            // より厳密に「カンマ区切りの整数列」を判定する。
            // 1個以上の数字とカンマの組み合わせで構成されているか、かつ数字が含まれていることを確認する。
            // 許容されるのは「1個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2,3", "1,2,", "1"
            // 少なくとも1つの数字が含まれ、数字とカンマ以外は含まれない。
            
            // 正規表現の解説:
            // ^\s*             -> 行頭の空白（無視されるため、ここでは行全体をチェックする）
            // (?:             -> 非キャプチャグループの開始
            //     \d+         -> 1つ以上の数字
            //     ,?          -> 任意のカンマ（末尾のカンマも許容するため）
            // )+              -> 上記グループが1回以上繰り返される
            // \s*$             -> 行末の空白
            
            // 仕様の再解釈: 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            // 末尾のカンマは許容される。
            
            // パターン: 1つ以上の数字とカンマの組み合わせで構成されていること。
            // 最小のパターンは「1個の数字」または「数字,数字,...」
            // 許容される例: "1", "1,2", "1,2,"
            
            // 以下のパターンは、数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認する。
            // ^\s*             -> 行頭の空白
            // (?:             -> 非キャプチャグループ
            //     \d+         -> 1つ以上の数字
            //     ,?          -> 任意のカンマ（区切りとして）
            // )+              -> 1回以上繰り返す
            // \s*$             -> 行末の空白
            
            // このパターンは、"1,2,3" や "1" はマッチしますが、"abc" や "1a" はマッチしません。
            // ただし、"1," や "," のようなカンマのみの行は除外されるべきか？
            // 「数字列がカンマで区切られて並んでいる」ため、数字が最低1つ必要。
            
            // 厳密に「数字とカンマのみ」で構成され、少なくとも1つの数字が含まれていることを確認する。
            // 許容されるのは、数字とカンマのみで構成され、数字が少なくとも1つ含まれている行。
            String regex = "^\\s*([0-9,]+(\\s*,?[0-9,]+)*)\\s*$";
            
            // 上記のパターンは複雑になるため、より単純に「数字とカンマのみ」で構成され、数字が含まれていることを確認する。
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
            // 末尾のカンマは許容される。
            
            // 妥当な行の判定ロジックを再構築:
            // 1. 行が空でないこと (既にチェック済み)
            // 2. 行に含まれる文字が数字(0-9)とカンマ(,)のみであること。
            // 3. 行に少なくとも1つの数字が含まれていること。
            
            boolean isValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                continue;
            }
            
            // 4. 数字が少なくとも1つ含まれているか確認
            boolean containsDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsDigit = true;
                    break;
                }
            }
            
            if (containsDigit) {
                validCount++;
            }
        }

        // 結果の出力
        System.out.println("valid=" + validCount);
    }
}
