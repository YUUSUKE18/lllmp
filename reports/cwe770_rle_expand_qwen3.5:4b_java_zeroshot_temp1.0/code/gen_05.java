import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = "";
        try {
            line = reader.readLine();
        } catch (IOException e) {
            return;
        }

        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        long count = 0;
        long sum = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) {
                continue;
            }
            
            int colonIndex = part.indexOf(':');
            if (colonIndex == -1 || colonIndex == 0 || colonIndex == part.length() - 1) {
                continue;
            }

            String valueStr = part.substring(0, colonIndex).trim();
            String countStr = part.substring(colonIndex + 1).trim();

            try {
                long val = Long.parseLong(valueStr);
                long rep = Long.parseLong(countStr);
                if (rep < 0) continue;
                
                count += rep;
                sum += val * rep;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
