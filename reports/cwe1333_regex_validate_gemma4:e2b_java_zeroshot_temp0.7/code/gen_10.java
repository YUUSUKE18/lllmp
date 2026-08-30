import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 妥当な行は、数字とカンマのみで構成されているか、数字とカンマで構成されている必要があります。
            // ここでは、行全体が数字とカンマのみで構成されていることを確認します。
            boolean isValidFormat = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValidFormat = false;
                    break;
                }
            }

            if (!isValidFormat) {
                continue;
            }

            // 3. カンマ区切りの整数列が1個以上並んでいるかどうかの判定
            // 末尾のカンマは許容される。
            
            // 処理対象の文字列から末尾のカンマを削除して、数字列が残っているか確認する。
            String content = trimmedLine;
            
            // 末尾のカンマがある場合、それを削除して確認
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割して、空でない要素が存在するか確認する。
            // ただし、仕様は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
            // 単にカンマで区切られていること、または数字列が存在することを確認すれば良い。
            
            // 妥当なケースの例: "1,2,3", "1,2," (末尾のカンマ許容)
            // 不妥当なケースの例: "", "," (空行は除外済み)
            
            // カンマで分割し、結果の配列の長さが1以上であれば妥当とする。
            // ただし、空の要素が連続する可能性も考慮する必要がある。
            
            // より厳密に「1個以上の数字列がカンマで区切られて並んでいる」を判定する。
            // これは、カンマで区切られた要素の中に少なくとも1つの数字列が存在すれば良い、と解釈できる。
            
            // 最小の条件として、カンマが含まれていて、数字が1つ以上含まれていれば良い。
            
            // 最後のカンマを削除した文字列を再度チェックする。
            String actualContent = trimmedLine;
            if (actualContent.endsWith(',')) {
                actualContent = actualContent.substring(0, actualContent.length() - 1);
            }

            // カンマで分割し、空でない要素が1つ以上存在するか確認する。
            String[] parts = actualContent.split(",");
            
            // 妥当なのは、分割された要素の中に、数字列（空でない文字列）が1つ以上含まれている場合。
            boolean hasDigits = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    // その部分が全て数字で構成されているかを確認する (仕様の「整数列」を厳密に扱うため)
                    boolean allDigits = true;
                    for (char c : part.toCharArray()) {
                        if (!Character.isDigit(c)) {
                            allDigits = false;
                            break;
                        }
                    }
                    if (allDigits) {
                        hasDigits = true;
                        break;
                    }
                }
            }

            // 妥当な行の判定ロジックを簡略化する。
            // 「1個以上の数字列がカンマで区切られて並んでいる」
            // これは、カンマで区切られたときに、少なくとも1つの非空の数字列が存在すれば満たされる。
            // ただし、入力が「1,," のようなケースを許容するかどうか。
            // 「1個以上の数字列」が存在すれば良い。
            
            // 最終的な判定: カンマで区切って、少なくとも1つの数字列が存在すればOK。
            // 最後のカンマは許容されるため、`actualContent`を基準に判定する。
            
            String[] finalParts = actualContent.split(",");
            
            boolean isTrulyValid = false;
            for (String part : finalParts) {
                if (!part.isEmpty()) {
                    // partが完全に整数（数字のみ）であることを確認
                    if (part.matches("\\d+")) {
                        isTrulyValid = true;
                        break;
                    }
                }
            }

            if (isTrulyValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
