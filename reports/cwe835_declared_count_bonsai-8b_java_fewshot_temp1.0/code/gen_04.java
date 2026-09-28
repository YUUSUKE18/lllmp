import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        int sum = 0;
        if (line != null) {
            try {
                count = Integer.parseInt(line);
            } catch (NumberFormatException e) {
            }
        }
        int actualCount = 0;
        int actualSum = 0;
        String[] numbers;
        if (count != 0) {
            numbers = br.readLine().trim().split("\\s+");
        }
        for (String num : numbers) {
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                actualCount++;
                actualSum += n;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + actualSum);
    }
}
