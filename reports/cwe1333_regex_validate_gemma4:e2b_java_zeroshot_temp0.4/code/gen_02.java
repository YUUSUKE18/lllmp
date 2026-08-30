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

            // 妥当性の判定: 1個以上の数字列がカンマで区切られていること
            // 末尾のカンマは許容される
            
            // 1. 末尾のカンマを取り除く（許容される場合があるため）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割して、空でない要素が1つ以上あるかを確認する
            // 正規表現で数字列とカンマのみで構成されているかを確認する方が厳密だが、
            // 仕様は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
            // カンマで分割した結果、数字列が1つ以上存在するかをチェックする。
            
            // カンマで分割
            String[] parts = processedLine.split(",");
            
            boolean isValid = false;
            
            // 分割された要素の中に、空でない数字列が存在するか確認する
            // 厳密には、各要素が数字列であることを確認する必要があるが、
            // 仕様は「1 個以上の数字列がカンマで区切られて並んでいること」なので、
            // 各要素が数字列であるという制約は明示されていない。
            // 「数字列」が何を意味するかを「カンマで区切られたもの」と解釈し、
            // 分割後の要素が空でなければ妥当とする。
            
            // ただし、「数字とカンマ以外を含む行は妥当ではありません」という制約があるため、
            // 厳密に数字とカンマのみで構成されているかを確認する。
            
            boolean onlyDigitsAndCommas = true;
            for (char c : trimmedLine.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    onlyDigitsAndCommas = false;
                    break;
                }
            }
            
            if (!onlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            // 数字とカンマのみで構成されている場合、カンマで分割した結果、
            // 1個以上の非空の要素が存在すれば妥当。
            // 例: "1,2" -> ["1", "2"] (2個) -> 妥当
            // 例: "," -> ["", ""] (2個) -> 妥当ではない（空の数字列ではない）
            // 例: "" (既に除外済み)
            // 例: "," -> processedLine = "" (もし元の行が "," だった場合。これは上記で処理される)
            
            // 処理を再整理: 
            // 1. 空行は除外済み。
            // 2. 数字とカンマ以外は除外済み。
            // 3. カンマで区切られた要素が1つ以上存在するか。
            
            // カンマで分割した後の要素の数をチェックする。
            // 末尾のカンマを考慮して、カンマで分割した結果、空でない要素が1つ以上存在するか。
            
            // 処理対象の文字列を、末尾のカンマを無視して分割する
            String contentToSplit = trimmedLine;
            if (contentToSplit.endsWith(",")) {
                contentToSplit = contentToSplit.substring(0, contentToSplit.length() - 1);
            }
            
            // contentToSplitが空でないことを確認（空行は既に除外済み）
            if (!contentToSplit.isEmpty()) {
                // カンマで分割し、空でない要素が1つ以上あるか
                String[] finalParts = contentToSplit.split(",");
                
                boolean hasValidNumber = false;
                for (String part : finalParts) {
                    // 各部分が数字列であるか、または少なくとも空ではないことを確認する
                    if (!part.trim().isEmpty()) {
                        // 仕様は「1 個以上の数字列がカンマで区切られて並んでいること」
                        // 各部分が数字列である必要はなく、区切りとして機能すれば良い。
                        // ただし、「数字とカンマ以外を含む行は妥当ではない」という制約から、
                        // ここで数字列のみが期待されると解釈する。
                        
                        // ここでは、各部分が数字のみで構成されていることを確認する。（厳密な解釈）
                        if (part.matches("\\d+")) {
                            hasValidNumber = true;
                            break;
                        }
                    }
                }
                
                // 最後のチェック: 
                // 1. 数字とカンマのみで構成されていること (上記でチェック済み)
                // 2. 1個以上の数字列がカンマで区切られていること
                
                // 簡略化された解釈: カンマで区切られた要素が1つ以上存在すればOKとする。
                // ただし、空の要素は無視する。
                
                // 最終的な妥当性の判定ロジックを再構築:
                // 行が数字とカンマのみで構成されており、かつ、カンマで区切られた要素が1つ以上存在する。
                
                // 1. 数字とカンマのみで構成されているか (既にチェック済み)
                // 2. カンマで分割した結果、空でない要素が1つ以上あるか
                
                String[] strictParts = trimmedLine.split(",");
                boolean isTrulyValid = false;
                for (String part : strictParts) {
                    if (!part.trim().isEmpty()) {
                        // この部分が数字列であるかを確認する（仕様の「数字列」を厳密に適用）
                        if (part.matches("\\d+")) {
                            isTrulyValid = true;
                            break;
                        }
                    }
                }
                
                // 末尾のカンマが許容されるため、末尾がカンマで終わる場合、最後の要素が空になる可能性がある。
                // 例: "1,2," -> split -> ["1", "2", ""]。空でない要素は2つ。
                
                if (isTrulyValid) {
                    validCount++;
                }
            }
        }

        System.out.println("valid=" + validCount);
        scanner.close();
    }
}
