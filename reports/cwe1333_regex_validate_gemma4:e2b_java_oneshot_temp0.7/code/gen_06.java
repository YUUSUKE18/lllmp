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

            // カンマ区切りの整数列として妥当か判定
            // 1. 数字とカンマ以外が含まれていないか
            // 2. 1個以上の数字列がカンマで区切られているか (末尾のカンマは許容)

            // 末尾のカンマを削除して、カンマで分割を試みる
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }

            // カンマで分割
            String[] parts = processedLine.split(",");

            // 妥当性のチェック
            // 1. 分割された要素がすべて空でないこと (数字列が存在すること)
            // 2. 元の行が空でなかったこと (既にチェック済みだが念のため)

            boolean isValid = true;
            if (parts.length == 0) {
                // trim()で空行以外が来た場合、分割結果が空になることは通常ないが、念のため
                isValid = false;
            } else {
                for (String part : parts) {
                    // 各部分が空でないことを確認する（カンマが連続していないか、数字とカンマ以外の文字がないか）
                    if (part.isEmpty()) {
                        // これは、例えば "1,,2" のようなケースや、連続するカンマが原因で発生する可能性がある
                        // 仕様では「1個以上の数字列がカンマで区切られて並んでいる」ことが求められる。
                        // 連続するカンマは許容されない（空の数字列は許容されない）
                        isValid = false;
                        break;
                    }
                    // 各部分が整数であることを確認する（ここでは、数値以外の文字が含まれていないことを確認する）
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字でない文字が含まれていた場合
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
