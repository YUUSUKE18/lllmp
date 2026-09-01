import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long targetValue;
        try {
            targetValue = Long.parseLong(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<Long> seenValues = new HashSet<>();
        long count = 0;

        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) {
                continue;
            }

            try {
                StringTokenizer st = new StringTokenizer(targetLine);
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    try {
                        long value = Long.parseLong(token);
                        
                        if (!seenValues.contains(targetValue - value)) {
                            seenValues.add(value);
                        } else {
                            count++;
                        }
                    } catch (NumberFormatException e) {
                        // 解析エラーが発生した場合は無視し、次のトークンへ進む
                    }
                }
            } catch (Exception e) {
                continue;
            }
        }

        System.out.println("pairs=" + count);
    }
}
