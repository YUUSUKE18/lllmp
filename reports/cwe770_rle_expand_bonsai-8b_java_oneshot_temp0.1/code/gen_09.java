import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                int value;
                int freq;
                try {
                    int colonIndex = part.indexOf(':');
                    if (colonIndex == -1) continue;
                    value = Integer.parseInt(part.substring(0, colonIndex));
                    freq = Integer.parseInt(part.substring(colonIndex + 1));
                    if (freq <= 0) continue;
                    for (int i = 0; i < freq; i++) {
                        count += 1;
                        sum += value;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
