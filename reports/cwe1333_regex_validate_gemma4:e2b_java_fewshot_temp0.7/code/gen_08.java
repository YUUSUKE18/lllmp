import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理するために、行をトリムする
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容しつつ、カンマで区切られた整数列であることを確認する
            // 末尾のカンマがあっても、split(",")の結果の要素数と、元の文字列がカンマで終わるかをチェックする
            
            // 末尾のカンマを削除して、カンマで分割を試みる
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割する
            String[] parts = content.split(",");
            
            // 空でない要素が存在し、それらがすべて整数に変換可能であることを確認する
            boolean isValid = true;
            if (parts.length == 0) {
                // contentがカンマのみだった場合（例: ","）、これは妥当ではない
                isValid = false;
            } else {
                for (String part : parts) {
                    if (part.isEmpty()) {
                        // カンマが連続している場合（例: "1,,2" や "1,"）、これは妥当ではない
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
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
