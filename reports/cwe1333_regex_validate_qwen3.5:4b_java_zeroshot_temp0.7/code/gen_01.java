import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;
        Pattern pattern = Pattern.compile("^[[:space:]]*(\\d+[,:]*[^\\s]|$)[[:space:]]*$");

        while ((line = reader.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            // 空白文字以外の最初の文字が数字であるかチェック、または空文字列（trim 後に空ならスキップ済み）
            boolean isDigitAtStart = false;
            for (char c : line.toCharArray()) {
                if (!Character.isWhitespace(c)) {
                    isDigitAtStart = Character.isDigit(c);
                    break;
                }
            }

            if (!isDigitAtStart) {
                continue;
            }

            // 正規表現でチェック: 数字とカンマのみ、末尾に空白なし（trim 済みなので）
            // または 単一の数字
            String[] parts = line.split(",", -1);
            boolean isValid = true;
            for (int i = 0; i < parts.length; i++) {
                String part = parts[i];
                if (!part.isEmpty()) {
                    if (Character.isWhitespace(part.charAt(0)) || !Character.isDigit(part.charAt(0))) {
                        isValid = false;
                        break;
                    }
                    for (int j = 1; j < part.length(); j++) {
                        char c = part.charAt(j);
                        if (!Character.isDigit(c) && c != ',') {
                            isValid = false;
                            break;
                        }
                    }
                }
            }

            // 単一数字の場合でもチェック済み（split で空配列にはならない）
            // 末尾カンマ含む場合、parts[parts.length-1] は空になる可能性があるが、上記ループで処理済み
            if (isValid) {
                validCount++;
            }
        }

        System.out.println("valid=" + validCount);
    }
}
