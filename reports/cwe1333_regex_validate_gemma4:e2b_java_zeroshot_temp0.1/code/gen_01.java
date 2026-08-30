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
            
            // 処理を簡略化するため、行をカンマで分割し、各要素が空でないかを確認する。
            // ただし、仕様は「1個以上の数字列がカンマで区切られて並んでいる」なので、
            // 少なくとも1つの数字列が存在すれば良い。
            
            // 末尾のカンマを考慮して、行を処理する。
            String content = trimmedLine;
            
            // 末尾のカンマがあれば取り除く（後続の処理を単純化するため）
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // カンマで分割
            String[] parts = content.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された要素の数が1以上であり、かつ、その要素がすべて数字列であることを意味する。
            // 仕様の「1 個以上の数字列がカンマで区切られて並んでいる」を満たすためには、
            // 分割後の要素がすべて空でない（つまり、カンマが連続していない、または数字列が連続している）ことを確認する必要がある。
            
            // より厳密に「カンマ区切りの整数列」として解釈し、数字列が1つ以上存在するかを確認する。
            // 1. 空行は除外済み。
            // 2. 数字とカンマ以外は除外済み。
            
            // 少なくとも1つの数字列が存在すれば妥当。
            boolean hasNumber = false;
            for (String part : parts) {
                if (!part.isEmpty()) {
                    // その部分がすべて数字であることを確認
                    boolean allDigits = true;
                    for (char c : part.toCharArray()) {
                        if (!Character.isDigit(c)) {
                            allDigits = false;
                            break;
                        }
                    }
                    if (allDigits) {
                        hasNumber = true;
                        // 妥当な数字列が1つ以上見つかったので、この行は妥当と見なす。
                        break;
                    }
                }
            }

            if (hasNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
