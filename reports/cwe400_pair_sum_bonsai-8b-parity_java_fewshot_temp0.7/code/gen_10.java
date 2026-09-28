import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) try { target = Long.parseLong(line); } catch (NumberFormatException e) {}
        int count = 0;
        long sum = 0;
        boolean first = true;
        while ((line = br.readLine()) != null) {
            if (first) { first = false; continue; }
            if (line.trim().isEmpty() || !line.matches("\\d+")) continue;
            long num = Long.parseLong(line);
            if (sum + num > target) count++;
            sum += num;
        }
        System.out.println("pairs=" + count);
    }
}
