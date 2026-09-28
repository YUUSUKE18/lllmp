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

            // 末尾のカンマを許容しつつ、数字とカンマ以外を含まないかチェックする
            // 妥当な形式: 数字とカンマのみで構成され、1個以上の数字列がカンマで区切られている
            // 末尾のカンマは許容される
            
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;

            // 末尾がカンマの場合、その直前が数字またはカンマである必要がある
            if (trimmedLine.endsWith(",")) {
                if (trimmedLine.length() == 1) { // カンマのみの場合 (例: ",") は不適
                    isValid = false;
                } else {
                    // 末尾のカンマを除いた部分をチェック
                    String content = trimmedLine.substring(0, lastCharIndex);
                    if (content.isEmpty()) { // 例: "," の場合
                        isValid = false;
                    } else {
                        // カンマ区切りの数字列のみをチェック
                        String[] parts = content.split(",");
                        if (parts.length == 0) {
                            isValid = false;
                        } else {
                            for (String part : parts) {
                                if (part.trim().isEmpty()) {
                                    // 区切り文字が連続する場合 (例: ",," や ",," のように空の要素が発生する場合)
                                    isValid = false;
                                    break;
                                }
                                try {
                                    Integer.parseInt(part.trim());
                                } catch (NumberFormatException e) {
                                    // 数字以外のものが含まれている場合
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                // 末尾がカンマでない場合、通常のカンマ区切りとしてチェック
                String[] parts = trimmedLine.split(",");
                if (parts.length == 0) {
                    isValid = false;
                } else {
                    for (String part : parts) {
                        if (part.trim().isEmpty()) {
                            // 空の要素は許容しない (カンマが連続している場合も含む)
                            isValid = false;
                            break;
                        }
                        try {
                            Integer.parseInt(part.trim());
                        } catch (NumberFormatException e) {
                            // 数字以外のものが含まれている場合
                            isValid = false;
                            break;
                        }
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
