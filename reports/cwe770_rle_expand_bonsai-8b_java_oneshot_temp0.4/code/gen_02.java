import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean first = true;
        if (line != null) {
            for (String part : line.trim().split(",")) {
                if (part.isEmpty()) continue;
                int value;
                int occurrences;
                if (part.indexOf(':') == -1) continue;
                String[] tokens = part.split(":");
                if (tokens.length < 2) continue;
                try {
                    value = Integer.parseInt(tokens[0]);
                    occurrences = Integer.parseInt(tokens[1]);
                    if (occurrences <= 0) continue;
                    if (first || value > sum / occurrences) {
                        sum = value * occurrences;
                        count = occurrences;
                        first = false;
                    } else {
                        sum += value * occurrences;
                        count += occurrences;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
