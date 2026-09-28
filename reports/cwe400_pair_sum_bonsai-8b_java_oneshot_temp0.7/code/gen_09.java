import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long target = 0;
        if (line != null) {
            try {
                target = Long.parseLong(line);
            } catch (NumberFormatException e) {
            }
        }
        long sum = 0;
        int count = 0;
        boolean found = false;
        int first = true;
        while ((line = br.readLine()) != null) {
            if (first) {
                try {
                    long num = Long.parseLong(line);
                    if (num == target) {
                        first = false;
                        count++;
                    }
                } catch (NumberFormatException e) {
                }
            } else {
                try {
                    long num = Long.parseLong(line);
                    sum += num;
                    if (sum == target) {
                        count++;
                        found = true;
                    }
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("pairs=" + count);
    }
}
