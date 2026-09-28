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
            int occurrences;
            try {
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1 || colonIndex == part.length() - 1) continue;
                value = Integer.parseInt(part.substring(0, colonIndex));
                occurrences = Integer.parseInt(part.substring(colonIndex + 1));
                if (occurrences <= 0) continue;
                count += occurrences;
                sum += value * occurrences;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
