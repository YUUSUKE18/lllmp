import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        if (line != null) {
            for (String item : line.trim().split(",")) {
                if (!item.matches("\\d+:\\d+")) continue;
                int colonIndex = item.indexOf(':');
                String valStr = item.substring(0, colonIndex);
                String countStr = item.substring(colonIndex + 1).trim();
                long n = Long.parseLong(valStr);
                long m = Long.parseLong(countStr);
                if (m >= 0) {
                    sum += n * m;
                    count += m;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
