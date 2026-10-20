import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        String[] elements = line.split(",");
        for (String e : elements) {
            e = e.trim();
            if (e.isEmpty()) continue;
            try {
                int num = Integer.parseInt(e);
                if (!count || num > sum) {
                    sum += num;
                    count++;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
