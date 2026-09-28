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
            // 妥当であるためには、少なくとも1個の数字列がカンマで区切られている必要がある。
            // これは、行に数字とカンマのみが含まれ、完全に空でないことを意味する。
            // ただし、仕様の「1 個以上の数字列がカンマで区切られて並んでいること」を厳密に解釈する。
            // 妥当な行は、数字とカンマのみで構成され、空でないこと。
            
            boolean isValid = false;
            
            // 行をカンマで分割して、各要素が数字列であるかを確認する
            // 正規表現で数字とカンマのみで構成されているかを確認する方が、
            // 「数字列がカンマで区切られて並んでいる」という条件をより正確に捉えられる。
            
            // 1. 数字とカンマ以外の文字が含まれていないか確認
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (containsOnlyDigitsAndCommas) {
                // 2. 1個以上の数字列がカンマで区切られているか確認
                // カンマで分割し、空でない要素が1つ以上あれば妥当。
                // 末尾のカンマは許容されるため、行全体を処理する。
                
                // 行をカンマで分割する。末尾のカンマがあっても、最後の要素は空文字列になる可能性がある。
                // 例: "1,2," -> ["1", "2", ""]
                String[] parts = trimmedLine.split(",");
                
                // 妥当であるためには、少なくとも1つの数字列が存在する必要がある。
                // これは、分割された要素の中に、数字のみで構成されたものが存在すればよい。
                // 空の要素（""）は、カンマが連続している場合や末尾のカンマによって生じうる。
                
                boolean hasAtLeastOneNumber = false;
                for (String part : parts) {
                    // partが空文字列でなく、かつ数字のみで構成されているかを確認する
                    if (!part.isEmpty() && part.matches("\\d+")) {
                        hasAtLeastOneNumber = true;
                        break;
                    }
                }
                
                if (hasAtLeastOneNumber) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
