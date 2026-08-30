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

            // 末尾のカンマを許容しつつ、カンマ区切りの整数列として妥当かを判定する
            // 妥当な行とは、「1個以上の数字列がカンマで区切られて並んでいる」こと。
            // 末尾のカンマは許容される。
            
            // 末尾のカンマを取り除いたものを処理する
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、各要素が数字列であることを確認する
            String[] parts = content.split(",");
            
            boolean isValid = true;
            if (parts.length == 0) {
                // これは、元の行がカンマのみ（または空行が除外された後の結果）の場合に発生するが、
                // trimmedLineが空でないため、このケースは通常発生しないはず。
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2" や ",1" など）、これは妥当でないと見なすか？
                        // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                        // 空の文字列が区切りとして現れるのは、連続するカンマや先頭/末尾のカンマが原因。
                        // ただし、末尾のカンマは許容されるため、splitの結果が空文字列を生成するケースに注意。
                        // 例: "1,2," -> split("1,2") -> ["1", "2"]。末尾のカンマは既に除去済み。
                        // もし入力が "1,,2" のような場合、split(",")は ["1", "", "2"] となる。
                        // 空の要素が存在する場合、それは「数字列」ではないため、妥当ではないと判断する。
                        isValid = false;
                        break;
                    }
                    try {
                        Integer.parseInt(part);
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていた場合
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
