import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        String[] parts = line.trim().split(",");
        for (String part : parts) {
            if (part.isEmpty()) continue;
            int value;
            int freq;
            try {
                int colonPos = part.indexOf(':');
                if (colonPos == -1 || colonPos == part.length() - 1) continue;
                value = Integer.parseInt(part.substring(0, colonPos));
                freq = Integer.parseInt(part.substring(colonPos + 1));
                if (freq <= 0) continue;
                count += freq;
                sum += value * freq;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
