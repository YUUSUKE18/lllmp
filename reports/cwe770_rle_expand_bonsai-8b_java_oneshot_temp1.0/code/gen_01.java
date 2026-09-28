import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                int value;
                int freq;
                try {
                    String[] split = part.split(":");
                    if (split.length < 2) continue;
                    value = Integer.parseInt(split[0]);
                    freq = Integer.parseInt(split[1]);
                    count += freq;
                    sum += value * freq;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
