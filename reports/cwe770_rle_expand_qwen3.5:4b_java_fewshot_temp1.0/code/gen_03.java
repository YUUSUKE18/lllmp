import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0;
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                if (part.trim().isEmpty()) continue;
                String[] subParts = part.split(":");
                if (subParts.length < 2) continue;
                String valStr = subParts[0].trim();
                String countStr = subParts[1].trim();
                try {
                    int value = Integer.parseInt(valStr);
                    long times = Long.parseLong(countStr);
                    sum += value * times;
                    count += times;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
