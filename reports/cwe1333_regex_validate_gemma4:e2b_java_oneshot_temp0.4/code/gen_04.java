import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理する
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 妥当性の判定ロジック: カンマ区切りの整数列であるか
            // 1. 数字とカンマ以外を含まないか
            // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

            // 末尾のカンマを削除して、カンマで分割してみる
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");

            // 1個以上の要素が存在し、かつ、それらの要素がすべて整数であるかを確認する
            boolean isValid = true;
            if (parts.length == 0) {
                // これは、元の行がカンマのみ、または空文字列のみだった場合（例: "," や ""）に発生する可能性があるが、
                // trimmedLineが空でないため、このケースは通常発生しないはず。
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合 (例: "1,,2") や、末尾のカンマ処理で空文字列が残った場合
                        // ただし、仕様上は「1個以上の数字列がカンマで区切られて並んでいる」ことを確認する必要がある。
                        // 厳密には、空の要素が混在している場合は妥当ではないと解釈する。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part.trim());
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていた場合
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
    }
}
