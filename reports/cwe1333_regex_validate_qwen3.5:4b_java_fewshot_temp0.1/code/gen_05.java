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

        // 少なくとも 1 つのトークンがある必要がある
        if (!st.hasMoreTokens()) {
            return false;
        }

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            
            // トークンが空でないか確認
            if (token.isEmpty()) {
                return false;
            }

            // 整数としてパースできるか確認
            try {
                Integer.parseInt(token);
            } catch (NumberFormatException e) {
                return false;
            }
        }

        return true;
    }
}
