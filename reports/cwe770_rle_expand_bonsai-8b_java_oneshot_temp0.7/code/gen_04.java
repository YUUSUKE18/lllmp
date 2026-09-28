import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split("\\s+\\s*:\\s*\\d+\\s*")) {
                if (s.isEmpty()) continue;
                int value = Integer.parseInt(s.split(":")[0]);
                int num = Integer.parseInt(s.split(":")[1]);
                if (first || num > 0) {
                    count += num;
                    sum += value * num;
                    first = false;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
