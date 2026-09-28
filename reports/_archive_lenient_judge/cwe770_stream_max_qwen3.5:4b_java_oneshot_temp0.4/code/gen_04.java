import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        StringTokenizer st = new StringTokenizer(line, ",");
        long count = 0;
        long maxValue = Long.MIN_VALUE;
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token);
                if (!Long.isInfinite(val)) { // Ensure it's not infinity, though parseLong won't throw for valid ints usually. 
                    count++;
                    if (count == 1 || val > maxValue) {
                        maxValue = val;
                    }
                } else {
                    continue; 
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer elements as per spec: "整数として解釈できない要素も無視します"
            }
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
