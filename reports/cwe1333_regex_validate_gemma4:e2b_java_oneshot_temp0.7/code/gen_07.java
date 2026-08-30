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
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを削除して処理する
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割して、空でない要素が存在するか確認する
            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            for (String part : parts) {
                if (part.isEmpty()) {
                    // カンマが連続している場合など、空の要素が出現する可能性があるが、
                    // 仕様では「1 個以上の数字列がカンマで区切られて並んでいること」をチェックする。
                    // 空の文字列がpartsに含まれるのは、例えば "1,,2" のようなケース。
                    // 厳密に「1 個以上の数字列」が区切られていることを確認するため、
                    // 空の要素が含まれる場合は不妥当とする。（ただし、末尾のカンマは許容）
                    // ここでは、各要素が数字列であることを確認する。
                    continue;
                }
                try {
                    Integer.parseInt(part.trim());
                } catch (NumberFormatException e) {
                    // 数字以外のものを含んでいたら不妥当
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                // 1個以上の数字列がカンマで区切られて並んでいることを確認
                // 処理した文字列が空でなく、かつ数字列のみで構成されていた場合、妥当とする。
                // ただし、元の行がカンマで区切られた構造を持つことが重要。
                // 処理後の文字列が空でなければ、それは数字列で構成されていたことを意味する。
                if (!processedLine.isEmpty()) {
                     validLines++;
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
