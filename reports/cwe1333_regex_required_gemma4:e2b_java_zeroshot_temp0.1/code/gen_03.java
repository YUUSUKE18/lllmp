import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 妥当性の判定のための正規表現
            // 1. 1個以上の数字列がカンマで区切られている
            // 2. 末尾のカンマは許容される
            // 3. 空行や数字とカンマ以外の文字を含む行は不適
            // 正規表現の解説:
            // ^: 行の開始
            // (?:[0-9]+(?:,|$))+: 1つ以上の数字列とカンマの組み合わせ。
            //   [0-9]+: 1つ以上の数字
            //   (?:,|$) : カンマまたは行末（末尾のカンマも許容するため）
            // $ : 行の終了
            // この正規表現は、数字とカンマのみで構成され、少なくとも1つの数字列を含むことを確認します。
            // 末尾のカンマが許容されるため、行末にカンマがあってもマッチするように調整します。
            
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認するパターン
            // 数字とカンマのみで構成され、少なくとも1つの数字列が含まれていることを確認
            // 例: 1,2,3 または 1,2,3,
            String regex = "^(?:[0-9]+(?:,|$))+.*$";
            
            // 実際には、行全体が数字とカンマのみで構成され、少なくとも1つの数字が含まれていることを確認します。
            // 末尾のカンマが許容されるため、行の末尾にカンマがあっても良い。
            // 空行や数字とカンマ以外の文字を含まないことを確認するため、行全体をチェックします。
            
            // 妥当な行の定義を再評価:
            // 1. 1個以上の数字列がカンマで区切られている。
            // 2. 末尾のカンマは許容される。
            // 3. 空行、および数字とカンマ以外を含む行は妥当ではない。
            
            // 空行チェック
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 数字とカンマ以外の文字が含まれていないかチェック
            // このチェックは、行が完全に数字とカンマのみで構成されていることを保証します。
            if (!trimmedLine.matches("^[0-9,]*$")) {
                continue;
            }

            // 1個以上の数字列がカンマで区切られているかチェック
            // 少なくとも1つの数字が含まれている必要がある。
            if (!trimmedLine.matches(".*[0-9].*")) {
                continue;
            }
            
            // 妥当な行としてカウント
            validCount++;
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
