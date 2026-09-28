import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split("\\s+\\s*,$*")) {
                if (s.isEmpty()) continue;
                int value;
                int occurrences;
                String[] parts = s.split(":");
                if (parts.length < 2) continue;
                try {
                    value = Integer.parseInt(parts[0]);
                    occurrences = Integer.parseInt(parts[1]);
                    if (first || value > sum || (value == sum && occurrences > count)) {
                        sum = value;
                        count = occurrences;
                        first = false;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
