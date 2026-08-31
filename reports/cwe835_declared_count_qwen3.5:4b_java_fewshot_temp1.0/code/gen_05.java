import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String firstLine = br.readLine();
        if (firstLine == null || firstLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int expectedCount;
        try {
            StringTokenizer st = new StringTokenizer(firstLine);
            expectedCount = Integer.parseInt(st.nextToken());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0L;
        int maxValRead = 0; // Use int as per spec range, though 64bit is mentioned for values. Sum requires long.

        while ((br.readLine() != null) || count < expectedCount) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                continue; // Skip empty lines or end of input
            }

            StringTokenizer stLine = new StringTokenizer(line);
            int currentValFound = 0;
            while (stLine.hasMoreTokens()) {
                String token = stLine.nextToken();
                try {
                    long val = Long.parseLong(token);
                    count++;
                    sum += val;
                } catch (NumberFormatException e) {
                    // Ignore non-integer tokens, but count the line read? 
                    // Spec says "actually readable integers only", implying we just process what fits.
                    // The spec says "count=<actual number of integers>". 
                    // If a line has mixed content or invalid numbers, parseInt fails.
                    // We only increment count if parse succeeds.
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
