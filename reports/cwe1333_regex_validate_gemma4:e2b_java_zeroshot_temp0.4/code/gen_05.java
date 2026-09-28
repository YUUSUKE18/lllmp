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

            // 妥当性の判定ロジック
            // 1. 数字とカンマ以外を含む行は妥当ではない
            // 2. 1個以上の数字列がカンマで区切られて並んでいること (末尾のカンマは許容)

            // 正規表現を使用して判定する
            // ^: 行の開始
            // (?:[0-9]+(?:,[0-9]+)*): 1つ以上の数字列と、それに続くカンマと数字列の繰り返し
            // (?:,?[0-9]+)*: オプションのカンマと数字列の繰り返し（末尾のカンマを許容するため）
            // $: 行の終了
            
            // よりシンプルな判定：行が数字とカンマのみで構成されているか、かつ、少なくとも1つの数字が含まれているか
            
            boolean isValid = false;
            
            // 1. 数字とカンマのみで構成されているかチェック
            boolean containsOnlyDigitsAndCommas = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c >= '0' && c <= '9') || c == ',')) {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (containsOnlyDigitsAndCommas) {
                // 2. 少なくとも1つの数字が含まれているかチェック
                boolean containsDigit = false;
                for (int i = 0; i < trimmedLine.length(); i++) {
                    if (trimmedLine.charAt(i) >= '0' && trimmedLine.charAt(i) <= '9') {
                        containsDigit = true;
                        break;
                    }
                }
                
                if (containsDigit) {
                    // 3. カンマ区切りで1個以上の数字列があるかチェック
                    // カンマで分割し、各要素が数字のみで構成されているか確認する
                    String[] parts = trimmedLine.split(",");
                    
                    // 末尾のカンマが許容されるため、splitの結果をそのまま評価する
                    // 例: "1,2,3," -> ["1", "2", "3", ""]
                    // 例: "1,2,3" -> ["1", "2", "3"]
                    
                    // 妥当な行は、少なくとも1つの要素が空でないこと、または、
                    // 少なくとも1つの数字列が存在すること。
                    
                    boolean hasAtLeastOneNumber = false;
                    for (String part : parts) {
                        String trimmedPart = part.trim();
                        if (!trimmedPart.isEmpty()) {
                            // 各部分が整数列であることを確認
                            boolean isInteger = true;
                            for (int j = 0; j < trimmedPart.length(); j++) {
                                if (trimmedPart.charAt(j) < '0' || trimmedPart.charAt(j) > '9') {
                                    isInteger = false;
                                    break;
                                }
                            }
                            if (isInteger) {
                                hasAtLeastOneNumber = true;
                                break;
                            }
                        }
                    }

                    if (hasAtLeastOneNumber) {
                        validCount++;
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
