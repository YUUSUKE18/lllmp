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
        long sum = 0;
        String[] numbers = line.trim().split("\\d+");
        if (numbers.length == 0) {
            System.out.println("count=0 sum=0");
            return;
        }
        count = numbers.length;
        for (int i = 0; i < count; i++) {
            String next = br.readLine();
            if (next == null || next.trim().isEmpty()) continue;
            try {
                long num = Long.parseLong(next.trim());
                sum += num;
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
