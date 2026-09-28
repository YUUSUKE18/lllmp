import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean foundNumber = false;

        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            try {
                long number = Long.parseLong(token);
                count++;
                if (number > maxVal) {
                    maxVal = number;
                }
                foundNumber = true;
            } catch (NumberFormatException e) {
                // Ignore elements that are not valid integers
            }
        }

        if (!foundNumber) {
            System.out.println("count=0 max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
