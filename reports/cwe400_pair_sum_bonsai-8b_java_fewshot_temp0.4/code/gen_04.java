import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int target = 0;
        try {
            target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            return;
        }
        int count = 0;
        int sum = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line);
                if (!first) {
                    sum += num;
                    if (sum == target) count++;
                }
                first = false;
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
