import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split("\\s+")) {
                if (s.isEmpty()) continue;
                int value;
                int num;
                try {
                    value = Integer.parseInt(s.split(":")[0]);
                    num = Integer.parseInt(s.split(":")[1]);
                } catch (NumberFormatException e) {
                    continue;
                }
                if (first || num > sum) {
                    count = num;
                    sum = num;
                    first = false;
                } else if (num == sum) {
                    count += num;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
