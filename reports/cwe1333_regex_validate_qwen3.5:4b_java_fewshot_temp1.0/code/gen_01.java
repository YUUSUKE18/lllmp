import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        Pattern pattern = Pattern.compile("[\\d\\s,]+");

        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;

            String trimmed = line.trim();
            boolean isValid = true;

            // 1 つのトークンが整数のみを含むかチェック
            for (String token : trimmed.split("\\s*,\\s*")) {
                if (token.isEmpty() || !Pattern.matches("[0-9]+", token)) {
                    isValid = false;
                    break;
                }
            }

            // トークンの数だけ区切り文字をチェック
            int commaCount = 0;
            for (int i = 0; i < trimmed.length(); i++) {
                if (trimmed.charAt(i) == ',') commaCount++;
            }

            // 区切り文字が整数の間のものか確認 (末尾のカンマは OK)
            boolean hasExtraComma = false;
            for (int i = 0; i < trimmed.length(); i++) {
                if (trimmed.charAt(i) == ',') {
                    int beforeEnd = trimmed.indexOf(trimmed.length() - 1); // 末尾からのインデックスが整数部分でないか
                    // より単純な方法: カンマが文字列の一部として存在し、その前後が数字かどうか確認
                }
            }

            // 簡潔な検証ロジックに再考:カンマ区切りの整数列であること
            boolean isCommaSeparatedIntegers = true;
            if (isCommaSeparatedIntegers) {
                // トークンごとにチェック
                String[] tokens = trimmed.split("\\s*,\\s*", -1);
                for (int i = 0; i < tokens.length; i++) {
                    if (!Pattern.matches("[0-9]+", tokens[i])) {
                        isCommaSeparatedIntegers = false;
                        break;
                    }
                }
            }

            // カンマが正しい位置にあるか確認 (整数の間のもののみ)
            boolean hasValidCommata = true;
            for (int i = 0; i < trimmed.length(); i++) {
                if (trimmed.charAt(i) == ',') {
                    int nextNumIndex = -1, prevNumIndex = -1;
                    // 次の数字の位置を探す
                    int j = i + 1;
                    while (Character.isWhitespace(trimmed.charAt(j))) j++;
                    prevNumIndex = i; // カンマは数値の前または後にある必要がある
                    // 実際のロジック:カンマが文字列の一部として存在し、その前後が数字かどうか確認
                    // より単純な方法: トークンの数だけ区切り文字をチェック
                }
            }

            if (isCommaSeparatedIntegers) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
