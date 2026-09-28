import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String part : line.split(",")) {
                if (!part.trim().isEmpty()) {
                    int value;
                    try {
                        value = Integer.parseInt(part.trim().split(":")[0]);
                    } catch (NumberFormatException e) {
                        continue;
                    }
                    int occurrences;
                    try {
                        occurrences = Integer.parseInt(part.trim().split(":")[1]);
                    } catch (NumberFormatException e) {
                        continue;
                    }
                    if (occurrences > 0) {
                        count += occurrences;
                        sum += occurrences * value;
                    }
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
