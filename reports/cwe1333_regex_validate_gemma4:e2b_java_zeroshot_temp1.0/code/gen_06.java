import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視
            String trimmedLine = line.trim();
            
            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
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

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容。
            
            // 末尾のカンマを取り除いた文字列を考える
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 1個以上の数字列が存在するかをチェックする
            // 区切り文字 ',' で分割し、空文字列でない要素が1つ以上あるかを確認する
            String[] parts = processedLine.split(",");
            
            // partsが空でない（つまり元の文字列がカンマだけで構成されていた場合も考慮する必要があるが、
            // 上記で空行は除外されているため、少なくとも数字が含まれている必要がある）
            
            // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する
            // これは、カンマで区切った後に、数字が少なくとも1つ存在することを意味する。
            
            // 完全に数字以外の文字が含まれていないため、partsに含まれる文字列がすべて数字列であるか確認する
            boolean allAreDigits = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // カンマが連続している場合（例: ,,）や、カンマのみの場合を処理
                    continue; 
                }
                // 数字列であることを確認（既に前のステップで数字とカンマ以外がないことは保証されている）
                for (char c : part.toCharArray()) {
                    if (!Character.isDigit(c)) {
                        // これは論理的にありえないはずだが、安全策として
                        allAreDigits = false;
                        break;
                    }
                }
            }

            // 妥当な条件：
            // 1. 少なくとも1つの要素（数字列）が存在すること。
            // 2. カンマの後に数字列が存在すること。
            
            // 簡略化して、もしカンマで分割した結果、数字として解釈できる部分が1つ以上あれば良いとする。
            // 例: "1,2" -> ["1", "2"] (OK)
            // 例: "1," -> ["1", ""] (OK)
            // 例: "," -> ["", ""] (NG, 数字がない)
            // 例: "123" -> ["123"] (OK)
            
            // 少なくとも1つの非空の数値部分が存在すれば妥当とする。
            long count = 0;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    count++;
                }
            }

            if (count >= 1) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
