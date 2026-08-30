import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視
            String trimmedLine = line.trim();

            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを考慮し、数字とカンマのみで構成されているかチェックする
            // 妥当な行: 1個以上の数字列がカンマで区切られている
            // 妥当な形式: 数字,数字,... または 数字,数字,... ,
            
            // 妥当性を判定するために、カンマで分割し、各要素が数字のみで構成されているかを確認する
            // ただし、末尾のカンマは許容されるため、split(",")で区切る際に注意が必要。
            
            // 1. 末尾のカンマを取り除く（もしあれば）
            String content = trimmedLine;
            if (content.endsWith(",")) {
                content = content.substring(0, content.length() - 1);
            }
            
            // 2. カンマで分割して要素をチェック
            String[] parts = content.split(",");
            
            boolean is_valid = false;
            
            // 少なくとも1つの非空の数字列が存在する必要がある
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        Integer.parseInt(trimmedPart);
                        is_valid = true;
                        break; // 1つでも有効な数字列があればOK
                    } catch (NumberFormatException e) {
                        // 数字以外が含まれていた場合、この行は不妥当
                        is_valid = false;
                        break;
                    }
                }
            }

            // 妥当な行のカウント
            if (is_valid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
