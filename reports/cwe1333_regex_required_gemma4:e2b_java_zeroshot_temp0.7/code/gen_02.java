import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();

            // 妥当性の判定のための正規表現
            // 1. 1個以上の数字列がカンマで区切られている
            // 2. 末尾のカンマは許容される
            // 3. 数字とカンマ以外を含む行は不適
            
            // 正規表現の詳細:
            // ^                : 行の開始
            // (                : グループ開始
            //   \d+            : 1つ以上の数字
            //   (?:,\d+)*      : カンマとそれに続く1つ以上の数字の繰り返し（複数の数字列がある場合）
            // )                : グループ終了
            // (?:,\d+)*        : 最後の数字列の後にカンマが続く場合（末尾のカンマを含む）
            // $                : 行の終了
            
            // よりシンプルに「数字とカンマのみで構成され、少なくとも1つの数字が含まれている」ことを確認する
            // 許容されるパターン: 数字とカンマのみで構成され、空行でないこと。
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られていること。
            
            // 妥当な行のパターン:
            // 少なくとも1つの数字があり、それらがカンマで区切られている。
            // 例: "1,2,3", "1,2,", "1"
            
            // 正規表現: 1つ以上の数字とカンマの組み合わせで構成されていることを確認
            // (数字とカンマのみで構成され、空行でないこと)
            // ^[\d,]*$ は数字とカンマのみを許容するが、空行や"a,b"などは許してしまう。
            
            // 妥当な行の定義を厳密に表現するために、行を分解してチェックする方が確実だが、
            // 仕様に従い正規表現で判定する。
            
            // 妥当な行は、カンマ区切りの整数列が1つ以上存在すること。
            // (数字, 数字, ...) のパターンに一致し、かつ数字が含まれていること。
            // \d+ は少なくとも1つの数字を意味する。
            // (?:,\d+)* は、カンマ区切りで複数の数字列がある場合を許容する。
            // 末尾のカンマを許容するため、最後の要素の後にはカンマがあってもなくても良い。
            
            // 妥当な行のパターン: 1つ以上の数字がカンマで区切られている。
            // これは、数字とカンマのみで構成されており、空行ではないことを前提とする。
            // 正規表現の妥当な解釈:
            // 1. 行が空でないこと。
            // 2. 行が数字とカンマのみで構成されていること。
            // 3. 少なくとも1つの数字が含まれていること。
            
            // 以下のパターンは「数字とカンマのみ」で構成され、かつ「数字」が少なくとも1つ含まれていることを確認する。
            // ^\s*                : 先頭の空白を無視
            // (?:               : 非キャプチャグループ開始
            //   \d+            : 1つ以上の数字
            //   (?:,\d+)*      : カンマとそれに続く数字の繰り返し（0回以上）
            // )                 : グループ終了
            // (?:,\d+)?         : 最後の要素の後にカンマが続くかどうかを任意に
            // $                 : 行の終わり
            
            // 簡略化された判定: 行が空でなく、数字とカンマのみで構成されているか、かつ数字が含まれているか。
            
            // 1. 行が空でないことを確認 (trim()で空文字列でないこと)
            if (!trimmedLine.isEmpty()) {
                // 2. 行が数字とカンマのみで構成されているかチェック
                // このチェックは、行に含まれる文字が \d または , のみであることを確認する。
                boolean containsOnlyDigitsAndCommas = true;
                for (char c : trimmedLine.toCharArray()) {
                    if (!Character.isDigit(c) && c != ',') {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }

                if (containsOnlyDigitsAndCommas) {
                    // 3. 少なくとも1つの数字が含まれているかチェック
                    boolean containsAtLeastOneDigit = false;
                    for (char c : trimmedLine.toCharArray()) {
                        if (Character.isDigit(c)) {
                            containsAtLeastOneDigit = true;
                            break;
                        }
                    }

                    if (containsAtLeastOneDigit) {
                        // 妥当な行と判定
                        validCount++;
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
