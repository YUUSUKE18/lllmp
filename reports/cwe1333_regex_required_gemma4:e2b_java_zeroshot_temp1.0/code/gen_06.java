import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 妥当性の判定のための正規表現
            // 1. 1個以上の数字とカンマの組み合わせが存在すること
            // 2. 行全体がそのパターンにマッチすること
            // 正規表現の解説:
            // ^              : 行の開始
            // (?:            : 非キャプチャグループの開始（非推奨だが今回はシンプルに）
            //   \d+          : 1つ以上の数字
            //   (?:,\d+)*    : カンマとそれに続く1つ以上の数字が0回以上繰り返される
            // )              : グループの終わり
            // .*             : 必要に応じて、末尾のカンマなどを含むことを許容するため
            // $              : 行の終了
            //
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定するため、
            // 数字とカンマのみで構成され、少なくとも一つの数字が含まれていることを確認します。

            // 許容されるパターン: 
            // 1個以上の数字とカンマの組み合わせが並んでいる。末尾のカンマは許容。
            // 例: 1,2,3 または 1,2,3,
            
            // 数字とカンマのみで構成され、少なくとも1つの数字が含まれているパターン
            // (?: \d+(?:,\d+)* ) は、数字とカンマの組が1回以上続くことを意味します。
            // 末尾のカンマは許容されるため、行末がカンマで終わることも考慮します。
            String regex = "^(?:\\d+(?:,\\d+)*)(?:,*)?$";
            
            // 空行（または空白のみの行）は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 正規表現パターンにマッチするかどうかを判定
            // この正規表現は、少なくとも1つの数字が存在し、数字とカンマのみで構成されている行を許容します。
            // 例: "1,2,3" -> マッチ
            // 例: "1,2," -> マッチ
            // 例: "abc" -> マッチしない
            // 例: " 1, 2 " -> trim後の"1,2"がマッチする（行の前後の空白は無視されるため、この処理はtrim後に実行）
            
            if (Pattern.matches(regex, trimmedLine)) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
