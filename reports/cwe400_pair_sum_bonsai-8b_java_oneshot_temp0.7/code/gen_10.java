import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) {
            target = Long.parseLong(line);
        }
        long sum = 0;
        int count = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (first) {
                first = false;
                continue;
            }
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long num = Long.parseLong(part);
                    sum += num;
                    if (sum == target) count++;
                    if (sum > target) break;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
