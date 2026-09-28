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
        long first = 0;
        int pairs = 0;
        if (line != null) {
            first = Long.parseLong(line);
        }
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(line);
                sum += num;
                count++;
                if (sum == target && first != 0) {
                    pairs++;
                    first = 0;
                } else if (sum > target && first != 0) {
                    first = 0;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
