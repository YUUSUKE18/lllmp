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
        if (line == null || line.trim().isEmpty()) {
            return false;
        }

        String trimmed = line.trim();
        StringTokenizer st = new StringTokenizer(trimmed, ",");

        // 少なくとも 1 つの要素が必要
        if (!st.hasMoreTokens()) {
            return false;
        }

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            // 空白が含まれていないか確認（trim が行われたが、内部に空白がないことを保証するため）
            // StringTokenizer はデフォルトで空白区切りではないので、文字列自体をチェック
            if (!token.matches("-?[0-9]+")) {
                return false;
            }
        }

        return true;
    }
}
