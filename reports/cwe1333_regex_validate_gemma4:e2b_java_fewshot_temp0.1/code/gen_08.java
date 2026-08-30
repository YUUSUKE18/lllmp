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

            // 末尾のカンマを許容しつつ、数字とカンマのみで構成されているかチェックする
            // 妥当な形式: 数字とカンマのみで構成され、少なくとも1つの数字が含まれている
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;

            // 末尾がカンマの場合、その直前が数字であることを確認する
            if (trimmedLine.endsWith(",")) {
                if (trimmedLine.length() == 1) {
                    // カンマのみの行は妥当ではない
                    isValid = false;
                } else {
                    // 末尾のカンマを除いた部分が数字のみで構成されているか確認
                    String content = trimmedLine.substring(0, lastCharIndex);
                    if (!content.matches("\\d*,*")) {
                        isValid = false;
                    }
                }
            } else {
                // 末尾がカンマでない場合、すべて数字とカンマのみで構成されているか確認
                if (!trimmedLine.matches("^[0-9,]*$")) {
                    isValid = false;
                }
            }

            // 少なくとも1つの数字が含まれているか確認
            if (isValid) {
                // 数字が含まれているかチェック
                boolean containsDigit = false;
                for (char c : trimmedLine.toCharArray()) {
                    if (Character.isDigit(c)) {
                        containsDigit = true;
                        break;
                    }
                }
                if (containsDigit) {
                    validLines++;
                } else {
                    // 数字が含まれていないが、カンマや数字のみの形式を満たしている場合（例: "," や ",,"）は不妥当
                    // ただし、上記のロジックで既に不妥当と判断されているはずだが、念のため
                    // 厳密に「1個以上の数字列がカンマで区切られて並んでいる」を満たすか再確認
                    // 以下のチェックで、数字が一つでも含まれていればOKとする
                    // 実際には、数字が含まれていれば妥当と見なす
                    // 上記のisValidがtrueの場合、数字が含まれていることを確認する
                    // 実際には、数字が含まれていればOKとする
                    // 既にcontainsDigitがtrueならvalidLinesをインクリメント済み
                }
            }
        }

        System.out.println("valid=" + validLines);
    }
}
