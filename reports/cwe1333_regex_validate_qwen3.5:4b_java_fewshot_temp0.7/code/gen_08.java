import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) {
                continue;
            }
            
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            boolean isValid = false;
            int start = 0;
            int len = trimmedLine.length();
            
            while (start < len) {
                // 空白スキップ（行の前後はtrimで済んでいるが、内部の空白も考慮）
                while (start < len && Character.isWhitespace(trimmedLine.charAt(start))) {
                    start++;
                }
                
                if (start >= len) {
                    break; // 空白のみだった場合
                }
                
                // 数字列の開始地点を探す
                int numStart = start;
                while (start < len && Character.isDigit(trimmedLine.charAt(start))) {
                    start++;
                }
                
                if (numStart == start) {
                    // 数字が見つからなかった -> 不成立
                    isValid = false;
                    break;
                }
                
                // カンマで区切るか、行の終わりまたは空白で区切る
                if (start < len) {
                    char c = trimmedLine.charAt(start);
                    if (c == ',') {
                        start++; // カンマスキップ
                    } else if (Character.isWhitespace(c)) {
                        while (start < len && Character.isWhitespace(trimmedLine.charAt(start))) {
                            start++;
                        }
                    } else {
                        // 数字の後に何かが続いている -> 不成立
                        isValid = false;
                        break;
                    }
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
