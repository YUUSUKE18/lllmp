import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマが許容されるため、行全体をチェックする
            // 妥当である条件: 1個以上の数字列がカンマで区切られて並んでいること。
            // これは、少なくとも1つ以上のカンマが存在するか、または数字のみの列が存在することを意味する。
            // 厳密には、「カンマで区切られている」ことを確認する必要がある。
            // 妥当な形式: 数字とカンマのみで構成され、少なくとも1つの数字が含まれている。

            // 行全体をカンマで分割してみる。
            // 末尾のカンマは許容されるため、分割後の配列の要素の数や内容をチェックする。
            
            // 妥当性の判定ロジックを再定義する:
            // 1. 数字とカンマ以外を含む行は妥当ではない。
            // 2. 空行は妥当ではない。
            // 3. 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。

            // 試行として、行が数字とカンマのみで構成されているかを確認する。
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue;
            }

            // 少なくとも1つの数字が含まれているかを確認する (例: "," や ",," のようなケースは除外したい)
            boolean containsAtLeastOneDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsAtLeastOneDigit = true;
                    break;
                }
            }

            if (containsAtLeastOneDigit) {
                // 数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
                // これは「1個以上の数字列がカンマで区切られて並んでいる」と解釈できる。
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
