import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        while (true) {
            String line = br.readLine();
            if (line == null) break;
            
            // 空白を削除して判定用文字列に
            String cleanLine = line.replaceAll("\\s+", "");
            
            // 空行チェック
            if (cleanLine.isEmpty()) {
                continue;
            }
            
            boolean isPatternValid = true;
            boolean hasContent = false;
            int lastIndex = -1;
            
            // カンマ区切りの整数列として判定
            // 手順: 数字、カンマ、数字の交替が許可されること + すべてが有効な数字であること
            
            // 文字を順に処理
            for (int i = 0; i < cleanLine.length(); i++) {
                char c = cleanLine.charAt(i);
                
                if (c == ',') {
                    // カンマがある場合、前と後ろが数字である必要がある
                    if (i > 0 && !isDigit(cleanLine, i - 1)) {
                        isPatternValid = false;
                        break;
                    }
                    if (i < cleanLine.length() - 1 && !isDigit(cleanLine, i + 1)) {
                        isPatternValid = false;
                        break;
                    }
                } else if (!Character.isDigit(c)) {
                    // 数字でなかったら、パターンに違反するか
                    // ただし、末尾のカンマは許容されているので、カンマ以外の非数字は NG
                    isPatternValid = false;
                    break;
                }
            }
            
            if (isPatternValid) {
                // パターンが正しい場合も、実際に数字が含まれているか確認する
                // 規定: "1 個以上の数字列" -> 少なくとも 1 つの整数が存在
                hasContent = false;
                for (int i = 0; i < cleanLine.length(); i++) {
                    if (cleanLine.charAt(i) != ',') {
                        hasContent = true;
                        break;
                    }
                }
                
                if (hasContent) {
                    validCount++;
                }
            }
            
        }
        
        System.out.println("valid=" + validCount);
    }
    
    private static boolean isDigit(String line, int index) {
        char c = line.charAt(index);
        return c >= '0' && c <= '9';
    }
}
