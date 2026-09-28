import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int count = 0;
        long sum = 0;
        boolean firstLine = true;
        if (line.trim().isEmpty()) return;
        try {
            count = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            return;
        }
        if (firstLine) {
            firstLine = false;
        }
        while (true) {
            line = br.readLine();
            if (line == null || line.trim().isEmpty()) break;
            if (firstLine) {
                firstLine = false;
                try {
                    int n = Integer.parseInt(line.trim());
                    if (n > count) count = n;
                    sum += n;
                } catch (NumberFormatException e) {
                }
            } else {
                try {
                    int n = Integer.parseInt(line.trim());
                    sum += n;
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
