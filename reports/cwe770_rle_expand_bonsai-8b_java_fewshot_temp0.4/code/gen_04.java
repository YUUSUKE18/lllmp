import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                int value;
                int repeat;
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex == -1) continue;
                    value = Integer.parseInt(part.substring(0, colonIndex));
                    repeat = Integer.parseInt(part.substring(colonIndex + 1));
                    if (repeat < 0) continue;
                    count += repeat;
                    sum += value * repeat;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
