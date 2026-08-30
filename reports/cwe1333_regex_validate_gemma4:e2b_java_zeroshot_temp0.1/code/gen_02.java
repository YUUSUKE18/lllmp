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
            // 妥当な行は「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // これは、行が数字とカンマのみで構成されていることを意味する。
            // ただし、空行は除外されているため、ここでは数字とカンマのみで構成されているかを確認する。
            
            boolean isValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }

            if (!isValid) {
                continue;
            }

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            // 末尾のカンマは許容される。
            
            // 処理を簡略化するため、行をカンマで分割し、空でない要素が1つ以上あるかを確認する。
            // ただし、末尾のカンマが許容されるため、単純なsplit()だけでは末尾のカンマの扱いが複雑になる。
            
            // 末尾のカンマを削除して処理を単純化する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");

            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された配列の要素数が1以上であり、かつ、その要素がすべて数字列であることを意味する。
            // 仕様では「1個以上の数字列がカンマで区切られて並んでいる」とあるため、
            // 空の要素が含まれていないか、少なくとも1つの数字列が存在すれば良い。
            
            boolean hasDigits = false;
            for (String part : parts) {
                // 空文字列でないことを確認し、それが数字列であることを確認する
                if (!part.isEmpty() && part.matches("\\d+")) {
                    hasDigits = true;
                }
            }

            if (hasDigits) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
