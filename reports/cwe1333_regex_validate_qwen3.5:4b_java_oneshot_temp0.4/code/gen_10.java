import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValid(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        // 前後の空白を除去
        String trimmed = line.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外が含まれていないか確認するために、正規表現を使う
        // ^[0-9,]+$ は「始端から終端まで、数字またはカンマのみ」という意味
        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile("^[0-9,]+$");
        return pattern.matcher(trimmed).matches();
    }
}
