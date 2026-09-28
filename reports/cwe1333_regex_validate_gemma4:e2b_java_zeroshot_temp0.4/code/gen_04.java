import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視する（trim()を使用）
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマは許容する
            if (trimmedLine.endsWith(",")) {
                // カンマで終わる行は、カンマで区切られた整数列が存在すれば妥当と見なす
                // ただし、カンマのみの行（例: "," や ",,"）は妥当ではない可能性があるため、
                // 少なくとも数字が含まれているかを確認する必要がある。
                // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
                
                // カンマを取り除いた後の文字列をチェック
                String content = trimmedLine.substring(0, trimmedLine.length() - 1);
                if (content.isEmpty()) {
                    // 末尾がカンマのみの行（例: ","）は妥当ではない
                    continue;
                }
                
                // カンマで区切られた部分に数字のみが含まれているかを確認する
                // カンマで分割し、各要素が数字のみで構成されているかを確認する
                String[] parts = content.split(",");
                boolean allAreDigits = true;
                for (String part : parts) {
                    if (!part.isEmpty() && !part.matches("\\d+")) {
                        allAreDigits = false;
                        break;
                    }
                }
                
                if (allAreDigits) {
                    validCount++;
                }
                
            } else {
                // 末尾にカンマがない場合
                // カンマで区切られた整数列が1個以上存在するかをチェックする
                String[] parts = trimmedLine.split(",");
                
                // 少なくとも1つの要素が存在し、その要素がすべて数字のみで構成されているかを確認する
                if (parts.length > 0) {
                    boolean allAreDigits = true;
                    for (String part : parts) {
                        if (!part.isEmpty() && !part.matches("\\d+")) {
                            allAreDigits = false;
                            break;
                        }
                    }
                    if (allAreDigits) {
                        validCount++;
                    }
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
