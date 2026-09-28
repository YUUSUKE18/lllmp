import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int count = 0;
        long sum = 0;
        boolean first = true;
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            if (!first) {
                try {
                    int num = Integer.parseInt(line);
                    count++;
                    sum += num;
                } catch (NumberFormatException e) {
                }
            } else {
                count = 0;
                first = false;
                try {
                    count = Integer.parseInt(line);
                } catch (NumberFormatException e) {
                    count = 0;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
