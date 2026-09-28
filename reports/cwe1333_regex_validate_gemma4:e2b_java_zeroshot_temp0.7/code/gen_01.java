import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            // 空行の場合、妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 妥当性の判定: 1個以上の数字列がカンマで区切られているか
            // 妥当な行は、少なくとも1つの数字が含まれ、かつ数字とカンマのみで構成されている必要がある。
            // 仕様: 「1 個以上の数字列がカンマで区切られて並んでいることです」
            // これは、カンマで区切られた要素がすべて整数であることを意味する。
            
            // 文字列が空でないことを確認済み。
            // 妥当な行は、数字とカンマのみで構成されている必要がある。
            // 数字とカンマ以外の文字が含まれていたら不妥当。
            boolean isPotentiallyValid = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isPotentiallyValid = false;
                    break;
                }
            }

            if (!isPotentiallyValid) {
                continue;
            }

            // さらに、"1 個以上の数字列がカンマで区切られて並んでいる"ことを確認する。
            // これは、カンマで区切られたときに、少なくとも1つの数字列が存在することを意味する。
            // ただし、末尾のカンマは許容される。
            
            // 1. カンマで分割してみる
            String[] parts = trimmedLine.split(",");
            
            // 2. 末尾のカンマの扱いを考慮する
            // 末尾のカンマがあっても、その直前の要素が空でなければ、少なくとも1つの数字列が存在する。
            // 例: "1,2,3" -> ["1", "2", "3"] (長さ3)
            // 例: "1,2," -> ["1", "2", ""] (長さ3)
            // 例: "," -> ["", ""] (長さ2)
            // 例: "" (既に除外済み)
            
            // 妥当であるためには、分割された要素の中に、少なくとも1つの数字列が存在する必要がある。
            // 空文字列の要素（例: 連続するカンマや末尾のカンマで生じる空文字列）を除外して、数字列が残るかを確認する。
            
            boolean hasAtLeastOneNumber = false;
            for (String part : parts) {
                // 空文字列でない部分が数字列であるか確認
                if (!part.isEmpty() && part.matches("\\d+")) {
                    hasAtLeastOneNumber = true;
                    break;
                }
            }
            
            // 妥当な条件: 少なくとも1つの数字列が存在し、かつ、数字とカンマ以外を含まないこと。
            // (isPotentiallyValidがtrueの場合、数字とカンマのみである)
            if (hasAtLeastOneNumber) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
