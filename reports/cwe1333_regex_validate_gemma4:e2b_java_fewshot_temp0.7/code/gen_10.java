import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマ区切りで数字列が存在するか確認する
            // カンマで分割し、空でない要素があるか、そして数字以外の文字がないかを確認する
            
            // 末尾のカンマを考慮して分割する際に、末尾のカンマが続く場合も考慮する必要があるが、
            // 「1個以上の数字列がカンマで区切られて並んでいる」という条件を満たすかを確認する。
            
            // 末尾のカンマを削除してから分割する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            
            if (parts.length == 0) {
                // これは、元の行がカンマのみ（または空行を処理した後の結果）の場合に発生する可能性があるが、
                // trimmedLineが空でないため、このケースは通常発生しないはず。
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でないことを確認
                    if (part.isEmpty()) {
                        // 連続するカンマや先頭/末尾のカンマが原因で空の要素が生成される場合、
                        // それが「数字列」としてカウントされないように注意が必要。
                        // 仕様：「1個以上の数字列がカンマで区切られて並んでいる」
                        // 空の要素は数字列ではないため、もし空の要素があれば妥当ではないと見なす。
                        // 例: "1,,2" -> ["1", "", "2"]。空の要素があるため不妥当。
                        isValid = false;
                        break;
                    }
                    
                    // 各部分が数字列であることを確認
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字とカンマ以外を含む行は妥当ではない
                        isValid = false;
                        break;
                    }
                }
            }
            
            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
