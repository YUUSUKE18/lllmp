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
                part = part.trim();
                if (part.isEmpty()) continue;
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1) continue;
                try {
                    long value = Long.parseLong(part.substring(0, colonIndex).trim());
                    long repetition = Long.parseLong(part.substring(colonIndex + 1).trim());
                    if (value != 0) {
                        count += repetition;
                        sum += value * repetition;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
