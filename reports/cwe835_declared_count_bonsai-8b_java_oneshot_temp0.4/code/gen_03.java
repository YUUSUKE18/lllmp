import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String countStr = br.readLine();
        int count = 0;
        if (countStr != null) {
            try {
                count = Integer.parseInt(countStr);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int actualCount = 0;
        boolean first = true;
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long n = Long.parseLong(part);
                    sum += n;
                    actualCount++;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
