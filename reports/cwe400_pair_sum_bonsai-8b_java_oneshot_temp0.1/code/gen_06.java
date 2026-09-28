import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        boolean first = true;
        long sum = 0;
        long count = 0;
        if (line != null) {
            target = Long.parseLong(line);
        }
        while ((line = br.readLine()) != null) {
            if (first) {
                first = false;
                continue;
            }
            line = line.trim();
            if (line.isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                sum += num;
                if (sum > target) continue;
                if (sum == target) {
                    count++;
                    if (count >= 2) break;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
