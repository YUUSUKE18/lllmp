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

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                Integer.parseInt(token);
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // 末尾のカンマは許容するため、トークンが空でないか確認する必要がある
        // StringTokenizer はカンマで区切るので、末尾のカンマの場合も hasMoreTokens が true になることがある
        // ただし、Integer.parseInt を試すことで非数字のチェックも行う
        return true;
    }
}
