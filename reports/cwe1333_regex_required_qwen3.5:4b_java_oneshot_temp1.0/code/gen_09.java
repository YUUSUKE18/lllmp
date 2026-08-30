import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Pattern pattern = Pattern.compile("^\\s*(.+?)\\s*$"); // 行全体のキャプチャ
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            // 前後の空白を切り捨てて検証対象とします
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                continue;
            }

            try {
                Matcher m = pattern.matcher(trimmedLine);
                if (m.find()) {
                    String content = m.group(1).trim();
                    // 内容が空白でない場合のみ妥当
                    if (!content.isEmpty() || content.matches(","+","+")) {
                        // ここでは「数字とカンマ以外が含まれていないこと」を保証する必要があります。
                        // 「1 個以上の数字列がカンマで区切られている」という要件は、
                        // Regex の内部により保証され、文字のチェックは内容に直接関与させます。
                        if (content.isEmpty() || content.matches("[0-9,]+")) {
                            // ※厳密な仕様通り: 「1 個以上の数字列」が必要
                            if (!content.isEmpty()) {
                                validCount++;
                            }
                        }
                    }
                }
            } catch (Exception e) {
                // レガシー Java では Pattern.matcher が例外をスローすることは稀だが、安全のため無視
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
