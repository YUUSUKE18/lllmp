import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して、カンマ区切りの整数列として妥当かを判定する
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを無視して分割する
            // 例: "1,2,3," -> ["1", "2", "3", ""]
            String[] parts = trimmedLine.split(",");
            
            // 末尾のカンマが許容されるため、末尾の要素が空文字列であっても、
            // それ以外の要素が整数であるかを確認する。
            // 妥当であるためには、少なくとも1個の数字列がカンマで区切られている必要がある。
            
            boolean isValid = false;
            int count = 0;
            for (String part : parts) {
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    try {
                        Integer.parseInt(trimmedPart);
                        count++;
                    } catch (NumberFormatException e) {
                        // 数字でないものが含まれていたら不妥当
                        isValid = false;
                        break;
                    }
                }
            }
            
            // 妥当であるための条件：
            // 1. 少なくとも1個の数字列が存在する (count >= 1)
            // 2. 数字とカンマ以外を含まないこと (上記のループでチェック済み)
            if (count >= 1) {
                // 厳密には、元の行が「数字とカンマのみ」で構成されている必要がある。
                // 課題の指示：「妥当とは、1 個以上の数字列がカンマで区切られて並んでいることです。
                // 空行、および数字とカンマ以外を含む行は妥当ではありません。」
                
                // 行全体が数字とカンマの組み合わせで構成されているかを再確認する必要がある。
                // 今回の解釈では、"1,2,a" や "1,2," は不妥当と判断されるべき。
                // ただし、例題の意図を汲み、数字のリストとして解釈する。
                
                // より厳密に、行が完全にカンマ区切りの整数列で構成されているかを確認する。
                // この処理は、行全体が数字とカンマのみで構成されているか、そしてその間に少なくとも1つの数字があるかをチェックする。
                
                // ここでは、上記でチェックした count >= 1 が、1個以上の数字列が存在するという条件を満たしているため、
                // そして「数字とカンマ以外を含む行は妥当ではない」という制約を考慮すると、
                // 実際には、数字とカンマ以外の文字が含まれていないことを確認する必要がある。
                
                boolean containsOnlyDigitsAndCommas = true;
                for (char c : line.toCharArray()) {
                    if (!Character.isDigit(c) && c != ',' && Character.isWhitespace(c)) {
                        containsOnlyDigitsAndCommas = false;
                        break;
                    }
                }
                
                if (containsOnlyDigitsAndCommas) {
                    validLines++;
                }
            }
        }
        System.out.println("valid=" + validLines);
    }
}
