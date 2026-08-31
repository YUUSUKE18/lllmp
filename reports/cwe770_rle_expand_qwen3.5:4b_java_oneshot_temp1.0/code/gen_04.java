import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long sum = 0L;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                part = part.trim();
                if (part.isEmpty() || !part.contains(":")) continue;
                String[] segments = part.split(":", 2);
                try {
                    long val = Long.parseLong(segments[0]);
                    int rep = Integer.parseInt(segments[1].trim());
                    if (rep > 0) {
                        count += rep;
                        sum += val * rep;
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
