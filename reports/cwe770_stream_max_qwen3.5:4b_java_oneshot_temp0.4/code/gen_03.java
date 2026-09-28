import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 64bit integer の最小値
        boolean hasValue = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token);
                if (!hasValue || val > maxVal) {
                    maxVal = val;
                }
                count++;
                hasValue = true;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        System.out.println("count=" + count + " max=" + (hasValue ? maxVal : Long.MIN_VALUE));
    }
}
