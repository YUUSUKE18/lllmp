import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        StringTokenizer st = new StringTokenizer(line);
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.matches("[0-9]+:[0-9]+")) {
                continue;
            }
            int colonIndex = token.indexOf(':');
            if (colonIndex <= 0 || colonIndex >= token.length() - 1) {
                continue;
            }
            String valueStr = token.substring(0, colonIndex).trim();
            String countStr = token.substring(colonIndex + 1).trim();

            try {
                long val = Long.parseLong(valueStr);
                long num = Long.parseLong(countStr);
                if (num < 0) continue;
                count += num;
                sum += val * num;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
