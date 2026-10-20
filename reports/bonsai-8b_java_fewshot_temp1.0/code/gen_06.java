import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        boolean first = true;
        if (line != null) {
            for (String s : line.trim().split(",")) {
                if (s.isEmpty()) continue;
                try {
                    int num = Integer.parseInt(s.trim());
                    if (!first) {
                        if (num > sum) {
                            sum = num;
                        }
                    } else {
                        count++;
                        sum = num;
                    }
                    first = false;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
