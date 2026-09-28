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
        if (line.trim().matches("\\d+")) {
            count = Integer.parseInt(line);
            first = false;
        }
        while ((line = br.readLine()) != null) {
            if (line.trim().matches("\\d+")) {
                count++;
                sum += Long.parseLong(line);
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
