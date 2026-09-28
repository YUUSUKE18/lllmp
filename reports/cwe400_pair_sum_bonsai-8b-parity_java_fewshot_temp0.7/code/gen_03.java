import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) return;
        int target = Integer.parseInt(line);
        int count = 0;
        int numValues = 0;
        int prev = -1;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                int val = Integer.parseInt(line);
                numValues++;
                if (prev == -1) {
                    prev = val;
                    continue;
                }
                if (val + prev == target) count++;
                prev = val;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
