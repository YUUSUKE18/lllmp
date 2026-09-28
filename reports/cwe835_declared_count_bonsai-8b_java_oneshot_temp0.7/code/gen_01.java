import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        long count = 0;
        long sum = 0;
        boolean first = true;
        if (countStr != null && !countStr.trim().isEmpty()) {
            try {
                count = Long.parseLong(countStr);
            } catch (NumberFormatException e) {
            }
        }
        for (int i = 1; i < count; i++) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                sum += num;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
