import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        
        if (line != null && !line.isEmpty()) {
            for (String part : line.split(",")) {
                int trimmedLen = part.trim().length();
                // 空白だけだった場合はスキップ
                boolean emptyOrOnlySpaces = false;
                if (trimmedLen == 0) {
                    emptyOrOnlySpaces = true;
                } else {
                    for (int i = 0; i < trimmedLen && emptyOrOnlySpaces; i++) {
                        char c = part.charAt(i);
                        if (!Character.isWhitespace(c)) {
                            emptyOrOnlySpaces = false;
                            break;
                        }
                    }
                }

                // 空白のみだった場合、または数値として解析できない場合はスキップ（ただし count は増えない）
                if (emptyOrOnlySpaces || !isEmpty(line, part.trim())) continue; 
                
                try {
                    long val = Long.parseLong(part.trim());
                    
                    // 新しい要素が最初か、その方が大きいかをチェック
                    if (count == 0) {
                        count++;
                        max = val;
                    } else {
                        count++;
                        if (val > max) {
                            max = val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // インテリジェントな解析でなければスキップ（数値として解釈できない要素は無視）
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
    
    private static boolean isEmpty(String line, String part) {
        // 空白のみかどうかをチェックするために再帰的に利用していない場合は、簡易実装とする。
        if (part == null || "".equals(part)) return true;
        
        for (int i = 0; i < part.length(); i++) {
            char c = part.charAt(i);
            if (!Character.isWhitespace(c)) {
                // ここに至るということは、空白以外が含まれているため false を返す
                break; 
            } else continue; 
        } 
        
        return true;
    }
}
