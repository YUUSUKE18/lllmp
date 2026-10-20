import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        long sum = 0;
        String[] elements = line.trim().split("\\s+,?\\s*");
        for (String e : elements) {
            if (e.isEmpty()) continue;
            try {
                int num = Integer.parseInt(e);
                if (!count || num != count) {
                    count++;
                    sum += num;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
