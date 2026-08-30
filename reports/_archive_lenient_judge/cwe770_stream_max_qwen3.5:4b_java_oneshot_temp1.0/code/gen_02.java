import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true; // Initial state, treat as -infinity logic or handle empty input explicitly above. 
                             // Wait, if we have a valid int found, that becomes the initial candidate for max.

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long val = Long.parseLong(token);
                count++;
                
                // Initialize max with first value or update to current larger one
                if (!first) {
                    if (val > max) {
                        max = val;
                    }
                } else {
                    max = val; 
                    first = false;
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer tokens as per spec "整数として解釈できない要素も無視します"
                continue;
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
}
