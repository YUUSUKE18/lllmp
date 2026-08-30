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
            // 妥当な行は、少なくとも1個の数字列がカンマで区切られている場合
            
            // 末尾のカンマを取り除いた文字列をチェック
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }

            // カンマで分割して、空でない要素があるかチェックする
            String[] parts = content.split(",");
            
            boolean isValid = false;
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    // 各部分が整数であるかチェックする（仕様では「数字列がカンマで区切られて並んでいること」が主だが、
                    // 「数字とカンマ以外を含む行は妥当ではない」という制約を考慮し、ここでは数字のみを想定する）
                    try {
                        Integer.parseInt(part.trim());
                        isValid = true;
                        break; // 1つでも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字以外の文字が含まれていれば、この行は妥当ではない
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
