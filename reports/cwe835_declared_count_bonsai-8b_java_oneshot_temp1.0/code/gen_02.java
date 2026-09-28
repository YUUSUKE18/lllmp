import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null) return;
        int count = 0;
        int sum = 0;
        boolean firstLine = true;
        for (String line2 : br.readLine()) {
            if (line2 == null) continue;
            if (!firstLine) {
                if (line2.trim().isEmpty()) continue;
                try {
                    int n = Integer.parseInt(line2.trim());
                    count++;
                    sum += n;
                } catch (NumberFormatException e) {
                }
            } else {
                firstLine = false;
                if (line2.trim().isEmpty()) continue;
                try {
                    count = Integer.parseInt(line2.trim());
                } catch (NumberFormatException e) {
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
