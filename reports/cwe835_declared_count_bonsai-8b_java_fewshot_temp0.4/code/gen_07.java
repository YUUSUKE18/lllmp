import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int count = 0;
        long sum = 0;
        String[] numbers = line.trim().split("\\d+");
        for (String num : numbers) {
            if (!num.isEmpty()) {
                count++;
                sum += Long.parseLong(num);
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
