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
        long prev = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                if (first) {
                    first = false;
                    sum += num;
                } else {
                    if (sum + num > target) continue;
                    if (sum > target - num) {
                        count++;
                    }
                    sum += num;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
