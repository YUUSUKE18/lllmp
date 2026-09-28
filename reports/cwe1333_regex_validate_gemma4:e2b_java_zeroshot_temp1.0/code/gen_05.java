import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（ここではnextLine()で読み込んだ文字列をそのまま検証する）
            // 仕様により、行の内容を評価する。
            
            if (line.trim().isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当性の判定ロジック:
            // 1. 数字とカンマ以外を含む行は妥当ではない。
            // 2. 1個以上の数字列がカンマで区切られて並んでいること。末尾のカンマは許容。

            // 正規表現を使用して、数字とカンマのみで構成されているか、
            // かつカンマで区切られた数字列が存在するかをチェックする。
            
            // この問題の「妥当」の定義を厳密に解釈する。
            // 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで区切られた要素がすべて整数（数字のみ）で構成されていることを意味する。

            // 1. 含まれる文字が数字とカンマのみであるかを確認
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            // 2. カンマで区切られた数字列が1個以上あるかを確認する
            // 区切り文字としてカンマを使い、各部分が数字のみで構成されているか確認する。
            
            // 行全体をカンマで分割する
            String[] parts = line.split(",");
            
            // 空の要素があるか、または要素が数字のみで構成されているかを確認する。
            // 「1 個以上の数字列がカンマで区切られて並んでいる」
            // これは、splitの結果、少なくとも1つの要素があり、それらが数字のみで構成されていることを意味する。
            
            boolean hasValidNumberColumns = false;
            for (String part : parts) {
                // 空文字列を許容する場合（例: ",1,2," は空文字列を含む）
                // 仕様では「1 個以上の数字列」なので、空文字列は無視されるべき。
                if (!part.trim().isEmpty()) {
                    // 部分がすべて数字のみで構成されているかを確認
                    if (part.matches("\\d+")) {
                        hasValidNumberColumns = true;
                    } else {
                        // 数字とカンマ以外の文字（このチェックは上記で既にカバーされているはずだが、念のため）
                        // ここに来ることは上記チェックで排除されるべきだが、
                        // 例: "1,a,2" のように、'a' が含まれていても、splitでは "1", "a", "2" になる。
                        // この問題の意図は、カンマで区切られた各要素が「整数列」であることと解釈する。
                        // 上記の containsOnlyDigitsAndCommas チェックが、この解釈を強化する。
                    }
                }
            }
            
            // 最終的な妥当性の判定：
            // 1. 空行でないこと (すでにチェック済み)
            // 2. 数字とカンマ以外を含まないこと (すでにチェック済み)
            // 3. 少なくとも1つの有効な数字列が存在すること (splitの結果、空でない数字列が1つ以上あること)

            // もし行が "1," なら parts = ["1", ""]。 "1" は有効。 -> 妥当
            // もし行が ",1" なら parts = ["", "1"]。 "1" は有効。 -> 妥当
            // もし行が "," なら parts = ["", ""]。有効な数字列は0。 -> 不妥当
            
            // 妥当な数字列（空でない数字文字列）の数を数える
            int validNumberColumnsCount = 0;
            for (String part : parts) {
                if (!part.trim().isEmpty() && part.matches("\\d+")) {
                    validNumberColumnsCount++;
                }
            }

            if (validNumberColumnsCount >= 1) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
