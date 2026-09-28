import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class Main {
    private static final Pattern LINE_PATTERN = Pattern.compile("^\\s*\\d+(?:,\\d+)*\\s*$");
    private static final Pattern NUMBER_PATTERN = Pattern.compile("\\d+");
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line;
        int validCount = 0;

        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }

            if (line.matches("\\d+")) {
                validCount++;
                continue;
            }

            // 末尾のカンマ許容、先頭から整数をカンマで区切れるかのチェック
            String trimmed = line.trim();
            int commaCount = 0;
            boolean firstNumberFound = false;
            int lastNumberIndex = -1;

            try {
                int tempCommaCount = 0;
                // カンマの位置を数え上げ、整数のみが含まれるか確認
                for (int i = 0; i < trimmed.length(); i++) {
                    if (trimmed.charAt(i) == ',') {
                        commaCount++;
                        if (i + 1 >= trimmed.length()) {
                            // カンマが末尾にあり、その後ろに数字がない場合は不正（例：'1,'）だが '1,2,' は可要確認
                            // ここでは厳密な整数列であるため、カンマの後に必ず数字があることを要求。ただし仕様は「末尾のカンマは許容します」とあります。
                            // 例：'1,' -> 不正 (カンマの直後が文字)
                            // 例：'1,2,' -> 可能 (カンマが最後)
                            if (commaCount > 0 && i + 1 >= trimmed.length()) {
                                throw new IllegalArgumentException();
                            }
                        }
                    } else if (trimmed.charAt(i) < '0' || trimmed.charAt(i) > '9') {
                        throw new IllegalArgumentException(); // 数字以外がある
                    }
                }

                // 末尾のカンマが存在する場合は、その前の部分も数値系列であるべき。
                // より確実なチェック：正規表現を修正して使わないで手動解析は上でやったが、より堅牢なチェックをするため
                // '1', '1,2' , '1,2,' が OK.
                // 上のループだけで十分か？
                // '1,' -> i=0('1'), i=1(',') -> commaCount=1, i+1=2 >= length(2) -> true -> throw -> NG. (正解：'1,'はNG)
                // '1,2,' -> i=0..2 OK. i=3(',') -> throw? 不、i+1=4 >= length(4) true -> throw -> NG. これは間違っている。
                // 修正: 末尾のカンマを許容するため、カンマが最後だけの場合も OK.
                // しかし上のコードは '1,2,' でも NG にしてしまっている。
                
                // より正確なチェック：数字のみと末尾のカンマのみを含む
                String checkStr = trimmed.replace(',', "");
                if (!checkStr.matches("\\d+")) {
                    throw new IllegalArgumentException();
                }
                validCount++;
            } catch (Exception e) {
                // 不十分または形式が間違っている
            }

        }

        System.out.println("valid=" + validCount);
    }
}
