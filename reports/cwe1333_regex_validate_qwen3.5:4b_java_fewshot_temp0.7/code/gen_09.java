import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            List<String> parts = new ArrayList<>();
            StringBuilder sb = new StringBuilder();
            boolean inNumber = false;
            
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                
                if (Character.isDigit(c)) {
                    inNumber = true;
                    sb.append(c);
                } else if (c == ',' && inNumber) {
                    parts.add(sb.toString());
                    sb.setLength(0);
                } else if (inNumber && (c != ' ' && c != '\t')) {
                    // 数字の後に続く非空白・非カンマ文字の場合（例：数字の後に文字）
                    // ただし、末尾のカンマは許容されるが、その後の数字や文字は禁止
                    if (!Character.isDigit(c) && c != ',') {
                        // 数字とカンマ以外が入っている場合、妥当でない
                        break; 
                    }
                } else if (inNumber && !Character.isDigit(c) && c != ',' && c != ' ' && c != '\t') {
                     // 空白以外の非数字・非カンマ文字
                     inNumber = false; // 数値の連続を切断し、以降の処理でエラー判定する
                     parts.add(sb.toString());
                     sb.setLength(0);
                } else if (c == ',' && !inNumber) {
                    // カンマの前に数字がなければ、それ以前の部分（もしあれば）を追加
                    if (!sb.length()) {
                        continue;
                    }
                }
            }
            
            // 最後の部分があるか確認
            if (sb.length() > 0) {
                parts.add(sb.toString());
            }
            
            // 検証ロジックの再考: より堅牢なアプローチ
            // 1. 全体を処理し、有効な数値列と空白のみが含まれているかチェック
            boolean valid = true;
            List<String> tokenList = new ArrayList<>();
            
            // 文字ごとに解析
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (Character.isWhitespace(c)) {
                    continue;
                }
                
                if (!Character.isDigit(c) && c != ',') {
                    valid = false;
                    break;
                }
                
                if (c == ',') {
                    // カンマの前後に空白がないか（実際は空白は無視されるが、数値列の連続性が保たれる必要がある）
                    // 問題文: "1 個以上の数字列がカンマで区切られて並んでいる"
                    // "末尾のカンマは許容します"
                    // "空行、および数字とカンマ以外を含む行は妥当ではありません"
                    // これはつまり、文字列には「数字」か「カンマ」のみが含まれている必要があります。
                    // ただし、「1 個以上の数字列」という表現から、単にカンマの羅列（,,）ではなく、数値が存在する必要がある。
                }
            }
            
            // 再実装: 簡潔かつ正確に
            // 条件: 
            // 1. 行には数字とカンマのみが許容される (空白を除く)
            // 2. 少なくとも 1 つの数値が存在する
            // 3. 空白は前後・内部を問わず無視可能（ただし、数値の区切りとして機能するか）
            // 厳密な解釈: "空白区切りの整数列" の変形。つまり、文字レベルで [0-9, ] を除くと空かない。
            
            boolean onlyDigitsAndCommas = true;
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isDigit(c) && c != ',' && !Character.isWhitespace(c)) {
                    valid = false;
                    break;
                }
            }
            
            // カンマのみで始まる、またはカンマの後に数字がない場合（例：",," や ",,"）は数値列として成立するか？
            // "1 個以上の数字列" があるので、少なくとも 1 つの数値が必要。
            // 空白を無視して数値だけを抽出し、それが何もないかチェック
            
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue; // 空行は妥当ではない（ただし、処理ループの中でスキップしたため）
            }
            
            boolean hasNumber = false;
            // 数値の存在チェック
            for (int i = 0; i < trimmed.length(); i++) {
                if (Character.isDigit(trimmed.charAt(i))) {
                    hasNumber = true;
                    break;
                }
            }
            
            if (valid && hasNumber) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
