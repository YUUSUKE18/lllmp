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
            // 行が数字とカンマのみで構成されているかを確認する
            boolean containsInvalidChar = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsInvalidChar = true;
                    break;
                }
            }
            if (containsInvalidChar) {
                continue;
            }

            // 3. 妥当性の判定 (1個以上の数字列がカンマで区切られているか)
            // 末尾のカンマは許容される。
            
            // 処理を簡略化するため、カンマで分割し、空でない要素が1つ以上存在するかを確認する。
            // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいること」なので、
            // 少なくとも1つの数字が含まれているか、またはカンマのパターンが成立しているかを確認する必要がある。
            
            // 妥当な行の定義を再確認: "1 個以上の数字列がカンマで区切られて並んでいること"
            // 例: "1,2,3" -> 3つの数字列
            // 例: "1," -> 2つの数字列 (1と空) または 1つの数字列と末尾のカンマ
            // 例: "," -> 2つの数字列 (空と空)
            
            // 最も厳密な解釈: カンマで区切られた要素が、すべて数字列であること。
            // 少なくとも1つの数字列が存在すればOKとする。
            
            // カンマで分割する
            String[] parts = trimmedLine.split(",");
            
            // 妥当な行であるためには、少なくとも1つの要素が存在し、
            // その要素が数字列（または空文字列だが、数字列が1つ以上存在すればOK）である必要がある。
            
            boolean hasAtLeastOneNumber = false;
            for (String part : parts) {
                // 空文字列でない部分が数字列であるかを確認する
                if (!part.isEmpty() && part.matches("\\d+")) {
                    hasAtLeastOneNumber = true;
                    break;
                }
            }
            
            // 末尾のカンマが許容されるため、最後の要素が空でも問題ない。
            // 例: "1,2," -> parts = ["1", "2", ""]。hasAtLeastOneNumber = true。OK。
            // 例: "," -> parts = ["", ""]。hasAtLeastOneNumber = false。これは妥当ではない（数字列が0個）。
            
            // 妥当な行は、カンマで区切られた要素の中に少なくとも1つの数字列が含まれていること。
            if (hasAtLeastOneNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
