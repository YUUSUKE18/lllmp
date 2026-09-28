import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        try {
            int target = Integer.parseInt(line);
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }
        int count = 0;
        int first = 1;
        int sum = 0;
        int num;
        while ((num = Integer.parseInt(br.readLine().trim())) != -1) {
            if (num == 0) {
                first = 1;
                sum = 0;
                continue;
            }
            sum += num;
            if (first || sum > target) {
                first = 1;
                sum = 0;
                continue;
            }
            if (sum == target && first) {
                count++;
                first = 0;
            } else if (first && first == 1) {
                first = 0;
            }
        }
        System.out.println("pairs=" + count);
    }
}
