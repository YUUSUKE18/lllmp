import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
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

            String valueStr = part.substring(0, colonIndex).trim();
            String countStr = part.substring(colonIndex + 1).trim();

            try {
                long value = Long.parseLong(valueStr);
                long repetition = Long.parseLong(countStr);
                if (repetition < 0) continue;
                
                count += repetition;
                sum += value * repetition;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
