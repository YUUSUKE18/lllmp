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
        }
        int count = 0;
        int sum = 0;
        int num = 0;
        int first = true;
        int firstNum = 0;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                num = Integer.parseInt(line);
                if (first) {
                    first = false;
                    firstNum = num;
                    continue;
                }
                sum += num;
                if (sum == target) count++;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
