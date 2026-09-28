import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        int count = 0;
        int sum = 0;
        String[] numbers = line.trim().split("\\d+");
        count = numbers.length;
        sum = 0;
        for (String num : numbers) {
            if (num.isEmpty()) continue;
            try {
                int n = Integer.parseInt(num);
                sum += n;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
