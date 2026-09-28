import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0, sum = 0;
        if (line != null) {
            for (String elem : line.split(",")) {
                if (!elem.trim().isEmpty()) {
                    int value;
                    try {
                        value = Integer.parseInt(elem);
                    } catch (NumberFormatException e) {
                        continue;
                    }
                    count++;
                    sum += value;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
