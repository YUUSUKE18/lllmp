import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当性の判定
            // 1. 数字とカンマ以外を含む行は妥当ではない
            // 2. 1個以上の数字列がカンマで区切られて並んでいること
            
            // 正規表現で判定: 数字とカンマのみで構成されているか、かつ、少なくとも1つの数字が含まれているか
            // パターン: ^[0-9,]*$ は数字とカンマのみ
            // 妥当な行は、カンマで区切られた整数列（数字のみ）が複数あること。
            
            // 妥当な行の定義を再確認:
            // 「1 個以上の数字列がカンマで区切られて並んでいること」
            // これは、カンマで区切られた要素がすべて整数であることを意味します。
            
            // 行をカンマで分割し、各要素が整数であるか、かつ、少なくとも1つの要素が存在するかを確認する。
            
            // 末尾のカンマは許容されるため、分割前に処理が必要。
            
            // 行全体を評価する: 
            // 1. 数字とカンマ以外を含む行は妥当ではない。
            // 2. 1個以上の数字列がカンマで区切られて並んでいること。
            
            // 厳密に「カンマ区切りの整数列」として妥当であるか判定する。
            // 妥当な行は、カンマで区切られた要素がすべて整数であり、少なくとも1つの要素が存在すること。
            
            // 処理を簡略化するため、行をカンマで分割し、各要素が整数であるかを確認する。
            
            // 行の末尾のカンマを削除して処理を単純化する。
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            if (processedLine.isEmpty()) {
                // 末尾のカンマのみの行（例: "," または "" の場合、trimで空行は既に除外済み）
                // 空行は除外済み。カンマのみの行は、数字列が0個なので不適。
                continue;
            }

            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これは processedLine が空文字列の場合だが、既にチェック済み。
                isValid = false;
            } else {
                // 1個以上の数字列がカンマで区切られて並んでいること。
                // 各部分が整数であるか確認する。
                for (String part : parts) {
                    String trimmedPart = part.trim();
                    if (trimmedPart.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2" や ",1,2")。これは妥当ではない。
                        isValid = false;
                        break;
                    }
                    try {
                        // 整数としてパースを試みる
                        Integer.parseInt(trimmedPart);
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む、または数字としてパースできない場合
                        isValid = false;
                        break;
                    }
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
