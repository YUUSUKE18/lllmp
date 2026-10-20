import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            String[] elements = line.trim().split(",");
            for (String e : elements) {
                e = e.trim();
                if (e.isEmpty()) continue;
                try {
                    int n = Integer.parseInt(e);
                    if (count == 0 || n != count) {
                        count++;
                        sum += n;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
