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
            // 妥当な行の定義: 1個以上の数字列がカンマで区切られて並んでいること。
            
            // 処理を簡略化するため、行全体が数字とカンマのみで構成されているかを確認し、
            // 少なくとも1つの数字が含まれているかを確認する。
            
            boolean isValid = true;
            int lastCharIndex = trimmedLine.length() - 1;
            
            // 末尾のカンマを考慮して、数字とカンマのみで構成されているかを確認する
            // 妥当な行の条件: 1個以上の数字列がカンマで区切られて並んでいる。
            // これは、行が空でなく、数字とカンマ以外の文字を含まない、という条件に集約される。
            
            for (int i = 0; i < trimmedLine.length(); i++) {
                char c = trimmedLine.charAt(i);
                if (!((c == ',' || Character.isDigit(c)))) {
                    isValid = false;
                    break;
                }
            }
            
            if (!isValid) {
                continue;
            }
            
            // 数字が1つ以上含まれているかを確認する
            boolean containsDigit = false;
            for (int i = 0; i < trimmedLine.length(); i++) {
                if (Character.isDigit(trimmedLine.charAt(i))) {
                    containsDigit = true;
                    break;
                }
            }
            
            if (containsDigit) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
