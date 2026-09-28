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
            // 妥当な行は、数字とカンマのみで構成され、少なくとも1つの数字が含まれている必要がある。
            
            // 末尾のカンマを取り除く（末尾のカンマは許容されるため、ここでは一旦そのまま扱う）
            // 妥当な形式: 数字とカンマのみで構成され、少なくとも1つの数字が含まれている。
            
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;
            
            // 末尾がカンマの場合、そのカンマを除いた部分が数字とカンマのみで構成されているか確認する
            if (lastCharIndex >= 0 && trimmedLine.charAt(lastCharIndex) == ',') {
                // 末尾がカンマの場合、その前の部分が数字とカンマのみで構成されているか確認する
                // 少なくとも1つの数字が含まれている必要がある
                int digitCount = 0;
                for (int i = 0; i < lastCharIndex; i++) {
                    char c = trimmedLine.charAt(i);
                    if (Character.isDigit(c)) {
                        digitCount++;
                    } else if (c != ',') {
                        // 数字とカンマ以外が含まれていたら不適
                        isValid = false;
                        break;
                    }
                }
                if (isValid && digitCount == 0) {
                    // カンマのみの場合（例: "," または ",,"）は不適
                    isValid = false;
                }
            } else {
                // 末尾がカンマでない場合、すべてが数字またはカンマである必要がある
                for (int i = 0; i < trimmedLine.length(); i++) {
                    char c = trimmedLine.charAt(i);
                    if (!Character.isDigit(c) && c != ',') {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    // 数字が一つも含まれていない場合（例: "," または ",,"）は不適
                    boolean hasDigit = false;
                    for (int i = 0; i < trimmedLine.length(); i++) {
                        if (Character.isDigit(trimmedLine.charAt(i))) {
                            hasDigit = true;
                            break;
                        }
                    }
                    if (!hasDigit) {
                        isValid = false;
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
