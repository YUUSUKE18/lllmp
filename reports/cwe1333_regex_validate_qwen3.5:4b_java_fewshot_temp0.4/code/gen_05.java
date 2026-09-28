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
        if (line == null || line.isEmpty()) {
            return false;
        }
        
        // 前後の空白を切り捨てて処理する文字列を作成
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        
        StringTokenizer st = new StringTokenizer(trimmed);
        
        // 少なくとも 1 つのトークンがあるか確認
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            // トークンが数字のみで構成されているか確認
            try {
                Integer.parseInt(token);
            } catch (NumberFormatException e) {
                return false;
            }
        }
        
        // 全てのトークンを数えた後、残りの文字がないか確認（空白以外が含まれていないか）
        // StringTokenizer は空白を区切り文字として扱うため、この時点で「数字とカンマ以外」が含まれていないことを保証できる。
        // ただし、入力自体が「数字列」と「カンマ」のみの構成である必要があるため、
        // 上記処理でトークン化されたものがすべて整数であることを確認すれば十分。
        
        return true;
    }
}
