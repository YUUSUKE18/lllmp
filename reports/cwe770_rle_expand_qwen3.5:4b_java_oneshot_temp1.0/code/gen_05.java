import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        String[] parts = line.trim().split(",");
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;

            int colonIndex = part.indexOf(':');
            if (colonIndex <= 0) continue;

            try {
                long val = Long.parseLong(part.substring(0, colonIndex));
                long times = Long.parseLong(part.substring(colonIndex + 1));
                if (times < 0) continue; // Negative count is invalid based on spec "0 or more"
                
                count += times;
                sum += val * times;
            } catch (NumberFormatException e) {
                // Ignore malformed parts
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
