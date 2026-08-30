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

            // 3. カンマ区切りの整数列の妥当性の判定
            // 妥当とは、「1個以上の数字列がカンマで区切られて並んでいること」
            // 末尾のカンマは許容される。
            
            // 処理を簡略化するため、行をカンマで分割し、空でない要素があるかを確認する。
            // ただし、末尾のカンマが許容されるため、単純なsplit()だけでは不十分な場合がある。
            
            // 末尾のカンマを削除して処理を単純化する（末尾のカンマは許容されるため）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");
            
            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること。
            // これは、分割された配列の要素数が1以上であること、かつ、
            // その要素がすべて数字列（空でない）であることを意味する。
            
            boolean isValidFormat = false;
            for (String part : parts) {
                // 空でない部分が存在すれば、それは数字列である必要がある。
                if (!part.isEmpty()) {
                    // 数字列のみで構成されているか確認
                    boolean isNumeric = true;
                    for (int j = 0; j < part.length(); j++) {
                        if (!Character.isDigit(part.charAt(j))) {
                            isNumeric = false;
                            break;
                        }
                    }
                    if (isNumeric) {
                        isValidFormat = true;
                        break; // 1つでも有効な数字列があればOK
                    }
                }
            }
            
            // 最終的な妥当性の判定ロジックの再検討:
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
            // 例: "1,2,3" -> 3つの数字列。OK
            // 例: "1," -> 1つの数字列と末尾のカンマ。OK (1個以上の数字列)
            // 例: "," -> 0個の数字列。NG
            // 例: "" -> NG (空行で除外済み)
            // 例: "abc" -> NG (数字とカンマ以外を含むで除外済み)
            
            // 妥当な行は、カンマで区切られた要素が1つ以上存在し、それらがすべて数字列であること。
            // 末尾のカンマは許容される。
            
            // 再度、よりシンプルな判定を行う。
            // 行全体をカンマで分割し、空でない要素が1つ以上あれば妥当とする。
            // ただし、行が「数字とカンマのみ」という制約も満たす必要がある。
            
            // 1. 行が数字とカンマのみで構成されているか (上記でチェック済み)
            // 2. カンマで分割した結果、少なくとも1つの非空の数字列が存在するか。
            
            // 処理を再実行し、より厳密に実装する。
            
            // 処理をリセットして、最終的な判定をここに集約する。
            
            // -----------------------------------------------------------------
            // 最終的な判定ロジックの適用
            // -----------------------------------------------------------------
            
            // 1. 行が数字とカンマのみで構成されているか (これは必須)
            boolean passesCharCheck = true;
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    passesCharCheck = false;
                    break;
                }
            }
            if (!passesCharCheck) {
                continue;
            }

            // 2. カンマ区切りの整数列の妥当性
            // 末尾のカンマは許容される。
            
            // 末尾のカンマを削除して分割
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // 空行やカンマのみの行を除外する
            if (content.isEmpty() || content.equals(",")) {
                continue;
            }
            
            // カンマで分割し、要素が1つ以上存在するか確認
            String[] finalParts = content.split(",");
            
            // 1個以上の数字列が区切られているか (つまり、分割された要素が1つ以上あるか)
            if (finalParts.length >= 1) {
                // さらに、分割された要素がすべて数字列であることを確認する。
                boolean allAreDigits = true;
                for (String part : finalParts) {
                    if (part.isEmpty()) {
                        // これは、連続するカンマ（例: "1,,2"）や、末尾のカンマ処理で生じた空文字列を意味する。
                        // 仕様上、"1,," のようなケースは「1個以上の数字列」として解釈されるべきか？
                        // 「1 個以上の数字列がカンマで区切られて並んでいる」
                        // "1,2" -> 2個の数字列。OK
                        // "1,,2" -> 2個の数字列 (1と2)。カンマが連続している。
                        // 空文字列は数字列ではないため、空文字列があればNGとする。
                        allAreDigits = false;
                        break;
                    }
                    // 数字列であることを確認（既にcharチェックで数字とカンマのみ保証されているため、ここでは数字のみ確認すれば十分）
                    for (int k = 0; k < part.length(); k++) {
                        if (!Character.isDigit(part.charAt(k))) {
                            allAreDigits = false;
                            break;
                        }
                    }
                    if (!allAreDigits) break;
                }
                
                if (allAreDigits) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
