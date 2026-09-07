import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int target = Integer.parseInt(line.trim());
        int pairs = 0;
        boolean first = true;
        int last = 0;
        int sum = 0;
        int n = 0;
        for (String f : br.readLine().trim().split("\\s+")) {
            if (f.isEmpty()) continue;
            try {
                n = Integer.parseInt(f);
                sum += n;
                if (first) {
                    first = false;
                    last = n;
                } else {
                    if (sum == target) {
                        pairs++;
                    }
                    sum -= last;
                    last = n;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
