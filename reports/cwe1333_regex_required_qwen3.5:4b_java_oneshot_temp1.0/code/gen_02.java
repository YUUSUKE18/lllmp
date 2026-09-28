import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.isEmpty()) continue;
            
            // 正規表現: 空行を除くが、数字とカンマのみを含むことを判定
            // ^ 起点, $ 終点、\s+ 空白を1個以上含む、[^,0-9]+ の出現は許さない
            // 具体的なパターン説明:
            // 1. 最初から数字で始まるか、または数字とカンマだけの文字列である必要がある。
            // 2. 末尾のカンマも含む。
            // 3. 空白を先頭または末尾に持たない (trim で除去済みだが、正規表現内で空白の排除も考慮)。
            
            if (line.trim().matches("^[^,\\s]*[,\\s]*[^,0-9]$")) {
                // これは数字以外を含むことを表すパターン。これを避けるなら否定表現を使うか、
                // 許容範囲を定義する必要がある。
            }
        }
        
        // より正確なアプローチ: line.trim() をして、内容が数字とカンマのみであることを確認
        String trimmed = line.trim();
        if (trimmed.isEmpty()) continue; // 空行は妥当でない
        
        boolean isValid = true;
        int i = 0;
        while (i < trimmed.length()) {
            char c = trimmed.charAt(i);
            if (c == ',') {
                // カンマの場合、直後に空白があることを考慮して進める
                while (i < trimmed.length() && Character.isWhitespace(trimmed.charAt(i))) i++;
            } else if (!Character.isDigit(c)) {
                isValid = false;
                break;
            } else {
                i++;
            }
        }
        
        // または簡易版: 正規表現を使って、文字列に空白を除いた後に数字とカンマのみがあるか確認
        // line.trim() に含まれる文字がすべて '0'-'9' または ',' であること
        boolean allValid = true;
        int idx = 0;
        String cleanLine = line.trim();
        while (idx < cleanLine.length()) {
            char ch = cleanLine.charAt(idx);
            if (!Character.isDigit(ch) && ch != ',') {
                allValid = false;
                break;
            }
            idx++;
        }
        
        if (allValid && !cleanLine.isEmpty()) {
            validCount++;
        }
    }
    
    // 上記のロジックを再考: 標準入力の各行を処理する必要がある。
    // 前述のプロトタイプは構造が崩れているので、修正する。
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            String trimmed = line.trim();
            
            // 空行は妥当でない
            if (trimmed.isEmpty()) continue;
            
            boolean isValid = true;
            for (int i = 0; i < trimmed.length(); i++) {
                char c = trimmed.charAt(i);
                if (!Character.isDigit(c) && c != ',') {
                    isValid = false;
                    break;
                }
            }
            
            if (isValid) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
