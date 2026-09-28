import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;

        if (line != null && !line.trim().isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                int colonIndex = token.indexOf(':');
                if (colonIndex == -1) continue;

                String valStr = token.substring(0, colonIndex).trim();
                String countStr = token.substring(colonIndex + 1).trim();

                if (valStr.isEmpty() || countStr.isEmpty()) continue;

                long v;
                try {
                    v = Long.parseLong(valStr);
                } catch (NumberFormatException e) {
                    continue;
                }

                long c;
                try {
                    c = Long.parseLong(countStr);
                } catch (NumberFormatException e) {
                    c = 0;
                }

                count += c;
                sum += v * c;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
