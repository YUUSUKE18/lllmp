import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (isValidLine(line)) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }

    private static boolean isValidLine(String line) {
        // 空白を除去して処理する
        String trimmed = line.trim();
        
        // 空行は妥当ではない
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // カンマ区切りの整数列として解析
        // StringTokenizer はカンマで区切り、空白をスキップするが、
        // ここでは厳密に「数字とカンマ以外を含む行は妥当ではない」という条件があるため、
        // 手動で文字レベルを確認するか、または String.split を使って各要素をチェックする。
        
        // 方法: 全文字が数字またはカンマであるか確認し、かつ少なくとも1つの数字が存在するか確認
        boolean hasNumber = false;
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (c == ',') {
                continue; // カンマは OK
            } else if (Character.isDigit(c)) {
                hasNumber = true;
            } else {
                // 数字でもカンマでもない文字がある場合、妥当ではない
                return false;
            }
        }
        
        // 少なくとも1つの数字が含まれている必要がある
        return hasNumber;
    }
}
