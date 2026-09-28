import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない (仕様より)
                continue;
            }

            // カンマ区切りの整数列として妥当かを判定
            // 妥当なのは、1個以上の数字列がカンマで区切られて並んでいること。
            // 末尾のカンマは許容される。
            
            // 1. 末尾のカンマを取り除く（許容されるため）
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // 2. カンマで分割し、各要素が整数であることを確認する
            // ただし、空の要素が連続して存在する場合（例: ",," や ",1,,2"）も考慮する必要がある。
            // 仕様：「1 個以上の数字列がカンマで区切られて並んでいること」
            
            String[] parts = processedLine.split(",");
            boolean isValid = false;
            
            // 数字列が存在し、それらがカンマで区切られているかを確認する
            // partsの要素が空でないものが1つ以上あれば、それは数字列の存在を示唆する。
            // ただし、元の行が数字とカンマ以外を含まないという制約も考慮する。
            
            // より厳密に「数字列のみ」で構成されているかを確認するため、
            // 各部分が整数に変換可能であり、かつ、数字とカンマ以外を含まないかを確認する。
            
            // ここでは、元の行が「数字とカンマのみ」で構成されているか、
            // そして「1個以上の数字列」が区切られているかを判定する。
            
            boolean containsOnlyDigitsAndCommas = true;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    containsOnlyDigitsAndCommas = false;
                    break;
                }
            }

            if (!containsOnlyDigitsAndCommas) {
                continue; // 数字とカンマ以外を含む行は妥当ではない
            }

            if (parts.length > 0) {
                // 分割された部分が空でないものが1つ以上あれば妥当
                // 例: "1,2" -> ["1", "2"] (length=2) -> OK
                // 例: "," -> ["", ""] (length=2) -> 数字列がないためNG
                // 例: "1," -> ["1", ""] (length=2) -> 妥当 (末尾のカンマは許容)
                
                boolean hasAtLeastOneNumber = false;
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        try {
                            Integer.parseInt(part);
                            hasAtLeastOneNumber = true;
                        } catch (NumberFormatException e) {
                            // これは上記のcontainsOnlyDigitsAndCommasチェックで既に除外されるはずだが、念のため
                            hasAtLeastOneNumber = false;
                            break;
                        }
                    }
                }
                
                if (hasAtLeastOneNumber) {
                    validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
