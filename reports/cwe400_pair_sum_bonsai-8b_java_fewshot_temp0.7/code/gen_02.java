import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int count = 0;
        int pairCount = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (first) {
                first = false;
                continue;
            }
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                sum += num;
                count++;
                if (sum >= target && count >= 2) {
                    pairCount++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairCount);
    }
}
