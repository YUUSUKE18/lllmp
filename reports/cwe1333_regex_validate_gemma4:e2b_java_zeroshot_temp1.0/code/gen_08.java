import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視するため、trim()を使用
            String trimmedLine = line.trim();

            // 1. 空行の判定
            if (trimmedLine.isEmpty()) {
                continue;
            }

            // 2. 数字とカンマ以外を含む行の判定
            // 正規表現で、数字とカンマ以外が含まれていないかチェック
            // 許可される文字: 数字 (0-9), カンマ (,)
            // 妥当な行の条件: 少なくとも1文字があり、その中に数字とカンマのみが含まれているか
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue;
            }
            
            // 3. カンマ区切りの整数列が1個以上あるかの判定
            // 妥当であるためには、カンマで区切られて並んでいる必要がある。
            // 末尾のカンマは許容される。
            
            // 処理対象の文字列から末尾のカンマを取り除いて、残った文字列が空でないかチェックする
            String content = trimmedLine;
            if (!content.isEmpty() && content.endsWith(",")) {
                // 末尾のカンマがある場合、それを取り除いた後の文字列が数字のみで構成されているか、
                // またはカンマで区切られた数字列が1つ以上存在するかをチェックする。
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
                
                // 例: "1,2,3" -> OK
                // 例: "1," -> OK (1個の数字列が区切られていると見なせるか？)
                // 例: "," -> NG (空の数字列)
                
                // カンマで分割して、空でない要素が1つ以上あるかを確認する。
                String[] parts = content.split(",");
                
                boolean hasAtLeastOneNumber = false;
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty() && trimmedPart.matches("\\d+")) {
                        hasAtLeastOneNumber = true;
                        break;
                    }
                }
                
                if (hasAtLeastOneNumber) {
                    validLines++;
                }
                
            } else {
                // 末尾のカンマがない場合
                // "1,2,3" のように、カンマで区切られた数字列が存在すればOK
                String[] parts = trimmedLine.split(",");
                boolean hasAtLeastOneNumber = false;
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (!trimmedPart.isEmpty() && trimmedPart.matches("\\d+")) {
                        hasAtLeastOneNumber = true;
                        break;
                    }
                }
                
                if (hasAtLeastOneNumber) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
        scanner.close();
    }
}
