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
        int num = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                num = Integer.parseInt(line);
                if (first) {
                    first = false;
                    sum += num;
                } else {
                    if (sum + num == target) count++;
                    if (sum + num > target) sum = 0;
                    sum += num;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
