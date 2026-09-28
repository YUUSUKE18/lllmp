import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 正規表現を使って、数字とカンマ以外が含まれていないかチェックする
            // この行は「数字とカンマ以外を含む行は妥当ではない」という条件を満たす必要がある。
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // したがって、行全体が数字とカンマのみで構成されているかを確認する。
            boolean containsInvalidChars = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChars = true;
                    break;
                }
            }
            if (containsInvalidChars) {
                continue;
            }

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            // 末尾のカンマは許容される。
            
            // 末尾のカンマを取り除く（末尾のカンマがあっても許容されるため、ここでは一旦除去してチェックする）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、空でない数字列がいくつあるかを確認する
            String[] parts = processedLine.split(",");
            
            // 妥当な条件: 1個以上の数字列がカンマで区切られて並んでいること。
            // これは、分割された要素がすべて空でない（つまり、数字列が存在する）ことを意味する。
            // ただし、元の行が「1個以上の数字列がカンマで区切られて並んでいる」ことを意味する。
            // 例: "1,2,3" -> ["1", "2", "3"] (長さ3) -> 妥当
            // 例: "1," -> ["1"] (長さ1) -> 妥当
            // 例: "," -> [""] (長さ1) -> 妥当ではない（空の要素が1つだけ）
            // 例: "" (元の行が空だった場合、これは既に除外されている)
            
            // 妥当な行の判定基準を再確認:
            // 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで分割した結果、少なくとも1つ以上の非空の文字列（数字列）が存在することを意味する。
            
            boolean isValid = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    // 数字列が存在する
                    isValid = true;
                    break;
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
