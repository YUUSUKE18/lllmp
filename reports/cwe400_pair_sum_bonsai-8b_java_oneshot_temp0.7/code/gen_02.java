import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        boolean first = true;
        long sum = 0;
        long count = 0;
        long num1 = 0;
        long num2 = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            try {
                num1 = Long.parseLong(line);
                if (first) {
                    first = false;
                    sum += num1;
                    count = 1;
                } else {
                    sum += num1;
                    if (sum > target) {
                        count = 0;
                    } else if (sum == target) {
                        count++;
                    } else {
                        long diff = target - sum;
                        if (num2 != 0 && diff > num2) {
                            count++;
                        }
                    }
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("pairs=" + count);
    }
}
