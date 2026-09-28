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
        int sum = 0;
        int count = 0;
        int first = 1;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            try {
                int num = Integer.parseInt(line.trim());
                sum += num;
                if (first || sum >= target) {
                    count++;
                    first = 0;
                }
            } catch (NumberFormatException e) {
                continue;
            }
        }
        System.out.println("pairs=" + count);
    }
}
