import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当な行の判定ロジック
            boolean isValid = false;
            
            // 1. 数字とカンマ以外の文字が含まれていないかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (containsOnlyDigitsAndCommas) {
                // 2. 1個以上の数字列がカンマで区切られているかチェック
                // 末尾のカンマは許容する
                
                // カンマで分割してみる
                String[] parts = trimmedLine.split(",");
                
                // 分割された要素のうち、空でないものが1つ以上存在するかどうか
                // 末尾のカンマがある場合、split(",")の結果には空文字列が含まれる可能性がある。
                // 例: "1,2," -> ["1", "2", ""]
                // 例: "1,2" -> ["1", "2"]

                // 妥当なのは、少なくとも1つの非空の数値列がある場合。
                boolean hasValidNumber = false;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        // さらに、その部分がすべて数字であることを確認する必要があるが、
                        // 1.のチェックで数字とカンマ以外が含まれていないことが保証されている。
                        //    したがって、空でない文字列が1つでもあれば、それは「数字列」と見なせる。
                        hasValidNumber = true;
                        break;
                    }
                }

                if (hasValidNumber) {
                    isValid = true;
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
