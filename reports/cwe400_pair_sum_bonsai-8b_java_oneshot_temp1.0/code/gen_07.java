import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        long count = 0;
        boolean first = true;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int index = 0;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            try {
                long num = Long.parseLong(line);
                sum += num;
                if (sum > target) {
                    count += 1;
                    sum = 0;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
